import { create } from "zustand";

const useNotificationStore = create((set) => ({
  notifications: [],
  notificationsLoading: false,

  // Set notifications from the DB
  setNotifications: (notifications) => {
    set({ notifications });
  },

  // Mark one notification as read by ID
  markAsReadById: (id) => {
    set((state) => ({
      notifications: state.notifications.map((notif) =>
        notif._id === id ? { ...notif, isRead: true } : notif
      ),
    }));
  },

  // Set loading state
  setNotificationsLoading: (loading) => {
    set({ notificationsLoading: loading });
  },
}));

export default useNotificationStore;
