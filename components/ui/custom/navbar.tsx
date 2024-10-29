"use client";

import { ShoppingCart, Search, Menu, Home, User } from "lucide-react";
// import { HomeIcon } from "@radix-ui/react-icons";
import { IoHomeOutline } from "react-icons/io5";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserData, handleLogout } from "@/lib/getUser";
import { IUser } from "@/models/user";
import useUserStore from "@/store/store";

const BottomNavbar = () => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const { setFullName, setPhoneNumber, setId } = useUserStore();

  useEffect(() => {
    const fetchUser = async () => {
      const userData: IUser = await getUserData();
      setCurrentUser(userData);
      setFullName(userData && userData.fullName);
      setPhoneNumber(userData && userData.phoneNumber);
      setId(userData && userData.id);
    };
    fetchUser();
  }, [setFullName, setPhoneNumber, setId]);

  return (
    <nav className='fixed bottom-0 left-0 right-0 z-50 bg-white shadow-md dark:bg-black dark:text-white'>
      <div className='container mx-auto px-4 py-2'>
        <ul className='flex items-center justify-between'>
          <li>
            <Link
              href='/'
              className='flex flex-col items-center text-gray-600 hover:text-primary'>
              <IoHomeOutline className='h-6 w-6' />
              <span className='text-xs mt-1'>Home</span>
            </Link>
          </li>
          <li>
            <Link
              href='/search'
              className='flex flex-col items-center text-gray-600 hover:text-primary'>
              <Search className='h-6 w-6' />
              <span className='text-xs mt-1'>Search</span>
            </Link>
          </li>
          <li>
            <Link
              href='/cart'
              className='flex flex-col items-center text-gray-600 hover:text-primary'>
              <ShoppingCart className='h-6 w-6' />
              <span className='text-xs mt-1'>Cart</span>
            </Link>
          </li>
          <li>
            {currentUser ? (
              <button
                onClick={handleLogout}
                className='flex flex-col items-center text-gray-600 hover:text-primary'>
                <User className='h-6 w-6' />
                <span className='text-xs mt-1'>Logout</span>
              </button>
            ) : (
              <Link
                href='/login'
                className='flex flex-col items-center text-gray-600 hover:text-primary'>
                <User className='h-6 w-6' />
                <span className='text-xs mt-1'>Login</span>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default BottomNavbar;
