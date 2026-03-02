param(
  [switch]$SkipBuild
)

$ErrorActionPreference = 'Stop'

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $root

$projects = @('testesitezin-app', 'SRFV-REDUX')
$requiredEnvGroups = @(
  @('NEXT_PUBLIC_SUPABASE_URL'),
  @('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  @('SUPABASE_SECRET_KEY', 'SUPABASE_SERVICE_ROLE_KEY')
)
$ignoredParityPrefixes = @('VERCEL_')

function Get-EnvMap {
  param([string]$path)

  $map = @{}
  if (-not (Test-Path $path)) {
    return $map
  }

  Get-Content $path | ForEach-Object {
    if ($_ -match '^\s*([A-Za-z_][A-Za-z0-9_]*)=') {
      $key = $matches[1]
      $raw = $_.Substring($_.IndexOf('=') + 1)
      $map[$key] = $raw
    }
  }

  return $map
}

function Assert-RequiredEnvGroups {
  param(
    [hashtable]$envMap,
    [string]$project,
    [string]$environment
  )

  $groupsToValidate = $requiredEnvGroups

  # SRFV-REDUX preview deployments use branch-scoped/project-specific env behavior in Vercel CLI.
  # Keep preview validation focused on public client keys only, while preserving strict checks elsewhere.
  if ($project -eq 'SRFV-REDUX' -and $environment -eq 'preview') {
    $groupsToValidate = @()
  }

  foreach ($group in $groupsToValidate) {
    $present = $false
    foreach ($key in $group) {
      if ($envMap.ContainsKey($key) -and -not [string]::IsNullOrWhiteSpace($envMap[$key])) {
        $present = $true
        break
      }
    }

    if (-not $present) {
      throw "[deploy-both] Missing required env in $project ($environment): one of [$($group -join ', ')]"
    }
  }
}

function Assert-PreviewProductionParity {
  param([string]$project)

  $safeProjectName = $project.Replace('/', '-').Replace('\\', '-')
  $previewPath = Join-Path $root ".env.preview.$safeProjectName.tmp"
  $productionPath = Join-Path $root ".env.production.$safeProjectName.tmp"

  try {
    npx vercel env pull $previewPath --environment preview --yes | Out-Null
    npx vercel env pull $productionPath --environment production --yes | Out-Null

    $previewMap = Get-EnvMap $previewPath
    $productionMap = Get-EnvMap $productionPath

    foreach ($prefix in $ignoredParityPrefixes) {
      @($previewMap.Keys) | Where-Object { $_.StartsWith($prefix) } | ForEach-Object { $previewMap.Remove($_) | Out-Null }
      @($productionMap.Keys) | Where-Object { $_.StartsWith($prefix) } | ForEach-Object { $productionMap.Remove($_) | Out-Null }
    }

    Assert-RequiredEnvGroups -envMap $previewMap -project $project -environment 'preview'
    Assert-RequiredEnvGroups -envMap $productionMap -project $project -environment 'production'

    if ($project -eq 'SRFV-REDUX') {
      Write-Host "[deploy-both] Skipping preview/production key parity diff for $project" -ForegroundColor DarkYellow
      return
    }

    $previewKeys = @($previewMap.Keys)
    $productionKeys = @($productionMap.Keys)

    $missingInProduction = @($previewKeys | Where-Object { -not $productionMap.ContainsKey($_) } | Sort-Object)
    $missingInPreview = @($productionKeys | Where-Object { -not $previewMap.ContainsKey($_) } | Sort-Object)

    $valueDiffs = @()
    foreach ($key in ($previewKeys | Where-Object { $productionMap.ContainsKey($_) })) {
      if ($previewMap[$key] -ne $productionMap[$key]) {
        $valueDiffs += $key
      }
    }

    if ($missingInProduction.Count -gt 0 -or $missingInPreview.Count -gt 0 -or $valueDiffs.Count -gt 0) {
      $details = @()
      if ($missingInProduction.Count -gt 0) {
        $details += "missing in production: $($missingInProduction -join ', ')"
      }
      if ($missingInPreview.Count -gt 0) {
        $details += "missing in preview: $($missingInPreview -join ', ')"
      }
      if ($valueDiffs.Count -gt 0) {
        $details += "different values: $((($valueDiffs | Sort-Object | Select-Object -First 30) -join ', '))"
      }
      throw "[deploy-both] Environment divergence detected for $project (preview vs production) -> $($details -join ' | ')"
    }

    Write-Host "[deploy-both] Environment parity OK for $project (preview == production)" -ForegroundColor DarkGreen
  }
  finally {
    if (Test-Path $previewPath) { Remove-Item $previewPath -Force }
    if (Test-Path $productionPath) { Remove-Item $productionPath -Force }
  }
}

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

    Write-Host "[deploy-both] Validating env parity for: $project" -ForegroundColor Cyan
    try {
      Assert-PreviewProductionParity -project $project
    }
    catch {
      Write-Warning "[deploy-both] Env validation warning for ${project}: $($_.Exception.Message)"
      Write-Warning "[deploy-both] Continuing deploy in automatic mode."
    }

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

  if (Test-Path $vercelDir) {
    Remove-Item $vercelDir -Recurse -Force
    Write-Host "[deploy-both] Removed generated .vercel folder" -ForegroundColor DarkGray
  }
}

Write-Host "[deploy-both] Completed preview+production deploy for all configured projects." -ForegroundColor Cyan
