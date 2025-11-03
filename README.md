# FableCraft - Artisan Marketplace

A modern eCommerce platform connecting artisans with customers worldwide. Discover authentic handmade and cultural products with rich stories behind them.

## 🌟 Features

### Core Features
- **Dual Role System**: Separate experiences for Artisans (sellers) and Buyers
- **Authentication**: NextAuth.js with Google OAuth and credentials
- **Product Management**: Full CRUD operations for artisans
- **Interactive Map**: Explore products by geographic location using React Leaflet
- **Shopping Cart**: Add products, manage quantities, and checkout
- **Order Management**: Track order history and status
- **Product Stories**: Each product includes the artisan's story and cultural significance
- **AI Chatbot**: Predefined responses for common questions
- **Search & Filters**: Filter by region, price range, and search by name
- **Responsive Design**: Beautiful UI that works on all devices
- **Dark/Light Mode**: Theme toggle for user preference

### Role-Based Features

#### Artisan Dashboard
- Upload products with images, stories, and metadata
- Edit and delete own products
- View sales statistics and revenue
- Add geographic coordinates for map display

#### Buyer Dashboard
- Browse products with advanced filters
- Shopping cart management
- Secure checkout simulation
- Order history and tracking

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components, Framer Motion
- **State Management**: TanStack Query (React Query)
- **Authentication**: NextAuth.js with Google OAuth and credentials
- **Database**: PostgreSQL with Prisma ORM
- **Maps**: React Leaflet
- **Deployment Ready**: Optimized for Vercel and Neon.tech/Supabase

## 📦 Getting Started

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Google OAuth credentials (optional)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd FableCraft
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/fablecraft?schema=public"

# NextAuth Configuration
NEXTAUTH_SECRET="your-nextauth-secret-here-generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (Optional - Get from Google Cloud Console)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Cloudinary (Optional - for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# OpenAI (Optional - for enhanced chatbot)
OPENAI_API_KEY="your-openai-api-key"
```

4. **Generate NEXTAUTH_SECRET**
```bash
openssl rand -base64 32
```

5. **Set up the database**
```bash
npx prisma generate
npx prisma migrate dev
```

6. **Seed the database with mock data**
```bash
npm run prisma:seed
```

This will create:
- 2 Artisan accounts (with 6 products total)
- 1 Buyer account

**Test Credentials:**
- Artisan 1: `maya.bali@example.com` / `password123`
- Artisan 2: `rajesh.india@example.com` / `password123`
- Buyer: `john.doe@example.com` / `password123`

7. **Run the development server**
```bash
npm run dev
```

8. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
FableCraft/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── products/             # Product CRUD operations
│   │   ├── cart/                 # Shopping cart operations
│   │   └── orders/               # Order management
│   ├── auth/                     # Auth pages (signin, signup, role selection)
│   ├── dashboard/                # Role-based dashboards
│   │   └── products/             # Artisan product management
│   ├── products/                 # Product browse and detail pages
│   ├── cart/                     # Shopping cart page
│   ├── checkout/                 # Checkout and success pages
│   ├── orders/                   # Order history
│   ├── map/                      # Interactive map page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── navbar.tsx                # Navigation bar
│   ├── footer.tsx                # Footer
│   ├── dashboard-sidebar.tsx    # Dashboard sidebar
│   ├── product-card.tsx          # Product card component
│   ├── chatbot.tsx               # AI chatbot
│   ├── map-component.tsx         # Leaflet map
│   └── providers.tsx             # App providers wrapper
├── lib/                          # Utility functions
│   ├── auth.ts                   # NextAuth configuration
│   ├── prisma.ts                 # Prisma client
│   └── utils.ts                  # Helper functions
├── prisma/                       # Database schema and migrations
│   ├── schema.prisma             # Prisma schema
│   └── seed.ts                   # Seed data script
├── types/                        # TypeScript type definitions
│   └── next-auth.d.ts            # NextAuth types
├── package.json                  # Dependencies
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── next.config.js                # Next.js configuration
```

## 🗄 Database Schema

### User
- Role-based (ARTISAN or BUYER)
- OAuth and credentials support
- Profile information

