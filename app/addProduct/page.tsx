"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Plus, Upload, X, CheckCircle, Loader2 } from "lucide-react"; // Add Loader2 for a spinner
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/custom/navbar";
import useUserStore from "@/store/store";
import Loader from "@/components/ui/custom/loader";
import { IUser } from "@/models/user";
import { getUserData } from "@/lib/getUser";

interface FileWithPreview extends File {
  preview: string;
}

interface NewFilePreview {
  fileId: string;
  fileUrl: string;
}

export default function EnhancedAddProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<FileWithPreview[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [imageLoading, setImageLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter(); // Initialize useRouter hook
  const { id } = useUserStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData: IUser = await getUserData();
        if (!userData) {
          return false;
        }
        console.log(userData);
        setIsLoggedIn(true);
        return true;
      } catch (error) {
        console.log(error);
        setIsLoggedIn(false);
      }
    };
    fetchUser();
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );

    const formData = new FormData();
    newImages.forEach((file) => {
      formData.append("files", file);
    });

    try {
      setImageLoading(true);
      const response = await axios.post("/api/uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImages((prevImages) => [
        ...prevImages,
        ...response.data.fileUrls.map((url: NewFilePreview) => ({
          preview: url.fileUrl,
        })),
      ]);
      console.log("This is the images", images);
      console.log("Files uploaded successfully!", response.data);
    } catch (error) {
      console.error("Failed to upload files. Please try again.", error);
    } finally {
      setImageLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const removeImage = (index: number) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name) newErrors.name = "Name is required";
    if (!description) newErrors.description = "Description is required";
    if (!price) newErrors.price = "Price is required";
    else if (isNaN(price)) newErrors.price = "Price must be a number";
    if (!category) newErrors.category = "Category is required";
    if (images.length === 0)
      newErrors.images = "At least one image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsDialogOpen(true);
    }
  };

  const confirmSubmit = async () => {
    setIsLoading(true); // Start loading
    const data = { name, description, price, category, images, userId: id };
    try {
      if (!isLoggedIn) {
        alert("Please Login to add your product!");
        return false;
      }
      const response = await axios.post("/api/store/createProduct", data);
      console.log("Product created successfully!", response.data);
      if (response.status === 200) {
        toast({
          title: "Product Added",
          description: "Your product has been successfully added.",
        });
        router.push("/");
      }
      // Reset form after submission
      setName("");
      setDescription("");
      setPrice(0);
      setCategory("");
      setImages([]);
    } catch (error: any) {
      console.error("An error occurred", error.message);
    } finally {
      setIsLoading(false); // Stop loading
      setIsDialogOpen(false);
    }
  };

  const formProgress = [
    name,
    description,
    price,
    category,
    images.length > 0,
  ].filter(Boolean).length;

  return (
    <>
      <Navbar />
      <div className='container mx-auto py-10'>
        <Card className='w-full max-w-3xl mx-auto'>
          <CardHeader>
            <CardTitle className='text-3xl font-bold'>
              Add New Product
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Name Field */}
              <div className='space-y-2'>
                <Label htmlFor='name'>Name</Label>
                <Input
                  id='name'
                  placeholder='Enter product name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className='text-red-500 text-sm'>{errors.name}</p>
                )}
              </div>

              {/* Description Field */}
              <div className='space-y-2'>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                  id='description'
                  placeholder='Enter product description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && (
                  <p className='text-red-500 text-sm'>{errors.description}</p>
                )}
              </div>

              {/* Price Field */}
              <div className='space-y-2'>
                <Label htmlFor='price'>Price(₦)</Label>
                <Input
                  id='price'
                  type='number'
                  placeholder='Enter price'
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  className={errors.price ? "border-red-500" : ""}
                />
                {errors.price && (
                  <p className='text-red-500 text-sm'>{errors.price}</p>
                )}
              </div>

              {/* Category Field */}
              <div className='space-y-2'>
                <Label htmlFor='category'>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger
                    id='category'
                    className={errors.category ? "border-red-500" : ""}>
                    <SelectValue placeholder='Select a category' />
                  </SelectTrigger>
                  <SelectContent position='popper'>
                    <SelectItem value='electronics'>Electronics</SelectItem>
                    <SelectItem value='clothing'>Clothing</SelectItem>
                    <SelectItem value='books'>Books</SelectItem>
                    <SelectItem value='home'>Home & Garden</SelectItem>
                    <SelectItem value='toys'>Toys & Games</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className='text-red-500 text-sm'>{errors.category}</p>
                )}
              </div>

              {/* Image Upload Field */}
              <div className='space-y-2'>
                <Label htmlFor='images'>Images</Label>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? "border-primary bg-primary/10"
                      : "border-muted-foreground"
                  } ${errors.images ? "border-red-500" : ""}`}>
                  <input {...getInputProps()} />
                  <Upload className='mx-auto h-12 w-12 text-muted-foreground' />
                  <p className='mt-2 text-sm text-muted-foreground'>
                    Drag & drop images here, or click to select files
                  </p>
                </div>
                {imageLoading && <Loader className='py-6' />}
                {errors.images && (
                  <p className='text-red-500 text-sm'>{errors.images}</p>
                )}
                {images.length > 0 && (
                  <div className='mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'>
                    {images.map((image, index) => (
                      <div key={index} className='relative group'>
                        <Image
                          src={image.preview}
                          alt={`Preview ${index + 1}`}
                          width={100}
                          height={100}
                          className='h-24 w-full object-cover rounded-md'
                        />
                        <button
                          type='button'
                          className='absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full group-hover:opacity-100 opacity-0 transition-opacity'
                          onClick={() => removeImage(index)}
                          aria-label='Remove image'>
                          <X className='w-4 h-4' />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className='flex justify-between text-sm text-muted-foreground mb-2'>
                <span>Form Completion</span>
                <span>{formProgress}/5</span>
              </div>
              {/* Progress Indicator */}
              <Progress value={(formProgress / 5) * 100} />
            </form>
          </CardContent>
          <CardFooter>
            <Button
              type='submit'
              onClick={handleSubmit}
              className='w-full'
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <Plus className='mr-2 h-4 w-4' />
              )}
              Add Product
            </Button>
          </CardFooter>
        </Card>

        {/* Confirmation Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className='bg-white'>
            <DialogHeader>
              <DialogTitle>Confirm Submission</DialogTitle>
              <DialogDescription>
                Are you sure you want to add this product?
              </DialogDescription>
            </DialogHeader>
            <div className='py-4 flex flex-col gap-4'>
              <p>
                <strong>Name:</strong> {name}
              </p>
              <p>
                <strong>Description:</strong> {description}
              </p>
              <p>
                <strong>Price:</strong> ₦{price.toLocaleString()}
              </p>
              <p>
                <strong>Category:</strong> {category}
              </p>
              <p>
                <strong>Images:</strong> {images.length} uploaded
                <div className='flex gap-4 w-2/3'>
                  {images.map((image, index) => (
                    <div key={index} className='relative group'>
                      <Image
                        src={image.preview}
                        alt={`Preview ${index + 1}`}
                        width={100}
                        height={100}
                        className='h-20 w-20 object-cover rounded-md'
                      />
                      <button
                        type='button'
                        className='absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full group-hover:opacity-100 opacity-0 transition-opacity'
                        onClick={() => removeImage(index)}
                        aria-label='Remove image'>
                        <X className='w-4 h-4' />
                      </button>
                    </div>
                  ))}
                </div>
              </p>
            </div>

            <DialogFooter>
              <Button
                type='button'
                onClick={confirmSubmit}
                disabled={isLoading} // Disable confirm button while loading
              >
                {isLoading ? (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                  <CheckCircle className='mr-2 h-4 w-4' />
                )}
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
