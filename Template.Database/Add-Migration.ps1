param([Parameter(Mandatory = $true)][string]$Name)
$ErrorActionPreference = "Stop"
Write-Host "Adding EF Core migration '$Name'..." -ForegroundColor Cyan
dotnet ef migrations add $Name `
  --project .\Template.Database.csproj `
  --startup-project ..\Template.Consumer\Template.Consumer.csproj
