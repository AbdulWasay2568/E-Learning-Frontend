import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface NotificationProps {
  message: string;
}

export default function NotificationBar({ message }: NotificationProps) {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  if (!visible) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] bg-red-500 text-white px-4 py-3 rounded-2xl shadow-lg z-50 flex justify-between items-center cursor-pointer"
      onClick={() => navigate("/notifications")}
    >
      <span>{message}</span>
      <button
        className="ml-4 text-white hover:text-gray-200"
        onClick={(e) => {
          e.stopPropagation(); // prevent navigation when closing
          setVisible(false);
        }}
      >
        <X size={20} />
      </button>
    </div>
  );
}
