import mongoose, { Schema, model } from "mongoose";

const roles = ["user", "teacher","admin"];

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: roles,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || model("User", userSchema);

export default User;
