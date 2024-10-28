import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/appwrite"; // Import your Appwrite configuration
import env from "@/app/env";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[]; // Get all files, supporting one or more

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No files received.", files },
        { status: 400 },
      );
    }

    const storageKey = env.appwrite.storageKey;
    const uploadedFiles = [];

    // Loop through all files and upload each one
    for (const file of files) {
      // Upload each file to Appwrite storage with proper permissions
      const result = await storage.createFile(
        storageKey, // Your Appwrite bucket ID
        "unique()", // Automatically generate a valid file ID
        file,
      );

      // Get the file ID and generate the public URL
      const fileId = result.$id;
      const fileUrl = storage.getFileView(storageKey, fileId);

      uploadedFiles.push({ fileId, fileUrl });
    }

    // Return a success response with the list of uploaded file URLs
    return NextResponse.json(
      { success: true, fileUrls: uploadedFiles },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error uploading files:", error);
    return NextResponse.json(
      { error: "Failed to upload files." },
      { status: 500 },
    );
  }
};
