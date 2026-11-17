# Simple PowerShell static file server for local development
# Usage: .\serve.ps1
# Then open http://localhost:8080 in your browser

param(
    [int]$Port = 8080,
    [string]$Root = "$PSScriptRoot\public"
)

$mimeTypes = @{
    '.html' = 'text/html; charset=utf-8'
    '.css'  = 'text/css; charset=utf-8'
    '.js'   = 'application/javascript; charset=utf-8'
    '.json' = 'application/json; charset=utf-8'
    '.svg'  = 'image/svg+xml'
    '.ico'  = 'image/x-icon'
    '.png'  = 'image/png'
    '.jpg'  = 'image/jpeg'
    '.jpeg' = 'image/jpeg'
    '.webp' = 'image/webp'
    '.xml'  = 'application/xml; charset=utf-8'
    '.txt'  = 'text/plain; charset=utf-8'
    '.woff2'= 'font/woff2'
    '.woff' = 'font/woff'
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()

Write-Host "Serving $Root"
Write-Host "Open: http://localhost:$Port/"
Write-Host "Press Ctrl+C to stop`n"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $req  = $context.Request
        $resp = $context.Response

        $urlPath = $req.Url.LocalPath.TrimStart('/')
        if ($urlPath -eq '' -or $urlPath -eq '/') { $urlPath = 'index.html' }

        # Clean URLs: try path.html then path/index.html
        $filePath = Join-Path $Root $urlPath
        if (-not (Test-Path $filePath -PathType Leaf)) {
            if (Test-Path "$filePath.html" -PathType Leaf) {
                $filePath = "$filePath.html"
            } elseif (Test-Path "$filePath\index.html" -PathType Leaf) {
                $filePath = "$filePath\index.html"
            } else {
                $filePath = Join-Path $Root '404.html'
                $resp.StatusCode = 404
            }
        }

        $ext   = [System.IO.Path]::GetExtension($filePath).ToLower()
        $mime  = if ($mimeTypes[$ext]) { $mimeTypes[$ext] } else { 'application/octet-stream' }
        $bytes = [System.IO.File]::ReadAllBytes($filePath)

        $resp.ContentType   = $mime
        $resp.ContentLength64 = $bytes.Length
        $resp.OutputStream.Write($bytes, 0, $bytes.Length)
        $resp.OutputStream.Close()

        Write-Host "$($req.HttpMethod) $($req.Url.LocalPath) → $($resp.StatusCode)"
    }
} finally {
    $listener.Stop()
}
