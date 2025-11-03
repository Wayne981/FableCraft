'use client'

// Product detail page with story and metadata
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Chatbot } from '@/components/chatbot'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import { MapPin, ShieldCheck, ShoppingCart, Book, User } from 'lucide-react'
import { useState } from 'react'

export default function ProductDetailPage() {
  const params = useParams()
  const { data: session } = useSession()
  const { toast } = useToast()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [selectedImage, setSelectedImage] = useState(0)

  const { data, isLoading } = useQuery({
    queryKey: ['product', params.productId],
    queryFn: async () => {
      const res = await fetch(`/api/products/${params.productId}`)
      if (!res.ok) throw new Error('Failed to fetch product')
      return res.json()
    },
  })

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: params.productId,
          quantity: 1,
        }),
      })
      if (!res.ok) throw new Error('Failed to add to cart')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast({
        title: 'Success',
        description: 'Product added to cart',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to add to cart. Please sign in.',
        variant: 'destructive',
      })
    },
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-12 text-center">
          Loading product...
        </main>
        <Footer />
      </div>
    )
  }

  if (!data?.product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => router.push('/products')}>
            Browse Products
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  const product = data.product

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
              {product.imageUrls[selectedImage] ? (
                <Image
                  src={product.imageUrls[selectedImage]}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No image
                </div>
              )}
              {product.verified && (
                <Badge className="absolute top-4 right-4 bg-green-500">
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            {product.imageUrls.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.imageUrls.map((url: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                      selectedImage === index
                        ? 'border-primary'
                        : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={url}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{product.region}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>by {product.artisan.name}</span>
                </div>
              </div>
            </div>

            <div className="text-4xl font-bold">{formatPrice(product.price)}</div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {session?.user?.role === 'BUYER' && (
              <Button
                size="lg"
                className="w-full"
                onClick={() => addToCartMutation.mutate()}
                disabled={addToCartMutation.isPending}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            )}

            {!session && (
              <Button
                size="lg"
                className="w-full"
                onClick={() => router.push('/auth/signin')}
              >
                Sign in to Purchase
              </Button>
            )}

            {session?.user?.role === 'ARTISAN' && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  You're viewing this as an artisan. Sign in as a buyer to purchase.
                </p>
              </div>
            )}

            {/* Metadata Card */}
            {product.metadata && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShieldCheck className="mr-2 h-5 w-5" />
                    Authenticity Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {product.metadata}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Product Story */}
        {product.story && (
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Book className="mr-2 h-6 w-6" />
                The Story Behind This Product
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {product.story.content}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Artisan Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>About the Artisan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold">
                {product.artisan.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{product.artisan.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {product.artisan.email}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Creating handmade products from {product.region}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
      <Chatbot />
    </div>
  )
}

