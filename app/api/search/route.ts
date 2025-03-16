import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Package from "@/models/Package"
import Destination from "@/models/Destination"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 })
    }

    await connectToDatabase()

    // Search packages
    const packages = await Package.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    }).limit(5)

    // Search destinations
    const destinations = await Destination.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { country: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    }).limit(5)

    return NextResponse.json({
      packages,
      destinations,
    })
  } catch (error) {
    console.error("Error searching:", error)
    return NextResponse.json({ error: "Failed to perform search" }, { status: 500 })
  }
}

