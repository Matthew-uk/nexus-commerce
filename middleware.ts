import { NextRequest, NextResponse } from "next/server";

// Define allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
]; // Add more origins as needed

export function middleware(req: NextRequest) {
  const origin = req.headers.get("origin");

  // Set CORS headers
  const response = NextResponse.next();
  if (allowedOrigins.includes(origin || "")) {
    response.headers.set("Access-Control-Allow-Origin", origin || "");
  } else {
    response.headers.set("Access-Control-Allow-Origin", "");
  }

  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");
  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers: response.headers });
  }

  return response;
}

export const config = {
  matcher: "/api/:path*", // Apply middleware to all API routes
};
