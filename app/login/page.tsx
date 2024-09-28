"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Navbar from "@/components/ui/custom/navbar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

// const API_URI = process.env.API_URI || `http://localhost:3000`;
const API_URI = `${process.env.API_URI}/api/auth/login`;

const schema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .nonempty("Password is required"),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter(); // Initialize useRouter hook

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("Form submitted with:", data);
    try {
      setLoading(true);
      setErrorMessage(null);

      const response = await axios.post(
        API_URI,
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true },
      );

      // Store the session token
      localStorage.setItem("session_token", response.data.token);

      console.log("Response:", response.data);

      // Check if login is successful
      if (response.status === 200) {
        // Redirect to /dashboard or other page
        router.push("/"); // Redirect to the dashboard
      } else {
        setErrorMessage(response.data.message || "Login failed");
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className='container mx-auto px-4 py-8 flex justify-center items-center min-h-screen'>
        <Card className='w-full max-w-md'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl font-bold'>
              Sign in to your account
            </CardTitle>
            <CardDescription>
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='john@example.com'
                  {...register("email")}
                  className={`border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className='text-red-500 text-sm'>{errors.email.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? "text" : "password"}
                    placeholder='Enter your password'
                    {...register("password")}
                    className={`border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <Eye className='h-4 w-4 text-gray-500' />
                    ) : (
                      <EyeOff className='h-4 w-4 text-gray-500' />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className='text-red-500 text-sm'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='remember' />
                  <Label htmlFor='remember' className='text-sm'>
                    Remember me
                  </Label>
                </div>
              </div>

              {errorMessage && (
                <p className='text-red-500 text-sm text-center'>
                  {errorMessage}
                </p>
              )}

              <CardFooter className='flex flex-col'>
                <Button type='submit' className='w-full' disabled={loading}>
                  {loading ? "Loading..." : "Sign In"}
                </Button>
                <div className='mt-4 text-center text-sm'>
                  Don&apos;t have an account?{" "}
                  <Link
                    href='/register'
                    className='text-primary hover:underline'>
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
