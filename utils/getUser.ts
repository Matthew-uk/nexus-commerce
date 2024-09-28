import axios from "axios";
import Cookies from "js-cookie";

// Type for user data
export interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  balance: number;
  isSubscribed: boolean;
  referralCode: string;
  pondingBalance: number;
}

// Function to fetch user data
const getUserData = async (): Promise<UserData | null> => {
  const token = Cookies.get("token");
  if (!token) {
    return null; // Handle the absence of token outside
  }
  const response = await axios.get<UserData>("/api/auth/getUser", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export { getUserData };
