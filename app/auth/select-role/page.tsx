'use client'

// Role selection page for OAuth users
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { Store, ShoppingBag } from 'lucide-react'

export default function SelectRolePage() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // If user already has a role, redirect to dashboard
    if (session?.user?.role && session.user.role !== 'BUYER') {
      router.push('/dashboard')
    }
  }, [session, router])

  const handleSelectRole = async (role: 'ARTISAN' | 'BUYER') => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/update-role', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      })

      if (!response.ok) {
        throw new Error('Failed to update role')
      }

      // Update session with new role
      await update({ role })

      toast({
        title: 'Success',
        description: `Welcome as a ${role.toLowerCase()}!`,
      })

      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to set role. Please try again.',
        variant: 'destructive',
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            Choose Your Role
          </CardTitle>
          <CardDescription className="text-lg">
            How would you like to use FableCraft?
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary"
            onClick={() => !isLoading && handleSelectRole('ARTISAN')}
          >
            <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <Store className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold">Artisan</h3>
              <p className="text-center text-muted-foreground">
                Showcase and sell your handmade products to buyers worldwide
              </p>
              <Button
                className="w-full"
                disabled={isLoading}
                onClick={(e) => {
                  e.stopPropagation()
                  handleSelectRole('ARTISAN')
                }}
              >
                Continue as Artisan
              </Button>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary"
            onClick={() => !isLoading && handleSelectRole('BUYER')}
          >
            <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <ShoppingBag className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold">Buyer</h3>
              <p className="text-center text-muted-foreground">
                Discover and purchase unique handmade products from artisans
              </p>
              <Button
                className="w-full"
                disabled={isLoading}
                onClick={(e) => {
                  e.stopPropagation()
                  handleSelectRole('BUYER')
                }}
              >
                Continue as Buyer
              </Button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}

