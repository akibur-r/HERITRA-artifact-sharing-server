import { create } from "zustand";

const useArtifactsStore = create((set) => ({
  artifacts: [],
  artifactsLoading: false,
  artifactsCount: 0,
  artifactsPerPage: 6,
  currentPage: 0,
  sortingValue: "uploadDate",
  sortingOrder: 1,
  searching: "",

  setArtifacts: (data) => set({ artifacts: data }),
  setArtifactsLoading: (loading) => set({ artifactsLoading: loading }),
  setArtifactsCount: (count) => set({ artifactsCount: count }),
  setArtifactsPerPage: (val) => set({ artifactsPerPage: val }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSortingValue: (val) => set({ sortingValue: val }),
  setSortingOrder: (order) => set({ sortingOrder: order }),
  setSearching: (query) => set({ searching: query }),

  resetArtifactsStore: () =>
    set({
      artifacts: [],
      artifactsLoading: false,
      artifactsCount: 0,
      artifactsPerPage: 6,
      currentPage: 0,
      sortingValue: "uploadDate",
      sortingOrder: 1,
      searching: "",
    }),
}));

export default useArtifactsStore;
