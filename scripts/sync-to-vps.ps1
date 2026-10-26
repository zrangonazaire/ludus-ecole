param(
  [string]$HostIp = "57.129.132.150",
  [string]$User = "ubuntu",
  [string]$Dest = "/opt/eduops"
)

$ErrorActionPreference = "Stop"

# Windows PowerShell does not turn nonzero native exit codes into exceptions.
function Invoke-CheckedNative {
  param(
    [string]$Command,
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$CommandArguments
  )
  & $Command @CommandArguments
  if ($LASTEXITCODE -ne 0) {
    throw "La commande $Command a echoue (code $LASTEXITCODE). Deploiement interrompu."
  }
}

Set-Location (Join-Path $PSScriptRoot "..")

Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host "  SYNCHRONISATION ET REDEPLOIEMENT SUR LE VPS ($HostIp)" -ForegroundColor Cyan
Write-Host "=================================================================" -ForegroundColor Cyan

Write-Host "`n==> [1/6] Préparation du dossier distant $Dest..." -ForegroundColor Yellow
Invoke-CheckedNative ssh "${User}@${HostIp}" "sudo mkdir -p ${Dest}/config && sudo chown -R ${User}:${User} ${Dest}"

Write-Host "==> [2/6] Transfert des dossiers docker/ et scripts/..." -ForegroundColor Yellow
Invoke-CheckedNative scp -r docker "${User}@${HostIp}:${Dest}/"
Invoke-CheckedNative scp -r scripts "${User}@${HostIp}:${Dest}/"

Write-Host "==> [3/6] Transfert du backend..." -ForegroundColor Yellow
Invoke-CheckedNative ssh "${User}@${HostIp}" "mkdir -p ${Dest}/backend"
Invoke-CheckedNative scp backend/pom.xml "${User}@${HostIp}:${Dest}/backend/"
if (Test-Path "backend/Dockerfile") { Invoke-CheckedNative scp backend/Dockerfile "${User}@${HostIp}:${Dest}/backend/" }
Invoke-CheckedNative scp -r backend/src "${User}@${HostIp}:${Dest}/backend/"

Write-Host "==> [4/6] Transfert du frontend..." -ForegroundColor Yellow
Invoke-CheckedNative ssh "${User}@${HostIp}" "mkdir -p ${Dest}/frontend"
Invoke-CheckedNative scp frontend/package.json "${User}@${HostIp}:${Dest}/frontend/"
if (Test-Path "frontend/package-lock.json") { Invoke-CheckedNative scp frontend/package-lock.json "${User}@${HostIp}:${Dest}/frontend/" }
if (Test-Path "frontend/angular.json") { Invoke-CheckedNative scp frontend/angular.json "${User}@${HostIp}:${Dest}/frontend/" }
if (Test-Path "frontend/nginx.conf") { Invoke-CheckedNative scp frontend/nginx.conf "${User}@${HostIp}:${Dest}/frontend/" }
if (Test-Path "frontend/ngsw-config.json") { Invoke-CheckedNative scp frontend/ngsw-config.json "${User}@${HostIp}:${Dest}/frontend/" }
if (Test-Path "frontend/Dockerfile") { Invoke-CheckedNative scp frontend/Dockerfile "${User}@${HostIp}:${Dest}/frontend/" }
Invoke-CheckedNative scp frontend/tsconfig*.json "${User}@${HostIp}:${Dest}/frontend/"
Invoke-CheckedNative scp -r frontend/src "${User}@${HostIp}:${Dest}/frontend/"

Write-Host "==> [5/6] Transfert du compose.yaml..." -ForegroundColor Yellow
Invoke-CheckedNative scp compose.yaml "${User}@${HostIp}:${Dest}/"

Write-Host "==> [6/6] Exécution du redéploiement sur le VPS..." -ForegroundColor Green
Invoke-CheckedNative ssh -t "${User}@${HostIp}" "cd ${Dest} && bash scripts/redeploy.sh --skip-git-pull"

Write-Host "`n=================================================================" -ForegroundColor Cyan
Write-Host "  Déploiement terminé avec succès !" -ForegroundColor Cyan
Write-Host "=================================================================" -ForegroundColor Cyan
