import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import connectToDatabase from "@/lib/mongoose";
import User from "@/models/user";

export async function POST(req: NextRequest) {
  // Set CORS headers
  const allowedOrigins = ["http://localhost:3002"];
  const origin = req.headers.get("origin") || ""; // Ensure origin is a string

  const responseHeaders: Record<string, string> = {
    "Access-Control-Allow-Origin": allowedOrigins.includes(origin)
      ? origin
      : "",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return NextResponse.json(null, {
      status: 204,
      headers: responseHeaders,
    });
  }

  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the request body
    const body = await req.json();
    const {
      fullName,
      email,
      password,
      confirmPassword,
      referrer,
      phoneNumber,
    } = body;

    // Ensure all fields are present
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400, headers: responseHeaders },
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409, headers: responseHeaders },
      );
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create a new user
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      referrer,
      phoneNumber,
    });

    // Save the user to the database
    await user.save();

    // Update referrer's balance if referrer is provided
    if (referrer) {
      const referrerUser = await User.findOne({ referralCode: referrer });
      if (referrerUser) {
        referrerUser.pendingBalance += 200; // Adjust according to your schema
        await referrerUser.save();
      }
    }

    // Return success response with CORS headers
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201, headers: responseHeaders },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500, headers: responseHeaders },
    );
  }
}
