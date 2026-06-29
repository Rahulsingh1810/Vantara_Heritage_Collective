param(
    [string]$Path = "",
    [string]$Tag = "contentful",
    [string]$Token = "qsdfvberth23456!@",
    [int]$Port = 3000
)

$headers = @{
    "Revalidate-Cache-Auth-Token" = $Token
}

if ($Path) {
    # Default to path revalidation
    $uri = "http://localhost:$Port/api/revalidate?type=path&path=$Path"
    Write-Host "Invoking revalidation for path: $Path" -ForegroundColor Cyan
} else {
    # Default to tag revalidation
    $uri = "http://localhost:$Port/api/revalidate?tag=$Tag"
    Write-Host "Invoking revalidation for tag: $Tag" -ForegroundColor Cyan
}

try {
    $response = Invoke-RestMethod -Uri $uri -Headers $headers -Method Get
    Write-Host "Revalidation request sent successfully!" -ForegroundColor Green
    $response | Format-List
} catch {
    Write-Error "Failed to invoke revalidation: $_"
}
