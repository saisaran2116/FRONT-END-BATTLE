$port = 8081
$path = $PWD
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "Server started at http://localhost:$port/"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $requestUrl = $context.Request.Url.LocalPath
        if ($requestUrl -eq "/") { $requestUrl = "/index.html" }
        
        # remove leading slash
        $requestUrl = $requestUrl.TrimStart("/")
        $filePath = Join-Path $path $requestUrl
        
        if (Test-Path $filePath -PathType Leaf) {
            $buffer = [System.IO.File]::ReadAllBytes($filePath)
            $context.Response.ContentLength64 = $buffer.Length
            
            $ext = [System.IO.Path]::GetExtension($filePath)
            switch ($ext) {
                ".html" { $context.Response.ContentType = "text/html" }
                ".css"  { $context.Response.ContentType = "text/css" }
                ".js"   { $context.Response.ContentType = "application/javascript" }
                default { $context.Response.ContentType = "application/octet-stream" }
            }
            
            $context.Response.OutputStream.Write($buffer, 0, $buffer.Length)
        } else {
            $context.Response.StatusCode = 404
        }
        $context.Response.OutputStream.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
