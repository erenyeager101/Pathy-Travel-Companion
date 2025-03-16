import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Package from "@/models/Package"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()

    const packageItem = await Package.findById(params.id)

    if (!packageItem) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }

    return NextResponse.json(packageItem)
  } catch (error) {
    console.error("Error fetching package:", error)
    return NextResponse.json({ error: "Failed to fetch package" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Only admins can update packages
    if (!session || session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Not authorized to update packages" }, { status: 403 })
    }

    const body = await request.json()

    await connectToDatabase()

    const packageItem = await Package.findById(params.id)

    if (!packageItem) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }

    // Update numeric price and duration if provided
    if (body.price) {
      body.numericPrice = Number.parseInt(body.price.replace(/[^0-9]/g, ""))
    }

    if (body.duration) {
      body.numericDuration = Number.parseInt(body.duration.replace(/[^0-9]/g, ""))
    }

    // Update package
    const updatedPackage = await Package.findByIdAndUpdate(params.id, { ...body }, { new: true, runValidators: true })

    return NextResponse.json(updatedPackage)
  } catch (error) {
    console.error("Error updating package:", error)
    return NextResponse.json({ error: "Failed to update package" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Only admins can delete packages
    if (!session || session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Not authorized to delete packages" }, { status: 403 })
    }

    await connectToDatabase()

    const packageItem = await Package.findById(params.id)

    if (!packageItem) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }

    await Package.findByIdAndDelete(params.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting package:", error)
    return NextResponse.json({ error: "Failed to delete package" }, { status: 500 })
  }
}

