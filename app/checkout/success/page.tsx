'use client'

// Order success page
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { formatPrice, formatDate } from '@/lib/utils'
import confetti from 'canvas-confetti'
import { useEffect } from 'react'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  const { data, isLoading } = useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const res = await fetch(`/api/orders/${orderId}`)
      if (!res.ok) throw new Error('Failed to fetch order')
      return res.json()
    },
    enabled: !!orderId,
  })

  useEffect(() => {
    // Trigger confetti animation on success
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-12 text-center">
          Loading order details...
        </main>
        <Footer />
      </div>
    )
  }

  const order = data?.order

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container py-12">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-2">Order Placed Successfully!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </div>

          {order && (
            <Card>
              <CardContent className="p-8 space-y-6">
                <div className="text-left space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order Number</span>
                    <span className="font-semibold">#{order.id.slice(-8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-semibold">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-semibold text-lg">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Order Items</h3>
                  <div className="space-y-2">
                    {order.items.map((item: any) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-muted-foreground">
                          {item.product.title} × {item.quantity}
                        </span>
                        <span>
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-6 space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A confirmation email has been sent to your email address.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You can track your order status in your dashboard.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/orders">View My Orders</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

