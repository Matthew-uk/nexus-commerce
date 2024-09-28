import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import connectToDatabase from "@/lib/mongoose";
import User from "@/models/user";
import { generateToken } from "@/utils/jwt";

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the request body
    const body = await req.json();
    const { email, password } = body;

    // Ensure all fields are present
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    const token = generateToken(user);

    const response = NextResponse.json(
      { message: "Login successful", token },
      { status: 200 },
    );

    // Set the Authorization header with the token
    response.headers.set("Authorization", `Bearer ${token}`);

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
