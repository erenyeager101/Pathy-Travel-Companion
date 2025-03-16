import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Please provide all required fields" }, { status: 400 })
    }

    await connectToDatabase()

    // Check if user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    })

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

