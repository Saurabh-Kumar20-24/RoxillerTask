import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 20, maxlength: 60 },
  email: { type: String, required: true, unique: true },
  password: { 
    type: String, 
    required: true,
   },
  address: { type: String, maxlength: 400 },
  role: { type: String, enum: ["admin", "user", "storeOwner"], default: "user" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
