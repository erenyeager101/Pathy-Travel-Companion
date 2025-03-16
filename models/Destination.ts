import mongoose from "mongoose"

const DestinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    default: "/placeholder.svg?height=400&width=600",
  },
  price: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5,
  },
  continent: {
    type: String,
    enum: ["Asia", "Europe", "North America", "South America", "Africa", "Oceania", "Antarctica"],
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Destination || mongoose.model("Destination", DestinationSchema)

