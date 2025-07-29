
const Header = () => {
 

  return (
    <div
      className="mb-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-4 flex flex-col
    gap-2
    "
    >
      <div className="bg-white text-black flex justify-center font-poppins py-4 text-lg font-medium">
        Add Plans
      </div>

      {/* Subtle orange accent line at bottom */}
      <div className="h-0.5 bg-[#E26300]/20 w-full"></div>
    </div>
  );
};

export default Header;
