import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Wishlist from "@/models/wishlist";
import User from "@/models/user";
import Product from "@/models/product";
import jwt from "jsonwebtoken";

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
    const decoded = jwt.verify(
      sessionToken,
      (process.env.JWT_SECRET as string) || "rasengan...",
    ) as { id: string };

    // Find the user by ID
    const user = await User.findById(decoded.id);

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

    // If no wishlist exists, return error
    if (!wishlist) {
      return NextResponse.json(
        { message: "Wishlist not found" },
        { status: 404 },
      );
    }

    // Check if the product is in the wishlist
    const productIndex = wishlist.products.indexOf(product._id);
    if (productIndex === -1) {
      return NextResponse.json(
        { message: "Product not in wishlist" },
        { status: 400 },
      );
    }

    // Remove the product from the wishlist
    wishlist.products.splice(productIndex, 1);

    await wishlist.save();

    return NextResponse.json(
      { message: "Product removed from wishlist" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
