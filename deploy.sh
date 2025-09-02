#!/bin/bash

echo "🚀 Starting safe deployment process..."

# Build the project
echo "📦 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix the errors and try again."
    exit 1
fi

echo "✅ Build completed successfully!"

# Create a temporary directory for deployment
echo "📁 Preparing deployment files..."
TEMP_DIR=$(mktemp -d)
cp -r dist/* "$TEMP_DIR/"

# Create or reset gh-pages branch
echo "🌿 Setting up deployment branch..."
if git show-ref --verify --quiet refs/heads/gh-pages; then
    # Branch exists, reset it
    git checkout gh-pages
    git reset --hard
    git clean -fxd
else
    # Create new branch
    git checkout --orphan gh-pages
fi

# Copy built files to root
echo "📋 Copying built files..."
cp -r "$TEMP_DIR"/* .
rm -rf "$TEMP_DIR"

# Add all files
git add .

# Commit the deployment
git commit -m "Deploy to GitHub Pages - $(date)"

# Push to gh-pages branch
echo "📤 Pushing to gh-pages branch..."
git push origin gh-pages --force

# Switch back to main branch
echo "🔄 Switching back to main branch..."
git checkout main

echo "✅ Deployment completed successfully!"
echo "🌐 Your site should be available at: https://landing.meysamzarei.com"
echo "📝 Remember to set GitHub Pages source to 'gh-pages' branch in your repository settings"
echo ""
echo "💡 Your source files are completely safe and unchanged!"
