#!/bin/bash

echo "🚀 Starting deployment from gh-pages branch..."

# Check if we're on gh-pages branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "gh-pages" ]; then
    echo "❌ Error: This script must be run from the gh-pages branch!"
    echo "Current branch: $CURRENT_BRANCH"
    exit 1
fi

# Install dependencies if needed
echo "📦 Installing dependencies..."
npm install

# Build the project from current branch
echo "📦 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix the errors and try again."
    exit 1
fi

echo "✅ Build completed successfully!"

# Copy built files to root for GitHub Pages
echo "📋 Copying built files to root..."
cp dist/index.html index.html
cp -r dist/assets/* assets/

# Add all changes including the built files
echo "📋 Adding all changes..."
git add .

# Commit the deployment
echo "💾 Committing changes..."
git commit -m "Deploy to GitHub Pages - $(date)"

# Push to gh-pages branch
echo "📤 Pushing to gh-pages branch..."
git push origin gh-pages

echo "✅ Deployment completed successfully!"
echo "🌐 Your site should be available at: https://landing.meysamzarei.com"
echo ""
echo "💡 Your component changes are now live!"
