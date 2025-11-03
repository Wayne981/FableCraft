// Prisma seed script with mock data
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Hash password for artisans
  const hashedPassword = await bcrypt.hash('password123', 12)

  // Create Artisan 1
  const artisan1 = await prisma.user.upsert({
    where: { email: 'maya.bali@example.com' },
    update: {},
    create: {
      email: 'maya.bali@example.com',
      name: 'Maya Dewi',
      password: hashedPassword,
      role: 'ARTISAN',
      image: 'https://i.pravatar.cc/150?img=1',
    },
  })

  console.log('✅ Created artisan: Maya Dewi')

  // Create Artisan 2
  const artisan2 = await prisma.user.upsert({
    where: { email: 'rajesh.india@example.com' },
    update: {},
    create: {
      email: 'rajesh.india@example.com',
      name: 'Rajesh Kumar',
      password: hashedPassword,
      role: 'ARTISAN',
      image: 'https://i.pravatar.cc/150?img=12',
    },
  })

  console.log('✅ Created artisan: Rajesh Kumar')

  // Create Buyer
  const buyer = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: hashedPassword,
      role: 'BUYER',
      image: 'https://i.pravatar.cc/150?img=68',
    },
  })

  console.log('✅ Created buyer: John Doe')

  // Products for Artisan 1 (Maya Dewi - Bali)
  const products1 = [
    {
      title: 'Handwoven Balinese Basket',
      description: 'Traditional basket handwoven from natural bamboo and rattan. Perfect for storage or as a decorative piece.',
      price: 45.99,
      region: 'Bali, Indonesia',
      latitude: -8.3405,
      longitude: 115.0920,
      imageUrls: [
        'https://images.unsplash.com/photo-1523920290228-4f321a939b4c?w=800',
        'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=800',
      ],
      metadata: 'Materials: Natural bamboo and rattan\nTechnique: Traditional Balinese weaving\nSize: 30cm x 30cm x 20cm\nCare: Wipe with dry cloth',
      verified: true,
      story: 'This basket is handcrafted using traditional Balinese weaving techniques passed down through generations. Each piece takes approximately 3-4 days to complete, and the natural materials are sustainably sourced from local farms. The intricate patterns represent prosperity and good fortune in Balinese culture.',
    },
    {
      title: 'Carved Wooden Ganesh Statue',
      description: 'Intricately carved statue of Lord Ganesh from sustainable teak wood, blessed in a local temple.',
      price: 9.99,
      region: 'Visakhapatnam, Andhra Pradesh',
      latitude: 17.6868,
      longitude: 83.2185,
      imageUrls: [
        'https://www.memeraki.com/cdn/shop/files/Lord-Ganesha-in-Kadam-Wood-Carving-by-Om-Prakash-1_1024x.jpg?v=1726056957',
      ],
      metadata: 'Materials: Sustainably sourced teak wood\nHeight: 25cm\nFinish: Natural wood oil\nBlessing: Temple blessed',
      verified: true,
      story: 'Hand-carved by master craftsmen in Visakhapatnam, Andhra Pradesh, this Ganesh statue represents the remover of obstacles. The wood comes from responsibly managed forests, and each statue is blessed at a local Hindu temple before sale. The carving process takes about a week, with attention to every detail of this beloved deity.',
    },
    {
      title: 'Batik Silk Scarf',
      description: 'Luxurious silk scarf with traditional batik patterns, hand-dyed using natural colors.',
      price: 65.00,
      region: 'Bali, Indonesia',
      latitude: -8.3405,
      longitude: 115.0920,
      imageUrls: [
        'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800',
      ],
      metadata: 'Materials: 100% pure silk\nDyes: Natural plant-based colors\nSize: 180cm x 60cm\nCare: Hand wash cold, air dry',
      verified: true,
      story: 'This batik scarf is created using the traditional wax-resist dyeing technique that has been practiced in Indonesia for over a thousand years. Each scarf is hand-drawn with hot wax, then dyed multiple times to create the intricate patterns. The natural dyes come from indigo, turmeric, and other plants, making each piece unique.',
    },
  ]

  for (const product of products1) {
    const created = await prisma.product.create({
      data: {
        ...product,
        artisanId: artisan1.id,
        story: {
          create: {
            content: product.story,
          },
        },
      },
    })
    console.log(`✅ Created product: ${created.title}`)
  }

  // Products for Artisan 2 (Rajesh Kumar - India)
  const products2 = [
    {
      title: 'Handcrafted Brass Diya Lamp',
      description: 'Traditional Indian oil lamp (diya) made from brass, perfect for festivals and home decoration.',
      price: 32.50,
      region: 'Varanasi, Uttar Pradesh, India',
      latitude: 25.3176,
      longitude: 82.9739,
      imageUrls: [
        'https://www.craftsnchisel.com/cdn/shop/products/15-inches-shanku-and-chakra-diya-set-of-2-handmade-brass-lamp-traditional-decor-indian-home-decor-crafts-n-chisel_1200x.jpg?v=1671239721',
      ],
      metadata: 'Materials: Pure brass\nHeight: 8cm\nTechnique: Hand-hammered and polished\nUse: Oil lamp for prayer and decoration',
      verified: true,
      story: 'These brass diyas are handcrafted in the traditional workshops of Varanasi, Uttar Pradesh. The art of brass and metalware making has been deeply rooted here for centuries, passed down through generations of skilled artisans. Each diya is shaped and polished by hand to create a warm, golden glow — symbolizing light, purity, and tradition during Diwali and other festive occasions.',
    }
    ,
    {
  title: 'Embroidered Jaipur Cup & Saucer Set',
  description: 'A handcrafted cup and saucer set from Jaipur, beautifully adorned with intricate embroidery that captures the vibrant artistry of Rajasthan. Perfect for serving tea or coffee with an authentic cultural touch.',
  price: 8.00,
  region: 'Jaipur, Rajasthan, India',
  latitude: 26.9124,
  longitude: 75.7873,
  imageUrls: [
    'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800',
  ],
  metadata: 'Materials: Terracotta base, cotton fabric, silk threads, mirrors\nDimensions: Cup diameter 8cm, Saucer diameter 12cm\nTechnique: Hand embroidery with mirror work\nCare: Wipe gently with a dry cloth; avoid water and direct sunlight',
  verified: true,
  story: 'This embroidered cup and saucer set is crafted by women artisans from Jaipur, Rajasthan, blending traditional mirror work with elegant design. Each piece reflects the city’s royal charm and artistic heritage. The craft supports local artisan families, helping preserve Jaipur’s celebrated embroidery traditions.',
},

    {
      title: 'Handmade Vase',
      description: 'Beautiful Handmade Vase with traditional art of Maharashtra, ideal for plants or decoration.',
      price: 8.99,
      region: 'Maharashtra, India',
      latitude: 19.0760,
      longitude: 72.8777,
      imageUrls: [
        'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800',
      ],
      metadata: 'Materials: Natural terracotta clay\nHeight: 20cm, Diameter: 18cm\nArt style: Warli tribal art\nSuitable for: Indoor/outdoor plants',
      verified: true,
      story: 'Warli painting is a tribal art form from Maharashtra, India, dating back to 2500 BCE. These terracotta pots are first shaped by local potters, then hand-painted with traditional Warli motifs depicting daily life, harvest, and celebrations. The white rice paste used for painting creates a striking contrast against the terracotta. Each pot is a piece of ancient Indian culture.',
    },
  ]

  for (const product of products2) {
    const created = await prisma.product.create({
      data: {
        ...product,
        artisanId: artisan2.id,
        story: {
          create: {
            content: product.story,
          },
        },
      },
    })
    console.log(`✅ Created product: ${created.title}`)
  }

  console.log('🎉 Database seeded successfully!')
  console.log('\n📝 Test Credentials:')
  console.log('Artisan 1: maya.bali@example.com / password123')
  console.log('Artisan 2: rajesh.india@example.com / password123')
  console.log('Buyer: john.doe@example.com / password123')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

