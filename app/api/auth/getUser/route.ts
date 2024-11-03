import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectToDatabase from "@/lib/mongoose";
import User from "@/models/user";

export const dynamic = "force-dynamic"; // Ensure dynamic rendering
export const revalidate = 0; // Avoid caching

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Get the authorization header
    const authorizationHeader = req.headers.get("authorization");
    if (!authorizationHeader) {
      return NextResponse.json(
        { message: "Authorization header is required" },
        { status: 401 },
      );
    }

    // Extract the token
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Token is required" },
        { status: 401 },
      );
    }

    // Verify the token
    const decoded = jwt.verify(
      token,
      (process.env.JWT_SECRET as string) || "rasengan...",
    ) as { id: string };

    // Find the user by ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Send user data without sensitive information like password
    const {
      _id,
      email,
      fullName,
      balance,
      isSubscribed,
      referralCode,
      pendingBalance,
    } = user;
    return NextResponse.json(
      {
        id: _id,
        email,
        fullName,
        balance,
        isSubscribed,
        referralCode,
        pendingBalance,
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
