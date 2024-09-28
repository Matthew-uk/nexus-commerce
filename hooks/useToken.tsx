import { IUser } from "@/models/user";
import axios from "axios";

export const useToken = async (token: string) => {
  const verify = await axios.get("http://localhost:3000/api/auth/getUser", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (verify.status === 200) {
    return true;
  } else {
    return false;
  }
};

export const useOwner = async (userId: string) => {
  try {
    const verify = await axios.get<IUser>(
      `http://localhost:3000/api/auth/getOwner?ownerId=${userId}`,
    );
    if (verify.status === 200) {
      return verify.data.phoneNumber;
    } else {
      return false;
    }
  } catch (error: any) {
    console.error(error);
  }
};
