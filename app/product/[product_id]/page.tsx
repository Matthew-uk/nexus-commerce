"use client";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Plus,
  Minus,
  ShoppingCart,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/custom/navbar";
import { useParams } from "next/navigation";
import axios from "axios";
import Loader from "@/components/ui/custom/loader";
import Image from "next/image";
import { IProduct } from "@/models/product";
import { useToken, useOwner } from "@/hooks/useToken";

const API_URI = `http://localhost:3000`;

const SingleProductPage = () => {
  const { product_id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [hide, setHide] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + productImages.length) % productImages.length,
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URI}/api/store/getProduct?id=${product_id}`,
        );
        setProduct(response.data.product);

        const { userId } = response.data.product;

        // Set the product images from the API response
        const images = response.data.product.images.map(
          (image: any) => image.preview,
        );
        setProductImages(images);

        const token = localStorage.getItem("session_token") || "";
        const verifyToken = await useToken(token);
        const ownerPhoneNumber = await useOwner(userId);
        setPhoneNumber(ownerPhoneNumber || "");
        setIsLoggedIn(verifyToken);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [product_id]);

  const handlePlaceOrder = async () => {
    if (!isLoggedIn) {
      alert("You must be logged in to place an order.");
      return;
    }

    const order = {
      customer_name: "John Doe",
      customer_email: "john.doe@example.com",
      product_id: Number(product_id),
      quantity,
    };
    try {
      setLoadingOrder(true);
      await axios.post(`${API_URI}/add_order`, order, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("session_token")}`,
        },
      });
    } catch (error) {
      console.log("An error occurred", error);
    } finally {
      setLoadingOrder(false);
    }
  };

  const CallButton = () => {
    return (
      <a href={`tel:${phoneNumber}`}>
        <Button className='flex-1'>{phoneNumber}</Button>
      </a>
    );
  };

  if (loading)
    return (
      <div className='min-h-screen w-full flex items-center justify-center'>
        <Loader />
      </div>
    );

  if (!product) return <div>Product not found</div>;

  return (
    <>
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        <div className='grid md:grid-cols-2 gap-8'>
          {/* Image Carousel */}
          <div className='relative'>
            <div className='mb-4 w-full '>
              <Image
                src={productImages[currentImage]}
                alt={`${product.name} image ${currentImage + 1}`}
                width={500}
                height={300}
                className='object-contain flex items-center justify-center rounded-lg w-max h-[400px]'
              />
            </div>
            <div className='absolute top-1/2 left-4 transform -translate-y-1/2'>
              <Button
                variant='outline'
                size='icon'
                onClick={prevImage}
                className='rounded-full'>
                <ChevronLeft className='h-4 w-4' />
              </Button>
            </div>
            <div className='absolute top-1/2 right-4 transform -translate-y-1/2'>
              <Button
                variant='outline'
                size='icon'
                onClick={nextImage}
                className='rounded-full'>
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>
            <div className='flex justify-center mt-4 space-x-2'>
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentImage ? "bg-primary" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
            <div className='flex items-center mb-4'>
              <div className='flex'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className='h-5 w-5 text-yellow-400 fill-current'
                  />
                ))}
              </div>
              <span className='ml-2 text-sm text-gray-600'>(128 reviews)</span>
            </div>
            <p className='text-2xl font-bold mb-4'>
              ₦{product.price.toLocaleString()}
            </p>
            <p className='text-gray-600 mb-6'>{product.description}</p>
            <div className='flex items-center mb-6'>
              <Button
                variant='outline'
                size='icon'
                onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus className='h-4 w-4' />
              </Button>
              <span className='mx-4 text-xl font-semibold'>{quantity}</span>
              <Button
                variant='outline'
                size='icon'
                onClick={() => setQuantity(quantity + 1)}>
                <Plus className='h-4 w-4' />
              </Button>
            </div>
            <div className='flex space-x-4 mb-6'>
              {isLoggedIn ? (
                <Button className='flex-1' onClick={() => setHide(!hide)}>
                  {hide ? (
                    <CallButton />
                  ) : (
                    <div className='flex items-center justify-center'>
                      <ShoppingCart className='mr-2 h-4 w-4' />
                      Place an Order
                    </div>
                  )}
                </Button>
              ) : (
                <Button
                  className='flex-1'
                  onClick={() => alert("Please log in to place an order")}>
                  <ShoppingCart className='mr-2 h-4 w-4' /> Log in to Order
                </Button>
              )}
              <Button variant='outline' className='flex-1'>
                <Heart className='mr-2 h-4 w-4' /> Add to Wishlist
              </Button>
            </div>
            <div className='font-semibold text-primary hover:text-primary/75'>
              <span className='font-normal text-primary hover:text-primary/75'>
                Tags:
              </span>{" "}
              {product.category.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProductPage;
