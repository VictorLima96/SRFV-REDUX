#!/usr/bin/env node

const { execSync } = require('node:child_process');
const { readFileSync, statSync } = require('node:fs');
const { join } = require('node:path');

const SECRET_PATTERNS = [
  { name: 'Supabase secret key', regex: /sb_secret_[A-Za-z0-9_\-]+/g },
  { name: 'Supabase JWT-like key', regex: /eyJ[A-Za-z0-9_\-]{20,}\.[A-Za-z0-9_\-]{20,}\.[A-Za-z0-9_\-]{20,}/g },
  { name: 'Google API key', regex: /AIza[0-9A-Za-z_\-]{20,}/g },
  { name: 'Vercel token', regex: /vca_[A-Za-z0-9]+/g },
  { name: 'Hardcoded env assignment', regex: /(SUPABASE_SECRET_KEY|SUPABASE_SERVICE_ROLE_KEY|NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY|NEXT_PUBLIC_SUPABASE_ANON_KEY)\s*=\s*['"][^'"]+['"]/g },
];

const BINARY_EXTENSIONS = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.mp3', '.mp4', '.woff', '.woff2', '.ttf', '.zip', '.pdf'
]);

function getStagedFiles() {
  const output = execSync('git diff --cached --name-only --diff-filter=ACMR', { encoding: 'utf-8' }).trim();
  if (!output) return [];
  return output.split(/\r?\n/).filter(Boolean);
}

function isBinaryLikely(filePath) {
  const lower = filePath.toLowerCase();
  for (const ext of BINARY_EXTENSIONS) {
    if (lower.endsWith(ext)) return true;
  }
  return false;
}

function readFileSafe(filePath) {
  try {
    const size = statSync(filePath).size;
    if (size > 2 * 1024 * 1024) return null;
    return readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
}

function scanContent(content) {
  const findings = [];
  for (const pattern of SECRET_PATTERNS) {
    const matches = content.match(pattern.regex);
    if (matches && matches.length > 0) {
      findings.push(pattern.name);
    }
  }
  return findings;
}

function main() {
  const stagedFiles = getStagedFiles();
  if (stagedFiles.length === 0) {
    process.exit(0);
  }

  const violations = [];

  for (const stagedFile of stagedFiles) {
    if (isBinaryLikely(stagedFile)) continue;

    const absolutePath = join(process.cwd(), stagedFile);
    const content = readFileSafe(absolutePath);
    if (!content) continue;

    const findings = scanContent(content);
    if (findings.length > 0) {
      violations.push({ file: stagedFile, findings });
    }
  }

  if (violations.length > 0) {
    console.error('\n❌ Commit bloqueado: possíveis segredos detectados em arquivos staged.\n');
    for (const violation of violations) {
      console.error(`- ${violation.file}`);
      for (const finding of violation.findings) {
        console.error(`  • ${finding}`);
      }
    }
    console.error('\nRevise os arquivos, remova segredos e tente novamente.\n');
    process.exit(1);
  }

  console.log('✅ Secret scan: nenhum segredo detectado nos arquivos staged.');
  process.exit(0);
}

main();
