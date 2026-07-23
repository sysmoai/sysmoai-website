#!/usr/bin/env bash
# SYSmoAI Website — Replit Setup Script
# Run this once after cloning the repo to Replit.
# Usage: bash scripts/replit-setup.sh

set -e
echo "=== SYSmoAI Website — Replit Setup ==="

# 1. Install dependencies
echo ">>> Installing dependencies..."
pnpm install --no-frozen-lockfile

# 2. Build to verify everything compiles
echo ">>> Building website (verification)..."
pnpm --filter @workspace/sysmoai-website run build

# 3. Done
echo ""
echo "=== Setup Complete ==="
echo ""
echo "Dev server:  Click the Run button (or: pnpm --filter @workspace/sysmoai-website run dev)"
echo "Build:       pnpm --filter @workspace/sysmoai-website run build"
echo "Production:  pnpm --filter @workspace/sysmoai-website run serve"
echo "Preview:     The Replit webview will open on port 20255"
echo ""
echo "NOTE: The live Squarespace site at sysmoai.com is NOT affected."
echo "This Replit project runs independently on its own port."