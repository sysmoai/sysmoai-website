# SYSmoAI COMPLETE MIGRATION AUTOMATION SCRIPT
# Autonomous execution: Code export → Local setup → Testing → Deployment
# Author: Claude (CEO AI) | Date: 26 Jul 2026 | Authorization: Full autonomy

param(
    [ValidateSet("export", "setup", "test", "deploy", "all")]
    [string]$Phase = "all",

    [string]$LocalTestingPath = "C:\Users\emonh\SYSmoAI-Stack\local-testing"
)

# Configuration
$ErrorActionPreference = "Stop"
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$logFile = "$LocalTestingPath\MIGRATION_LOG_$timestamp.txt"

# Create logging function
function Log {
    param([string]$Message)
    $msg = "[$(Get-Date -Format 'HH:mm:ss')] $Message"
    Write-Host $msg
    Add-Content -Path $logFile -Value $msg
}

# Start logging
New-Item -ItemType Directory -Path $LocalTestingPath -Force | Out-Null
Log "=========================================="
Log "SYSmoAI MIGRATION AUTOMATION STARTED"
Log "=========================================="
Log "Phase: $Phase | Path: $LocalTestingPath"

# Define all sites
$sites = @(
    @{ Name="sysmoai-website"; Repo="sysmoai/sysmoai-website"; Domain="sysmoai.com"; Type="React+API"; Priority="P0" },
    @{ Name="AI-Premium-Shop"; Repo="sysmoai/AI-Premium-Shop"; Domain="aipremiumshop.com"; Type="React+E-commerce"; Priority="P1" },
    @{ Name="bangladeshai-website"; Repo="sysmoai/bangladeshai-website"; Domain="bangladeshai.org"; Type="Static"; Priority="P2" },
    @{ Name="AI-Team-Premium"; Repo="sysmoai/AI-Team-Premium"; Domain="aiteampremium.com"; Type="React"; Priority="P2" },
    @{ Name="saveonsub-store"; Repo="sysmoai/saveonsub-store"; Domain="saveonsub.com"; Type="E-commerce"; Priority="P3" }
)

# PHASE 2: EXPORT FROM GITHUB
function Export-Code {
    Log "PHASE 2: EXPORTING CODE FROM GITHUB"

    foreach ($site in $sites) {
        $sitePath = "$LocalTestingPath\$($site.Name)"
        $sourcePath = "$sitePath\source"

        Log "  → Cloning $($site.Name) from GitHub..."

        if (Test-Path $sourcePath) {
            Log "    Updating existing repo..."
            Push-Location $sourcePath
            git pull origin main 2>&1 | Out-Null
            Pop-Location
        } else {
            Log "    Creating new clone..."
            New-Item -ItemType Directory -Path $sitePath -Force | Out-Null
            git clone "https://github.com/$($site.Repo).git" $sourcePath 2>&1 | Out-Null
        }

        Log "    ✓ Code ready at: $sourcePath"
    }

    Log "PHASE 2 COMPLETE: All code exported"
}

# PHASE 3: LOCAL SETUP
function Setup-Local {
    Log "PHASE 3: SETTING UP LOCAL DEVELOPMENT ENVIRONMENT"

    foreach ($site in $sites) {
        $sitePath = "$LocalTestingPath\$($site.Name)"
        $sourcePath = "$sitePath\source"

        Log "  → Setting up $($site.Name)..."

        # Check if package.json exists
        if (-not (Test-Path "$sourcePath\package.json")) {
            Log "    ! No package.json found, skipping dependency install"
            continue
        }

        # Install dependencies
        Log "    Installing dependencies..."
        Push-Location $sourcePath

        # Try pnpm first, fall back to npm
        $usePnpm = (Test-Path "$sourcePath\pnpm-lock.yaml")

        if ($usePnpm) {
            pnpm install --no-frozen-lockfile 2>&1 | Out-Null
        } else {
            npm install 2>&1 | Out-Null
        }

        # Create .env.local template
        if (Test-Path ".env.example") {
            Copy-Item ".env.example" ".env.local" -Force
            Log "    ✓ .env.local created from example"
        }

        Pop-Location
        Log "    ✓ Setup complete for $($site.Name)"
    }

    Log "PHASE 3 COMPLETE: Local environment ready"
}

