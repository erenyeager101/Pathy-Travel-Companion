import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import connectToDatabase from "@/lib/mongodb"
import Booking from "@/models/Booking"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "You must be logged in to view booking details" }, { status: 401 })
    }

    await connectToDatabase()

    const booking = await Booking.findById(params.id)

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Check if the booking belongs to the logged-in user
    if (booking.user.toString() !== session.user.id) {
      return NextResponse.json({ error: "Not authorized to view this booking" }, { status: 403 })
    }

    return NextResponse.json(booking)
  } catch (error) {
    console.error("Error fetching booking:", error)
    return NextResponse.json({ error: "Failed to fetch booking" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "You must be logged in to update a booking" }, { status: 401 })
    }

    const body = await request.json()

    await connectToDatabase()

    const booking = await Booking.findById(params.id)

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Check if the booking belongs to the logged-in user
    if (booking.user.toString() !== session.user.id) {
      return NextResponse.json({ error: "Not authorized to update this booking" }, { status: 403 })
    }

    // Update booking
    const updatedBooking = await Booking.findByIdAndUpdate(params.id, { ...body }, { new: true, runValidators: true })

    return NextResponse.json(updatedBooking)
  } catch (error) {
    console.error("Error updating booking:", error)
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "You must be logged in to cancel a booking" }, { status: 401 })
    }

    await connectToDatabase()

    const booking = await Booking.findById(params.id)

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Check if the booking belongs to the logged-in user
    if (booking.user.toString() !== session.user.id) {
      return NextResponse.json({ error: "Not authorized to cancel this booking" }, { status: 403 })
    }

    // Instead of deleting, update status to cancelled
    const cancelledBooking = await Booking.findByIdAndUpdate(params.id, { status: "Cancelled" }, { new: true })

    return NextResponse.json(cancelledBooking)
  } catch (error) {
    console.error("Error cancelling booking:", error)
    return NextResponse.json({ error: "Failed to cancel booking" }, { status: 500 })
  }
}

