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
      price: 89.99,
      region: 'Bali, Indonesia',
      latitude: -8.3405,
      longitude: 115.0920,
      imageUrls: [
        'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800',
      ],
      metadata: 'Materials: Sustainably sourced teak wood\nHeight: 25cm\nFinish: Natural wood oil\nBlessing: Temple blessed',
      verified: true,
      story: 'Hand-carved by master craftsmen in Ubud, Bali, this Ganesh statue represents the remover of obstacles. The wood comes from responsibly managed forests, and each statue is blessed at a local Hindu temple before sale. The carving process takes about a week, with attention to every detail of this beloved deity.',
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
      region: 'Rajasthan, India',
      latitude: 26.9124,
      longitude: 75.7873,
      imageUrls: [
        'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=800',
      ],
      metadata: 'Materials: Pure brass\nHeight: 8cm\nTechnique: Hand-hammered and polished\nUse: Oil lamp for prayer and decoration',
      verified: true,
      story: 'These brass diyas are handcrafted in the traditional workshops of Jaipur, Rajasthan. The art of brass working has been practiced in our family for five generations. Each diya is individually hand-hammered and polished to create a beautiful golden shine. They are used during Diwali and other Hindu festivals to light up homes and temples.',
    },
    {
      title: 'Embroidered Rajasthani Wall Hanging',
      description: 'Colorful wall hanging with intricate mirror work and embroidery, depicting traditional Rajasthani scenes.',
      price: 78.00,
      region: 'Rajasthan, India',
      latitude: 26.9124,
      longitude: 75.7873,
      imageUrls: [
        'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800',
      ],
      metadata: 'Materials: Cotton fabric, silk threads, mirrors\nSize: 90cm x 60cm\nTechnique: Traditional mirror work embroidery\nCare: Dry clean only',
      verified: true,
      story: 'This wall hanging is created using the ancient Rajasthani art of mirror work embroidery. Women in rural villages spend weeks creating each piece, sewing tiny mirrors and vibrant threads into cotton fabric. The designs often tell stories of village life, festivals, and the rich cultural heritage of Rajasthan. This art form supports many families in our community.',
    },
    {
      title: 'Hand-painted Terracotta Pot',
      description: 'Beautiful terracotta pot with traditional Warli art paintings, ideal for plants or decoration.',
      price: 28.99,
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

