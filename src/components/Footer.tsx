import { Facebook, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-8 mt-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Section 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-violet-600">AI Learn</h3>
          <p className="text-sm">Empowering learners with AI-driven tools and smart education features.</p>
        </div>

        {/* Section 2 */}
        <div>
          <h4 className="font-semibold mb-2">Explore</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/courses" className="hover:text-violet-600">Courses</Link></li>
            <li><Link to="/groups" className="hover:text-violet-600">Groups</Link></li>
            <li><Link to="/support" className="hover:text-violet-600">Support</Link></li>
          </ul>
        </div>

        {/* Section 3 */}
        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/about" className="hover:text-violet-600">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-violet-600">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-violet-600">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Section 4 - Social */}
        <div>
          <h4 className="font-semibold mb-2">Connect</h4>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook"><Facebook className="hover:text-violet-600" size={20} /></a>
            <a href="#" aria-label="Twitter"><Twitter className="hover:text-violet-600" size={20} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin className="hover:text-violet-600" size={20} /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm mt-6 text-gray-500">
        © {new Date().getFullYear()} AI Learn. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
