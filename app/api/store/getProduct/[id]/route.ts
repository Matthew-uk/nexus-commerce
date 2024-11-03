import connectToDatabase from "@/lib/mongoose";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose"; // Import mongoose for ObjectId

// GET request to fetch a single product by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase(); // Ensure the database is connected

    const productId = params.id; // Get the product ID from the URL params
    console.log(productId);

    // Check if a valid product ID was provided
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json({
        status: 400,
        message: "Invalid product ID",
        productId,
      });
    }

    // Fetch the product from the database by its ID
    const product = await Product.findById(productId);

    // If no product was found, return a 404 error
    if (!product) {
      return NextResponse.json({
        status: 404,
        message: "Product not found",
        productId,
      });
    }

    // Return the product as the response
    return NextResponse.json({
      status: 200,
      product,
      productId,
    });
  } catch (error: any) {
    console.error("Error fetching product:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
