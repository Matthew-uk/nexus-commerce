"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "@/components/ui/custom/navbar";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/custom/loader";
import { IProduct } from "@/models/product";
import { IUser } from "@/models/user";
import { Heart, HeartPulse } from "lucide-react"; // Icons for wishlist
import { toast } from "react-toastify"; // For notifications

const API_URI = process.env.API_URI || `http://localhost:3000`;

const AllProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sessionToken = localStorage.getItem("session_token");

    // Fetch user data and wishlist if authenticated
    const fetchUserData = async () => {
      if (sessionToken) {
        try {
          const userResponse = await axios.get(`/api/auth/getUser`, {
            headers: {
              Authorization: `Bearer ${sessionToken}`,
            },
          });
          setUser(userResponse.data);

          const wishlistResponse = await axios.get(`/api/store/getWishlist`, {
            headers: {
              Authorization: `Bearer ${sessionToken}`,
            },
          });
          setWishlist(
            new Set(wishlistResponse.data.products.map((p: IProduct) => p._id)),
          );
        } catch (err) {
          console.error("Error fetching user or wishlist:", err);
          setError("Failed to load user data.");
        }
      }
    };

    // Fetch products
    const fetchProducts = async () => {
      try {
        const productResponse = await axios.get(`/api/store/getProducts`);
        setProducts(productResponse.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchUserData(), fetchProducts()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Function to toggle a product in the wishlist
  const toggleWishlist = async (productId: string) => {
    const sessionToken = localStorage.getItem("session_token");
    if (!user) {
      toast.error("Please log in to add products to your wishlist.");
      return;
    }

    try {
      const isInWishlist = wishlist.has(productId);
      if (isInWishlist) {
        // Remove from wishlist
        await axios.post(
          `/api/user/removeFromWishlist`,
          { productId },
          {
            headers: {
              Authorization: `Bearer ${sessionToken}`,
            },
          },
        );
        setWishlist((prev) => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
        toast.success("Product removed from wishlist.");
      } else {
        // Add to wishlist
        await axios.post(
          `/api/user/addToWishlist`,
          { productId },
          {
            headers: {
              Authorization: `Bearer ${sessionToken}`,
            },
          },
        );
        setWishlist((prev) => new Set(prev).add(productId));
        toast.success("Product added to wishlist.");
      }
    } catch (error) {
      toast.error("Failed to update wishlist.");
      console.error("Error toggling wishlist:", error);
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader />
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className='flex items-center justify-center h-screen'>
  //       <div>{error}</div>
  //     </div>
  //   );
  // }

  return (
    <>
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-4'>All Products</h1>
        {user && (
          <div className='mb-4'>
            <p>Welcome, {user.fullName}!</p>
          </div>
        )}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {products.map((product: IProduct) => (
            <div
              // key={product._id || Math.random()*6000}
              key={Math.random() * 1000}
              className='border rounded-lg overflow-hidden flex flex-col justify-between'>
              <img
                src={product.images[0]?.preview || "/placeholder.jpg"}
                alt={product.name}
                className='w-full h-40 object-cover'
              />
              <div className='p-4'>
                <h3 className='text-lg font-semibold mb-3'>{product.name}</h3>
                <p className='text-base text-gray-600 mb-2'>
                  ₦{product.price.toLocaleString()}
                </p>
                <div className='flex justify-between items-center'>
                  <Link href={`/product/${product._id}`}>
                    <Button>View Details</Button>
                  </Link>
                  <button
                    className='flex items-center'
                    onClick={() => toggleWishlist(String(product._id))}>
                    {wishlist.has(String(product._id)) ? (
                      <HeartPulse className='text-red-500' size={23} />
                    ) : (
                      <Heart
                        className='text-gray-500 hover:text-red-500 duration-300'
                        size={23}
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProductsPage;
