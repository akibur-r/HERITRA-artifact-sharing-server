import { create } from "zustand";

const useCommentStore = create((set) => ({
  comments: [],
  loading: false,

  // Set loading state
  setLoading: (isLoading) => {
    set({ loading: isLoading });
  },

  // Set initial comments from DB
  setComments: (newComments) => {
    set({ comments: newComments });
  },

  // Add a new comment
  addNewComment: (newComment) => {
    set((state) => ({
      comments: [...state.comments, newComment],
    }));
  },

  // Delete a comment by _id
  deleteCommentById: (id) => {
    set((state) => ({
      comments: state.comments.filter((comment) => comment._id !== id),
    }));
  },
}));

export default useCommentStore;
