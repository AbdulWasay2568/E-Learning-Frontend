import { useState } from "react";

interface NotificationItem {
  id: number;
  message: string;
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: 1, message: "New message from Ali", read: false },
    { id: 2, message: "Project deadline tomorrow", read: false },
    { id: 3, message: "New comment on your post", read: true },
  ]);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Notifications</h1>
        {notifications.some((n) => !n.read) && (
          <button
            onClick={markAllAsRead}
            className="text-sm bg-blue-600 text-white px-3 py-1 rounded-xl hover:bg-blue-700 transition cursor-pointer"
          >
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 && (
        <p className="text-gray-500">No notifications yet.</p>
      )}

      <ul className="space-y-3">
        {notifications.map((notif) => (
          <li
            key={notif.id}
            className={`p-4 rounded-xl shadow flex justify-between items-center transition ${
              notif.read
                ? "bg-gray-100 text-gray-600"
                : "bg-blue-100 text-blue-800"
            } hover:opacity-80`}
          >
            <span>{notif.message}</span>
            {!notif.read && (
              <button
                onClick={() => markAsRead(notif.id)}
                className="text-sm bg-white text-blue-600 px-2 py-1 rounded hover:bg-gray-100 transition cursor-pointer"
              >
                Mark as read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
