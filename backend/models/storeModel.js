import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ratings: [
    { user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, rating: { type: Number, min: 1, max: 5 } }
  ]
},{timestamps: true,  toJSON: { virtuals: true }, toObject: { virtuals: true }});

storeSchema.virtual("averageRating").get(function () {
  if (this.ratings.length === 0) return 0;
  return this.ratings.reduce((a, b) => a + b.rating, 0) / this.ratings.length;
});

const Store = mongoose.model("Store", storeSchema);
export default Store;
