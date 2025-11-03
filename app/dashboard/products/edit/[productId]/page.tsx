'use client'

// Edit product page (Artisan only)
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function EditProductPage() {
  const params = useParams()
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const queryClient = useQueryClient()
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

  // Fetch product data
  const { data, isLoading } = useQuery({
    queryKey: ['product', params.productId],
    queryFn: async () => {
      const res = await fetch(`/api/products/${params.productId}`)
      if (!res.ok) throw new Error('Failed to fetch product')
      return res.json()
    },
  })

  // Populate form when data loads
  useEffect(() => {
    if (data?.product) {
      const product = data.product
      setFormData({
        title: product.title || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        region: product.region || '',
        imageUrls: product.imageUrls?.join('\n') || '',
        metadata: product.metadata || '',
        story: product.story?.content || '',
        latitude: product.latitude?.toString() || '',
        longitude: product.longitude?.toString() || '',
      })
    }
  }, [data])

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(`/api/products/${params.productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to update product')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artisan-products'] })
      queryClient.invalidateQueries({ queryKey: ['product', params.productId] })
      toast({
        title: 'Success',
        description: 'Product updated successfully',
      })
      router.push('/dashboard/products')
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update product',
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

    updateMutation.mutate({
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
        <p className="text-muted-foreground">Only artisans can edit products.</p>
      </div>
    )
  }

  if (isLoading) {
    return <div className="text-center py-12">Loading product...</div>
  }

  if (!data?.product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Button asChild>
          <Link href="/dashboard/products">Back to Products</Link>
        </Button>
      </div>
    )
  }

  // Check ownership
  if (data.product.artisanId !== session?.user?.id) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="text-muted-foreground">You can only edit your own products.</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/products">Back to Products</Link>
        </Button>
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
        <h1 className="text-3xl font-bold">Edit Product</h1>
        <p className="text-muted-foreground mt-2">
          Update your product information
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            Edit the information about your product
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
                <Label htmlFor="price">Price (USD) *</Label>
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
                  placeholder="Bali, Indonesia"
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
                placeholder="Share the story behind this product..."
                rows={5}
              />
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

            <div className="flex gap-4">
              <Button
                type="submit"
                className="flex-1"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? 'Updating...' : 'Update Product'}
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
