import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user"; // Assuming user model is in the same directory
import { IProduct } from "./product"; // Assuming product model is in the same directory

export interface IWishlist extends Document {
  user: IUser["_id"];
  products: IProduct["_id"][];
}

const wishlistSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true },
);

export default mongoose.models.Wishlist ||
  mongoose.model<IWishlist>("Wishlist", wishlistSchema);
