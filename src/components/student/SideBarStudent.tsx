import { useState } from "react";
import {
  LayoutDashboard,
  BookOpenCheck,
  User,
  LogOut,
  Menu,
  X,
  Home,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SideBarStudent = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  const menuItems = [
    { label: "Home", icon: Home, path: "/" },
    { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
    { label: "My Courses", icon: BookOpenCheck, path: "/student/courses" },
    { label: "Profile", icon: User, path: "/student/profile" },
  ];

  return (
    <>
      {/* Navbar (mobile + md screens) */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-gray-800 text-white flex items-center px-4 z-40 lg:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="mr-4 focus:outline-none"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-bold">Student Panel</h1>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-800 text-white flex flex-col z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:w-72 w-64`}
      >
        {/* Close Button for mobile + md */}
        <div className="lg:hidden flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Header (hidden on small & md) */}
        <div className="hidden lg:block p-6 text-2xl font-bold border-b border-gray-700">
          Student Panel
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-colors"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="flex items-center gap-3 w-full p-3 rounded hover:bg-gray-700 transition-colors text-left"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile + md */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-transparent z-40 lg:hidden"
        />
      )}
    </>
  );
};

export default SideBarStudent;
