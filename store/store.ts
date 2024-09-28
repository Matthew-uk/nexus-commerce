import { create } from "zustand";

interface StoreState {
  email: string;
  id: string;
  fullName: string;
  lastName: string;
  balance: number;
  isSubscribed: boolean;
  referralCode: string;
  pendingBalance: number;
  phoneNumber: string;
  setEmail: (id: string) => void;
  setId: (id: string) => void;
  setFullName: (fullName: string) => void;
  setLastName: (lastName: string) => void;
  setBalance: (id: number) => void;
  setSubscribe: (id: boolean) => void;
  setReferralCode: (id: string) => void;
  setPendingBalance: (id: number) => void;
  setPhoneNumber: (phoneNumber: string) => void;
}

const useUserStore = create<StoreState>((set) => ({
  email: "",
  id: "",
  fullName: "",
  lastName: "",
  balance: 0,
  isSubscribed: false,
  referralCode: "",
  pendingBalance: 0,
  phoneNumber: "",
  setEmail: (email) => set(() => ({ email })),
  setId: (id) => set(() => ({ id })),
  setFullName: (fullName) => set(() => ({ fullName })),
  setLastName: (lastName) => set(() => ({ lastName })),
  setBalance: (balance) => set(() => ({ balance })),
  setSubscribe: (isSubscribed) => set(() => ({ isSubscribed })),
  setReferralCode: (referralCode) => set(() => ({ referralCode })),
  setPendingBalance: (balance) => set(() => ({ balance })),
  setPhoneNumber: (phoneNumber) => set(() => ({ phoneNumber })),
}));

export default useUserStore;
