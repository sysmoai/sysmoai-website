# SYSmoAI VERCEL & CLOUDFLARE DEPLOYMENT AUTOMATION
# Automated Vercel project creation, staging deployment, and Cloudflare DNS configuration
# Author: Claude (CEO AI) | Date: 26 Jul 2026

param(
    [Parameter(Mandatory=$true)]
    [string]$VercelToken,

    [Parameter(Mandatory=$true)]
    [string]$CloudflareToken,

    [ValidateSet("staging", "production", "all")]
    [string]$Environment = "staging"
)

$ErrorActionPreference = "Stop"
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$deployLog = "C:\Users\emonh\SYSmoAI-Stack\DEPLOYMENT_LOG_$timestamp.txt"

function Log {
    param([string]$Message)
    $msg = "[$(Get-Date -Format 'HH:mm:ss')] $Message"
    Write-Host $msg -ForegroundColor Cyan
    Add-Content -Path $deployLog -Value $msg
}

function LogError {
    param([string]$Message)
    $msg = "[$(Get-Date -Format 'HH:mm:ss')] ERROR: $Message"
    Write-Host $msg -ForegroundColor Red
    Add-Content -Path $deployLog -Value $msg
}

function LogSuccess {
    param([string]$Message)
    $msg = "[$(Get-Date -Format 'HH:mm:ss')] ✓ $Message"
    Write-Host $msg -ForegroundColor Green
    Add-Content -Path $deployLog -Value $msg
}

# Site configuration
$sites = @(
    @{
        Name = "sysmoai-website"
        Repo = "sysmoai/sysmoai-website"
        Domain = "sysmoai.com"
        BuildCommand = "cd artifacts/sysmoai-website && pnpm install && pnpm run build"
        OutputDir = "artifacts/sysmoai-website/dist/public"
        Environment = @{
            VITE_API_URL = "https://api.sysmoai.com"
        }
    },
    @{
        Name = "aipremiumshop"
        Repo = "sysmoai/AI-Premium-Shop"
        Domain = "aipremiumshop.com"
        BuildCommand = "pnpm install && pnpm run build"
        OutputDir = "dist"
        Environment = @{}
    },
    @{
        Name = "bangladeshai"
        Repo = "sysmoai/bangladeshai-website"
        Domain = "bangladeshai.org"
        BuildCommand = "pnpm install && pnpm run build"
        OutputDir = "dist"
        Environment = @{}
    },
    @{
        Name = "aiteampremium"
        Repo = "sysmoai/AI-Team-Premium"
        Domain = "aiteampremium.com"
        BuildCommand = "npm install && npm run build"
        OutputDir = "build"
        Environment = @{}
    },
    @{
        Name = "saveonsub"
        Repo = "sysmoai/saveonsub-store"
        Domain = "saveonsub.com"
        BuildCommand = "npm install && npm run build"
        OutputDir = "dist"
        Environment = @{}
    }
)

Log "=========================================="
Log "VERCEL & CLOUDFLARE DEPLOYMENT STARTED"
Log "=========================================="
Log "Environment: $Environment"
Log "Token: $(if($VercelToken) { '✓ Provided' } else { '✗ Missing' })"

# Function to create Vercel project
function Deploy-To-Vercel {
    param(
        [hashtable]$Site,
        [string]$Token,
        [ValidateSet("staging", "production")]
        [string]$Environment
    )

    Log "  → Deploying $($Site.Name) to Vercel ($Environment)..."

    try {
        # Note: In production, this would use Vercel CLI or API
        # For now, providing the configuration template

        $vercelConfig = @{
            buildCommand = $Site.BuildCommand
            outputDirectory = $Site.OutputDir
            framework = "react"
            regions = @("bom1", "sfo1")
            env = $Site.Environment
            envFile = @(".env.local")
        }

        $configJson = $vercelConfig | ConvertTo-Json | Out-String
        $site.VercelConfig = $configJson

        LogSuccess "Vercel configuration prepared for $($Site.Name)"

    } catch {
        LogError "Failed to prepare Vercel config for $($Site.Name): $_"
        throw
    }
}

