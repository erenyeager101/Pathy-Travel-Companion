import Image from "next/image"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"

export function FeaturedDestinations() {
  const destinations = [
    {
      id: 1,
      name: "Goa, India",
      image: "/placeholder-user.jpg?height=400&width=600",
      price: "INR 12,899",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Shimla, India",
      image: "/shimla.jpg?height=400&width=600",
      price: "INR 9,299",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Kullu-Manali, India",
      image: "/kullu.jpg?height=400&width=600",
      price: "INR 11,199",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Bali, Indonesia",
      image: "/bali.jpg?height=400&width=600",
      price: "INR 31,499",
      rating: 4.8,
    },
    {
      id: 5,
      name: "Dubai, UAE",
      image: "/dubai.jpg?height=400&width=600",
      price: "INR 81,099",
      rating: 4.6,
    },
    {
      id: 6,
      name: "Maldives",
      image: "/maldives1.jpg?height=400&width=600",
      price: "INR 31,899",
      rating: 4.9,
    },
    {
      id: 7,
      name: "Jammu-kashmir, India",
      image: "/jammu.jpg?height=400&width=600",
      price: "INR 21,899",  
      rating: 4.9,


    },
    {
      id: 8,
      name: "Kerala, India",
      image: "/kerala.jpg?height=400&width=600",
      price: "INR 15,899",
      rating: 4.8,
    },
    {
      id: 9,
      name: "Andaman & Nicobar, India",
      image: "/andaman.jpg?height=400&width=600",
      price: "INR 17,899",
      rating: 4.7,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {destinations.map((destination) => (
        <Link href={`/destinations/INR {destination.id}`} key={destination.id}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-60">
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{destination.name}</h3>
                <span className="text-primary font-medium">{destination.price}</span>
              </div>
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={i < Math.floor(destination.rating) ? "currentColor" : "none"}
                      stroke="currentColor"
                      className={`h-4 w-4 INR {i < Math.floor(destination.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2">{destination.rating} (120+ reviews)</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

