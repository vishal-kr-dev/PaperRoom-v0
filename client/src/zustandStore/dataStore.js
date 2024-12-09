import { create } from "zustand";
import {persist} from "zustand/middleware"

const useDataStore = create(
  persist((set) => ({
    user: {
      username: "",
      roomId: "",
      goals: [],
    },
    setUserData: (userData) => set({ user: userData }),
  }),
  {
    name: "data-storage"
  }
)
);

export default useDataStore;
