import { create } from "zustand";

const useDataStore = create((set) => ({
  user: {
    username: "",
    roomId: "",
    goals: [],
  },
  setUserData: (userData) => set({ user: userData }),
}));

export default useDataStore;
