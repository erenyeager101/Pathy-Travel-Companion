import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import connectToDatabase from "@/lib/mongodb"
import Booking from "@/models/Booking"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "You must be logged in to view bookings" }, { status: 401 })
    }

    await connectToDatabase()

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const type = searchParams.get("type")

    // Build query
    const query: any = { user: session.user.id }
    if (status) query.status = status
    if (type) query.type = type

    const bookings = await Booking.find(query).sort({ createdAt: -1 })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "You must be logged in to create a booking" }, { status: 401 })
    }

    const body = await request.json()

    // Validate the booking data
    if (!body.type || !body.title || !body.date || !body.details || !body.price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await connectToDatabase()

    // Create new booking
    const newBooking = await Booking.create({
      user: session.user.id,
      type: body.type,
      title: body.title,
      date: body.date,
      status: body.status || "Upcoming",
      image: body.image || "/placeholder.svg?height=100&width=200",
      details: body.details,
      price: body.price,
    })

    return NextResponse.json(newBooking, { status: 201 })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}

