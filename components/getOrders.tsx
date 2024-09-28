import axios from "axios";
import { Order } from "./types";

const API_URI = `http://127.0.0.1:5000`;

export async function getOrders(): Promise<Order[]> {
  try {
    const response = await axios.get(`${API_URI}/order`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("session_token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}
