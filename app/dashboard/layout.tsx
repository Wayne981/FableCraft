// Dashboard layout with sidebar
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { Navbar } from '@/components/navbar'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { Chatbot } from '@/components/chatbot'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  // Redirect to sign in if not authenticated
  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
      <Chatbot />
    </div>
  )
}