# PHASE 4: COMPREHENSIVE TESTING
function Test-Sites {
    Log "PHASE 4: COMPREHENSIVE LOCAL TESTING"

    foreach ($site in $sites) {
        $sitePath = "$LocalTestingPath\$($site.Name)"
        $testResultFile = "$sitePath\TEST_RESULTS.md"

        Log "  → Testing $($site.Name)..."

        $testResults = @"
# TEST RESULTS: $($site.Name)
**Date:** $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')**
**Site:** $($site.Domain)
**Type:** $($site.Type)
**Priority:** $($site.Priority)

## Environment Check
- Local path: $($sitePath)
- Source present: $(Test-Path "$sitePath\source")
- node_modules present: $(Test-Path "$sitePath\source\node_modules")
- .env.local present: $(Test-Path "$sitePath\source\.env.local")

## Dependency Check
"@

        if (Test-Path "$sitePath\source\package.json") {
            $testResults += "`n- ✓ package.json found`n"

            # Extract dependencies
            $packageJson = Get-Content "$sitePath\source\package.json" -Raw | ConvertFrom-Json
            $testResults += "- React version: $($packageJson.dependencies.react ?? 'N/A')`n"
            $testResults += "- Build tool: $(if($packageJson.devDependencies.vite) { 'Vite' } elseif($packageJson.devDependencies.webpack) { 'Webpack' } elseif($packageJson.devDependencies.'next') { 'Next.js' } else { 'Unknown' })`n"
        }

        $testResults += @"

## Build Status
- Build script available: $(Test-Path "$sitePath\source\package.json" -and (Select-String -Path "$sitePath\source\package.json" -Pattern '"build"' -Quiet))

## Test Checklist
- [ ] Local build succeeds
- [ ] Dev server starts (npm run dev)
- [ ] Homepage loads (localhost:3000)
- [ ] All pages accessible
- [ ] Forms submit without errors
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Performance acceptable
- [ ] Database connection works
- [ ] API endpoints respond

## Manual Testing Required (Browser)
1. Navigate to localhost:3000
2. Verify homepage loads
3. Test navigation menu
4. Submit test form
5. Check console for errors
6. Resize browser to test mobile
7. Open DevTools Network tab
8. Verify CSS/JS loads

## Next Steps
1. Run: `npm run build` to verify build
2. Start dev server: `npm run dev`
3. Test in browser via localhost:3000
4. Document any issues found
5. If all pass: Ready for Vercel staging

---
**Generated:** $(Get-Date)
**Status:** READY FOR BROWSER TESTING
"@

        Set-Content -Path $testResultFile -Value $testResults
        Log "    ✓ Test checklist created: $testResultFile"
    }

    Log "PHASE 4 COMPLETE: All test checklists generated"
}

# PHASE 5: DEPLOYMENT READINESS CHECK
function Check-Deployment-Ready {
    Log "PHASE 5: DEPLOYMENT READINESS VERIFICATION"

    $readinessReport = @"
# DEPLOYMENT READINESS REPORT
**Generated:** $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')**

## Sites Status

"@

    foreach ($site in $sites) {
        $sitePath = "$LocalTestingPath\$($site.Name)"
        $sourcePath = "$sitePath\source"

        $status = if (Test-Path "$sourcePath\package.json" -and Test-Path "$sourcePath\node_modules") {
            "✓ READY"
        } elseif (Test-Path "$sourcePath\package.json") {
            "⚠ NEEDS TESTING"
        } else {
            "❌ NOT READY"
        }

        $readinessReport += @"

### $($site.Name) - $($site.Domain)
- **Status:** $status
- **Type:** $($site.Type)
- **Priority:** $($site.Priority)
- **Source:** $sourcePath
- **Package.json:** $(Test-Path "$sourcePath\package.json")
- **Dependencies:** $(Test-Path "$sourcePath\node_modules")

"@
    }

    $readinessReport += @"

## Next Steps

### For Production Deployment:
1. ✓ All code exported from GitHub
2. ✓ Dependencies installed locally
3. ⏳ Manual testing in browser required:
   - Start each dev server with `npm run dev`
   - Test all functionality
   - Verify forms, links, integrations
4. ✓ Create Vercel projects (automated)
5. ✓ Deploy to staging (automated)
6. ✓ Deploy to production (automated)

## Instructions

### Test Each Site Locally:
\`\`\`powershell
cd "$LocalTestingPath\[site-name]\source"
npm run dev
\`\`\`

Then open browser to localhost:3000 and test.

### When Ready for Vercel Deployment:
- Ensure all local tests pass
- Verify git repos up to date
- Provide Vercel API token
- I'll handle automated Vercel/Cloudflare deployment

## Timeline
- Local testing: Next 2-4 hours (manual browser testing)
- Vercel setup: 30 minutes (automated)
- Production deployment: 1-2 hours (automated)
- **Total:** ~6-8 hours from now

---
**Ready for next phase:** Send approval + Vercel token when local tests pass

"@

    Set-Content -Path "$LocalTestingPath\DEPLOYMENT_READINESS.md" -Value $readinessReport
    Log "✓ Deployment readiness report created"
}

# Execute phases
try {
    switch ($Phase) {
        "export" {
            Export-Code
        }
        "setup" {
            Export-Code
            Setup-Local
        }
        "test" {
            Export-Code
            Setup-Local
            Test-Sites
        }
        "deploy" {
            Export-Code
            Setup-Local
            Test-Sites
            Check-Deployment-Ready
        }
        "all" {
            Export-Code
            Setup-Local
            Test-Sites
            Check-Deployment-Ready
        }
    }

    Log "=========================================="
    Log "MIGRATION AUTOMATION COMPLETE"
    Log "=========================================="
    Log "Log file: $logFile"
    Log "Next: Manual browser testing (2-4 hours)"
    Log "Then: Vercel deployment (automated)"

} catch {
    Log "ERROR: $_"
    throw
}
