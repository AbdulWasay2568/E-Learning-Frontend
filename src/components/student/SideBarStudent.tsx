import { LayoutDashboard, BookOpenCheck, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const SideBarStudent = () => {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">Student Panel</div>
      <nav className="flex-1 p-4 space-y-2">
        <Link to="/student/dashboard" className="flex items-center gap-3 p-3 rounded hover:bg-gray-700">
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        <Link to="/student/courses" className="flex items-center gap-3 p-3 rounded hover:bg-gray-700">
          <BookOpenCheck size={20} />
          My Courses
        </Link>
        <Link to="/student/profile" className="flex items-center gap-3 p-3 rounded hover:bg-gray-700">
          <User size={20} />
          Profile
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

export default SideBarStudent;
