import { create } from "zustand";

const useUserFromDBStore = create((set) => ({
  userFromDB: null,
  userFromDBLoading: false,
  setUserFromDB: (user) => set({ userFromDB: user }),
  setUserFromDBLoading: (isLoading) => set({ userFromDBLoading: isLoading }),

  updateUserFromDB: (updatedFields) =>
    set((state) => ({
      userFromDB: {
        ...state.userFromDB,
        ...updatedFields,
      },
    })),
}));

export default useUserFromDBStore;
