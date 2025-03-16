"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import connectToDatabase from "@/lib/mongodb"
import User from "@/models/User"
import Booking from "@/models/Booking"
import bcrypt from "bcryptjs"

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirm-password") as string

  // Validate input
  if (!name || !email || !password || !confirmPassword) {
    return { error: "All fields are required" }
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" }
  }

  try {
    await connectToDatabase()

    // Check if user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      return { error: "User with this email already exists" }
    }

    // Create user
    await User.create({
      name,
      email,
      password,
    })

    redirect("/login?registered=true")
  } catch (error) {
    console.error("Registration error:", error)
    return { error: "Failed to register user" }
  }
}

export async function updateProfile(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return { error: "You must be logged in to update your profile" }
  }

  const name = formData.get("name") as string
  const phone = formData.get("phone") as string
  const address = formData.get("address") as string
  const bio = formData.get("bio") as string

  try {
    await connectToDatabase()

    await User.findByIdAndUpdate(session.user.id, {
      name,
      phone,
      address,
      bio,
    })

    revalidatePath("/profile")
    return { success: true }
  } catch (error) {
    console.error("Update profile error:", error)
    return { error: "Failed to update profile" }
  }
}

export async function changePassword(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return { error: "You must be logged in to change your password" }
  }

  const currentPassword = formData.get("current-password") as string
  const newPassword = formData.get("new-password") as string
  const confirmPassword = formData.get("confirm-password") as string

  // Validate input
  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "All fields are required" }
  }

  if (newPassword !== confirmPassword) {
    return { error: "New passwords do not match" }
  }

  try {
    await connectToDatabase()

    // Get user with password
    const user = await User.findById(session.user.id).select("+password")

    if (!user) {
      return { error: "User not found" }
    }

    // Check if current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password)

    if (!isMatch) {
      return { error: "Current password is incorrect" }
    }

    // Update password
    user.password = newPassword
    await user.save()

    return { success: true }
  } catch (error) {
    console.error("Change password error:", error)
    return { error: "Failed to change password" }
  }
}

export async function updatePreferences(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return { error: "You must be logged in to update your preferences" }
  }

  const bookingConfirmations = formData.get("booking-confirmations") === "on"
  const specialOffers = formData.get("special-offers") === "on"
  const travelTips = formData.get("travel-tips") === "on"
  const shareHistory = formData.get("share-history") === "on"

  try {
    await connectToDatabase()

    await User.findByIdAndUpdate(session.user.id, {
      "preferences.emailNotifications.bookingConfirmations": bookingConfirmations,
      "preferences.emailNotifications.specialOffers": specialOffers,
      "preferences.emailNotifications.travelTips": travelTips,
      "preferences.shareHistory": shareHistory,
    })

    revalidatePath("/profile")
    return { success: true }
  } catch (error) {
    console.error("Update preferences error:", error)
    return { error: "Failed to update preferences" }
  }
}

export async function createBooking(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return { error: "You must be logged in to create a booking" }
  }

  const type = formData.get("type") as string
  const title = formData.get("title") as string
  const date = formData.get("date") as string
  const price = formData.get("price") as string
  const detailsJson = formData.get("details") as string

  // Validate input
  if (!type || !title || !date || !price || !detailsJson) {
    return { error: "All fields are required" }
  }

  try {
    const details = JSON.parse(detailsJson)

    await connectToDatabase()

    // Create new booking
    await Booking.create({
      user: session.user.id,
      type,
      title,
      date,
      status: "Upcoming",
      image: "/placeholder.svg?height=100&width=200",
      details,
      price,
    })

    revalidatePath("/profile")
    redirect("/profile")
  } catch (error) {
    console.error("Create booking error:", error)
    return { error: "Failed to create booking" }
  }
}

export async function cancelBooking(bookingId: string) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return { error: "You must be logged in to cancel a booking" }
  }

  try {
    await connectToDatabase()

    const booking = await Booking.findById(bookingId)

    if (!booking) {
      return { error: "Booking not found" }
    }

    // Check if the booking belongs to the logged-in user
    if (booking.user.toString() !== session.user.id) {
      return { error: "Not authorized to cancel this booking" }
    }

    // Update status to cancelled
    await Booking.findByIdAndUpdate(bookingId, { status: "Cancelled" })

    revalidatePath("/profile")
    return { success: true }
  } catch (error) {
    console.error("Cancel booking error:", error)
    return { error: "Failed to cancel booking" }
  }
}

