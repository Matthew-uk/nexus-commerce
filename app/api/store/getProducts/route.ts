import connectToDatabase from "@/lib/mongoose";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

// GET request to fetch products
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase(); // Ensure the database is connected

    // Fetch all products from the database
    const products = await Product.find({}).exec();

    // Return the products as the response
    return NextResponse.json({ status: 200, products });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json({
      status: 500,
      message: "Error fetching products",
      error,
    });
  }
}
