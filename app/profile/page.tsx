"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plane, User, CreditCard, Settings, LogOut, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("bookings")

  // Mock data for bookings
  const bookings = [
    {
      id: "B001",
      type: "Flight",
      title: "New York to London",
      date: "Mar 15, 2024",
      status: "Upcoming",
      image: "/placeholder.jpg?height=100&width=200",
      details: {
        departure: "JFK - 08:30 AM",
        arrival: "LHR - 08:45 PM",
        airline: "British Airways",
        flightNumber: "BA178",
      },
      price: "$749",
    },
    {
      id: "B002",
      type: "Hotel",
      title: "Hilton London",
      date: "Mar 15-22, 2024",
      status: "Upcoming",
      image: "/placeholder.jpg?height=100&width=200",
      details: {
        checkIn: "Mar 15, 3:00 PM",
        checkOut: "Mar 22, 12:00 PM",
        roomType: "Deluxe King",
        guests: "2 Adults",
      },
      price: "$1,890",
    },
    {
      id: "B003",
      type: "Package",
      title: "Bali Adventure Package",
      date: "Jan 10-17, 2024",
      status: "Completed",
      image: "/placeholder.jpg?height=100&width=200",
      details: {
        duration: "7 Days",
        accommodation: "Luxury Villa",
        activities: "Snorkeling, Hiking, Spa",
        transfers: "Included",
      },
      price: "$2,499",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
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
            <Link href="/packages" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Packages
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-10">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h2 className="text-xl font-bold">John Doe</h2>
                  <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                </div>
                <div className="w-full pt-4 border-t">
                  <nav className="flex flex-col space-y-1">
                    <Button
                      variant={activeTab === "bookings" ? "default" : "ghost"}
                      className="justify-start"
                      onClick={() => setActiveTab("bookings")}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      My Bookings
                    </Button>
                    <Button
                      variant={activeTab === "profile" ? "default" : "ghost"}
                      className="justify-start"
                      onClick={() => setActiveTab("profile")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button
                      variant={activeTab === "payment" ? "default" : "ghost"}
                      className="justify-start"
                      onClick={() => setActiveTab("payment")}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Payment Methods
                    </Button>
                    <Button
                      variant={activeTab === "settings" ? "default" : "ghost"}
                      className="justify-start"
                      onClick={() => setActiveTab("settings")}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                    <Button variant="ghost" className="justify-start text-red-500 hover:text-red-500 hover:bg-red-50">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </nav>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-6">
            {activeTab === "bookings" && (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">My Bookings</h2>
                  <Tabs defaultValue="all">
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                      <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <Card key={booking.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative h-48 md:h-auto md:w-48 shrink-0">
                          <Image
                            src={booking.image || "/placeholder.svg"}
                            alt={booking.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant={booking.status === "Upcoming" ? "default" : "secondary"}>
                              {booking.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">Booking ID: {booking.id}</span>
                          </div>
                          <h3 className="text-xl font-bold mb-1">{booking.title}</h3>
                          <div className="flex items-center text-muted-foreground mb-4">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span className="text-sm">{booking.date}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            {booking.type === "Flight" && (
                              <>
                                <div>
                                  <p className="text-sm font-medium">Departure</p>
                                  <p className="text-sm text-muted-foreground">{booking.details.departure}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Arrival</p>
                                  <p className="text-sm text-muted-foreground">{booking.details.arrival}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Airline</p>
                                  <p className="text-sm text-muted-foreground">{booking.details.airline}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Flight</p>
                                  <p className="text-sm text-muted-foreground">{booking.details.flightNumber}</p>
                                </div>
                              </>
                            )}
                            {booking.type === "Hotel" && (
                              <>
                                <div>
                                  <p className="text-sm font-medium">Check-in</p>
                                  <p className="text-sm text-muted-foreground">{booking.details.checkIn}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Check-out</p>
                                  <p className="text-sm text-muted-foreground">{booking.details.checkOut}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Room Type</p>
                                  <p className="text-sm text-muted-foreground">{booking.details.roomType}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Guests</p>
                                  <p className="text-sm text-muted-foreground">{booking.details.guests}</p>
                                </div>
                              </>
                            )}
                            {booking.type === "Package" && (
                              <>
                                <div>
                                  <p className="text-sm font-medium">Duration</p>
                                  <p className="text-sm text-muted-foreground">{booking.details.duration}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Accommodation</p>
                                  <p className="text-sm text-muted-foreground">{booking.details.accommodation}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Activities</p>
                                  <p className="text-sm text-muted-foreground">{booking.details.activities}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Transfers</p>
                                  <p className="text-sm text-muted-foreground">{booking.details.transfers}</p>
                                </div>
                              </>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">Total Price</p>
                              <p className="text-lg font-bold text-primary">{booking.price}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                              {booking.status === "Upcoming" && (
                                <Button variant="destructive" size="sm">
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="first-name" className="text-sm font-medium">
                        First name
                      </label>
                      <input
                        id="first-name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last-name" className="text-sm font-medium">
                        Last name
                      </label>
                      <input
                        id="last-name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue="Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue="john.doe@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="address" className="text-sm font-medium">
                      Address
                    </label>
                    <input
                      id="address"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue="123 Main St, New York, NY 10001"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="bio" className="text-sm font-medium">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue="Avid traveler and adventure seeker. Love exploring new cultures and cuisines around the world."
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            )}
            {activeTab === "payment" && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <CreditCard className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 04/2025</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500 hover:bg-red-50">
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <CreditCard className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Mastercard ending in 8888</p>
                        <p className="text-sm text-muted-foreground">Expires 09/2024</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500 hover:bg-red-50">
                        Remove
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Add New Payment Method
                  </Button>
                </CardContent>
              </Card>
            )}
            {activeTab === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Email Notifications</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p>Booking confirmations</p>
                        <p className="text-sm text-muted-foreground">Receive emails when you book a trip</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p>Special offers</p>
                        <p className="text-sm text-muted-foreground">Receive emails about deals and promotions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p>Travel tips</p>
                        <p className="text-sm text-muted-foreground">Receive emails with travel advice and tips</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Security</h3>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Two-Factor Authentication
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Privacy</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p>Share my travel history</p>
                        <p className="text-sm text-muted-foreground">
                          Allow us to use your travel history for personalized recommendations
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </main>
      <footer className="border-t bg-muted/50">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
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

