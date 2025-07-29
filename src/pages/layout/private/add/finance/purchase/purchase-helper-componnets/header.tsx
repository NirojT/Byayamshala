import { ShoppingBag } from "lucide-react";

interface HeaderProps {
  id?: number;
}

const Header: React.FC<HeaderProps> = ({ id }) => {
  return (
    <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 text-center">
        <h1 className="text-xl font-semibold text-[#1A1A1A] mb-2 flex items-center justify-center">
          <ShoppingBag className="mr-2 text-[#E26300]" size={20} />
          {id ? "Update" : "Create"} Purchase Record
        </h1>
        <p className="text-[#2E2E2E] text-sm">
          {id
            ? "Update existing purchase details"
            : "Enter new purchase information"}{" "}
          for your inventory records
        </p>
      </div>
      {/* Subtle orange accent line at bottom */}
      <div className="h-0.5 bg-[#E26300]/20 w-full"></div>
    </div>
  );
};

export default Header;
