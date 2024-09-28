import mongoose, { Schema, Document } from "mongoose";

interface IImage {
  preview: string;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: IImage[];
  createdAt: Date;
  updatedAt: Date;
  userId: Schema.Types.ObjectId;
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    // stock: {
    //   type: Number,
    //   required: true,
    //   min: 0,
    // },
    images: {
      type: [Object], // Array of image URLs
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Refers to the User model
      required: true,
      index: true, // Ensures efficient searching using this field
    },
  },
  {
    timestamps: true,
  },
);

// Middleware to update the updatedAt field before saving
// ProductSchema.pre<IProduct>("save", function (next) {
//   this.updatedAt = new Date();
//   next();
// });

// Prevent model overwrite during hot reloads in development
const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
