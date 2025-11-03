'use client'

// Orders page (Buyer)
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Chatbot } from '@/components/chatbot'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatPrice, formatDate } from '@/lib/utils'
import Link from 'next/link'
import { Package } from 'lucide-react'

export default function OrdersPage() {
  const { data: session } = useSession()

  const { data, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await fetch('/api/orders')
      if (!res.ok) throw new Error('Failed to fetch orders')
      return res.json()
    },
    enabled: !!session,
  })

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to view your orders</h2>
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
          Loading orders...
        </main>
        <Footer />
      </div>
    )
  }

  const orders = data?.orders || []

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-500'
      case 'PENDING':
        return 'bg-yellow-500'
      case 'CANCELLED':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container py-8">
        <h1 className="text-4xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">You haven't placed any orders yet</p>
              <Button asChild>
                <Link href="/products">Start Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order: any) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        Order #{order.id.slice(-8)}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item: any) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between py-2 border-b last:border-0"
                      >
                        <div>
                          <Link
                            href={`/products/${item.product.id}`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {item.product.title}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            by {item.product.artisan.name} • Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                    <div className="flex items-center justify-between pt-4 font-semibold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
      <Chatbot />
    </div>
  )
}

