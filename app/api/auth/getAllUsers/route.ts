// pages/api/auth/getUsers.ts

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectToDatabase from "@/lib/mongoose";
import User from "@/models/user";

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

    if (authorizationHeader.toLocaleLowerCase() !== "esaduviedede@gmail.com") {
      return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }

    // // Verify the token
    // const decoded = jwt.verify(
    //   token,
    //   (process.env.JWT_SECRET as string) || "rasengan...",
    // ) as { id: string };

    // Check user permissions here if needed
    // Example: if (decoded.role !== 'Admin') { ... }

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