### Product
- Product details (title, description, price, region)
- Image URLs array
- Geographic coordinates (latitude/longitude)
- Verification status
- Linked to artisan (User)

### Story
- One-to-one with Product
- Contains the narrative behind the product

### CartItem
- Links User and Product
- Quantity management
- Unique constraint per user-product pair

### Order
- Order status (PENDING, COMPLETED, CANCELLED)
- Total amount
- Linked to User

### OrderItem
- Junction table for Order and Product
- Stores quantity and price at time of order

## 🎨 UI Components

Built with **shadcn/ui** components:
- Button, Input, Label, Textarea
- Card, Badge, Avatar
- Dialog, Dropdown Menu, Select
- Toast notifications
- And more...

## 🚀 Deployment

### Vercel (Frontend)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Neon.tech or Supabase (Database)
1. Create a PostgreSQL database
2. Copy connection string to `DATABASE_URL`
3. Run migrations: `npx prisma migrate deploy`
4. Seed data: `npm run prisma:seed`

### Environment Variables for Production
Make sure to set all required environment variables in your deployment platform:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (your production URL)
- Google OAuth credentials (if using)

## 🔐 Authentication Flow

1. **Sign Up**:
   - Users choose role (Artisan or Buyer)
   - Create account with credentials or Google OAuth
   - OAuth users select role after first login

2. **Sign In**:
   - Email/password or Google OAuth
   - Session stored as JWT
   - Role included in session for authorization

3. **Authorization**:
   - Role-based page access (server-side)
   - Role-based UI rendering (client-side)
   - API route protection with session checks

## 🛒 Shopping Flow

1. **Browse Products**: Filter by region, price, search
2. **View Product**: See details, story, and metadata
3. **Add to Cart**: Authenticated buyers only
4. **Checkout**: Simulated payment form
5. **Order Confirmation**: Success page with order details
6. **Order History**: Track past orders

## 🗺 Map Feature

- Products with coordinates display on interactive map
- Click markers to view product info
- Popup with quick view and link to detail page
- Built with React Leaflet and OpenStreetMap tiles

## 🤖 Chatbot

- Predefined Q&A responses
- Common questions about platform, ordering, etc.
- Expandable to integrate OpenAI API
- Floating chat button on all pages

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl, 2xl
- Hamburger menu on mobile (if implemented)
- Touch-friendly interactions

## 🎨 Color Scheme

As requested, the app uses a **black and white** color scheme:
- Primary: Black/White (theme-dependent)
- Background: White (light mode) / Dark gray (dark mode)
- Accents: Gray shades
- Clean, modern, minimalist design

## 🧪 Testing Locally

1. Start the development server: `npm run dev`
2. Sign in with test credentials (see above)
3. Test as Artisan:
   - Upload products
   - Edit/delete products
   - View dashboard stats
4. Test as Buyer:
   - Browse and filter products
   - Add to cart
   - Checkout simulation
   - View orders

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:seed      # Seed database with mock data
```

## 🔧 Extending the Project

### Add Real Payment Gateway
Replace the simulated checkout in `app/checkout/page.tsx` with:
- Stripe Elements
- Razorpay integration
- PayPal

### Add Real Image Upload
Integrate Cloudinary or AWS S3:
- Create upload widget
- Store URLs in database
- Replace manual URL input

### Enhance Chatbot
Integrate OpenAI API:
- Use GPT-4 for dynamic responses
- Context-aware conversations
- Product recommendations

### Add Reviews & Ratings
- Create Review model
- Add review form on product page
- Display average ratings

### Add Notifications
- Email notifications for orders
- In-app notification system
- Push notifications

## 🐛 Known Limitations

- Payment is simulated (no real transactions)
- Image uploads require external URLs (no built-in upload)
- Chatbot uses predefined responses (no AI integration by default)
- No email verification (can be added)
- No password reset flow (can be added)

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with Next.js, React, and TypeScript
- UI components from shadcn/ui
- Icons from Lucide React
- Maps powered by Leaflet and OpenStreetMap
- Images from Unsplash

## 📧 Support

For questions or issues, please open an issue on the GitHub repository.

---

**Happy crafting! 🎨✨**

