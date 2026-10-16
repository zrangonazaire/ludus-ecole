$loginBody = '{"login":"tadmin@soocloo.com","password":"ChangeMe!2026"}'
$login = Invoke-RestMethod -Uri 'http://localhost:58080/api/v1/auth/login' -Method Post -ContentType 'application/json' -Body $loginBody
$token = $login.accessToken

Write-Host "1. Test GET /api/v1/admissions..."
try {
    $admissions = Invoke-RestMethod -Uri 'http://localhost:58080/api/v1/admissions' -Method Get -Headers @{ Authorization = "Bearer $token" }
    Write-Host "GET Admissions OK! Total: $($admissions.totalElements)"
} catch {
    Write-Host "GET Admissions Error: $($_.Exception.Message)"
}

Write-Host "2. Test GET /api/v1/admissions/options..."
try {
    $options = Invoke-RestMethod -Uri 'http://localhost:58080/api/v1/admissions/options' -Method Get -Headers @{ Authorization = "Bearer $token" }
    Write-Host "GET Options OK! Campuses: $($options.campuses.Count), Levels: $($options.levels.Count)"
    $yearId = $options.defaultAcademicYearId
    $campusId = $options.campuses[0].id
    $levelId = $options.levels[0].id
    
    Write-Host "3. Test POST /api/v1/admissions (création d'un dossier avec NumberSequenceService)..."
    $newAdmission = @{
        academicYearId = $yearId
        campusId = $campusId
        requestedLevelId = $levelId
        firstName = "Kouadio"
        lastName = "Junior"
        birthDate = "2015-05-12"
        gender = "MALE"
        guardianName = "Kouadio Michel"
        guardianPhone = "+2250707070707"
        guardianEmail = "michel.kouadio@test.ci"
    } | ConvertTo-Json

    $created = Invoke-RestMethod -Uri 'http://localhost:58080/api/v1/admissions' -Method Post -ContentType 'application/json' -Body $newAdmission -Headers @{ Authorization = "Bearer $token" }
    Write-Host "POST Admission SUCCÈS !"
    Write-Host "Dossier créé: Numéro=$($created.applicationNumber), Élève=$($created.firstName) $($created.lastName), Statut=$($created.status)"
} catch {
    Write-Host "Admissions POST Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        Write-Host "Détails: $($reader.ReadToEnd())"
    }
}
