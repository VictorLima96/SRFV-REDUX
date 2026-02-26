param(
  [switch]$SkipBuild
)

$ErrorActionPreference = 'Stop'

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $root

$projects = @('testesitezin-app', 'SRFV-REDUX')

if (-not $SkipBuild) {
  Write-Host "[deploy-both] Running production build..." -ForegroundColor Cyan
  npm run build
}

$vercelDir = Join-Path $root ".vercel"
$projectJson = Join-Path $vercelDir "project.json"
$backupPath = Join-Path $vercelDir "project.json.backup"
$envLocalPath = Join-Path $root ".env.local"
$envLocalBackupPath = Join-Path $root ".env.local.deploy-backup"

if (Test-Path $projectJson) {
  Copy-Item $projectJson $backupPath -Force
}

if (Test-Path $envLocalPath) {
  Copy-Item $envLocalPath $envLocalBackupPath -Force
}

try {
  foreach ($project in $projects) {
    Write-Host "[deploy-both] Linking to project: $project" -ForegroundColor Yellow
    npx vercel link --project $project --yes

    Write-Host "[deploy-both] Preview deploy: $project" -ForegroundColor Green
    npx vercel --yes

    Write-Host "[deploy-both] Production deploy: $project" -ForegroundColor Magenta
    npx vercel --prod --yes
  }
}
finally {
  if (Test-Path $backupPath) {
    Move-Item $backupPath $projectJson -Force
    Write-Host "[deploy-both] Restored original .vercel/project.json" -ForegroundColor DarkGray
  }

  if (Test-Path $envLocalBackupPath) {
    Move-Item $envLocalBackupPath $envLocalPath -Force
    Write-Host "[deploy-both] Restored original .env.local" -ForegroundColor DarkGray
  }
}

Write-Host "[deploy-both] Completed preview+production deploy for all configured projects." -ForegroundColor Cyan
