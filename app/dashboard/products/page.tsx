'use client'

// Artisan products management page
import { useSession } from 'next-auth/react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { Edit, Trash2, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ArtisanProductsPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const router = useRouter()

  // Fetch artisan's products
  const { data, isLoading } = useQuery({
    queryKey: ['artisan-products'],
    queryFn: async () => {
      const res = await fetch('/api/products')
      if (!res.ok) throw new Error('Failed to fetch products')
      return res.json()
    },
  })

  // Filter products by current artisan
  const myProducts = data?.products?.filter(
    (p: any) => p.artisan.id === session?.user?.id
  ) || []

  // Delete product mutation
  const deleteMutation = useMutation({
    mutationFn: async (productId: string) => {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete product')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artisan-products'] })
      toast({
        title: 'Success',
        description: 'Product deleted successfully',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to delete product',
        variant: 'destructive',
      })
    },
  })

  if (session?.user?.role !== 'ARTISAN') {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="text-muted-foreground">Only artisans can access this page.</p>
      </div>
    )
  }

  if (isLoading) {
    return <div className="text-center py-12">Loading products...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Products</h1>
          <p className="text-muted-foreground mt-2">
            Manage your uploaded products
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {myProducts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">
              You haven't uploaded any products yet.
            </p>
            <Button asChild>
              <Link href="/dashboard/products/new">Upload Your First Product</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {myProducts.map((product: any) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                {product.imageUrls[0] ? (
                  <Image
                    src={product.imageUrls[0]}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No image
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{product.title}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{formatPrice(product.price)}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Region: {product.region}
                </p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => router.push(`/dashboard/products/edit/${product.id}`)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-1"
                  onClick={() => deleteMutation.mutate(product.id)}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

