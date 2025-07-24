import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-violet-600">
          AI Learn
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-violet-600 font-medium">Home</Link>
          <Link to="/courses" className="hover:text-violet-600 font-medium">Courses</Link>
          <Link to="/groups" className="hover:text-violet-600 font-medium">Groups</Link>
          <Link to="/support" className="hover:text-violet-600 font-medium">Support</Link>
          <Link to="/login" className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition">Login</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2 border-t">
          <Link to="/" className="block hover:text-violet-600">Home</Link>
          <Link to="/courses" className="block hover:text-violet-600">Courses</Link>
          <Link to="/groups" className="block hover:text-violet-600">Groups</Link>
          <Link to="/support" className="block hover:text-violet-600">Support</Link>
          <Link to="/login" className="block px-4 py-2 bg-violet-600 text-white rounded text-center hover:bg-violet-700">Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
