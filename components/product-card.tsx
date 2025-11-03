'use client'

// Product card component for displaying products
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { MapPin, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: {
    id: string
    title: string
    description: string
    price: number
    region: string
    imageUrls: string[]
    verified: boolean
    artisan: {
      name: string | null
    }
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <Link href={`/products/${product.id}`}>
          <div className="relative h-48 w-full overflow-hidden bg-muted">
            {product.imageUrls[0] ? (
              <Image
                src={product.imageUrls[0]}
                alt={product.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No image
              </div>
            )}
            {product.verified && (
              <Badge className="absolute top-2 right-2 bg-green-500">
                <ShieldCheck className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>
        </Link>
        <CardContent className="p-4">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-1">
              {product.title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{product.region}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              by {product.artisan.name}
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <p className="text-2xl font-bold">{formatPrice(product.price)}</p>
          <Button asChild size="sm">
            <Link href={`/products/${product.id}`}>View Details</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

