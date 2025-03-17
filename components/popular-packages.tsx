import Image from "next/image"
import Link from "next/link"
import { Clock, MapPin, Users } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function PopularPackages() {
  const packages = [
    {
      id: 1,
      title: "Bali Adventure Package",
      location: "Bali, Indonesia",
      image: "/bali.jpg?height=400&width=600",
      price: "INR 31,299",
      duration: "7 Days",
      groupSize: "Up to 10",
      discount: "20% OFF",
    },
    {
      id: 2,
      title: "Andman Island Hopping",
      location: "Andman Islands, India",
      image: "/andaman.jpg?height=400&width=600",
      price: "INR 22,499",
      duration: "14 Days",
      groupSize: "Up to 20",
      discount: "15% OFF",
    },
    {
      id: 3,
      title: "Thailand Beach Getaway",
      location: "Phuket, Thailand",
      image: "/thailand.jpg?height=400&width=600",
      price: "INR 49,999",
      duration: "5 Days",
      groupSize: "Up to 8",
      discount: "25% OFF",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {packages.map((pkg) => (
        <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative h-60">
            <Badge className="absolute top-4 right-4 z-10 bg-primary">{pkg.discount}</Badge>
            <Image src={pkg.image || "/placeholder.svg"} alt={pkg.title} fill className="object-cover" />
          </div>
          <CardContent className="p-6">
            <h3 className="font-semibold text-xl mb-2">{pkg.title}</h3>
            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{pkg.location}</span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-primary" />
                <span>{pkg.duration}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-primary" />
                <span>{pkg.groupSize}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center p-6 pt-0 border-t mt-6">
            <div>
              <span className="text-sm text-muted-foreground">From</span>
              <p className="text-xl font-bold text-primary">{pkg.price}</p>
            </div>
            <Link href={`/packages/INR {pkg.id}`}>
              <Button>View Details</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

