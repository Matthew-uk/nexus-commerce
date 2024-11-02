import connectToDatabase from "@/lib/mongoose";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

// GET request to fetch products
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase(); // Ensure the database is connected

    // Fetch all products from the database
    const products = await Product.find({}).exec();

    const response = NextResponse.json({ status: 200, products });

    // Disable caching for this route
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Expires', '0');
    response.headers.set('Pragma', 'no-cache');

    return response;
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json({
      status: 500,
      message: "Error fetching products",
      error,
    });
  }
}
