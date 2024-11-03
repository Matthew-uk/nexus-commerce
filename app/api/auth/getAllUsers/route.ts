import { NextRequest, NextResponse } from "next/server";
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

    // Extract the token from the Bearer authorization header
    const token = authorizationHeader.split(" ")[1];
    if (!token || token.toLowerCase() !== "esaduviedede@gmail.com") {
      return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }

    // Fetch all users from the database
    const users = await User.find().select({
      password: 0,
      referralCode: 0,
      referrer: 0,
      updatedAt: 0,
    }); // Exclude sensitive information

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );
  }
}
