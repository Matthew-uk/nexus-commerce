"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PenIcon, Trash2Icon, EyeIcon } from "lucide-react";
import Navbar from "@/components/ui/custom/navbar";

const API_URI = `http://127.0.0.1:5000`;

type Order = {
  id: number;
  customer_name: string;
  customer_email: string;
  product_id: number;
  quantity: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
};

function StatusBadge({ status }: { status: Order["status"] }) {
  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-800 hover:text-white",
    Processing: "bg-blue-100 text-blue-800 hover:text-white",
    Shipped: "bg-purple-100 text-purple-800 hover:text-white",
    Delivered: "bg-green-100 text-green-800 hover:text-white",
    Cancelled: "bg-red-100 text-red-800 hover:text-white",
  };

  return (
    <Badge className={`${statusStyles[status]} capitalize cursor-pointer`}>
      {status}
    </Badge>
  );
}

function OrderActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <EyeIcon className='mr-2 h-4 w-4' />
          View details
        </DropdownMenuItem>
        <DropdownMenuItem>
          <PenIcon className='mr-2 h-4 w-4' />
          Edit order
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-red-600'>
          <Trash2Icon className='mr-2 h-4 w-4' />
          Delete order
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URI}/orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("session_token")}`,
          },
        });
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error state
  }

  return (
    <>
      <Navbar />
      <div className='container mx-auto py-10'>
        <Card className='shadow-lg'>
          <CardHeader className='bg-gray-50'>
            <CardTitle className='text-2xl font-bold text-gray-800'>
              Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='overflow-x-auto mt-6'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[100px]'>Order ID</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className='hover:bg-gray-50'>
                      <TableCell className='font-medium'>{order.id}</TableCell>
                      <TableCell>{order.customer_name}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                      <TableCell className='text-right'>
                        <OrderActions />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
