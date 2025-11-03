# FableCraft - Quick Start Guide

Get FableCraft running in 5 minutes! ⚡

---

## 🚀 Installation (2 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env
```

Edit `.env` with your database URL:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fablecraft"
NEXTAUTH_SECRET="run-this-command: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
```

---

## 🗄 Database Setup (2 minutes)

```bash
# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma migrate dev

# Add demo data (2 artisans, 1 buyer, 6 products)
npm run prisma:seed
```

---

## 🎮 Run the App (1 minute)

```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## 🔑 Test Credentials

### Artisan Account
- **Email**: `maya.bali@example.com`
- **Password**: `password123`
- **Features**: Upload products, manage inventory, view sales

### Buyer Account
- **Email**: `john.doe@example.com`
- **Password**: `password123`
- **Features**: Browse products, add to cart, checkout, view orders

---

## 🎯 Quick Tour

### 1. Landing Page
- Beautiful hero section
- Feature showcase
- Shop by region
- About section

### 2. Sign In (use credentials above)
- Try both artisan and buyer accounts
- See role-based dashboards

### 3. As Artisan
- Go to Dashboard → My Products
- Click "Add Product" to upload new items
- Edit or delete existing products
- View sales statistics

### 4. As Buyer
- Browse Products (filter by region/price)
- Click on a product to see details and story
- Add to Cart
- Go to Checkout
- Simulate payment
- View order in My Orders

### 5. Interactive Map
- Click "Map" in navbar
- See products plotted by location
- Click markers to view product info

### 6. AI Chatbot
- Click the chat bubble (bottom right)
- Ask questions like:
  - "What is FableCraft?"
  - "How to order?"
  - "How to become an artisan?"

---

## 🛠 Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npx prisma studio        # Open database GUI
npx prisma generate      # Regenerate Prisma client
npx prisma migrate dev   # Create new migration
npm run prisma:seed      # Reseed database

# Utilities
npm run lint             # Check code quality
```

---

## 📁 Key Files to Explore

```
FableCraft/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── dashboard/page.tsx          # Dashboard home
│   ├── products/page.tsx           # Browse products
│   └── api/                        # Backend API routes
├── components/
│   ├── navbar.tsx                  # Navigation
│   ├── product-card.tsx            # Product display
│   └── chatbot.tsx                 # AI chat
├── prisma/
│   ├── schema.prisma               # Database schema
│   └── seed.ts                     # Demo data
└── lib/
    └── auth.ts                     # Authentication config
```

---

## 🎨 Customization Quick Tips

### Change Site Name
Edit `components/navbar.tsx` and `app/page.tsx`

### Add More Products
Edit `prisma/seed.ts` and run `npm run prisma:seed`

### Modify Colors
Edit `app/globals.css` (CSS variables)

### Add New Pages
Create file in `app/` directory (Next.js App Router)

---

## 🐛 Troubleshooting

### Can't connect to database?
```bash
# Check PostgreSQL is running
brew services start postgresql@15  # macOS
sudo service postgresql start      # Linux

# Test connection
psql postgres
```

### Port 3000 in use?
```bash
# Kill process
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Prisma errors?
```bash
# Reset everything
npx prisma migrate reset
npx prisma generate
npm run prisma:seed
```

---

## 📚 Full Documentation

For detailed guides, see:
- **README.md** - Complete feature list
- **SETUP_GUIDE.md** - Detailed setup instructions
- **FEATURES.md** - Feature checklist
- **DEPLOYMENT.md** - Production deployment guide
- **PROJECT_SUMMARY.md** - Project overview

---

## 🎓 Learning Path

1. **Start Simple**: Test with demo accounts
2. **Explore Code**: Check out key files above
3. **Modify**: Change colors, text, add features
4. **Deploy**: Use DEPLOYMENT.md guide
5. **Extend**: Add reviews, wishlist, etc.

---

## ✅ Success Checklist

After following this guide, you should:
- [x] Have app running on http://localhost:3000
- [x] See landing page with hero section
- [x] Login as artisan and buyer
- [x] See 6 demo products
- [x] Add product to cart and checkout
- [x] View products on interactive map
- [x] Chat with AI chatbot

---

## 🆘 Need Help?

1. Check troubleshooting section above
2. Review error messages carefully
3. Check the full documentation files
4. Google the specific error
5. Check GitHub issues

---

## 🎉 You're Ready!

**Congratulations!** FableCraft is running. 

**What to do next:**
- Explore the app with demo accounts
- Read the feature documentation
- Customize to your needs
- Deploy to production

---

**Total Setup Time**: ~5 minutes  
**Status**: ✅ Ready to use  
**Next**: Explore and customize!

---

**Happy crafting! 🎨✨**

