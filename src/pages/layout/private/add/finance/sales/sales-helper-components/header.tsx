import { ShoppingCart } from "lucide-react";
import { useAddSalesFormStore } from "../store";
import { IoMdCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

const Header = ({ id }: { id: number }) => {
  const { printBill, setPrintBill } = useAddSalesFormStore();
  return (
    <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ">
      {/* Checkbox for print bill */}
    { ( id ===0 || !id) && ( 
      <div className="w-full flex gap-5  justify-center p-2">
        <h1 className="text-xl font-semibold text-[#1A1A1A] mb-2 flex items-center justify-center">
          Print Bill
        </h1>
        <div
          className="hover:cursor-pointer"
          onClick={() => setPrintBill(!printBill)}
        >
          {printBill ? (
            <IoMdCheckbox size={26} />
          ) : (
            <MdOutlineCheckBoxOutlineBlank size={26} />
          )}
        </div>
      </div>
      )}

      <div className="  text-center pb-2">
        <h1 className="text-xl font-semibold text-[#1A1A1A] mb-2 flex items-center justify-center">
          <ShoppingCart className="mr-2 text-[#E26300]" size={18} />
          {id ? "Update" : "Create"} Sales Record
        </h1>
        <p className="text-[#2E2E2E] text-sm">
          {id ? "Update existing sales details" : "Enter new sales information"}{" "}
          for your business records
        </p>
      </div>

      {/* Subtle orange accent line at bottom */}
      <div className="h-0.5 bg-[#E26300]/20 w-full"></div>
    </div>
  );
};

export default Header;
