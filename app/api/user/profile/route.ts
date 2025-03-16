import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import connectToDatabase from "@/lib/mongodb"
import User from "@/models/User"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "You must be logged in to view your profile" }, { status: 401 })
    }

    await connectToDatabase()

    const user = await User.findById(session.user.id).select("-password")

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "You must be logged in to update your profile" }, { status: 401 })
    }

    const body = await request.json()

    // Prevent updating email or role directly
    delete body.email
    delete body.role
    delete body.password

    await connectToDatabase()

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      { ...body },
      { new: true, runValidators: true },
    ).select("-password")

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Error updating user profile:", error)
    return NextResponse.json({ error: "Failed to update user profile" }, { status: 500 })
  }
}

