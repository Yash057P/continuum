#!/bin/bash

echo "🚀 Continuum Setup Script"
echo "========================="
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✓ .env.local found"
else
    echo "✗ .env.local not found. Creating from .env.example..."
    cp .env.example .env.local
    echo "✓ .env.local created. Please edit it with your API keys!"
    echo ""
    echo "📝 You need to add:"
    echo "  - RAWG_API_KEY (get from https://rawg.io/apidocs)"
    echo "  - CLIENT_ID and CLIENT_SECRET (get from https://dev.twitch.tv/console)"
    echo ""
    echo "Opening .env.local for editing..."
    ${EDITOR:-nano} .env.local
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✨ Setup complete!"
echo ""
echo "🎮 To start development server:"
echo "   npm run dev"
echo ""
echo "📖 Read API_SETUP.md for detailed instructions"
