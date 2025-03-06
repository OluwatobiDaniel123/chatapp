import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  age: { type: Number, required: true },
  location: { type: String, required: true },
  bio: { type: String },
  image: { type: String },
  interests: { type: [String] },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const User = mongoose.model("User", UserSchema);

export default User;
