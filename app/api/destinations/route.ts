import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Destination from "@/models/Destination"

export async function GET(request: Request) {
  try {
    await connectToDatabase()

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")
    const continent = searchParams.get("continent")
    const country = searchParams.get("country")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const page = Number.parseInt(searchParams.get("page") || "1")

    // Build query
    const query: any = {}
    if (featured === "true") query.featured = true
    if (continent) query.continent = continent
    if (country) query.country = { $regex: country, $options: "i" }

    // Calculate pagination
    const skip = (page - 1) * limit

    // Get total count for pagination
    const total = await Destination.countDocuments(query)

    // Get destinations
    const destinations = await Destination.find(query).sort({ featured: -1, createdAt: -1 }).skip(skip).limit(limit)

    return NextResponse.json({
      destinations,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching destinations:", error)
    return NextResponse.json({ error: "Failed to fetch destinations" }, { status: 500 })
  }
}

