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
    },
    {
      title: 'Embroidered Jaipur Cup & Saucer Set',
      description: 'A handcrafted cup and saucer set from Jaipur, beautifully adorned with intricate embroidery that captures the vibrant artistry of Rajasthan.',
      price: 8.00,
      region: 'Jaipur, Rajasthan, India',
      latitude: 26.9124,
      longitude: 75.7873,
      imageUrls: [
        'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800',
      ],
      metadata: 'Materials: Terracotta base, cotton fabric, silk threads, mirrors\nDimensions: Cup diameter 8cm, Saucer diameter 12cm\nTechnique: Hand embroidery with mirror work\nCare: Wipe gently with a dry cloth; avoid water and direct sunlight',
      verified: true,
      story: 'This embroidered cup and saucer set is crafted by women artisans from Jaipur, Rajasthan, blending traditional mirror work with elegant design. Each piece reflects the city’s royal charm and artistic heritage.',
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
      story: 'Warli painting is a tribal art form from Maharashtra, India, dating back to 2500 BCE.',
    },
    {
      title: 'Kashmiri Papier Mâché Jewelry Box',
      description: 'A delicate handcrafted jewelry box made using the traditional Papier Mâché craft of Kashmir, featuring Chinar leaf embossing.',
      price: 25.99,
      region: 'Srinagar, Jammu & Kashmir, India',
      latitude: 34.0837,
      longitude: 74.7973,
      imageUrls: [
        'https://www.treasuresofkashmir.in/cdn/shop/products/ChinarEmbossedPaperMacheFlatBoxByKaariigarii_2048x.jpg?v=1610096152',
      ],
      metadata: 'Materials: Papier Mâché, natural colors\nSize: 15cm x 10cm x 6cm\nFinish: Gloss lacquer\nCare: Keep dry; avoid direct sunlight',
      verified: true,
      story: 'This jewelry box is a masterpiece of Kashmiri craftsmanship, hand-painted with Chinar motifs that symbolize grace and resilience.',
    },
    {
      title: 'Terracotta Clay Water Jug',
      description: 'Eco-friendly terracotta water jug that keeps water naturally cool using traditional clay pottery techniques.',
      price: 18.50,
      region: 'Kolkata, West Bengal, India',
      latitude: 22.5726,
      longitude: 88.3639,
      imageUrls: [
        'https://villagedecor.in/cdn/shop/files/Clay_Water_Pot_Lifestyle_View_WPOT14..jpg?v=1751884764&width=2048',
      ],
      metadata: 'Materials: 100% natural clay\nCapacity: 2L\nFinish: Unglazed, natural brown\nCare: Rinse before use, avoid detergent',
      verified: true,
      story: 'Crafted by rural artisans, this jug maintains water temperature through natural clay porosity, offering sustainable cooling without electricity.',
    },
    {
      title: 'Blue Pottery Serving Bowl',
      description: 'A Jaipur blue pottery bowl showcasing Persian-inspired floral designs, entirely hand-painted and glazed.',
      price: 29.99,
      region: 'Jaipur, Rajasthan, India',
      latitude: 26.9124,
      longitude: 75.7873,
      imageUrls: [
        'https://artisanvariety.com/cdn/shop/files/JBLPY0002_1_1905acf6-2559-48f5-b03e-7766310febf5_900x.jpg?v=1689138277',
      ],
      metadata: 'Materials: Quartz, glass, multani mitti, and gum\nDiameter: 20cm\nTechnique: Hand-glazed\nCare: Hand wash gently',
      verified: true,
      story: 'Blue pottery of Jaipur is known for its vibrant colors and glazed finish, crafted using techniques brought from Persia in the 14th century.',
    },
    {
      title: 'Bidriware Flower Vase',
      description: 'An elegant black metal vase inlaid with pure silver wire, representing the historic Bidri art of Karnataka.',
      price: 75.00,
      region: 'Bidar, Karnataka, India',
      latitude: 17.9133,
      longitude: 77.5301,
      imageUrls: [
        'https://www.gitagged.com/wp-content/uploads/2018/04/Bidriware-Silver-Inlay-Floral-Vase-1.jpg',
      ],
      metadata: 'Materials: Zinc alloy with silver inlay\nHeight: 25cm\nFinish: Oxidized black\nCare: Avoid moisture; polish gently',
      verified: true,
      story: 'Bidriware is a 500-year-old craft that blends Persian artistry with local Indian metalwork traditions from Bidar, Karnataka.',
    },
    {
      title: 'Pattachitra Wall Art',
      description: 'Traditional Odisha scroll painting featuring mythological themes and intricate natural dye artwork.',
      price: 120.00,
      region: 'Raghurajpur, Odisha, India',
      latitude: 19.8925,
      longitude: 85.8325,
      imageUrls: [
        'https://theindiacrafthouse.com/cdn/shop/products/PattachitraArtWallPlaque-RadhaKrishna-APPRKB1@2x.jpg',
      ],
      metadata: 'Materials: Cloth, tamarind glue, natural pigments\nDimensions: 60cm x 40cm\nTechnique: Hand-painted',
      verified: true,
      story: 'Pattachitra is one of India’s oldest art forms, using natural pigments and mythological storytelling, primarily crafted in Odisha’s artist village of Raghurajpur.',
    },
    {
      title: 'Channapatna Wooden Toy Set',
      description: 'Colorful lacquered wooden toys made by artisans from Channapatna, the toy town of India.',
      price: 40.00,
      region: 'Channapatna, Karnataka, India',
      latitude: 12.6514,
      longitude: 77.2039,
      imageUrls: [
        'https://storeassets.im-cdn.com/media-manager/channapatnatoysin/280eU8ASIK3BTw3yHkER_channapatna%20toys%20banner%2015_621x375_webp.jpg',
      ],
      metadata: 'Materials: Wood, natural dyes\nTechnique: Hand-lathed and polished with lacquer\nCare: Keep dry',
      verified: true,
      story: 'Channapatna toys are made from ivory wood and colored using natural dyes, symbolizing India’s commitment to sustainable handicraft traditions.',
    },
    {
      title: 'Kutch Embroidered Cushion Cover',
      description: 'Vibrant hand-embroidered cushion cover from Kutch, featuring intricate mirror and thread work.',
      price: 22.00,
      region: 'Bhuj, Gujarat, India',
      latitude: 23.2419,
      longitude: 69.6669,
      imageUrls: [
        'https://s3.amazonaws.com/megastores-prod-bucket/images/product-images/CO-Handicrafts_&_Fashion/SE-Home_Decor/CA-Cushion_Cover/SC-Hand_Embroidery_Cushion_Covers/NW5W-FQ9G-PAZ8-Z5MF/real-images/Hand-Embroidered-Masakali-Silk-Kutch-Cushion-Cover-by-The-India-Craft-Project1655449721176.jpg',
      ],
      metadata: 'Materials: Silk and cotton threads, small mirrors\nSize: 40cm x 40cm\nCare: Dry clean only',
      verified: true,
      story: 'Kutch embroidery is a vibrant art passed through generations, combining colorful threads and mirror work that reflect Gujarat’s cultural heritage.',
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
