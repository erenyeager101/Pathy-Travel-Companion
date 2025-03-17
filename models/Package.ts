import mongoose from "mongoose"

const PackageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "/placeholder.jpg?height=400&width=600",
  },
  price: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  groupSize: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    default: "",
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5,
  },
  description: {
    type: String,
    required: true,
  },
  activities: {
    type: [String],
    default: [],
  },
  includes: {
    type: [String],
    default: [],
  },
  excludes: {
    type: [String],
    default: [],
  },
  itinerary: [
    {
      day: Number,
      title: String,
      description: String,
      activities: [String],
      meals: {
        breakfast: Boolean,
        lunch: Boolean,
        dinner: Boolean,
      },
      accommodation: String,
    },
  ],
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Package || mongoose.model("Package", PackageSchema)

