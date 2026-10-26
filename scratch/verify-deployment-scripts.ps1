$ErrorActionPreference = 'Stop'
$deploymentScript = Join-Path (Get-Location) 'scripts/sync-to-vps.ps1'
function ssh {
  $global:DeploymentTestState.Calls.Add(@('ssh') + $args)
  if ($global:DeploymentTestState.Mode -eq 'prepare' -or ($global:DeploymentTestState.Mode -eq 'deploy' -and ($args -join ' ') -match 'redeploy.sh')) { $global:LASTEXITCODE = 17 } else { $global:LASTEXITCODE = 0 }
}
function scp {
  $global:DeploymentTestState.Calls.Add(@('scp') + $args)
  if (($args -join ' ') -match '\.deploy-docker\.tar$') {
    $archiveEntries = & tar -tf $args[0]
    if ($LASTEXITCODE -ne 0) { throw 'Could not inspect deployment archive' }
    if ($archiveEntries -match '^\./(\.env($|\.)|postgres/production\.password$|redis/production\.conf$)') { throw 'Private VPS config included in deployment archive' }
    if ($archiveEntries -notcontains './nginx/production.conf') { throw 'Nginx public config missing from archive' }
  }
  if ($global:DeploymentTestState.Mode -eq 'transfer') { $global:LASTEXITCODE = 23 } else { $global:LASTEXITCODE = 0 }
}
foreach ($mode in @('prepare', 'transfer', 'deploy', 'success')) {
  $global:DeploymentTestState = @{ Mode = $mode; Calls = [System.Collections.Generic.List[object]]::new(); Failed = $false }
  $output = & {
    try { & $deploymentScript -HostIp 'example.invalid' } catch { $global:DeploymentTestState.Failed = $true }
  } 6>&1 | Out-String
  if ($mode -eq 'success') {
    if ($global:DeploymentTestState.Failed -or $output -notmatch 'succ') { throw 'Success path failed' }
    $remoteCall = $global:DeploymentTestState.Calls[-1] -join ' '
    if ($remoteCall -notmatch '--skip-git-pull') { throw 'Missing explicit Git skip during sync' }
    $sourceTransfer = @($global:DeploymentTestState.Calls | Where-Object { ($_ -join ' ') -match 'scp -r backend/src' })
    if ($sourceTransfer.Count -ne 1) { throw 'Backend source transfer missing' }
    if (@($global:DeploymentTestState.Calls | Where-Object { ($_ -join ' ') -match 'chown -R' }).Count -ne 0) { throw 'Recursive chown would break production config ownership' }
  } else {
    if (-not $global:DeploymentTestState.Failed -or $output -match 'succ') { throw "False deployment success for $mode" }
    if ($mode -eq 'prepare' -and $global:DeploymentTestState.Calls.Count -ne 1) { throw 'Continued after SSH failure' }
    if ($mode -eq 'transfer' -and $global:DeploymentTestState.Calls.Count -ne 2) { throw 'Continued after SCP failure' }
  }
  Write-Output "PASS: $mode ($($global:DeploymentTestState.Calls.Count) mocked calls, no network)"
}
