$base = "C:\Publisoft\Site"
$pastas = @("manuais", "faq", "utilitarios")
$arquivos = @()

foreach ($pasta in $pastas) {
    $caminho = "$base\$pasta\files"
    Get-ChildItem -Path $caminho -File | Where-Object { $_.Extension -match "\.pdf|\.sql" } | ForEach-Object {
        $obj = [PSCustomObject]@{
            texto = $_.BaseName
            href  = "$pasta/files/$($_.Name)"
            data  = $_.LastWriteTime.ToString("yyyy-MM-ddTHH:mm:ss")
        }
        $arquivos += $obj
    }
}

Write-Output "Arquivos encontrados: $($arquivos.Count)"

$json = $arquivos | Sort-Object data -Descending | ConvertTo-Json -Depth 3

Write-Output $json

Set-Content -Path "$base\scripts\novidades.json" -Value $json -Encoding UTF8