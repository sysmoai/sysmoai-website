# SYSmoAI Stack — Immediate Deployment Guide (26 Jul 2026)

**Goal:** Deploy ALL 7 sites from Replit (expensive) to FREE infrastructure (zero cost)  
**Timeline:** 2-3 hours total (can be parallel)  
**Cost:** $0/month (Vercel free tier: 100GB bandwidth, unlimited builds)

---

## 🚀 FASTEST PATH: Vercel (Recommended)

### Why Vercel?
- ✅ Free tier: 100GB/month bandwidth (plenty)
- ✅ Unlimited deployments
- ✅ Auto-deploy from GitHub (every push)
- ✅ Custom domains
- ✅ Fast preview deployments
- ✅ No cold starts (unlike other serverless)

---

## 📋 STEP 1: GitHub Connection (One-Time, 2 min)

### Manual Steps (5 minutes total)
1. Go to https://vercel.com/signup (create free account if needed)
2. Click "Continue with GitHub"
3. Authorize Vercel access to your GitHub account
4. **Done!** Now Vercel can see all your GitHub repos

---

## 🎯 STEP 2: Deploy Each Site (10 min per site × 7 sites = 70 min)

### Template: Deploy Any App

#### **1. SYSmoAI Website** (sysmoai.com)
```
1. Go to https://vercel.com/new
2. Select repository: sysmoai/sysmoai-website
3. Framework: Auto-detected (Vite)
4. Build Command: cd artifacts/sysmoai-website && pnpm install && pnpm run build
5. Output Directory: artifacts/sysmoai-website/dist/public
6. Environment Variables:
   - VITE_API_URL: (leave empty or set to your API)
   - VITE_SUPABASE_URL: (optional)
   - VITE_SUPABASE_ANON_KEY: (optional)
7. Click "Deploy"
8. Wait 2-3 minutes for build
9. Once deployed, go to "Settings > Domains"
10. Add domain: sysmoai.com (follow Cloudflare DNS setup)
```

**Deployment Link:** https://sysmoai-website.vercel.app (temporary, auto-updated with every push)  
**Live Domain:** https://sysmoai.com (after DNS configured)

---

#### **2. AI Premium Shop** (aipremiumshop.com)
```
1. Go to https://vercel.com/new
2. Select: sysmoai/AI-Premium-Shop
3. Build Command: pnpm install && pnpm run build
4. Click "Deploy"
5. Add domain: aipremiumshop.com
```

**Deployment Link:** https://ai-premium-shop.vercel.app  
**Live Domain:** https://aipremiumshop.com

---

#### **3. Bangladesh AI** (bangladeshai.org)
```
1. Go to https://vercel.com/new
2. Select: sysmoai/bangladeshai-website
3. Deploy
4. Add domain: bangladeshai.org
```

**Deployment Link:** https://bangladeshai-website.vercel.app  
**Live Domain:** https://bangladeshai.org

---

#### **4. AI Team Premium** (aiteampremium.com)
```
1. Go to https://vercel.com/new
2. Select: sysmoai/AI-Team-Premium
3. Deploy
4. Add domain: aiteampremium.com
```

---

#### **5. Kutirchar EcoFarm** (kutirchar-ecofarm.com)
```
1. Go to https://vercel.com/new
2. Select: sysmoai/KutircharEcoFarm (newer version)
3. Deploy
4. Add domain: kutirchar-ecofarm.com
```

---

#### **6. Save On Sub** (saveonsub.com)
```
1. Go to https://vercel.com/new
2. Select: sysmoai/saveonsub-store
3. Deploy
4. Add domain: saveonsub.com
```

---

#### **7. Personal Brand** (emonhossain.pro)
```
1. Go to https://vercel.com/new
2. Select: sysmoai/EMON-HOSSAIN
3. Deploy
4. Add domain: emonhossain.pro
```

---

## 🔗 STEP 3: Configure Custom Domains (5 min per domain)

For each site, add custom domain in Vercel:

1. Vercel Project → Settings → Domains
2. Click "Add"
3. Enter domain (e.g., sysmoai.com)
4. Vercel shows nameservers or CNAME records
5. Go to Cloudflare (already managing your DNS)
6. Update DNS to point to Vercel
7. Wait 5-10 minutes for DNS propagation

**Result:** Your domain points to Vercel (which is free!)

---

## 🗄️ STEP 4: Backend Database (Optional but Recommended)

### If apps need database (forms, authentication, data storage):

#### Option A: Supabase (PostgreSQL) — RECOMMENDED
```
1. Go to https://supabase.com
2. Sign up (free tier)
3. Create new project
4. Get credentials:
   - SUPABASE_URL
   - SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
5. Add to Vercel environment variables (Project Settings > Environment Variables)
6. Push code to GitHub (vercel auto-redeploys with new env vars)
```

