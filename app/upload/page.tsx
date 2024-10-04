"use client";

import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";

const Page = () => {
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first file
    if (file) {
      const formData = new FormData();
      formData.append("file", file); // Append the file to formData

      try {
        // Post formData to the backend API route
        const response = await axios.post("/api/uploadImage", formData);

        // Log success and set the image URL from response
        console.log("File uploaded successfully!", response.data);
        setImageUrl(response.data.fileUrl); // Use the returned file URL
      } catch (error) {
        console.error("Failed to upload file. Please try again.");
        console.error(error);
      }
    }
  };

  return (
    <div className='font-poppins'>
      <h2>This is the File Uploads Test Page</h2>
      <Input
        type='file'
        onChange={handleFileUpload}
        accept='.png, .jpg, .jpeg, .pdf'
      />
      {/* Render the image if the imageUrl state is set */}
      {imageUrl && (
        <Image src={imageUrl} alt='Uploaded file' width={250} height={100} />
      )}
    </div>
  );
};

export default Page;