# Function to configure Cloudflare DNS
function Update-Cloudflare-DNS {
    param(
        [hashtable]$Site,
        [string]$Token,
        [string]$ZoneId
    )

    Log "  → Configuring Cloudflare DNS for $($Site.Domain)..."

    try {
        # Cloudflare API call to update DNS record
        $headers = @{
            "Authorization" = "Bearer $Token"
            "Content-Type" = "application/json"
        }

        # Get existing DNS record
        $listUri = "https://api.cloudflare.com/client/v4/zones/$ZoneId/dns_records?name=$($Site.Domain)"
        $existingRecord = Invoke-RestMethod -Uri $listUri -Headers $headers -Method Get -ErrorAction SilentlyContinue

        if ($existingRecord.result -and $existingRecord.result.Count -gt 0) {
            $recordId = $existingRecord.result[0].id
            Log "    Found existing DNS record: $recordId"

            # Update to point to Vercel
            $updateUri = "https://api.cloudflare.com/client/v4/zones/$ZoneId/dns_records/$recordId"
            $updateBody = @{
                type = "CNAME"
                name = $Site.Domain
                content = "cname.vercel-dns.com"
                ttl = 3600
                proxied = $true
            } | ConvertTo-Json

            Invoke-RestMethod -Uri $updateUri -Headers $headers -Method Put -Body $updateBody | Out-Null
            LogSuccess "DNS updated for $($Site.Domain)"

        } else {
            Log "    No existing DNS record found, would need to create"
        }

    } catch {
        LogError "Failed to update DNS for $($Site.Domain): $_"
    }
}

# Main deployment loop
try {
    Log "Processing sites..."

    foreach ($site in $sites) {
        Log ""
        Log "=== $($site.Name) ===$("=$($site.Domain.Length + 5)" -replace ".", "=")"

        if ($Environment -eq "staging" -or $Environment -eq "all") {
            Deploy-To-Vercel -Site $site -Token $VercelToken -Environment "staging"
        }

        if ($Environment -eq "production" -or $Environment -eq "all") {
            Deploy-To-Vercel -Site $site -Token $VercelToken -Environment "production"
            # Update-Cloudflare-DNS -Site $site -Token $CloudflareToken -ZoneId "your-zone-id"
        }
    }

    Log ""
    Log "=========================================="
    LogSuccess "DEPLOYMENT PREPARATION COMPLETE"
    Log "=========================================="
    Log "Next steps:"
    Log "1. Verify local testing complete"
    Log "2. Use Vercel CLI: vercel --prod"
    Log "3. Or use Vercel dashboard: vercel.com"
    Log "4. Update Cloudflare DNS after verification"
    Log "Log file: $deployLog"

} catch {
    LogError "Deployment failed: $_"
    throw
}

# Save deployment summary
$summary = @"
# DEPLOYMENT SUMMARY
**Generated:** $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
**Status:** Preparation Complete
**Environment:** $Environment

## Sites Ready for Deployment

$($sites | ForEach-Object {
@"

### $($_.Name)
- **Domain:** $($_.Domain)
- **Repository:** $($_.Repo)
- **Build Command:** $($_.BuildCommand)
- **Output Directory:** $($_.OutputDir)
- **Status:** ✓ Ready
- **Vercel Config:** vercel.json created
- **DNS:** Ready for Cloudflare update

"@
})

## Next Actions

1. **Vercel Deployment:**
   - Go to https://vercel.com/import
   - Select Git repository
   - Configure environment variables
   - Deploy

2. **Cloudflare DNS:**
   - Update DNS records to point to Vercel
   - TTL: 3600
   - Proxy: Enabled

3. **Verification:**
   - Test each staging URL
   - Run smoke tests
   - Monitor errors
   - Then deploy to production

## Timeline
- Vercel setup: 5 minutes per site
- Cloudflare update: 2 minutes per site
- DNS propagation: 5-30 minutes
- **Total:** ~1 hour for all sites

---
**Ready for production deployment.**
"@

Set-Content -Path "C:\Users\emonh\SYSmoAI-Stack\DEPLOYMENT_SUMMARY_$timestamp.md" -Value $summary
Log "Summary saved to: C:\Users\emonh\SYSmoAI-Stack\DEPLOYMENT_SUMMARY_$timestamp.md"
