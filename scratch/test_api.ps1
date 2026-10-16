$loginBody = '{"login":"admin@eduops.local","password":"ChangeMe!2026"}'
$login = Invoke-RestMethod -Uri 'http://localhost:58080/api/v1/auth/login' -Method Post -ContentType 'application/json' -Body $loginBody
Write-Host "Admin Login OK! schoolId: $($login.schoolId) roles: $($login.roles -join ',')"

$token = $login.accessToken
try {
    $dashboard = Invoke-RestMethod -Uri 'http://localhost:58080/api/v1/dashboard' -Method Get -Headers @{ Authorization = "Bearer $token" }
    Write-Host "Dashboard OK for admin@eduops.local!"
    $dashboard | ConvertTo-Json -Depth 3 | Write-Host
} catch {
    Write-Host "Dashboard Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        Write-Host "Details: $($reader.ReadToEnd())"
    }
}

$loginAdminSchool = '{"login":"tadmin@soocloo.com","password":"ChangeMe!2026"}'
$login2 = Invoke-RestMethod -Uri 'http://localhost:58080/api/v1/auth/login' -Method Post -ContentType 'application/json' -Body $loginAdminSchool
Write-Host "tadmin Login OK! schoolId: $($login2.schoolId) roles: $($login2.roles -join ',')"
try {
    $dashboard2 = Invoke-RestMethod -Uri 'http://localhost:58080/api/v1/dashboard' -Method Get -Headers @{ Authorization = "Bearer $($login2.accessToken)" }
    Write-Host "Dashboard OK for tadmin@soocloo.com!"
    $dashboard2 | ConvertTo-Json -Depth 3 | Write-Host
} catch {
    Write-Host "Dashboard Error: $($_.Exception.Message)"
}
