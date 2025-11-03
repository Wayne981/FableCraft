'use client'

// Products browse page with filters
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Chatbot } from '@/components/chatbot'
import { ProductCard } from '@/components/product-card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Search, Filter } from 'lucide-react'

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    search: '',
    region: '',
    minPrice: '',
    maxPrice: '',
  })
  const [appliedFilters, setAppliedFilters] = useState(filters)

  const { data, isLoading } = useQuery({
    queryKey: ['products', appliedFilters],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (appliedFilters.search) params.append('search', appliedFilters.search)
      if (appliedFilters.region) params.append('region', appliedFilters.region)
      if (appliedFilters.minPrice) params.append('minPrice', appliedFilters.minPrice)
      if (appliedFilters.maxPrice) params.append('maxPrice', appliedFilters.maxPrice)

      const res = await fetch(`/api/products?${params}`)
      if (!res.ok) throw new Error('Failed to fetch products')
      return res.json()
    },
  })

  const handleApplyFilters = () => {
    setAppliedFilters(filters)
  }

  const handleResetFilters = () => {
    setFilters({
      search: '',
      region: '',
      minPrice: '',
      maxPrice: '',
    })
    setAppliedFilters({
      search: '',
      region: '',
      minPrice: '',
      maxPrice: '',
    })
  }

  const regions = [
    'All Regions',
    'Asia',
    'Africa',
    'Europe',
    'South America',
    'North America',
    'Oceania',
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Discover Artisan Products</h1>
          <p className="text-muted-foreground">
            Browse unique handmade products from artisans across India
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card border rounded-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Select
                value={filters.region}
                onValueChange={(value) =>
                  setFilters({ ...filters, region: value === 'All Regions' ? '' : value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="minPrice">Min Price</Label>
              <Input
                id="minPrice"
                type="number"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters({ ...filters, minPrice: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxPrice">Max Price</Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="1000"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={handleApplyFilters}>Apply Filters</Button>
            <Button variant="outline" onClick={handleResetFilters}>
              Reset
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="text-center py-12">Loading products...</div>
        ) : data?.products?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.products?.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
      <Chatbot />
    </div>
  )
}

