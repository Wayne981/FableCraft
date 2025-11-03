'use client'

// Dashboard sidebar with role-based navigation
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  PlusCircle,
  FileText,
  Settings,
} from 'lucide-react'

export function DashboardSidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()

  // Role-based navigation items
  const artisanNavItems = [
    {
      href: '/dashboard',
      label: 'Overview',
      icon: LayoutDashboard,
    },
    {
      href: '/dashboard/products',
      label: 'My Products',
      icon: Package,
    },
    {
      href: '/dashboard/products/new',
      label: 'Add Product',
      icon: PlusCircle,
    },
  ]

  const buyerNavItems = [
    {
      href: '/dashboard',
      label: 'Overview',
      icon: LayoutDashboard,
    },
    {
      href: '/orders',
      label: 'My Orders',
      icon: ShoppingBag,
    },
    {
      href: '/cart',
      label: 'Shopping Cart',
      icon: ShoppingBag,
    },
  ]

  const navItems =
    session?.user?.role === 'ARTISAN' ? artisanNavItems : buyerNavItems

  return (
    <aside className="w-64 border-r bg-card min-h-[calc(100vh-4rem)]">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">
          {session?.user?.role === 'ARTISAN' ? 'Artisan' : 'Buyer'} Dashboard
        </h2>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

