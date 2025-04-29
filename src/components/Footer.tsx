import { FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-indigo-950 text-rose-50 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a
            href="https://www.instagram.com/sany_design_/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-300 transition-colors duration-200"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/sanela-petkovi%C4%87-b14135363"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-300 transition-colors duration-200"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
        </div>

        <div className="text-sm text-center md:text-right">
          <p>
            &copy; 2025 Sanela Petković. <br /> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
