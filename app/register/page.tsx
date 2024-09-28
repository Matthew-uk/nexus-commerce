"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const API_URI = process.env.API_URI || `http://localhost:3000`;

const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format for phone number

const schema = z
  .object({
    name: z.string().nonempty("Full Name is required"),
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
    phoneNumber: z
      .string()
      .regex(phoneRegex, "Invalid phone number")
      .nonempty("Phone number is required"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().nonempty("Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type FormData = z.infer<typeof schema>;

export default function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const getPasswordStrength = (password: string) => {
    const strengthChecks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password),
    ];
    const strength = strengthChecks.filter(Boolean).length;
    if (strength < 2) return { label: "Weak", color: "bg-red-500" };
    if (strength < 4) return { label: "Moderate", color: "bg-yellow-500" };
    return { label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(password);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      console.log(data);
      // Send a POST request to your API
      const response = await axios.post(`/api/auth/signup`, {
        fullName: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
      });

      // Check if the response was successful
      if (response.status === 201) {
        alert("Account created successfully!");
        window.location.href = "/login";
      } else {
        throw new Error("Failed to create account.");
      }
    } catch (error: any) {
      console.error("Error:", error.message);
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
              Create an account
            </CardTitle>
            <CardDescription>
              Enter your details below to create your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='name'>Full Name</Label>
                <Input
                  id='name'
                  placeholder='John Doe'
                  {...register("name")}
                  className={`border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <span className='text-red-500 text-sm'>
                    {errors.name?.message}
                  </span>
                )}
              </div>
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
                  <span className='text-red-500 text-sm'>
                    {errors.email?.message}
                  </span>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='phoneNumber'>Phone Number</Label>
                <Input
                  id='phoneNumber'
                  type='tel'
                  placeholder='+2348033333333'
                  {...register("phoneNumber")}
                  className={`border ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.phoneNumber && (
                  <span className='text-red-500 text-sm'>
                    {errors.phoneNumber?.message}
                  </span>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? "text" : "password"}
                    placeholder='Enter your password'
                    {...register("password", {
                      onChange: (e) => setPassword(e.target.value),
                    })}
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
                  <span className='text-red-500 text-sm'>
                    {errors.password?.message}
                  </span>
                )}
              </div>
              {password && (
                <div className='space-y-2'>
                  <div className='text-sm'>
                    Password strength: {passwordStrength.label}
                  </div>
                  <div className='h-2 w-full bg-gray-200 rounded-full'>
                    <div
                      className={`h-full rounded-full ${passwordStrength.color}`}
                      style={{
                        width: `${
                          passwordStrength.label === "Weak"
                            ? 33
                            : passwordStrength.label === "Moderate"
                            ? 66
                            : 100
                        }%`,
                      }}></div>
                  </div>
                </div>
              )}
              <div className='space-y-2'>
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <Input
                  id='confirmPassword'
                  type='password'
                  placeholder='Confirm your password'
                  {...register("confirmPassword")}
                  className={`border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.confirmPassword && (
                  <span className='text-red-500 text-sm'>
                    {errors.confirmPassword?.message}
                  </span>
                )}
              </div>
            </CardContent>
            <CardFooter className='flex flex-col'>
              <Button className='w-full' type='submit' disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
              <div className='flex justify-center items-center mt-4'>
                <span className='text-sm'>Already have an account?</span>
                <Link
                  href='/login'
                  className='ml-1 text-blue-600 hover:underline'>
                  Log in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
