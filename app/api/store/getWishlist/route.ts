import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Wishlist from "@/models/wishlist";
import User from "@/models/user";

export async function GET(req: NextRequest) {
  const sessionToken = req.headers.get("Authorization")?.split(" ")[1];

  if (!sessionToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    // Find the user by their session token
    const user = await User.findOne({ token: sessionToken });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Find the user's wishlist
    const wishlist = await Wishlist.findOne({ user: user._id }).populate(
      "products",
    );

    if (!wishlist) {
      return NextResponse.json({ products: [] }, { status: 200 });
    }

    // Return the wishlist products
    return NextResponse.json({ products: wishlist.products }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
