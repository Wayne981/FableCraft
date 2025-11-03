'use client'

// Map component using React Leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Fix for default marker icon
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

interface MapComponentProps {
  products: Array<{
    id: string
    title: string
    description: string
    price: number
    region: string
    latitude: number
    longitude: number
    artisan: {
      name: string | null
    }
  }>
}

export default function MapComponent({ products }: MapComponentProps) {
  // Default center (world view)
  const center: [number, number] = [20, 0]
  const zoom = 2

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {products.map((product) => (
          <Marker
            key={product.id}
            position={[product.latitude, product.longitude]}
            icon={icon}
          >
            <Popup maxWidth={300}>
              <div className="p-2 space-y-2">
                <h3 className="font-semibold text-base">{product.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {product.region}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  by {product.artisan.name}
                </p>
                <Button asChild size="sm" className="w-full mt-2">
                  <Link href={`/products/${product.id}`}>View Details</Link>
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

