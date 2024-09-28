export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  // Add other product fields as needed
}

export interface User {
  email: string;
  id: number;
  username: string;
}

export interface Order {
  customer_email: string;
  customer_name: string;
  id: number;
  product_id: number;
  quantity: Number;
  status: string;
}
