# FableCraft - Documentation Index

Your complete guide to the FableCraft eCommerce platform.

---

## 📚 Documentation Overview

This project includes comprehensive documentation to help you understand, set up, customize, and deploy FableCraft.

---

## 🗂 Document Guide

### 🚀 [QUICKSTART.md](./QUICKSTART.md)
**Read this first!** Get the app running in 5 minutes.
- Installation commands
- Database setup
- Test credentials
- Quick tour of features
- Common commands

**Best for**: First-time users, quick demos

---

### 📖 [README.md](./README.md)
**Main documentation.** Complete overview of the project.
- Feature list and descriptions
- Tech stack details
- Project structure
- Database schema
- UI components
- Code examples
- Testing instructions

**Best for**: Understanding what FableCraft can do

---

### 🛠 [SETUP_GUIDE.md](./SETUP_GUIDE.md)
**Detailed setup instructions.** Step-by-step configuration.
- Prerequisites
- Database options (local, Neon, Supabase)
- Google OAuth setup
- Cloudinary configuration
- OpenAI chatbot integration
- Troubleshooting guide
- Customization tips

**Best for**: Detailed local development setup

---

### 🚢 [DEPLOYMENT.md](./DEPLOYMENT.md)
**Production deployment guide.** Deploy to the cloud.
- Pre-deployment checklist
- GitHub repository setup
- Vercel deployment
- Database hosting (Neon/Supabase)
- Custom domain configuration
- OAuth production setup
- Post-deployment verification
- Performance optimization
- Security hardening

**Best for**: Launching to production

---

### ✅ [FEATURES.md](./FEATURES.md)
**Feature checklist.** What's built and what's planned.
- Completed features (80+)
- Future enhancements
- Feature categories:
  - Authentication
  - Product management
  - Shopping features
  - UI/UX
  - API routes
  - Database
- Statistics and metrics

**Best for**: Understanding project scope and completeness

---

### 📊 [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
**High-level overview.** The complete picture.
- Project status
- Technology stack
- File structure
- Key features
- Getting started
- Demo data
- Deployment readiness
- Project statistics

**Best for**: Presenting the project to others

---

### 🔐 [.env.example](./.env.example)
**Environment variables template.** Configuration reference.
- Database connection
- Authentication secrets
- OAuth credentials
- API keys
- Comments explaining each variable

**Best for**: Setting up environment variables

---

## 🎯 Reading Path by Use Case

### 🆕 New to the Project?
1. Read [QUICKSTART.md](./QUICKSTART.md) - Get it running
2. Browse [README.md](./README.md) - Understand features
3. Check [FEATURES.md](./FEATURES.md) - See what's built

### 🔧 Setting Up Development?
1. Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Detailed setup
2. Check [.env.example](./.env.example) - Configure environment
3. Run through [QUICKSTART.md](./QUICKSTART.md) - Verify setup

### 🚀 Deploying to Production?
1. Read [DEPLOYMENT.md](./DEPLOYMENT.md) - Full deployment guide
2. Review [README.md](./README.md) - Understand architecture
3. Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Database options

