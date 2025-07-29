import { useEffect, useState } from "react";
import InventoryTop from "./component/inventory-top";
import InventoryList from "./component/list/inventory-list";
import AddInventoryForm from "./component/form/add/add-inventory";
import { useGlobalStore } from "@/global/store";

const Inventory = () => {
  
    // stores
    const {  scrollPosition } = useGlobalStore();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  return (
    <>
      {/* top */}

      <div className="flex items-center justify-center p-4">
        <InventoryTop />
        <button
          className="mb-5  ml-10 inline-flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-[#2E2E2E] px-4 py-2 rounded-md shadow-sm cursor-pointer transition-colors duration-200 h-[40px]"
          onClick={() => setOpen(true)}
        >
          Add
        </button>
      </div>
      {/* list */}
      <InventoryList />

      {open && <AddInventoryForm open={open} setOpen={setOpen} />}
    </>
  );
};

export default Inventory;
