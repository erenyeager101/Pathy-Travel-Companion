import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../auth/[...nextauth]/route"
import connectToDatabase from "@/lib/mongodb"
import User from "@/models/User"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "You must be logged in to update a payment method" }, { status: 401 })
    }

    const body = await request.json()
    const { isDefault } = body

    await connectToDatabase()

    const user = await User.findById(session.user.id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Find the payment method
    const paymentMethod = user.paymentMethods.id(params.id)

    if (!paymentMethod) {
      return NextResponse.json({ error: "Payment method not found" }, { status: 404 })
    }

    // If setting as default, unset other default payment methods
    if (isDefault) {
      user.paymentMethods.forEach((pm) => {
        pm.isDefault = false
      })
    }

    // Update payment method
    Object.assign(paymentMethod, body)
    await user.save()

    return NextResponse.json(paymentMethod)
  } catch (error) {
    console.error("Error updating payment method:", error)
    return NextResponse.json({ error: "Failed to update payment method" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "You must be logged in to delete a payment method" }, { status: 401 })
    }

    await connectToDatabase()

    const user = await User.findById(session.user.id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Find the payment method
    const paymentMethod = user.paymentMethods.id(params.id)

    if (!paymentMethod) {
      return NextResponse.json({ error: "Payment method not found" }, { status: 404 })
    }

    // Check if it's the default payment method
    if (paymentMethod.isDefault && user.paymentMethods.length > 1) {
      // Set another payment method as default
      const anotherPaymentMethod = user.paymentMethods.find((pm) => pm._id.toString() !== params.id)
      if (anotherPaymentMethod) {
        anotherPaymentMethod.isDefault = true
      }
    }

    // Remove the payment method
    user.paymentMethods.pull(params.id)
    await user.save()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting payment method:", error)
    return NextResponse.json({ error: "Failed to delete payment method" }, { status: 500 })
  }
}