### 🎨 Customizing the Project?
1. Review [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - File structure
2. Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Customization section
3. Check [README.md](./README.md) - Component details

### 📊 Presenting the Project?
1. Start with [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Overview
2. Show [FEATURES.md](./FEATURES.md) - What's built
3. Demo using [QUICKSTART.md](./QUICKSTART.md) - Live walkthrough

---

## 📂 Code Documentation

### Key Directories

#### `/app` - Application Code
- `page.tsx` - Landing page
- `layout.tsx` - Root layout
- `api/` - Backend API routes
- `auth/` - Authentication pages
- `dashboard/` - Role-based dashboards
- `products/` - Product pages
- `cart/` - Shopping cart
- `checkout/` - Checkout flow
- `orders/` - Order management
- `map/` - Interactive map

#### `/components` - React Components
- `ui/` - shadcn/ui components
- `navbar.tsx` - Navigation bar
- `footer.tsx` - Footer
- `dashboard-sidebar.tsx` - Sidebar navigation
- `product-card.tsx` - Product display
- `chatbot.tsx` - AI chatbot
- `map-component.tsx` - Leaflet map
- `providers.tsx` - App providers

#### `/lib` - Utilities
- `auth.ts` - NextAuth configuration
- `prisma.ts` - Database client
- `utils.ts` - Helper functions

#### `/prisma` - Database
- `schema.prisma` - Database schema
- `seed.ts` - Demo data script

---

## 🔑 Key Concepts

### Role-Based System
- **Artisan**: Upload and manage products
- **Buyer**: Browse, purchase, track orders
- Separate dashboards and permissions

### Authentication Flow
1. Sign up with role selection
2. Login (credentials or OAuth)
3. Session stored as JWT
4. Role included in all requests

### Product Lifecycle
1. Artisan uploads product
2. Product appears in browse page
3. Buyers can view and purchase
4. Orders tracked in dashboard

### Shopping Flow
1. Browse → Filter → Search
2. Product detail → Add to cart
3. Cart → Checkout
4. Order confirmation → History

---

## 🛠 Technical Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- React Leaflet

### Backend
- Next.js API Routes
- NextAuth.js
- Prisma ORM
- PostgreSQL

### State Management
- TanStack Query (React Query)
- React hooks

### Deployment
- Vercel (frontend)
- Neon.tech/Supabase (database)

---

## 📝 Code Style

### TypeScript
- Strict mode enabled
- Type definitions in `/types`
- Props interfaces defined

### React
- Functional components
- Hooks-based state
- Server/Client component split

### Naming Conventions
- Components: PascalCase
- Files: kebab-case
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE

### Comments
- Complex logic explained
- API routes documented
- Database models annotated

---

## 🧪 Testing

### Manual Testing
Test credentials in [QUICKSTART.md](./QUICKSTART.md)

### Feature Testing
Checklist in [FEATURES.md](./FEATURES.md)

### Production Testing
Verification steps in [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🔧 Common Tasks

### Add New Feature
1. Plan in [FEATURES.md](./FEATURES.md)
2. Update database schema
3. Create API route
4. Build UI components
5. Test and document

### Fix Bug
1. Reproduce issue
2. Check relevant documentation
3. Review code comments
4. Fix and test
5. Update docs if needed

### Update Dependencies
```bash
npm update
npm audit fix
```

### Database Changes
```bash
npx prisma migrate dev --name description
npx prisma generate
```

---

## 📊 Project Statistics

- **Total Files**: 75+
- **Lines of Code**: 5,000+
- **Features**: 80+
- **Pages**: 15+
- **API Routes**: 10+
- **Components**: 20+
- **Database Models**: 7
- **Documentation**: 8 files

---

## 🎓 Learning Resources

### Next.js
- [Official Docs](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)

### Prisma
- [Documentation](https://www.prisma.io/docs)
- [Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)

### NextAuth.js
- [Documentation](https://next-auth.js.org)
- [Configuration](https://next-auth.js.org/configuration/options)

### React Query
- [TanStack Query Docs](https://tanstack.com/query/latest)

### Tailwind CSS
- [Documentation](https://tailwindcss.com/docs)

### shadcn/ui
- [Component Library](https://ui.shadcn.com)

---

## 🆘 Getting Help

### Issues?
1. Check troubleshooting in [SETUP_GUIDE.md](./SETUP_GUIDE.md)
2. Review error messages
3. Check relevant documentation
4. Search online for specific errors

### Questions?
1. Read through documentation
2. Check code comments
3. Review examples in files
4. Consult official docs (links above)

---

## 🚀 Quick Links

| Document | Purpose | Read Time |
|----------|---------|-----------|
| [QUICKSTART.md](./QUICKSTART.md) | Get running fast | 5 min |
| [README.md](./README.md) | Main documentation | 15 min |
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | Detailed setup | 20 min |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Deploy to production | 30 min |
| [FEATURES.md](./FEATURES.md) | Feature checklist | 10 min |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Project overview | 10 min |

---

## ✅ Documentation Checklist

This project includes:
- [x] Quick start guide
- [x] Comprehensive README
- [x] Detailed setup instructions
- [x] Deployment guide
- [x] Feature documentation
- [x] Project summary
- [x] Environment template
- [x] This index document

---

## 🎉 You're All Set!

You now have complete documentation for:
- **Understanding** the project
- **Setting up** locally
- **Deploying** to production
- **Customizing** features
- **Maintaining** the codebase

**Start with**: [QUICKSTART.md](./QUICKSTART.md)

---

**FableCraft Documentation v1.0**  
**Last Updated**: November 3, 2025  
**Status**: ✅ Complete