**Cost:** $0 (free tier: 500MB storage, unlimited queries)

#### Option B: Firebase (NoSQL) — EASIER
```
1. Go to https://firebase.google.com
2. Create new project
3. Get credentials from Project Settings
4. Add to Vercel environment variables
```

**Cost:** $0 (generous free tier)

---

## ✅ VERIFICATION (Test Each Site)

After deployment, verify each site works:

```bash
# For each deployment
curl https://sysmoai-website.vercel.app | grep -i "transparent"
# Should show page content

# Test forms (if applicable)
# Test payment/WhatsApp integrations

# Check live domain
curl https://sysmoai.com | grep -i "transparent"
```

---

## 📊 PARALLEL DEPLOYMENT CHECKLIST

You can do these simultaneously (in parallel):

- [ ] **Site 1:** SYSmoAI Website
- [ ] **Site 2:** AI Premium Shop
- [ ] **Site 3:** Bangladesh AI
- [ ] **Site 4:** AI Team Premium
- [ ] **Site 5:** Kutirchar EcoFarm
- [ ] **Site 6:** Save On Sub
- [ ] **Site 7:** Personal Brand

Each one:
1. Create Vercel project (3 min)
2. Configure domain (2 min)
3. Wait for build (2-3 min)
4. Verify (1 min)
= **~10 min per site** = **70 minutes total if sequential**
= **15 minutes if done in parallel!** (do all 7 at once)

---

## 🎁 WHAT YOU GET (FREE)

After this setup:

✅ **Zero Replit cost** (save $70/month)  
✅ **7 live sites** deployed and auto-updating  
✅ **100GB/month bandwidth** (more than enough)  
✅ **Automatic deployments** (every GitHub push auto-deploys)  
✅ **Preview deployments** (test branches before pushing to main)  
✅ **SSL certificates** (auto-managed)  
✅ **Global CDN** (fast worldwide)  
✅ **Environment variables** (secret management)  
✅ **Logs and analytics** (built-in)  

**All for $0/month.**

---

## 🔄 FUTURE DEPLOYMENTS

After this one-time setup, deployment is automatic:

```
1. Make changes locally
2. Commit to GitHub
3. Push: git push origin main
4. Vercel auto-detects push
5. Vercel auto-builds
6. Vercel auto-deploys
7. Your site is live (30 seconds)

Zero manual steps!
```

---

## 📞 IF SOMETHING GOES WRONG

**Build fails?**
→ Check Vercel dashboard > Deployments > Failed
→ View logs to see error
→ Fix in code, push again

**Domain not pointing?**
→ Wait 10 minutes for DNS propagation
→ Check Cloudflare DNS records match Vercel

**Forms not submitting?**
→ Check backend connection (Supabase credentials)
→ Check environment variables in Vercel

---

## ⏱️ TIMELINE

| Step | Time | Status |
|------|------|--------|
| GitHub Connection | 2 min | One-time setup |
| Deploy Site 1 | 10 min | Can do in parallel |
| Deploy Site 2 | 10 min | Can do in parallel |
| Deploy Site 3 | 10 min | Can do in parallel |
| ... (all 7 in parallel) | 10 min | All done simultaneously |
| Configure Domains | 5 min per site | 35 min total (parallel OK) |
| **TOTAL** | **~50 min** | **All 7 sites live** |

---

## 💰 COST COMPARISON

### Before (Replit)
- Replit Teams: $70/month
- Database: Included
- **Total:** $70/month

### After (Vercel + Supabase)
- Vercel Free: $0
- Supabase Free: $0
- Resend (email): $0
- GitHub Actions: $0
- **Total:** $0/month

### Annual Savings
**$840/year** ✓

---

## 🎯 NEXT: Autonomous Execution Option

If you want me to execute this autonomously:

**I need:**
1. Vercel token (`VERCEL_TOKEN=...`)
2. Supabase project URL + API keys (if database needed)
3. Cloudflare API token (for DNS automation)

**With these:**
- I'll deploy all 7 sites automatically
- Configure all domains
- Verify everything works
- Give you completion report
- **ETA:** 2 hours

**Just reply with:**
```
Ready for autonomous deployment. Here are my credentials:
VERCEL_TOKEN: [paste token]
```

Or request manual steps above if you prefer.

---

## ✨ RESULT

After following this guide or giving me credentials:

**All 7 SYSmoAI websites live, free, auto-deploying, zero Replit costs.**

Choose your path:
1. **Manual (2 hours):** Follow steps above yourself
2. **Autonomous (1 hour):** Give me credentials, I handle everything
3. **Hybrid (30 min):** You do step 1 (GitHub auth), I do rest

---

*Guide prepared by Claude (CEO AI) | 26 Jul 2026*  
*Ready to execute immediately. Your choice.*
