import Link from "next/link"
import Image from "next/image"
import { Plane, Filter, MapPin, Clock, Users, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

export default function PackagesPage() {
  // Mock data for packages
  const packages = [
    {
      id: 1,
      title: "Bali Adventure Package",
      location: "Bali, Indonesia",
      image: "/placeholder-logo.jpg.?height=400&width=600",
      price: "INR 9,299",
      duration: "7 Days",
      groupSize: "Up to 10",
      discount: "20% OFF",
      rating: 4.8,
      description:
        "Experience the beauty of Bali with this all-inclusive package. Explore temples, beaches, and rice terraces.",
      activities: ["Snorkeling", "Temple Tours", "Rice Terrace Trekking", "Spa Treatment"],
    },
    {
      id: 2,
      title: "European Highlights Tour",
      location: "Multiple Cities, Europe",
      image: "/placeholder.svg?height=400&width=600",
      price: "INR 38,499",
      duration: "14 Days",
      groupSize: "Up to 20",
      discount: "15% OFF",
      rating: 4.7,
      description: "Visit the most iconic cities in Europe including Paris, Rome, Barcelona, and Amsterdam.",
      activities: ["City Tours", "Museum Visits", "Wine Tasting", "River Cruises"],
    },
    {
      id: 3,
      title: "Thailand Beach Getaway",
      location: "Phuket, Thailand",
      image: "/placeholder.svg?height=400&width=600",
      price: "INR 27,999",
      duration: "5 Days",
      groupSize: "Up to 8",
      discount: "25% OFF",
      rating: 4.9,
      description: "Relax on the beautiful beaches of Phuket with this perfect getaway package.",
      activities: ["Beach Time", "Island Hopping", "Thai Cooking Class", "Massage"],
    },
    {
      id: 4,
      title: "Japan Cherry Blossom Tour",
      location: "Tokyo, Kyoto, Osaka",
      image: "/placeholder.svg?height=400&width=600",
      price: "INR 42,799",
      duration: "10 Days",
      groupSize: "Up to 15",
      discount: "10% OFF",
      rating: 4.9,
      description:
        "Experience Japan during the beautiful cherry blossom season. Visit temples, gardens, and modern cities.",
      activities: ["Cherry Blossom Viewing", "Temple Visits", "Tea Ceremony", "Bullet Train Rides"],
    },
    {
      id: 5,
      title: "African Safari Adventure",
      location: "Kenya & Tanzania",
      image: "/placeholder.svg?height=400&width=600",
      price: "INR 33,499",
      duration: "8 Days",
      groupSize: "Up to 12",
      discount: "5% OFF",
      rating: 4.8,
      description: "Witness the incredible wildlife of Africa on this safari adventure through Kenya and Tanzania.",
      activities: ["Game Drives", "Maasai Village Visit", "Hot Air Balloon Ride", "Photography"],
    },
    {
      id: 6,
      title: "Greek Islands Cruise",
      location: "Santorini, Mykonos, Crete",
      image: "/placeholder.svg?height=400&width=600",
      price: "INR 41,899",
      duration: "7 Days",
      groupSize: "Up to 30",
      discount: "15% OFF",
      rating: 4.6,
      description: "Sail through the stunning Greek islands and experience the beauty of the Mediterranean.",
      activities: ["Island Exploration", "Swimming", "Greek Cuisine", "Archaeological Sites"],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Plane className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Pathify</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link href="/flights" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Flights
            </Link>
            <Link href="/hotels" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Hotels
            </Link>
            <Link href="/packages" className="text-sm font-medium">
              Packages
            </Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Register</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder-user.jpg?height=400&width=1920"
              alt="Travel packages"
              fill
              className="object-cover brightness-50"
              priority
            />
          </div>
          <div className="relative z-10 container py-16 md:py-24">
            <div className="max-w-2xl space-y-4 text-white">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Vacation Packages</h1>
              <p className="text-muted-100">
                Discover our curated collection of vacation packages. All-inclusive deals with flights, hotels, and
                activities.
              </p>
            </div>
          </div>
        </section>

        <section className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
            <div className="space-y-6">
              <div className="border rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-lg flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h3>
                <div className="space-y-2">
                  <h4 className="font-medium">Search</h4>
                  <Input placeholder="Search destinations..." />
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Price Range</h4>
                  <div className="space-y-4">
                    <Slider defaultValue={[1500]} max={5000} step={100} />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>$0</span>
                      <span>$5,000+</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Duration</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="duration-1" />
                      <label htmlFor="duration-1" className="text-sm">
                        1-3 Days
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="duration-2" defaultChecked />
                      <label htmlFor="duration-2" className="text-sm">
                        4-7 Days
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="duration-3" defaultChecked />
                      <label htmlFor="duration-3" className="text-sm">
                        8-14 Days
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="duration-4" />
                      <label htmlFor="duration-4" className="text-sm">
                        15+ Days
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Destinations</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dest-1" defaultChecked />
                      <label htmlFor="dest-1" className="text-sm">
                        Asia
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dest-2" defaultChecked />
                      <label htmlFor="dest-2" className="text-sm">
                        Europe
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dest-3" />
                      <label htmlFor="dest-3" className="text-sm">
                        North America
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dest-4" />
                      <label htmlFor="dest-4" className="text-sm">
                        South America
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dest-5" defaultChecked />
                      <label htmlFor="dest-5" className="text-sm">
                        Africa
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dest-6" />
                      <label htmlFor="dest-6" className="text-sm">
                        Oceania
                      </label>
                    </div>
                  </div>
                </div>
                <Button className="w-full">Apply Filters</Button>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Available Packages</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <select className="text-sm border rounded-md px-2 py-1">
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Duration: Short to Long</option>
                    <option>Duration: Long to Short</option>
                    <option>Rating: High to Low</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-60">
                      <Badge className="absolute top-4 right-4 z-10 bg-primary">{pkg.discount}</Badge>
                      <Image src={pkg.image || "/placeholder.jpg"} alt={pkg.title} fill className="object-cover" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-xl mb-2">{pkg.title}</h3>
                      <div className="flex items-center text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{pkg.location}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{pkg.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-primary" />
                          <span>{pkg.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-primary" />
                          <span>{pkg.groupSize}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-400" />
                          <span>{pkg.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center p-6 pt-0 border-t mt-6">
                      <div>
                        <span className="text-sm text-muted-foreground">From</span>
                        <p className="text-xl font-bold text-primary">{pkg.price}</p>
                      </div>
                      <Link href={`/packages/${pkg.id}`}>
                        <Button>View Details</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <div className="flex">
                  <Button variant="outline" size="icon" className="rounded-r-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-none bg-primary text-primary-foreground">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-none">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-none">
                    3
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-l-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/50">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Plane className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Pathify</span>
              </Link>
              <p className="text-sm text-muted-foreground mb-4 max-w-xs">
                Pathify helps you discover and book the perfect trip, with the best deals on flights, hotels, and
                vacation packages.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">Company</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">Support</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">Travel Services</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Flights
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Hotels
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Vacation Packages
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Cruise
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Car Rentals
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Pathify. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

