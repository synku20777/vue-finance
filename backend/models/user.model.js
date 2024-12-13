import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Enforces unique constraint
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Optional regex for email validation
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

const User = mongoose.model('User', userSchema)

export default User
