import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, MapPin, Plane, Search, Ship, Train, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { FeaturedDestinations } from "@/components/featured-destinations"
import { PopularPackages } from "@/components/popular-packages"
import { Testimonials } from "@/components/testimonials"
import { Newsletter } from "@/components/newsletter"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Plane className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Pathify</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="/flights" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Flights
            </Link>
            <Link href="/hotels" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Hotels
            </Link>
            <Link href="/packages" className="text-sm font-medium text-muted-foreground hover:text-foreground">
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
              src="/placeholder.svg?height=800&width=1920"
              alt="Travel destination"
              fill
              className="object-cover brightness-50"
              priority
            />
          </div>
          <div className="relative z-10 container py-24 md:py-32">
            <div className="max-w-md space-y-4 text-white">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Discover Your Perfect Journey</h1>
              <p className="text-muted-100">
                Explore the world with Pathify. Find and book the best deals on flights, hotels, and vacation packages.
              </p>
            </div>
            <Card className="mt-8 max-w-4xl mx-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
              <CardContent className="p-0">
                <Tabs defaultValue="flights" className="w-full">
                  <TabsList className="w-full grid grid-cols-4 h-auto p-0 bg-transparent">
                    <TabsTrigger
                      value="flights"
                      className="data-[state=active]:bg-background rounded-none py-3 border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
                    >
                      <Plane className="h-4 w-4 mr-2" />
                      Flights
                    </TabsTrigger>
                    <TabsTrigger
                      value="hotels"
                      className="data-[state=active]:bg-background rounded-none py-3 border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Hotels
                    </TabsTrigger>
                    <TabsTrigger
                      value="trains"
                      className="data-[state=active]:bg-background rounded-none py-3 border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
                    >
                      <Train className="h-4 w-4 mr-2" />
                      Trains
                    </TabsTrigger>
                    <TabsTrigger
                      value="cruises"
                      className="data-[state=active]:bg-background rounded-none py-3 border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
                    >
                      <Ship className="h-4 w-4 mr-2" />
                      Cruises
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="flights" className="p-6">
                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="grid gap-2">
                        <label htmlFor="from" className="text-sm font-medium">
                          From
                        </label>
                        <Input id="from" placeholder="City or Airport" />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="to" className="text-sm font-medium">
                          To
                        </label>
                        <Input id="to" placeholder="City or Airport" />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="dates" className="text-sm font-medium">
                          Dates
                        </label>
                        <DatePickerWithRange />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="travelers" className="text-sm font-medium">
                          Travelers
                        </label>
                        <div className="flex items-center border rounded-md px-3 h-10">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">2 Adults</span>
                        </div>
                      </div>
                    </div>
                    <Button className="mt-4 w-full">
                      Search Flights
                      <Search className="ml-2 h-4 w-4" />
                    </Button>
                  </TabsContent>
                  <TabsContent value="hotels" className="p-6">
                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="grid gap-2 md:col-span-2">
                        <label htmlFor="destination" className="text-sm font-medium">
                          Destination
                        </label>
                        <Input id="destination" placeholder="City or Hotel" />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="check-in" className="text-sm font-medium">
                          Check-in / Check-out
                        </label>
                        <DatePickerWithRange />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="guests" className="text-sm font-medium">
                          Guests
                        </label>
                        <div className="flex items-center border rounded-md px-3 h-10">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">2 Guests, 1 Room</span>
                        </div>
                      </div>
                    </div>
                    <Button className="mt-4 w-full">
                      Search Hotels
                      <Search className="ml-2 h-4 w-4" />
                    </Button>
                  </TabsContent>
                  <TabsContent value="trains" className="p-6">
                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="grid gap-2">
                        <label htmlFor="from-station" className="text-sm font-medium">
                          From
                        </label>
                        <Input id="from-station" placeholder="City or Station" />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="to-station" className="text-sm font-medium">
                          To
                        </label>
                        <Input id="to-station" placeholder="City or Station" />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="departure" className="text-sm font-medium">
                          Departure Date
                        </label>
                        <div className="flex items-center border rounded-md px-3 h-10">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">Select Date</span>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="train-class" className="text-sm font-medium">
                          Class
                        </label>
                        <Input id="train-class" placeholder="All Classes" />
                      </div>
                    </div>
                    <Button className="mt-4 w-full">
                      Search Trains
                      <Search className="ml-2 h-4 w-4" />
                    </Button>
                  </TabsContent>
                  <TabsContent value="cruises" className="p-6">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="grid gap-2">
                        <label htmlFor="cruise-destination" className="text-sm font-medium">
                          Destination
                        </label>
                        <Input id="cruise-destination" placeholder="Any Destination" />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="cruise-dates" className="text-sm font-medium">
                          Departure Date
                        </label>
                        <DatePickerWithRange />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="cruise-length" className="text-sm font-medium">
                          Cruise Length
                        </label>
                        <Input id="cruise-length" placeholder="Any Length" />
                      </div>
                    </div>
                    <Button className="mt-4 w-full">
                      Search Cruises
                      <Search className="ml-2 h-4 w-4" />
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container py-12 md:py-24">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Popular Destinations</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our most popular destinations and find your next adventure
              </p>
            </div>
          </div>
          <FeaturedDestinations />
        </section>

        <section className="container py-12 md:py-24 bg-muted/50">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Special Offers</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover our best deals and exclusive packages
              </p>
            </div>
          </div>
          <PopularPackages />
          <div className="flex justify-center mt-10">
            <Link href="/packages">
              <Button variant="outline" size="lg" className="gap-2">
                View All Packages
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="container py-12 md:py-24">
          <Testimonials />
        </section>

        <section className="bg-primary text-primary-foreground">
          <div className="container py-12 md:py-24">
            <Newsletter />
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

