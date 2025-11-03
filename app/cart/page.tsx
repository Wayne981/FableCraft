'use client'

// Shopping cart page
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Chatbot } from '@/components/chatbot'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, ShoppingCart } from 'lucide-react'

export default function CartPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await fetch('/api/cart')
      if (!res.ok) throw new Error('Failed to fetch cart')
      return res.json()
    },
    enabled: !!session,
  })

  const removeMutation = useMutation({
    mutationFn: async (cartItemId: string) => {
      const res = await fetch(`/api/cart/${cartItemId}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to remove item')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast({
        title: 'Success',
        description: 'Item removed from cart',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to remove item',
        variant: 'destructive',
      })
    },
  })

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to view your cart</h2>
          <Button asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-12 text-center">
          Loading cart...
        </main>
        <Footer />
      </div>
    )
  }

  const cartItems = data?.cartItems || []
  const total = cartItems.reduce(
    (sum: number, item: any) => sum + item.product.price * item.quantity,
    0
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container py-8">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item: any) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                        {item.product.imageUrls[0] ? (
                          <Image
                            src={item.product.imageUrls[0]}
                            alt={item.product.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <Link
                          href={`/products/${item.product.id}`}
                          className="font-semibold hover:text-primary transition-colors"
                        >
                          {item.product.title}
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">
                          by {item.product.artisan.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Region: {item.product.region}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <p className="font-semibold">
                            {formatPrice(item.product.price)}
                          </p>
                          <span className="text-muted-foreground">×</span>
                          <p className="text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeMutation.mutate(item.id)}
                        disabled={removeMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => router.push('/checkout')}
                  >
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <Chatbot />
    </div>
  )
}

