"use client";
// app/upload/page.tsx

import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
// import { toast } from "react-toastify";

const Page = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await axios.post("/api/upload", formData);
        console.log("File uploaded successfully!");
        console.log(response.data);
        setImageUrl(response.data.fileUrl);
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
      {imageUrl && <Image src={imageUrl} alt='' width={250} height={100} />}
    </div>
  );
};

export default Page;
