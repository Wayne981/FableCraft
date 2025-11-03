# FableCraft Setup Guide

Complete step-by-step guide to get FableCraft running locally.

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **PostgreSQL** database (local installation or cloud service)
- **Git** installed
- Code editor (VS Code recommended)

## 🚀 Quick Start (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Environment Variables
Create a `.env` file in the root directory:

```env
# Minimal configuration for local development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fablecraft"
NEXTAUTH_SECRET="your-secret-key-min-32-chars-long"
NEXTAUTH_URL="http://localhost:3000"
```

Generate a secure `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

### Step 3: Set Up Database
```bash
# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma migrate dev

# Seed with demo data
npm run prisma:seed
```

### Step 4: Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Step 5: Test the App
Use these credentials to log in:
- **Artisan**: `maya.bali@example.com` / `password123`
- **Buyer**: `john.doe@example.com` / `password123`

---

## 🗄 Database Setup Options

### Option 1: Local PostgreSQL

**Install PostgreSQL:**
- **macOS**: `brew install postgresql@15`
- **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/)
- **Linux**: `sudo apt-get install postgresql`

**Start PostgreSQL:**
```bash
# macOS
brew services start postgresql@15

# Linux
sudo service postgresql start
```

**Create Database:**
```bash
psql postgres
CREATE DATABASE fablecraft;
\q
```

**Connection String:**
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fablecraft"
```

### Option 2: Neon.tech (Recommended for Cloud)

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Copy the connection string
4. Add to `.env`:
```
DATABASE_URL="postgresql://user:pass@host.neon.tech/neondb?sslmode=require"
```

### Option 3: Supabase

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Go to Project Settings → Database
4. Copy the connection string (use "Connection pooling" URL)
5. Add to `.env`

---

## 🔐 Authentication Setup

### Basic Authentication (Email/Password)
Already configured! Just use the credentials above.

### Google OAuth (Optional)

**1. Create Google Cloud Project**
- Go to [Google Cloud Console](https://console.cloud.google.com)
- Create new project or select existing
- Enable "Google+ API"

**2. Create OAuth Credentials**
- Go to "Credentials" → "Create Credentials" → "OAuth Client ID"
- Application type: "Web application"
- Authorized redirect URIs:
  - Development: `http://localhost:3000/api/auth/callback/google`
  - Production: `https://yourdomain.com/api/auth/callback/google`

**3. Add to `.env`**
```env
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

---

## 🖼 Image Upload Setup (Optional)

By default, products use direct image URLs. To enable Cloudinary uploads:

**1. Create Cloudinary Account**
- Sign up at [cloudinary.com](https://cloudinary.com)
- Go to Dashboard

**2. Add to `.env`**
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

**3. Implement Upload Widget**
- Install: `npm install cloudinary`
- Create upload component (example in docs)

---

## 🤖 Enhanced Chatbot (Optional)

To enable AI-powered chatbot responses:

**1. Get OpenAI API Key**
- Sign up at [platform.openai.com](https://platform.openai.com)
- Create API key

**2. Add to `.env`**
```env
OPENAI_API_KEY="sk-your-openai-key"
```

**3. Implement in Chatbot**
- Update `components/chatbot.tsx`
- Use OpenAI API for dynamic responses

---

## 📦 Understanding the File Structure

```
FableCraft/
├── app/                    # Next.js App Router
│   ├── api/               # Backend API routes
│   ├── auth/              # Auth pages
│   ├── dashboard/         # Role-based dashboards
│   ├── products/          # Product pages
│   └── ...
├── components/            # React components
├── lib/                   # Utilities and config
├── prisma/                # Database schema
└── ...
```

---

## 🎨 Customization

### Change Color Scheme
Edit `app/globals.css` to modify the color variables:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  /* ... more variables */
}
```

### Add New Features
1. Create new page in `app/`
2. Add API route in `app/api/`
3. Update Prisma schema if needed
4. Run `npx prisma migrate dev`

---

## 🐛 Troubleshooting

### Database Connection Error
```
Error: Can't reach database server
```
**Solution**: 
- Check PostgreSQL is running
- Verify DATABASE_URL is correct
- Try: `psql $DATABASE_URL` to test connection

### Prisma Migration Failed
```
Error: P3009 migrations failed
```
**Solution**:
```bash
npx prisma migrate reset
npx prisma migrate dev
npm run prisma:seed
```

### NextAuth Session Error
```
Error: NEXTAUTH_SECRET missing
```
**Solution**:
- Ensure `.env` has `NEXTAUTH_SECRET`
- Generate new one: `openssl rand -base64 32`

### Port 3000 Already in Use
**Solution**:
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Module Not Found Error
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Add environment variables (all from `.env`)
- Deploy

3. **Update OAuth Redirect URLs**
- Add production URL to Google OAuth settings
- Update `NEXTAUTH_URL` in Vercel environment variables

### Deploy Database

**Using Neon.tech:**
1. Database already hosted
2. Run migrations:
```bash
DATABASE_URL="your-neon-url" npx prisma migrate deploy
DATABASE_URL="your-neon-url" npm run prisma:seed
```

---

## 📊 Performance Optimization

### Enable Image Optimization
In `next.config.js`:
```js
images: {
  domains: ['res.cloudinary.com', 'images.unsplash.com'],
  formats: ['image/avif', 'image/webp'],
}
```

### Add Caching
- React Query already implements caching
- Add Redis for API route caching (optional)

### Optimize Database Queries
```bash
# Analyze slow queries
npx prisma studio
```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Sign up as Artisan and Buyer
- [ ] Upload product as Artisan
- [ ] Browse and filter products
- [ ] Add product to cart
- [ ] Complete checkout
- [ ] View order history
- [ ] Test map with product markers
- [ ] Test chatbot interactions
- [ ] Test dark/light mode toggle

### Automated Testing (Optional)
```bash
# Install testing libraries
npm install --save-dev @testing-library/react @testing-library/jest-dom jest

# Run tests
npm test
```

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

---

## 🆘 Getting Help

- Check the [README.md](./README.md) for feature documentation
- Review error messages carefully
- Search GitHub issues
- Check Next.js/Prisma documentation

---

**You're all set! Happy coding! 🎉**

