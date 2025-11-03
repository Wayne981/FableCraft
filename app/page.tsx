'use client'

// Landing page with hero section and features
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Chatbot } from '@/components/chatbot'
import { motion } from 'framer-motion'
import {
  Store,
  ShoppingBag,
  Map,
  ShieldCheck,
  Heart,
  Globe,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: Store,
      title: 'For Artisans',
      description: 'Showcase your handmade products and share their stories with customers across India.',
    },
    {
      icon: ShoppingBag,
      title: 'For Buyers',
      description: 'Discover unique, authentic products with rich cultural heritage and craftsmanship.',
    },
    {
      icon: Map,
      title: 'Interactive Map',
      description: 'Explore products by region and discover talented artisans from across India.',
    },
    {
      icon: ShieldCheck,
      title: 'Verified Authenticity',
      description: 'Products are verified for authenticity, ensuring genuine handmade quality.',
    },
    {
      icon: Heart,
      title: 'Stories Matter',
      description: 'Every product has a story. Learn about the artisan and the cultural significance.',
    },
    {
      icon: Globe,
      title: 'Indian Community',
      description: 'Connect artisans and buyers across states, celebrating diverse craftsmanship.',
    },
  ]

  const regions = [
    'Deccan',
    'Himalayas',
    'NorthEast',
    'Coastline',
    'Desertland',
    'Gangetic',
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-sm font-medium">
                <Sparkles className="h-4 w-4 mr-2" />
                Discover Handmade Excellence
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Connecting Indian Artisans with the Nation
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover authentic handmade creations from every corner of India. Support local artisans, celebrate regional craftsmanship, and own timeless pieces rooted in India’s cultural heritage.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button size="lg" asChild className="min-w-[200px]">
                <Link href="/products">
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="min-w-[200px]">
                <Link href="/auth/signup">Become an Artisan</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose FableCraft?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A platform dedicated to Indian artisans and buyers, celebrating the beauty, diversity, and heritage of Indian craftsmanship.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Shop by Region Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Discover Artisans by Region
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore handmade products from artisans across India. Each region brings unique traditions and craftsmanship.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {regions.map((region, index) => (
              <motion.div
                key={region}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={`/products?region=${region}`}>
                  <Card className="hover:shadow-lg transition-all hover:scale-105">
                    <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                      <Globe className="h-8 w-8 text-primary" />
                      <p className="font-semibold text-center">{region}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild size="lg" variant="outline">
              <Link href="/map">
                <Map className="mr-2 h-5 w-5" />
                Explore on Map
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                About FableCraft
              </h2>
              <p className="text-lg text-muted-foreground">
                FableCraft is more than a marketplace—it's a celebration of human creativity and cultural heritage. We connect skilled artisans with customers who value authenticity, quality, and the stories behind each handmade product.
              </p>
              <p className="text-lg text-muted-foreground">
                Every product on our platform comes with its story, sharing the artisan's journey, techniques, and cultural significance. When you buy from FableCraft, you're not just purchasing a product—you're supporting livelihoods and preserving traditions.
              </p>
              <div className="flex gap-4">
                <Button asChild>
                  <Link href="/auth/signup">Get Started</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/products">View Products</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <Card className="bg-primary/5">
                <CardContent className="p-6 text-center space-y-2">
                  <p className="text-4xl font-bold">1000+</p>
                  <p className="text-muted-foreground">Artisans</p>
                </CardContent>
              </Card>
              <Card className="bg-primary/5">
                <CardContent className="p-6 text-center space-y-2">
                  <p className="text-4xl font-bold">28</p>
                  <p className="text-muted-foreground">States</p>
                </CardContent>
              </Card>
              <Card className="bg-primary/5">
                <CardContent className="p-6 text-center space-y-2">
                  <p className="text-4xl font-bold">10K+</p>
                  <p className="text-muted-foreground">Products</p>
                </CardContent>
              </Card>
              <Card className="bg-primary/5">
                <CardContent className="p-6 text-center space-y-2">
                  <p className="text-4xl font-bold">25K+</p>
                  <p className="text-muted-foreground">Happy Customers</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-12 text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Whether you're an artisan looking to share your craft or a buyer seeking unique products, FableCraft is your destination.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button size="lg" asChild>
                    <Link href="/auth/signup">Sign Up Now</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/products">Browse Products</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  )
}

