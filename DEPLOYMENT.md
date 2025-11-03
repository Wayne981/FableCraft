# FableCraft Deployment Guide

Complete guide to deploy FableCraft to production.

---

## 🚀 Deployment Overview

**Recommended Stack:**
- **Frontend**: Vercel
- **Database**: Neon.tech or Supabase
- **Domain**: Custom domain (optional)

**Estimated Time**: 30 minutes

---

## ✅ Pre-Deployment Checklist

### Code Preparation
- [ ] All features tested locally
- [ ] Environment variables documented
- [ ] Database schema finalized
- [ ] Seed data working
- [ ] No console errors
- [ ] Build succeeds locally (`npm run build`)
- [ ] Code committed to Git

### Requirements
- [ ] GitHub account
- [ ] Vercel account
- [ ] Database hosting account (Neon.tech/Supabase)
- [ ] Domain name (optional)
- [ ] Google OAuth credentials (optional)

---

## 📦 Step 1: Prepare Code Repository

### 1.1 Initialize Git (if not done)
```bash
git init
git add .
git commit -m "Initial commit - FableCraft v1.0"
```

### 1.2 Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Name: `fablecraft`
4. Make it Public or Private
5. Don't initialize with README (we have one)
6. Create repository

### 1.3 Push Code
```bash
git remote add origin https://github.com/yourusername/fablecraft.git
git branch -M main
git push -u origin main
```

---

## 🗄 Step 2: Set Up Production Database

### Option A: Neon.tech (Recommended)

