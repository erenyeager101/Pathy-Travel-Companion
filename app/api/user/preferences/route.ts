import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import connectToDatabase from "@/lib/mongodb"
import User from "@/models/User"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "You must be logged in to view your preferences" }, { status: 401 })
    }

    await connectToDatabase()

    const user = await User.findById(session.user.id).select("preferences")

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user.preferences)
  } catch (error) {
    console.error("Error fetching preferences:", error)
    return NextResponse.json({ error: "Failed to fetch preferences" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "You must be logged in to update your preferences" }, { status: 401 })
    }

    const body = await request.json()

    await connectToDatabase()

    const user = await User.findById(session.user.id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update preferences
    user.preferences = {
      ...user.preferences,
      ...body,
    }

    await user.save()

    return NextResponse.json(user.preferences)
  } catch (error) {
    console.error("Error updating preferences:", error)
    return NextResponse.json({ error: "Failed to update preferences" }, { status: 500 })
  }
}

