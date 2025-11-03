'use client'

// Interactive map page with React Leaflet
import { useQuery } from '@tanstack/react-query'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Chatbot } from '@/components/chatbot'
import { Card, CardContent } from '@/components/ui/card'
import dynamic from 'next/dynamic'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

// Dynamically import map component to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/map-component'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] flex items-center justify-center bg-muted rounded-lg">
      Loading map...
    </div>
  ),
})

export default function MapPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['products-with-coordinates'],
    queryFn: async () => {
      const res = await fetch('/api/products')
      if (!res.ok) throw new Error('Failed to fetch products')
      return res.json()
    },
  })

  // Filter products that have coordinates
  const productsWithCoordinates = data?.products?.filter(
    (p: any) => p.latitude && p.longitude
  ) || []

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Explore Products on Map</h1>
          <p className="text-muted-foreground">
            Discover artisan products from across India. Click on markers to view product details.
          </p>
        </div>

        {isLoading ? (
          <div className="h-[600px] flex items-center justify-center bg-muted rounded-lg">
            Loading products...
          </div>
        ) : (
          <MapComponent products={productsWithCoordinates} />
        )}

        {/* Featured Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Featured Products on Map</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsWithCoordinates.slice(0, 6).map((product: any) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-2">
                    <h3 className="font-semibold text-lg">{product.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-lg font-bold">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {product.region}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <Chatbot />
    </div>
  )
}