**1. Create Account**
- Go to [neon.tech](https://neon.tech)
- Sign up with GitHub

**2. Create Project**
- Click "Create Project"
- Name: `fablecraft-production`
- Region: Choose closest to your users
- PostgreSQL version: 15 (default)

**3. Get Connection String**
- Click on project
- Go to "Connection Details"
- Copy "Connection string"
- Example: `postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb`

**4. Run Migrations**
```bash
# Set environment variable temporarily
export DATABASE_URL="your-neon-connection-string"

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed data (optional for production)
npm run prisma:seed
```

### Option B: Supabase

**1. Create Account**
- Go to [supabase.com](https://supabase.com)
- Sign up

**2. Create Project**
- Click "New Project"
- Name: `fablecraft-production`
- Database password: (save this!)
- Region: Choose closest to users

**3. Get Connection String**
- Go to Project Settings → Database
- Copy "Connection pooling" URL
- Example: `postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`

**4. Run Migrations**
```bash
export DATABASE_URL="your-supabase-connection-string"
npx prisma generate
npx prisma migrate deploy
npm run prisma:seed
```

---

## 🌐 Step 3: Deploy to Vercel

### 3.1 Create Vercel Account
- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub

### 3.2 Import Project
1. Click "Add New..." → "Project"
2. Import your GitHub repository
3. Select `fablecraft`

### 3.3 Configure Build Settings
Vercel auto-detects Next.js. Verify:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 3.4 Add Environment Variables
Click "Environment Variables" and add:

```env
DATABASE_URL=your-production-database-url
NEXTAUTH_SECRET=your-secure-secret-32-chars-min
NEXTAUTH_URL=https://your-domain.vercel.app
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

**Optional Variables:**
```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
```

### 3.5 Deploy
1. Click "Deploy"
2. Wait for deployment (2-3 minutes)
3. You'll get a URL like: `fablecraft.vercel.app`

---

## 🔐 Step 4: Configure Google OAuth (Optional)

### 4.1 Update OAuth Redirect URLs
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to your OAuth credentials
3. Add Authorized redirect URIs:
   ```
   https://your-domain.vercel.app/api/auth/callback/google
   ```

### 4.2 Update Vercel Environment Variables
1. Go to Vercel project settings
2. Update `NEXTAUTH_URL` to your production URL
3. Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
4. Redeploy (Vercel → Deployments → Redeploy)

---

## 🌍 Step 5: Custom Domain (Optional)

### 5.1 Add Domain in Vercel
1. Go to Project Settings → Domains
2. Add your domain (e.g., `fablecraft.com`)
3. Follow DNS configuration instructions

### 5.2 Update DNS
Add these records at your domain registrar:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 5.3 Update Environment Variables
Update `NEXTAUTH_URL` to your custom domain:
```env
NEXTAUTH_URL=https://fablecraft.com
```

### 5.4 Update OAuth Redirect
Add custom domain to Google OAuth redirects:
```
https://fablecraft.com/api/auth/callback/google
```

---

## ✅ Step 6: Post-Deployment Verification

### 6.1 Test Core Functionality
- [ ] Landing page loads
- [ ] Sign up with credentials
- [ ] Sign in with Google OAuth
- [ ] Upload product (as artisan)
- [ ] Browse products
- [ ] Add to cart
- [ ] Checkout flow
- [ ] View orders
- [ ] Interactive map works
- [ ] Chatbot opens and responds
- [ ] Dark/Light mode toggle

### 6.2 Check Performance
- [ ] Run [Lighthouse](https://pagespeed.web.dev/)
- [ ] Target scores: 90+ Performance, 100 Accessibility
- [ ] Check mobile responsiveness

### 6.3 Security Check
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Environment variables not exposed
- [ ] API routes require authentication
- [ ] CORS configured correctly

---

## 🎯 Step 7: Monitor and Maintain

### Vercel Analytics
1. Go to Vercel project
2. Enable Analytics
3. Monitor traffic and performance

### Database Monitoring
**Neon.tech:**
- Dashboard → Usage
- Monitor connections and queries

**Supabase:**
- Dashboard → Database
- Check health and usage

### Error Tracking (Optional)
Consider adding:
- **Sentry** for error tracking
- **LogRocket** for session replay
- **Datadog** for APM

---

## 🔄 Continuous Deployment

### Automatic Deployments
Every push to `main` triggers deployment:
```bash
git add .
git commit -m "Update feature"
git push origin main
# Vercel automatically deploys
```

### Preview Deployments
Create a branch for testing:
```bash
git checkout -b feature/new-feature
# Make changes
git push origin feature/new-feature
# Vercel creates preview URL
```

---

## 🐛 Troubleshooting

### Build Fails
**Error**: `Module not found`
```bash
# Locally test build
npm run build

# Check dependencies
npm install

# Commit and push
git add package-lock.json
git commit -m "Fix dependencies"
git push
```

### Database Connection Issues
**Error**: `Can't reach database`
- Check `DATABASE_URL` is correct
- Verify database is running
- Check IP allowlist (Supabase)
- Try direct connection string (not pooler)

### OAuth Errors
**Error**: `Redirect URI mismatch`
- Verify redirect URI in Google Console
- Check `NEXTAUTH_URL` matches production domain
- Wait 5 minutes for DNS propagation

### Missing Environment Variables
**Error**: `NEXTAUTH_SECRET` not defined
- Go to Vercel → Settings → Environment Variables
- Add missing variables
- Redeploy

---

## 📊 Performance Optimization

### After Deployment

**1. Enable Vercel Analytics**
```bash
npm install @vercel/analytics
```

**2. Add Image Domains**
In `next.config.js`:
```js
images: {
  domains: [
    'res.cloudinary.com',
    'images.unsplash.com',
    'your-custom-domain.com'
  ],
}
```

**3. Enable Compression**
Already enabled by Vercel (gzip/brotli)

**4. Set Cache Headers**
Vercel automatically caches static assets

---

## 🔒 Security Hardening

### Production Checklist
- [ ] Use strong `NEXTAUTH_SECRET` (32+ characters)
- [ ] Enable HTTPS only (automatic with Vercel)
- [ ] Restrict CORS if needed
- [ ] Rate limit API routes (consider Upstash)
- [ ] Validate all user inputs
- [ ] Use parameterized queries (Prisma does this)
- [ ] Keep dependencies updated
- [ ] Monitor for vulnerabilities

### Update Dependencies
```bash
npm audit
npm audit fix
npm update
```

---

## 📱 Mobile Testing

Test on real devices:
- iOS Safari
- Android Chrome
- Tablet (iPad/Android)

Or use browser dev tools:
- Chrome DevTools (F12) → Toggle device toolbar
- Test different screen sizes

---

## 🎓 What's Next?

### Immediate
1. ✅ Deploy to production
2. ✅ Test all features
3. ✅ Monitor for errors
4. ✅ Share with users

### Short Term
- Add real payment gateway
- Implement email notifications
- Add product reviews
- Enhance chatbot with AI

### Long Term
- Mobile app (React Native)
- Advanced analytics
- Multi-language support
- Marketplace expansion

---

## 📞 Support Resources

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Neon Docs**: [neon.tech/docs](https://neon.tech/docs)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Prisma Docs**: [prisma.io/docs](https://prisma.io/docs)

---

## ✅ Deployment Complete!

Your FableCraft application is now live! 🎉

**Production URL**: `https://your-domain.vercel.app`

**Next Steps**:
1. Test all features
2. Share with users
3. Gather feedback
4. Iterate and improve

---

**Happy deploying! 🚀**

