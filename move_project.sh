#!/bin/bash

# Script to move watsonx Orchestrate Onboarding project to Tinkering folder
# Usage: bash move_project.sh

SOURCE_DIR="/Users/vimalvenugopal/Desktop/Transcripts"
TARGET_DIR="/Users/vimalvenugopal/Documents/Tinkering"
PROJECT_NAME="watsonx-orchestrate-onboarding"

echo "=========================================="
echo "watsonx Orchestrate Project Move Script"
echo "=========================================="
echo ""
echo "Source: $SOURCE_DIR"
echo "Target: $TARGET_DIR/$PROJECT_NAME"
echo ""

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "❌ Error: Source directory does not exist!"
    exit 1
fi

# Create Tinkering directory if it doesn't exist
if [ ! -d "$TARGET_DIR" ]; then
    echo "📁 Creating Tinkering directory..."
    mkdir -p "$TARGET_DIR"
fi

# Create project directory in Tinkering
TARGET_PROJECT_DIR="$TARGET_DIR/$PROJECT_NAME"

if [ -d "$TARGET_PROJECT_DIR" ]; then
    echo "⚠️  Warning: Target directory already exists!"
    read -p "Do you want to overwrite it? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Move cancelled."
        exit 1
    fi
    echo "🗑️  Removing existing directory..."
    rm -rf "$TARGET_PROJECT_DIR"
fi

echo "📦 Creating project directory..."
mkdir -p "$TARGET_PROJECT_DIR"

echo "📋 Copying files..."

# Copy all HTML files
cp "$SOURCE_DIR"/*.html "$TARGET_PROJECT_DIR/" 2>/dev/null

# Copy all Markdown files
cp "$SOURCE_DIR"/*.md "$TARGET_PROJECT_DIR/" 2>/dev/null

# Copy .gitignore
cp "$SOURCE_DIR/.gitignore" "$TARGET_PROJECT_DIR/" 2>/dev/null

# Copy this script for reference
cp "$SOURCE_DIR/move_project.sh" "$TARGET_PROJECT_DIR/" 2>/dev/null

echo ""
echo "✅ Files copied successfully!"
echo ""
echo "📊 Summary:"
echo "  - HTML files: $(ls "$TARGET_PROJECT_DIR"/*.html 2>/dev/null | wc -l | xargs)"
echo "  - Markdown files: $(ls "$TARGET_PROJECT_DIR"/*.md 2>/dev/null | wc -l | xargs)"
echo ""
echo "📍 Project location: $TARGET_PROJECT_DIR"
echo ""
echo "🚀 Next steps:"
echo "  1. cd $TARGET_PROJECT_DIR"
echo "  2. Follow README.md instructions to set up Git"
echo "  3. Push to GitHub and share with your team"
echo ""
echo "=========================================="

# Made with Bob
