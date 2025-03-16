import mongoose from "mongoose"

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["Flight", "Hotel", "Package", "Train", "Cruise"],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Upcoming", "Completed", "Cancelled"],
    default: "Upcoming",
  },
  image: {
    type: String,
    default: "/placeholder.svg?height=100&width=200",
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema)

