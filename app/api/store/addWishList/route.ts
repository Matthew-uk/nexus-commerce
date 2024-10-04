import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Wishlist from "@/models/wishlist";
import User from "@/models/user";
import Product from "@/models/product";

export async function POST(req: NextRequest) {
  const sessionToken = req.headers.get("Authorization")?.split(" ")[1];

  if (!sessionToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await req.json();

  if (!productId) {
    return NextResponse.json(
      { message: "Product ID is required" },
      { status: 400 },
    );
  }

  try {
    await connectToDatabase();

    // Fetch the user using the session token
    const user = await User.findOne({ token: sessionToken });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    // Find the wishlist for this user
    let wishlist = await Wishlist.findOne({ user: user._id });

    // If no wishlist exists, create one
    if (!wishlist) {
      wishlist = new Wishlist({ user: user._id, products: [] });
    }

    // Check if the product is already in the wishlist
    const productIndex = wishlist.products.indexOf(product._id);
    if (productIndex === -1) {
      // Add to wishlist
      wishlist.products.push(product._id);
    } else {
      // Remove from wishlist
      wishlist.products.splice(productIndex, 1);
    }

    await wishlist.save();

    return NextResponse.json({ message: "Wishlist updated" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
