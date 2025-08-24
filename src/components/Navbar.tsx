import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false); // Close menu when a link is clicked
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm fixed w-full z-50">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-violet-600">
          AI Learn
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-violet-600 font-medium">Home</Link>
          <Link to="/courses" className="hover:text-violet-600 font-medium">Courses</Link>
          <Link to="/support" className="hover:text-violet-600 font-medium">Support</Link>
          <Link to="/aboutus" className="hover:text-violet-600 font-medium">About Us</Link>
          <Link to="/login" className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition">Login</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden bg-white border-t overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-2">
          <Link to="/" className="block hover:text-violet-600" onClick={handleLinkClick}>Home</Link>
          <Link to="/courses" className="block hover:text-violet-600" onClick={handleLinkClick}>Courses</Link>
          <Link to="/groups" className="block hover:text-violet-600" onClick={handleLinkClick}>Groups</Link>
          <Link to="/support" className="block hover:text-violet-600" onClick={handleLinkClick}>Support</Link>
          <Link to="/login" className="block px-4 py-2 bg-violet-600 text-white rounded text-center hover:bg-violet-700" onClick={handleLinkClick}>Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
