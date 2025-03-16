import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  image: {
    type: String,
    default: "/placeholder.svg?height=80&width=80",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  phone: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  paymentMethods: [
    {
      type: {
        type: String,
        enum: ["visa", "mastercard", "amex", "discover"],
      },
      lastFour: String,
      expiryMonth: Number,
      expiryYear: Number,
      isDefault: Boolean,
    },
  ],
  preferences: {
    emailNotifications: {
      bookingConfirmations: {
        type: Boolean,
        default: true,
      },
      specialOffers: {
        type: Boolean,
        default: true,
      },
      travelTips: {
        type: Boolean,
        default: false,
      },
    },
    shareHistory: {
      type: Boolean,
      default: true,
    },
  },
})

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Match password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.models.User || mongoose.model("User", UserSchema)

