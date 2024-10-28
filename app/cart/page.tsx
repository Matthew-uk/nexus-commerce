"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Navbar from "@/components/ui/custom/navbar";
import axios from "axios";
import Image from "next/image";
import Loader from "@/components/ui/custom/loader";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: { preview: string }[];
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError(null);
        const token = localStorage.getItem("session_token"); // Assuming token is stored in localStorage
        const response = await axios.get("/api/store/getWishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Transform product data into cart items format
        const products: Product[] = response.data.products; // Assuming response format includes products
        const uniqueItems = products.map((product) => ({
          id: product._id,
          name: product.name,
          price: product.price,
          quantity: 1, // Default quantity for new items
          image: product.images[0]?.preview, // Get the first image preview
        }));

        setCartItems(uniqueItems); // Set cart items with fetched products
      } catch (error) {
        console.error(error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, newQuantity) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = async (id: string) => {
    try {
      const token = localStorage.getItem("session_token");
      if (!token) {
        setError("Login to see your Wishlist");
        return false;
      }
      await axios.post(
        `/api/store/removeFromWishlist`,
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // Remove the item from the local state after successful API call
      setCartItems(cartItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to remove item from wishlist:", error);
      setError("Failed to remove item from wishlist");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 10; // Flat rate shipping
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-8'>Your Shopping Cart</h1>

        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Cart Items */}
          <div className='lg:w-2/3'>
            {cartItems.length === 0 ? (
              <div className='text-center py-8'>
                <ShoppingBag className='mx-auto h-16 w-16 text-gray-400 mb-4' />
                <h2 className='text-2xl font-semibold mb-2'>
                  Your cart is empty
                </h2>
                <p className='text-gray-600 mb-4'>
                  Looks like you haven't added any items to your cart yet.
                </p>
                <Button asChild>
                  <Link href='/'>Start Shopping</Link>
                </Button>
              </div>
            ) : (
              <ul className='divide-y divide-gray-200'>
                {cartItems.map((item) => (
                  <li key={item.id} className='py-6 flex'>
                    <div className='flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden'>
                      <Image
                        src={item.image}
                        alt={item.name}
                        className='w-full h-full object-center object-cover'
                        width={50}
                        height={50}
                      />
                    </div>

                    <div className='ml-4 flex-1 flex flex-col'>
                      <div>
                        <div className='flex justify-between text-base font-medium text-gray-900'>
                          <h3>{item.name}</h3>
                          <p className='ml-4'>
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                        <p className='mt-1 text-sm text-gray-500'>
                          ₦{item.price.toLocaleString()} each
                        </p>
                      </div>
                      <div className='flex-1 flex items-end justify-between text-sm'>
                        <div className='flex items-center'>
                          <Button
                            variant='outline'
                            size='icon'
                            className='h-8 w-8'
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }>
                            <Minus className='h-4 w-4' />
                          </Button>
                          <span className='mx-2 w-8 text-center'>
                            {item.quantity}
                          </span>
                          <Button
                            variant='outline'
                            size='icon'
                            className='h-8 w-8'
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }>
                            <Plus className='h-4 w-4' />
                          </Button>
                          <Button className='ml-4'>
                            <Link href={`/product/₦{item.id}`}>
                              View Details
                            </Link>
                          </Button>
                        </div>
                        <div className='flex'>
                          <Button
                            variant='ghost'
                            onClick={() => removeItem(item.id)}
                            className='text-red-600 hover:text-red-500'>
                            <X className='h-4 w-4 mr-1' />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Order Summary */}
          <div className='lg:w-1/3'>
            <div className='bg-gray-50 rounded-lg shadow-sm p-6'>
              <h2 className='text-lg font-semibold mb-4'>Order Summary</h2>
              <div className='space-y-4'>
                <div className='flex justify-between'>
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Shipping</span>
                  <span>₦{shipping.toLocaleString()}</span>
                </div>
                <Separator />
                <div className='flex justify-between font-semibold'>
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>
              <Button className='w-full mt-6' disabled={cartItems.length === 0}>
                Proceed to Checkout
              </Button>
              <Button variant='outline' className='w-full mt-4' asChild>
                <Link href='/'>Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
