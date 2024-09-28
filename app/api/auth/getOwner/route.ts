import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import User from "@/models/user"; // Assuming you have an owner model

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Get the ownerId from query parameters
    const { searchParams } = new URL(req.url);
    const ownerId = searchParams.get("ownerId");
    if (!ownerId) {
      return NextResponse.json(
        { message: "ownerId query parameter is required" },
        { status: 400 },
      );
    }

    // Fetch the owner details by the ownerId
    const owner = await User.findById(ownerId);
    if (!owner) {
      return NextResponse.json({ message: "Owner not found" }, { status: 404 });
    }

    // Send the owner data (without sensitive information if any)
    const { _id, name, email, phoneNumber } = owner;
    return NextResponse.json(
      {
        id: _id,
        name,
        email,
        phoneNumber,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );
  }
}
