$ErrorActionPreference = "Stop"

$workspace = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")).Path
$ports = @(3000, 3001, 3002)

foreach ($port in $ports) {
  $connections = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
  foreach ($connection in $connections) {
    $processId = $connection.OwningProcess
    if ($processId -and $processId -ne $PID) {
      Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
    }
  }
}

Start-Sleep -Milliseconds 500

$nextDir = Join-Path $workspace ".next"
if (Test-Path -LiteralPath $nextDir) {
  $resolvedNextDir = (Resolve-Path -LiteralPath $nextDir).Path
  if (-not $resolvedNextDir.StartsWith($workspace, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Refusing to remove path outside workspace: $resolvedNextDir"
  }

  Remove-Item -LiteralPath $resolvedNextDir -Recurse -Force
}
