# 🚀 Vercel Deployment Guide

Your code is now on GitHub! Follow these steps to deploy to Vercel:

## Step 1: Go to Vercel

Visit: https://vercel.com/new

## Step 2: Import Your Repository

1. Click **"Add New Project"** or **"Import Project"**
2. Select **"Import Git Repository"**
3. Find and select: **`joet365/Absoluteroofing`**
4. Click **"Import"**

## Step 3: Configure Project

### Project Settings:
- **Framework Preset:** Next.js (should auto-detect)
- **Root Directory:** `./` (leave as default)
- **Build Command:** `npm run build` (auto-filled)
- **Output Directory:** `.next` (auto-filled)

### Environment Variables (Optional):

If you want to use the Google Places API for live reviews, add:

```
GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

**Note:** If you don't add this, the site will use mock review data (no cost).

## Step 4: Deploy!

Click **"Deploy"** button

Vercel will:
- ✅ Install dependencies
- ✅ Build your Next.js app
- ✅ Deploy to production
- ✅ Give you a live URL (e.g., `absoluteroofing.vercel.app`)

## Step 5: Custom Domain (Optional)

After deployment, you can add a custom domain:

1. Go to your project settings
2. Click **"Domains"**
3. Add your domain (e.g., `absoluteroofingsolutions.com`)
4. Follow DNS configuration instructions

---

## 🎯 Expected Result

Your site will be live at:
- **Vercel URL:** `https://absoluteroofing.vercel.app` (or similar)
- **Custom Domain:** (if you configure one)

## 📱 Features Included

✅ Mobile responsive design
✅ Sticky mobile call bar
✅ Google Reviews section
✅ Certifications showcase
✅ Click-to-call functionality
✅ Professional footer
✅ SEO optimized

---

## 🔧 Troubleshooting

**Build fails?**
- Check the build logs in Vercel dashboard
- Most common issue: Missing environment variables

**Site looks broken?**
- Clear your browser cache
- Check if CSS is loading properly

**Need help?**
- Vercel has excellent docs: https://vercel.com/docs
- Or let me know and I'll help debug!

---

## 🎉 You're Done!

Once deployed, share the link and start getting customers! 📞
