'use client'

// Add new product page (Artisan only)
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewProductPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    region: '',
    imageUrls: '',
    metadata: '',
    story: '',
    latitude: '',
    longitude: '',
  })

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to create product')
      return res.json()
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Product created successfully',
      })
      router.push('/dashboard/products')
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to create product',
        variant: 'destructive',
      })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Convert imageUrls string to array
    const imageUrlsArray = formData.imageUrls
      .split('\n')
      .map((url) => url.trim())
      .filter((url) => url.length > 0)

    createMutation.mutate({
      ...formData,
      imageUrls: imageUrlsArray,
      price: parseFloat(formData.price),
      latitude: formData.latitude ? parseFloat(formData.latitude) : null,
      longitude: formData.longitude ? parseFloat(formData.longitude) : null,
    })
  }

  if (session?.user?.role !== 'ARTISAN') {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="text-muted-foreground">Only artisans can upload products.</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/dashboard/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Upload New Product</h1>
        <p className="text-muted-foreground mt-2">
          Share your handmade product with customers worldwide
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            Fill in the information about your product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Product Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                placeholder="Handwoven Basket"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                placeholder="Describe your product in detail..."
                rows={4}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (INR) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                  placeholder="49.99"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region/Origin *</Label>
                <Input
                  id="region"
                  value={formData.region}
                  onChange={(e) =>
                    setFormData({ ...formData, region: e.target.value })
                  }
                  required
                  placeholder="Jaipur, Rajasthan"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrls">Image URLs * (one per line)</Label>
              <Textarea
                id="imageUrls"
                value={formData.imageUrls}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrls: e.target.value })
                }
                required
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                Upload images to Cloudinary or use direct image URLs
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="story">Product Story</Label>
              <Textarea
                id="story"
                value={formData.story}
                onChange={(e) =>
                  setFormData({ ...formData, story: e.target.value })
                }
                placeholder="Share the story behind this product, your inspiration, techniques used, and cultural significance..."
                rows={5}
              />
              <p className="text-xs text-muted-foreground">
                Tell customers about your creative process and the heritage behind this product
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="metadata">Authenticity Metadata (Optional)</Label>
              <Textarea
                id="metadata"
                value={formData.metadata}
                onChange={(e) =>
                  setFormData({ ...formData, metadata: e.target.value })
                }
                placeholder="Materials used, certifications, traditional techniques..."
                rows={3}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude (Optional)</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={(e) =>
                    setFormData({ ...formData, latitude: e.target.value })
                  }
                  placeholder="-8.3405"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude (Optional)</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={(e) =>
                    setFormData({ ...formData, longitude: e.target.value })
                  }
                  placeholder="115.0920"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Add coordinates to display your product on the interactive map
            </p>

            <div className="flex gap-4">
              <Button
                type="submit"
                className="flex-1"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? 'Creating...' : 'Create Product'}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/products">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

