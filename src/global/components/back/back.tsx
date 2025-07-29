import { FaArrowLeft } from "react-icons/fa";

const Back = () => {
  return (
    <button
      onClick={() => window.history.go(-1)}
      className="flex items-center justify-center 
                 h-8 w-8 sm:h-10 sm:w-10 
                 rounded-full 
                 backdrop-blur-md 
                 hover:bg-gray-700/30 
                 transition-all 
                 border border-gray-700/50"
      aria-label="Go back"
    >
      <FaArrowLeft className="text-[#E26300] text-base sm:text-lg" />
    </button>
  );
};

export default Back;
