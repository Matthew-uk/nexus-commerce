"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "@/components/ui/custom/navbar";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/custom/loader"; // Import the Loader component
import { IProduct } from "@/models/product";
import { IUser } from "@/models/user";

const API_URI = process.env.API_URI || `http://localhost:3000`;

interface User {
  username: string;
  email: string;
}

const AllProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sessionToken = localStorage.getItem("session_token");

    // Fetch user data if authenticated
    const fetchUserData = async () => {
      if (sessionToken) {
        try {
          const userResponse = await axios.get(`${API_URI}/api/auth/getUser`, {
            headers: {
              Authorization: `Bearer ${sessionToken}`,
            },
          });
          setUser(userResponse.data);
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("Failed to load user data.");
        }
      }
    };

    // Always fetch products, even without authentication
    const fetchProducts = async () => {
      try {
        const productResponse = await axios.get(
          `${API_URI}/api/store/getProducts`,
          {
            headers: sessionToken
              ? {
                  Authorization: `Bearer ${sessionToken}`,
                }
              : undefined, // No token if not authenticated
          },
        );
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

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div>{error}</div>
      </div>
    );
  }

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
          {products ? (
            products.map((product) => (
              <div
                key={product.id}
                className='border rounded-lg overflow-hidden flex flex-col justify-between'>
                <img
                  src={`${product.images[0]?.preview}`} // Placeholder for product image
                  alt={product.name}
                  className='w-full h-40 object-cover'
                />
                <div className='p-4'>
                  <h3 className='text-lg font-semibold mb-3'>{product.name}</h3>
                  <p className='text-base text-gray-600 mb-2'>
                    ₦{product.price.toLocaleString()}
                  </p>
                  <Link href={`/product/${product._id}`}>
                    <Button className='w-full'>View Details</Button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className='text-red-600'>
              Error Loading products available at the moment. Try Refreshing
              page.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllProductsPage;
