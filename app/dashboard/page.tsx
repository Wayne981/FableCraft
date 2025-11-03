// Dashboard overview page (role-based)
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  const isArtisan = session.user.role === 'ARTISAN'

  // Fetch dashboard stats based on role
  let stats

  if (isArtisan) {
    // Artisan stats
    const productsCount = await prisma.product.count({
      where: { artisanId: session.user.id },
    })

    const products = await prisma.product.findMany({
      where: { artisanId: session.user.id },
      include: {
        orderItems: true,
      },
    })

    const totalRevenue = products.reduce((sum, product) => {
      return sum + product.orderItems.reduce((itemSum, item) => {
        return itemSum + (item.price * item.quantity)
      }, 0)
    }, 0)

    const totalSales = products.reduce((sum, product) => {
      return sum + product.orderItems.reduce((itemSum, item) => {
        return itemSum + item.quantity
      }, 0)
    }, 0)

    stats = [
      {
        title: 'Total Products',
        value: productsCount,
        description: 'Products you\'ve uploaded',
        icon: Package,
      },
      {
        title: 'Total Sales',
        value: totalSales,
        description: 'Items sold',
        icon: ShoppingBag,
      },
      {
        title: 'Revenue',
        value: `INR${totalRevenue.toFixed(2)}`,
        description: 'Total earnings',
        icon: DollarSign,
      },
    ]
  } else {
    // Buyer stats
    const ordersCount = await prisma.order.count({
      where: { userId: session.user.id },
    })

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
    })

    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0)

    const cartItemsCount = await prisma.cartItem.count({
      where: { userId: session.user.id },
    })

    stats = [
      {
        title: 'Total Orders',
        value: ordersCount,
        description: 'Orders placed',
        icon: ShoppingBag,
      },
      {
        title: 'Total Spent',
        value: `INR${totalSpent.toFixed(2)}`,
        description: 'Amount spent',
        icon: DollarSign,
      },
      {
        title: 'Cart Items',
        value: cartItemsCount,
        description: 'Items in cart',
        icon: Package,
      },
    ]
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {session.user.name}!
        </h1>
        <p className="text-muted-foreground mt-2">
          {isArtisan
            ? 'Manage your products and track your sales'
            : 'Browse products and manage your orders'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            {isArtisan
              ? 'Manage your artisan profile and products'
              : 'Explore and shop for unique products'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isArtisan ? (
            <>
              <a
                href="/dashboard/products/new"
                className="block p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold">Upload New Product</h3>
                <p className="text-sm text-muted-foreground">
                  Add a new handmade product to your collection
                </p>
              </a>
              <a
                href="/dashboard/products"
                className="block p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold">Manage Products</h3>
                <p className="text-sm text-muted-foreground">
                  Edit or delete your existing products
                </p>
              </a>
            </>
          ) : (
            <>
              <a
                href="/products"
                className="block p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold">Browse Products</h3>
                <p className="text-sm text-muted-foreground">
                  Discover unique handmade items from artisans
                </p>
              </a>
              <a
                href="/cart"
                className="block p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold">View Cart</h3>
                <p className="text-sm text-muted-foreground">
                  Review items in your shopping cart
                </p>
              </a>
              <a
                href="/orders"
                className="block p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold">My Orders</h3>
                <p className="text-sm text-muted-foreground">
                  Track your order history and status
                </p>
              </a>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

