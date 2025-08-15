import { useState } from "react";
import { Link } from "react-router-dom";

type NavbarProps = {
  active: string;
};

const Navbar = ({ active }: NavbarProps) => {
  const [activeLink, setActiveLink] = useState(active);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`w-full sticky top-0 z-50 bg-white/80 backdrop-blur ${
        isMenuOpen ? "shadow-none" : "shadow-md"
      }`}
    >
      <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
        <Link
          to={"/"}
          className="text-indigo-950 text-2xl font-extrabold tracking-tight cursor-pointer transform transition-all duration-300 ease-in-out hover:rotate-3"
        >
          sanydesign
        </Link>
        <nav className="hidden md:flex space-x-8 text-indigo-950 text-sm font-semibold">
          <Link
            to="/"
            onClick={() => setActiveLink("work")}
            className={`relative ${
              activeLink === "work"
                ? "text-indigo-700 border-b-2 border-indigo-950"
                : "text-indigo-950 hover:text-indigo-700 transition-colors duration-200"
            }`}
          >
            Work
          </Link>
          <Link
            to="/services"
            onClick={() => setActiveLink("services")}
            className={`relative ${
              activeLink === "services"
                ? "text-indigo-700 border-b-2 border-indigo-950"
                : "text-indigo-950 hover:text-indigo-700 transition-colors duration-200"
            }`}
          >
            Services
          </Link>
          <Link
            to="/about"
            onClick={() => setActiveLink("about")}
            className={`relative ${
              activeLink === "about"
                ? "text-indigo-700 border-b-2 border-indigo-950"
                : "text-indigo-950 hover:text-indigo-700 transition-colors duration-200"
            }`}
          >
            About
          </Link>
        </nav>

        <div
          className="md:hidden text-indigo-950 cursor-pointer"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden absolute top-16 left-0 w-full z-50 bg-white/80 backdrop-blur shadow-xl pt-4 pb-8">
          <div className="flex flex-col items-center space-y-4">
            <Link
              to="/"
              onClick={() => {
                setActiveLink("work");
                setIsMenuOpen(false);
              }}
              className={`text-lg ${
                activeLink === "work"
                  ? "text-indigo-700 border-b-2 border-indigo-950"
                  : "text-indigo-950 hover:text-indigo-700 transition-colors duration-200"
              }`}
            >
              Work
            </Link>
            <Link
              to="/services"
              onClick={() => {
                setActiveLink("services");
                setIsMenuOpen(false);
              }}
              className={`text-lg ${
                activeLink === "services"
                  ? "text-indigo-700 border-b-2 border-indigo-950"
                  : "text-indigo-950 hover:text-indigo-700 transition-colors duration-200"
              }`}
            >
              Services
            </Link>
            <Link
              to="/about"
              onClick={() => {
                setActiveLink("about");
                setIsMenuOpen(false);
              }}
              className={`text-lg ${
                activeLink === "about"
                  ? "text-indigo-700 border-b-2 border-indigo-950"
                  : "text-indigo-950 hover:text-indigo-700 transition-colors duration-200"
              }`}
            >
              About
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
