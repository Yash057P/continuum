# Quick Start Script for Windows

Write-Host "🚀 Continuum Setup Script" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

# Check if .env.local exists
if (Test-Path ".env.local") {
    Write-Host "✓ .env.local found" -ForegroundColor Green
} else {
    Write-Host "✗ .env.local not found. Creating from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env.local"
    Write-Host "✓ .env.local created. Please edit it with your API keys!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 You need to add:" -ForegroundColor Yellow
    Write-Host "  - RAWG_API_KEY (get from https://rawg.io/apidocs)" -ForegroundColor Yellow
    Write-Host "  - CLIENT_ID and CLIENT_SECRET (get from https://dev.twitch.tv/console)" -ForegroundColor Yellow
    Write-Host ""
    Start-Process notepad ".env.local"
    Write-Host "Press any key after adding your API keys..." -ForegroundColor Cyan
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
npm install

Write-Host ""
Write-Host "✨ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🎮 To start development server:" -ForegroundColor Cyan
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "📖 Read API_SETUP.md for detailed instructions" -ForegroundColor Yellow
