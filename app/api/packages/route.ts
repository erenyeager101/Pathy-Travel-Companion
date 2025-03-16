import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Package from "@/models/Package"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET(request: Request) {
  try {
    await connectToDatabase()

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const duration = searchParams.get("duration")
    const location = searchParams.get("location")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const page = Number.parseInt(searchParams.get("page") || "1")

    // Build query
    const query: any = {}
    if (featured === "true") query.featured = true
    if (location) query.location = { $regex: location, $options: "i" }

    // Price filtering (assuming price is stored as a number)
    if (minPrice || maxPrice) {
      query.numericPrice = {}
      if (minPrice) query.numericPrice.$gte = Number.parseInt(minPrice)
      if (maxPrice) query.numericPrice.$lte = Number.parseInt(maxPrice)
    }

    // Duration filtering
    if (duration) {
      const [min, max] = duration.split("-")
      if (min && max) {
        query.numericDuration = { $gte: Number.parseInt(min), $lte: Number.parseInt(max) }
      }
    }

    // Calculate pagination
    const skip = (page - 1) * limit

    // Get total count for pagination
    const total = await Package.countDocuments(query)

    // Get packages
    const packages = await Package.find(query).sort({ featured: -1, createdAt: -1 }).skip(skip).limit(limit)

    return NextResponse.json({
      packages,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching packages:", error)
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Only admins can create packages
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Not authorized to create packages" }, { status: 403 })
    }

    const body = await request.json()

    // Validate the package data
    if (!body.title || !body.location || !body.price || !body.duration) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await connectToDatabase()

    // Create numeric price for filtering
    const numericPrice = Number.parseInt(body.price.replace(/[^0-9]/g, ""))

    // Create numeric duration for filtering
    const numericDuration = Number.parseInt(body.duration.replace(/[^0-9]/g, ""))

    // Create new package
    const newPackage = await Package.create({
      ...body,
      numericPrice,
      numericDuration,
    })

    return NextResponse.json(newPackage, { status: 201 })
  } catch (error) {
    console.error("Error creating package:", error)
    return NextResponse.json({ error: "Failed to create package" }, { status: 500 })
  }
}

