// Single product API routes - GET, PATCH, DELETE
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET single product by ID
export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.productId },
      include: {
        artisan: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
          },
        },
        story: true,
      },
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ product })
  } catch (error) {
    console.error('Get product error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

// PATCH update product (artisan only, own products)
export async function PATCH(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify product ownership
    const existingProduct = await prisma.product.findUnique({
      where: { id: params.productId },
    })

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    if (existingProduct.artisanId !== session.user.id) {
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

    // Update product
    const product = await prisma.product.update({
      where: { id: params.productId },
      data: {
        title,
        description,
        price: price ? parseFloat(price) : undefined,
        region,
        imageUrls,
        metadata,
        verified,
        latitude: latitude ? parseFloat(latitude) : undefined,
        longitude: longitude ? parseFloat(longitude) : undefined,
        story: story
          ? {
              upsert: {
                create: { content: story },
                update: { content: story },
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

    return NextResponse.json({ product })
  } catch (error) {
    console.error('Update product error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

// DELETE product (artisan only, own products)
export async function DELETE(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify product ownership
    const existingProduct = await prisma.product.findUnique({
      where: { id: params.productId },
    })

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    if (existingProduct.artisanId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Delete product (cascade will delete story)
    await prisma.product.delete({
      where: { id: params.productId },
    })

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Delete product error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

