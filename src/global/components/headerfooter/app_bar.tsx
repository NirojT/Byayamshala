import { useState } from "react";
import { GiCrossMark } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";

const AppBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className="flex justify-between items-center py-4 px-6 relative bg-black text-white xl:hidden">
        <div>
          <GiCrossMark
            size={30}
            className="cursor-pointer"
            onClick={handleToggle}
          />
        </div>
        <button
          className="cursor-pointer bg-[#FF6A00] px-3 font-poppins rounded-2xl py-2 hover:border-b hover:border-[#FF6A00] transition-all"
          onClick={() => navigate("/auth")}
          aria-label="Get started with GymUdaan - Nepal's best gym management software"
        >
          Get Started
        </button>
      </div>
      

      {/* Desktop Navbar */}
      <div className="hidden xl:flex flex-col gap-6 w-full">
        {/* Top Links */}
        <div className="flex justify-end items-center gap-5 pr-32 py-4 bg-black text-white font-poppins">
          <Link
            to="/"
            className="hover:text-orange-400 transition-all p-1 text-lg text-slate-300 font-semibold"
            aria-label="Best Gym Software Nepal - Home"
          >
            Home
          </Link>
          <Link
            to="/plans"
            className="hover:text-orange-400 transition-all p-1 text-lg text-slate-300"
            aria-label="GymUdaan Plans"
          >
            Plans
          </Link>
          <Link
            to="/auth"
            className="hover:text-orange-400 transition-all p-1 text-lg text-slate-300"
            aria-label="Sign up for GymUdaan"
          >
            Sign up
          </Link>

          {/* Animated Dots */}
          <div className="w-5 h-5 rounded-full bg-blue-800 animate-ping-slow flex items-center justify-center"></div>
          <div className="w-5 h-5 rounded-full bg-red-800 hover:bg-red-700 animate-ping-fast flex items-center justify-center"></div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`absolute top-0 left-0 w-full h-full z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center transition-transform duration-500 xl:hidden ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="text-white capitalize text-2xl mb-6 hover:border-b-2 hover:border-orange-400"
          aria-label="Best Gym Software in Nepal - Home"
        >
          Best Gym Software Nepal
        </Link>
        <Link
          to="/plans"
          onClick={() => setIsOpen(false)}
          className="text-white capitalize text-2xl mb-6 hover:border-b-2 hover:border-orange-400"
          aria-label="GymUdaan Plans"
        >
          Plans
        </Link>
        <button
          className="text-white capitalize text-2xl cursor-pointer hover:border-b-2 hover:border-orange-400"
          onClick={handleToggle}
        >
          Close
        </button>
      </div>
    </>
  );
};

export default AppBar;
