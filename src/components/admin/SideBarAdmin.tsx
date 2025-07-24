import { LayoutDashboard, Users, BookOpen, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const SideBarAdmin = () => {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">Admin Panel</div>
      <nav className="flex-1 p-4 space-y-2">
        <Link to="/admin/dashboard" className="flex items-center gap-3 p-3 rounded hover:bg-gray-700">
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        <Link to="/admin/users" className="flex items-center gap-3 p-3 rounded hover:bg-gray-700">
          <Users size={20} />
          Manage Users
        </Link>
        <Link to="/admin/courses" className="flex items-center gap-3 p-3 rounded hover:bg-gray-700">
          <BookOpen size={20} />
          Courses
        </Link>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center gap-3 w-full p-3 rounded hover:bg-gray-700">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default SideBarAdmin;
