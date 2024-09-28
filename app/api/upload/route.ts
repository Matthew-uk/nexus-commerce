import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";

// Define the POST handler for the file upload
export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();

    // Get all files
    const files = formData.getAll("files") as File[];

    if (files.length === 0) {
      return NextResponse.json(
        { error: "No files received." },
        { status: 400 },
      );
    }

    const fileUrls = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = file.name.replaceAll(" ", "_");
      const uploadDir = path.join(process.cwd(), "public/uploads");

      await mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, filename);
      await writeFile(filePath, buffer);

      const fileUrl = `/uploads/${filename}`;
      fileUrls.push(fileUrl); // Collect all file URLs
    }

    return NextResponse.json({ Message: "Success", status: 201, fileUrls });
  } catch (error) {
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
