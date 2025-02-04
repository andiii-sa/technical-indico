import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const initialState = {
  user: null,
};

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (data) => set({ user: data }),
      setClear: () => set(initialState),
    }),
    {
      name: "user-persist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
