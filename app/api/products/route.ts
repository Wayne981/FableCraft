// Products API routes - GET all products, POST create product
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET all products with optional filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const region = searchParams.get('region')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const search = searchParams.get('search')

    // Build filter query
    const where: any = {}

    if (region) {
      where.region = region
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Fetch products with artisan info
    const products = await prisma.product.findMany({
      where,
      include: {
        artisan: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        story: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Get products error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

// POST create new product (artisan only)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is an artisan
    if (session.user.role !== 'ARTISAN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const {
      title,
      description,
      price,
      region,
      imageUrls,
      metadata,
      verified,
      story,
      latitude,
      longitude,
    } = body

    // Validate required fields
    if (!title || !description || !price || !region || !imageUrls?.length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create product with story
    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        region,
        imageUrls,
        metadata,
        verified: verified || false,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        artisanId: session.user.id,
        story: story
          ? {
              create: {
                content: story,
              },
            }
          : undefined,
      },
      include: {
        story: true,
        artisan: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

