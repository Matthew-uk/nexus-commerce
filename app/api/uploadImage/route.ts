import { NextRequest, NextResponse } from "next/server";
import { bucket } from "@/lib/firebaseadmin"; // Import your Firebase Admin SDK
import { v4 as uuidv4 } from "uuid"; // For generating unique file names

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    // Generate a unique filename
    const uniqueFileName = `${uuidv4()}_${file.name}`;

    // Create a reference to the Firebase Storage bucket
    const fileRef = bucket.file(`uploads/${uniqueFileName}`);

    // Create a buffer from the file data
    const buffer = Buffer.from(await file.arrayBuffer());

    // Handle the file upload to Firebase Storage using a Promise
    await new Promise<void>((resolve, reject) => {
      const stream = fileRef.createWriteStream({
        metadata: {
          contentType: file.type,
        },
        resumable: false,
      });

      stream.on("finish", resolve);
      stream.on("error", reject);
      stream.end(buffer); // End the stream by writing the buffer
    });

    // Once the upload is complete, get the public URL of the file
    const [metadata] = await fileRef.getMetadata();
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${metadata.name}`;

    // Return a success response with the file URL
    return NextResponse.json(
      { success: true, fileUrl: publicUrl },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file." },
      { status: 500 },
    );
  }
};
