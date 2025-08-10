import useNotificationsApi from "@/api/notificationsApi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import useNotificationStore from "@/hooks/stores/notificationsStore";
import { formatDistanceToNowStrict } from "date-fns";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";

const NotificationBell = () => {
  const {
    notifications,
    setNotifications,
    markAsReadById,
    notificationsLoading,
    setNotificationsLoading,
  } = useNotificationStore();
  const { getNotifications } = useNotificationsApi();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    setNotificationsLoading(true);
    getNotifications()
      .then((res) => {
        setNotifications(res);
        setNotificationsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setNotificationsLoading(false);
      });
  };

  const goToArtifact = (artifact_id) => {
    navigate(`/artifact/details/${artifact_id}`);
    setOpen(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className="relative p-0 w-fit h-fit cursor-pointer"
          onClick={() => {
            if (!open) {
              fetchNotifications();
            }
          }}
        >
          <Bell className="size-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full size-4 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-0 rounded-xs">
        <div className="border-b px-4 py-2 font-medium text-sm">
          Notifications
        </div>
        <ScrollArea className="h-64 rounded-xs">
          {notificationsLoading ? (
            <div className="p-4 text-sm text-muted-foreground">
              <LoaderSpinner />
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground">
              No notifications
            </div>
          ) : (
            <ul className="divide-y text-sm">
              {notifications.map((notif) => (
                <li
                  key={notif._id}
                  className={`px-4 py-2 hover:bg-accent/30 cursor-pointer ${
                    !notif.isRead
                      ? "font-medium bg-muted/30"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => goToArtifact(notif.targetId)}
                >
                  <p>{notif.message}</p>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNowStrict(notif.createdAt) + " ago"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
