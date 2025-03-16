import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import User from "@/models/User"
import Package from "@/models/Package"
import Destination from "@/models/Destination"
import Booking from "@/models/Booking"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    // This endpoint should only be accessible in development
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "This endpoint is not available in production" }, { status: 403 })
    }

    await connectToDatabase()

    // Clear existing data
    await User.deleteMany({})
    await Package.deleteMany({})
    await Destination.deleteMany({})
    await Booking.deleteMany({})

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 10)
    const admin = await User.create({
      name: "Admin User",
      email: "admin@pathify.com",
      password: adminPassword,
      role: "admin",
    })

    // Create regular user
    const userPassword = await bcrypt.hash("user123", 10)
    const user = await User.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password: userPassword,
      image: "/placeholder.svg?height=80&width=80",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
      bio: "Avid traveler and adventure seeker. Love exploring new cultures and cuisines around the world.",
      paymentMethods: [
        {
          type: "visa",
          lastFour: "4242",
          expiryMonth: 4,
          expiryYear: 2025,
          isDefault: true,
        },
        {
          type: "mastercard",
          lastFour: "8888",
          expiryMonth: 9,
          expiryYear: 2024,
          isDefault: false,
        },
      ],
      preferences: {
        emailNotifications: {
          bookingConfirmations: true,
          specialOffers: true,
          travelTips: false,
        },
        shareHistory: true,
      },
    })

    // Create destinations
    const destinations = await Destination.insertMany([
      {
        name: "Bali, Indonesia",
        image: "/placeholder.svg?height=400&width=600",
        price: "$899",
        rating: 4.8,
        continent: "Asia",
        country: "Indonesia",
        description: "Experience the beauty of Bali with pristine beaches, lush rice terraces, and vibrant culture.",
        featured: true,
      },
      {
        name: "Paris, France",
        image: "/placeholder.svg?height=400&width=600",
        price: "$1,299",
        rating: 4.9,
        continent: "Europe",
        country: "France",
        description:
          "Discover the romance of Paris with its iconic landmarks, world-class cuisine, and artistic heritage.",
        featured: true,
      },
      {
        name: "Santorini, Greece",
        image: "/placeholder.svg?height=400&width=600",
        price: "$1,199",
        rating: 4.7,
        continent: "Europe",
        country: "Greece",
        description: "Explore the stunning white-washed buildings and breathtaking sunsets of Santorini.",
        featured: true,
      },
      {
        name: "Tokyo, Japan",
        image: "/placeholder.svg?height=400&width=600",
        price: "$1,499",
        rating: 4.8,
        continent: "Asia",
        country: "Japan",
        description: "Immerse yourself in the unique blend of traditional culture and futuristic technology in Tokyo.",
        featured: true,
      },
      {
        name: "New York, USA",
        image: "/placeholder.svg?height=400&width=600",
        price: "$1,099",
        rating: 4.6,
        continent: "North America",
        country: "United States",
        description:
          "Experience the energy of the city that never sleeps with its iconic skyline and diverse neighborhoods.",
        featured: true,
      },
      {
        name: "Maldives",
        image: "/placeholder.svg?height=400&width=600",
        price: "$1,899",
        rating: 4.9,
        continent: "Asia",
        country: "Maldives",
        description: "Relax in paradise with crystal clear waters, overwater bungalows, and pristine beaches.",
        featured: true,
      },
    ])

    // Create packages
    const packages = await Package.insertMany([
      {
        title: "Bali Adventure Package",
        location: "Bali, Indonesia",
        image: "/placeholder.svg?height=400&width=600",
        price: "$1,299",
        numericPrice: 1299,
        duration: "7 Days",
        numericDuration: 7,
        groupSize: "Up to 10",
        discount: "20% OFF",
        rating: 4.8,
        description:
          "Experience the beauty of Bali with this all-inclusive package. Explore temples, beaches, and rice terraces.",
        activities: ["Snorkeling", "Temple Tours", "Rice Terrace Trekking", "Spa Treatment"],
        includes: ["Accommodation", "Daily Breakfast", "Airport Transfers", "Guided Tours"],
        excludes: ["International Flights", "Travel Insurance", "Personal Expenses"],
        itinerary: [
          {
            day: 1,
            title: "Arrival in Bali",
            description: "Arrive at Denpasar International Airport and transfer to your hotel in Ubud.",
            activities: ["Airport Pickup", "Hotel Check-in", "Welcome Dinner"],
            meals: {
              breakfast: false,
              lunch: false,
              dinner: true,
            },
            accommodation: "Luxury Villa in Ubud",
          },
          {
            day: 2,
            title: "Ubud Exploration",
            description: "Explore the cultural heart of Bali with visits to temples and rice terraces.",
            activities: ["Tegalalang Rice Terrace", "Ubud Monkey Forest", "Traditional Dance Performance"],
            meals: {
              breakfast: true,
              lunch: true,
              dinner: true,
            },
            accommodation: "Luxury Villa in Ubud",
          },
        ],
        featured: true,
      },
      {
        title: "European Highlights Tour",
        location: "Multiple Cities, Europe",
        image: "/placeholder.svg?height=400&width=600",
        price: "$2,499",
        numericPrice: 2499,
        duration: "14 Days",
        numericDuration: 14,
        groupSize: "Up to 20",
        discount: "15% OFF",
        rating: 4.7,
        description: "Visit the most iconic cities in Europe including Paris, Rome, Barcelona, and Amsterdam.",
        activities: ["City Tours", "Museum Visits", "Wine Tasting", "River Cruises"],
        featured: true,
      },
      {
        title: "Thailand Beach Getaway",
        location: "Phuket, Thailand",
        image: "/placeholder.svg?height=400&width=600",
        price: "$999",
        numericPrice: 999,
        duration: "5 Days",
        numericDuration: 5,
        groupSize: "Up to 8",
        discount: "25% OFF",
        rating: 4.9,
        description: "Relax on the beautiful beaches of Phuket with this perfect getaway package.",
        activities: ["Beach Time", "Island Hopping", "Thai Cooking Class", "Massage"],
        featured: true,
      },
    ])

    // Create bookings for the user
    const bookings = await Booking.insertMany([
      {
        user: user._id,
        type: "Flight",
        title: "New York to London",
        date: "Mar 15, 2024",
        status: "Upcoming",
        image: "/placeholder.svg?height=100&width=200",
        details: {
          departure: "JFK - 08:30 AM",
          arrival: "LHR - 08:45 PM",
          airline: "British Airways",
          flightNumber: "BA178",
        },
        price: "$749",
      },
      {
        user: user._id,
        type: "Hotel",
        title: "Hilton London",
        date: "Mar 15-22, 2024",
        status: "Upcoming",
        image: "/placeholder.svg?height=100&width=200",
        details: {
          checkIn: "Mar 15, 3:00 PM",
          checkOut: "Mar 22, 12:00 PM",
          roomType: "Deluxe King",
          guests: "2 Adults",
        },
        price: "$1,890",
      },
      {
        user: user._id,
        type: "Package",
        title: "Bali Adventure Package",
        date: "Jan 10-17, 2024",
        status: "Completed",
        image: "/placeholder.svg?height=100&width=200",
        details: {
          duration: "7 Days",
          accommodation: "Luxury Villa",
          activities: "Snorkeling, Hiking, Spa",
          transfers: "Included",
        },
        price: "$2,499",
      },
    ])

    return NextResponse.json({
      success: true,
      data: {
        users: [admin, user],
        destinations: destinations.length,
        packages: packages.length,
        bookings: bookings.length,
      },
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}

