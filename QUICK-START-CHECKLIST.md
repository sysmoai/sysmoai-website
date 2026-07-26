# QUICK START CHECKLIST - 5 Minutes to Begin

## ✅ BEFORE YOU START - Verify Prerequisites

- [ ] PowerShell available (Windows)
- [ ] Git installed and configured
- [ ] npm or pnpm available
- [ ] Browser ready for testing
- [ ] ~36 hours available for continuous execution
- [ ] Vercel account (create if needed)
- [ ] Cloudflare account (already have)
- [ ] GitHub account with sysmoai organization access

---

## 🚀 START HERE - Execute in This Order

### 1️⃣ RUN AUTOMATION (Exports Code & Sets Up Locally)

**Time: ~5 minutes**

```powershell
# Open PowerShell and run:
C:\Users\emonh\SYSmoAI-Stack\FULL-MIGRATION-AUTOMATION.ps1 -Phase all

# This will:
# ✓ Clone all 5-7 sites from GitHub
# ✓ Install all dependencies
# ✓ Create local test environment
# ✓ Generate test checklists
```

**Check progress:**
```powershell
# View automation log:
Get-Content C:\Users\emonh\SYSmoAI-Stack\local-testing\MIGRATION_LOG_*.txt -Tail 20

# Check if test files created:
ls C:\Users\emonh\SYSmoAI-Stack\local-testing\*/TEST_RESULTS.md
```

---

### 2️⃣ TEST LOCALLY (Browser Testing - 4-6 Hours)

**For each site, run:**

```powershell
cd C:\Users\emonh\SYSmoAI-Stack\local-testing\sysmoai-website\source
npm run dev
```

**Then open browser:** http://localhost:3000

**Test each site** using the checklist:
- [ ] Homepage loads
- [ ] Navigation works
- [ ] Forms appear
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Links work

**Document results:** Edit `TEST_RESULTS.md` for each site

---

### 3️⃣ CREATE VERCEL PROJECTS (30 minutes)

**For each site:**

1. Go to https://vercel.com/new
2. Import GitHub repo: `sysmoai/[repo-name]`
3. Click "Deploy"
4. Wait 2-3 minutes
5. Note staging URL: `https://[site].vercel.app`

**Sites to deploy (in order):**
1. sysmoai-website
2. AI-Premium-Shop
3. bangladeshai-website
4. AI-Team-Premium
5. saveonsub-store

---

### 4️⃣ UPDATE CLOUDFLARE DNS (15 minutes)

**For each domain:**

1. Go to https://dash.cloudflare.com
2. Select domain
3. Update/create CNAME record:
   - Name: @ (for root) or subdomain
   - Type: CNAME
   - Content: `cname.vercel-dns.com`
   - TTL: Auto
   - Proxy: On (orange cloud)

**DNS records to update:**
- sysmoai.com
- aipremiumshop.com
- bangladeshai.org
- aiteampremium.com
- saveonsub.com

---

### 5️⃣ VERIFY LIVE (30 minutes)

**Test each domain:**
- Visit https://sysmoai.com → Should load
- Visit https://aipremiumshop.com → Should load
- Test key features (forms, links, etc)
- Check browser console (F12) for errors

---

### 6️⃣ MONITOR 24 HOURS (Passive)

Just monitor - no action needed:
- [ ] Check Vercel dashboard for errors
- [ ] Monitor Cloudflare analytics
- [ ] Verify no issues in first 24 hours

---

### 7️⃣ DECOMMISSION REPLIT (10 minutes)

When everything is live:

1. Go to https://replit.com/account
2. Archive all workspaces
3. Downgrade from Teams → Hacker (free)
4. **Result: Save $70/month**

---

## 📊 COMPLETE PROCESS MAP

```
START
  ↓
[1] Run automation (5 min)
  ├─ Export code ✓
  ├─ Install dependencies ✓
  └─ Generate tests ✓
  ↓
[2] Local testing (4-6 hr)
  ├─ Test each site locally
  ├─ Fix any issues
  └─ Document results
  ↓
[3] Create Vercel projects (30 min)
  ├─ Import repos (5 x 5 min)
  └─ Get staging URLs
  ↓
[4] Update Cloudflare DNS (15 min)
  └─ Update 5 domains
  ↓
[5] Verify live (30 min)
  └─ Test all domains work
  ↓
[6] Monitor 24 hours (Passive)
  └─ Just watch for errors
  ↓
[7] Decommission Replit (10 min)
  └─ Archive + cancel
  ↓
END - All sites live, free, auto-deploying
```

---

## ⏱️ TOTAL TIMELINE

| Step | Duration | Notes |
|------|----------|-------|
| 1. Automation | 5 min | Runs automatically |
| 2. Local testing | 4-6 hr | Manual browser testing |
| 3. Vercel projects | 30 min | Automated by Vercel |
| 4. Cloudflare DNS | 15 min | Manual DNS update |
| 5. Live verification | 30 min | Manual testing |
| 6. Monitoring | 24 hr | Passive monitoring |
| 7. Cleanup | 10 min | Final decommission |
| **TOTAL** | **~30-36 hr** | **Mostly waiting, some manual work** |

---

## 🎯 SUCCESS METRICS

You're done when:

✅ All 5-7 sites accessible at live domains  
✅ All sites loading without errors  
✅ Forms submitting and working  
✅ Database queries working  
✅ No errors in console (F12)  
✅ Performance acceptable (< 3 sec load)  
✅ 24 hours with no issues  
✅ Replit archived and cancelled  

---

## 🆘 IF SOMETHING BREAKS

**Site not loading:**
- Check Vercel deployment status
- Check Cloudflare DNS (should be CNAME to vercel-dns.com)
- Wait 10 more minutes for DNS propagation
- Clear browser cache (Ctrl+Shift+Del)

**Forms not working:**
- Check database connection (Supabase)
- Check API endpoints
- Review browser console errors
- Check Vercel function logs

**Performance slow:**
- Check Lighthouse score
- Wait for CDN caching
- Monitor from Vercel dashboard

**Need help:**
- Read MASTER-EXECUTION-GUIDE.md
- Check TEST_RESULTS.md for specific site
- Review Vercel/Cloudflare dashboards

---

## 📁 IMPORTANT FILES

Keep these handy:

1. **This file:** QUICK-START-CHECKLIST.md
2. **Main guide:** MASTER-EXECUTION-GUIDE.md
3. **Full plan:** AUTONOMOUS-EXECUTION-PLAN.md
4. **Automation script:** FULL-MIGRATION-AUTOMATION.ps1
5. **Test results:** local-testing/*/TEST_RESULTS.md

---

## 🚀 BEGIN NOW

Ready? Open PowerShell and run:

```powershell
C:\Users\emonh\SYSmoAI-Stack\FULL-MIGRATION-AUTOMATION.ps1 -Phase all
```

**Then follow steps 2-7 in this checklist.**

---

**Status:** Ready for immediate execution  
**Next:** Run automation script above  
**Time to completion:** ~36 hours  
**Result:** All sites live, free, auto-deploying  

