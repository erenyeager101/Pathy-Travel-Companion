import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import connectToDatabase from "@/lib/mongodb"
import User from "@/models/User"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "You must be logged in to view your payment methods" }, { status: 401 })
    }

    await connectToDatabase()

    const user = await User.findById(session.user.id).select("paymentMethods")

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user.paymentMethods)
  } catch (error) {
    console.error("Error fetching payment methods:", error)
    return NextResponse.json({ error: "Failed to fetch payment methods" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "You must be logged in to add a payment method" }, { status: 401 })
    }

    const body = await request.json()
    const { type, lastFour, expiryMonth, expiryYear } = body

    if (!type || !lastFour || !expiryMonth || !expiryYear) {
      return NextResponse.json({ error: "All payment method details are required" }, { status: 400 })
    }

    await connectToDatabase()

    const user = await User.findById(session.user.id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Add new payment method
    const newPaymentMethod = {
      type,
      lastFour,
      expiryMonth,
      expiryYear,
      isDefault: user.paymentMethods.length === 0, // Make default if first payment method
    }

    user.paymentMethods.push(newPaymentMethod)
    await user.save()

    return NextResponse.json(newPaymentMethod, { status: 201 })
  } catch (error) {
    console.error("Error adding payment method:", error)
    return NextResponse.json({ error: "Failed to add payment method" }, { status: 500 })
  }
}

