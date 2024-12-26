import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const userDataStore = (set) => ({
  username: "",
  roomId: "",
  goals: [],
  users:[],

  setUser: (user) => set({ username: user }),
  setRoomId: (id) => set({ roomId: id }),
  setGoals: (goals) => set({goals: goals}),
  setNewGoal: (goal) => {
    set((state) => ({
      goals: [goal, ...state.goals],
    }));
  },
  setUsers: (users) => set({users: users})
});

const useUserDataStore = create(
  devtools(persist(userDataStore, { name: "userData" }))
);

export default useUserDataStore;
