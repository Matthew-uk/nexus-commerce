import connectToDatabase from "@/lib/mongoose";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase(); // Ensure the database is connected
    const body = await req.json(); // Get the body data from the request

    const { name, description, price, category, images, userId } = body;

    // Check if all required fields are provided
    if (!name || !description || !price || !category || !images) {
      if (!userId) {
        return NextResponse.json({
          status: 200,
          message: "User ID is required.",
        });
      }
      return NextResponse.json({
        status: 400,
        message: "All fields are required.",
      });
    }

    // Create a new product using the data from the request body
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      userId,
      images,
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    // Return a success response with the saved product
    return NextResponse.json({ status: 200, product: savedProduct });
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
