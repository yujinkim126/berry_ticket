import { create } from "zustand";

const useLoginStateStore = create((set) => ({
  isLogin: false,
  userId: null,
  login: (userId) => set({ isLogin: true, userId }),
  logout: () => set({ isLogin: false, userId: null }),
}));
export default useLoginStateStore;
