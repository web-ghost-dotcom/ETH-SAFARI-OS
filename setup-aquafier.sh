#!/bin/bash

# Aquafier Integration Setup Script for ETH Safari OS
# This script sets up Aquafier-JS SDK integration

echo "🦓 ETH Safari OS - Aquafier Integration Setup"
echo "=============================================="
echo ""

# Check if we're in the frontend directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the frontend directory."
    exit 1
fi

echo "📦 Installing Aquafier SDK and dependencies..."
echo ""

# Install Aquafier SDK (currently requires manual build or Docker setup)
# For now, we'll set up the environment for when it's available

echo "⚠️  Note: Aquafier SDK integration requires the Aquafier backend running."
echo ""
echo "Options for setup:"
echo "1. Run Aquafier as a microservice (Recommended)"
echo "2. Install SDK directly (Requires npm package)"
echo ""
echo "Select option (1 or 2):"
read -r option

if [ "$option" = "1" ]; then
    echo ""
    echo "🐳 Setting up Aquafier microservice..."
    echo ""
    
    # Navigate to aquafier directory
    cd ../aquafier-js/deployment || exit
    
    # Check if .env exists
    if [ ! -f ".env" ]; then
        echo "📝 Creating .env file from sample..."
        cp .env.sample .env
        echo "⚙️  Please edit aquafier-js/deployment/.env with your configuration"
        echo ""
    fi
    
    echo "🚀 Starting Aquafier services with Docker..."
    docker compose -f docker-compose-local.yml up -d
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Aquafier services started successfully!"
        echo ""
        echo "Services:"
        echo "  - API:      http://localhost:3001"
        echo "  - Frontend: http://localhost:5173"
        echo "  - Database: localhost:5432"
        echo ""
        echo "Add to your frontend/.env.local:"
        echo "NEXT_PUBLIC_AQUAFIER_API=http://localhost:3001"
        echo "NEXT_PUBLIC_AQUAFIER_ENABLED=true"
    else
        echo "❌ Failed to start Aquafier services"
        exit 1
    fi
    
elif [ "$option" = "2" ]; then
    echo ""
    echo "📦 Installing Aquafier SDK package..."
    echo ""
    
    # Note: The actual package might not be published to npm
    # This is a placeholder for when it becomes available
    npm install ethers@6.15.0
    
    echo ""
    echo "⚠️  Note: aqua-js-sdk is not available as a standalone npm package yet."
    echo "   You need to run the full Aquafier backend (Option 1) to use the SDK."
    echo ""
    echo "Alternative: Use Aquafier API directly via REST calls"
    echo "See AQUAFIER_INTEGRATION_GUIDE.md for details."
    
else
    echo "❌ Invalid option selected"
    exit 1
fi

echo ""
echo "📚 Next steps:"
echo "1. Review AQUAFIER_INTEGRATION_GUIDE.md"
echo "2. Check frontend/lib/aquafier.ts for usage examples"
echo "3. Test integration with: npm run dev"
echo ""
echo "✨ Setup complete!"
