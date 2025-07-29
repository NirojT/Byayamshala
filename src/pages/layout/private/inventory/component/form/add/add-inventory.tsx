import { PrivateRoute } from "@/global/config";
import { useGlobalStore } from "@/global/store";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import clsx from "clsx";
import { useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useItemCategoryStore } from "../category/store";
import { useItemFormStore } from "../store";
import { useItemUnitStore } from "../unit/store";

const AddInventoryForm = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const {
    createData,
    setCreateData,
    createItem,
    clearCreateData,
    addAdditonalItems,
    setAddAdditionalItems,
  } = useItemFormStore();
  const { itemUnits, getItemUnits } = useItemUnitStore();
  const { itemCategorys, getItemCategorys } = useItemCategoryStore();
  const { setToasterData } = useGlobalStore();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCreateData({ ...createData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await createItem();
    setToasterData({
      message: response.message,
      severity: response.severity,
      open: true,
    });
    if (response.severity === "success") {
      clearCreateData();
      setOpen(false);
    }
  };

  useEffect(() => {
    getItemUnits();
    getItemCategorys();
    // eslint-disable-next-line
  }, []);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="lg"
      fullWidth
      TransitionComponent={Slide}
      PaperProps={{
        style: {
          borderRadius: "1.5rem",
          fontFamily: "Poppins",
          boxShadow: "0 8px 40px rgba(0,0,0,0.13)",
          background: "#fcfcfd",
        },
      }}
    >
      <DialogTitle className="font-poppins px-6 pt-6 pb-2 flex flex-col gap-1 bg-gradient-to-r from-[#ffedd5] via-[#fff7ed] to-[#fefce8] rounded-t-2xl border-0">
        <span className="text-2xl font-extrabold text-[#E26300] tracking-wider leading-tight flex items-center gap-2">
          <MdOutlineAddCircleOutline className="text-3xl" />
          Add Inventory Item
        </span>
        <span className="text-sm text-gray-500 font-medium">
          Fill the form below to add a new inventory item.
        </span>
      </DialogTitle>

      <div className="flex flex-wrap sm:flex-nowrap justify-end gap-4 sm:gap-8 px-6 pt-1 text-gray-600 font-poppins bg-transparent">
        <button
          className="text-xs sm:text-sm hover:text-[#E26003] transition-colors flex items-center gap-1 font-medium"
          onClick={() => navigate(`/${PrivateRoute}/inventory/category`)}
        >
          <span className="underline text-[#E26300]">Manage Categories</span>
        </button>
        <button
          className="text-xs sm:text-sm hover:text-[#E26003] transition-colors flex items-center gap-1 font-medium"
          onClick={() => navigate(`/${PrivateRoute}/inventory/unit`)}
        >
          <span className="underline text-[#E26300]">Manage Units</span>
        </button>
      </div>

      <DialogContent className="px-6 py-6 font-poppins bg-transparent">
        <form className="space-y-8 md:space-y-10">
          {/* Basic Information */}
          <section>
            <h3 className="text-base sm:text-lg uppercase text-gray-700 mb-3 font-semibold tracking-wide">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                  Item Name
                </label>
                <input
                  name="name"
                  className="p-3 w-full text-gray-800 focus:outline-none text-sm sm:text-base border rounded-lg border-gray-200 focus:border-[#E26300] transition-colors bg-white shadow-sm"
                  placeholder={`Enter the item name`}
                  value={createData?.name || ""}
                  onChange={handleChange}
                  required
                  autoFocus
                />
              </div>
              <div className="relative">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={createData?.category || ""}
                  onChange={handleChange}
                  className="p-3 w-full text-gray-800 bg-white focus:outline-none text-sm sm:text-base border rounded-lg border-gray-200 focus:border-[#E26300] transition-colors appearance-none shadow-sm"
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {itemCategorys?.map((category) => (
                    <option key={category?.id} value={category?.category}>
                      {category?.category}
                    </option>
                  ))}
                </select>
                <span className="absolute right-4 top-10 text-gray-300 pointer-events-none">
                  ▼
                </span>
              </div>
            </div>
          </section>

          {/* Unit Section */}
          <section>
            <h3 className="text-base sm:text-lg uppercase font-semibold text-gray-700 mb-3 tracking-wide">
              Unit Selection
            </h3>
            <div className="relative">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                Primary Unit
              </label>
              <select
                name="primaryUnit"
                value={createData?.primaryUnit || ""}
                onChange={handleChange}
                className="p-3 w-full text-gray-800 bg-white focus:outline-none text-sm sm:text-base border rounded-lg border-gray-200 focus:border-[#E26300] transition-colors appearance-none shadow-sm"
                required
              >
                <option value="" disabled>
                  Select a unit
                </option>
                {itemUnits.map((unit) => (
                  <option key={unit?.id} value={unit?.unit}>
                    {unit?.unit}
                  </option>
                ))}
              </select>
              <span className="absolute right-4 top-10 text-gray-300 pointer-events-none">
                ▼
              </span>
            </div>
          </section>

          {/* Pricing Section */}
          <section>
            <h3 className="text-base sm:text-lg uppercase font-semibold text-gray-700 mb-3 tracking-wide">
              Pricing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                  Sales Price
                </label>
                <span className="absolute left-4 top-10 text-gray-400">रु</span>
                <input
                  onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
                  type="number"
                  name="sp"
                  onChange={handleChange}
                  className="pl-8 pr-3 py-3 w-full text-gray-800 focus:outline-none text-sm sm:text-base border rounded-lg border-gray-200 focus:border-[#E26300] transition-colors shadow-sm bg-white"
                  placeholder="Enter the selling price"
                  value={createData?.sp || ""}
                  required
                />
              </div>
              <div className="relative">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                  Purchase Price
                </label>
                <span className="absolute left-4 top-10 text-gray-400">रु</span>
                <input
                  onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
                  type="number"
                  name="cp"
                  onChange={handleChange}
                  className="pl-8 pr-3 py-3 w-full text-gray-800 focus:outline-none text-sm sm:text-base border rounded-lg border-gray-200 focus:border-[#E26300] transition-colors shadow-sm bg-white"
                  placeholder="Enter the purchase price"
                  value={createData?.cp || ""}
                  required
                />
              </div>
            </div>
          </section>

          {/* Stock Information */}
          <section>
            <h3 className="text-base sm:text-lg uppercase font-semibold text-gray-700 mb-3 tracking-wide">
              Stock Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative w-full">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                  Opening Stock
                </label>
                <input
                  onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
                  type="number"
                  name="openingStock"
                  onChange={handleChange}
                  className="pl-3 pr-3 py-3 w-full text-gray-800 focus:outline-none text-sm sm:text-base border rounded-lg border-gray-200 focus:border-[#E26300] transition-colors shadow-sm bg-white"
                  placeholder="Enter the opening stock"
                  value={createData?.openingStock || ""}
                  required
                />
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section>
            <button
              type="button"
              onClick={() => setAddAdditionalItems(!addAdditonalItems)}
              className={clsx(
                "flex items-center gap-2 text-sm sm:text-base font-semibold transition-colors mb-3 focus:outline-none",
                addAdditonalItems ? "text-orange-600" : "text-orange-500"
              )}
              aria-expanded={addAdditonalItems}
              aria-controls="additional-info-panel"
            >
              {addAdditonalItems ? (
                <FaChevronUp className="text-base" />
              ) : (
                <FaChevronDown className="text-base" />
              )}
              Additional Information
            </button>
            <div
              id="additional-info-panel"
              className={clsx(
                "transition-all duration-200",
                addAdditonalItems
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              )}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative w-full">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                    Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={createData?.code || ""}
                    onChange={handleChange}
                    className="pl-3 pr-3 py-3 w-full text-gray-800 focus:outline-none text-sm sm:text-base border rounded-lg border-gray-200 focus:border-[#E26300] transition-colors shadow-sm bg-white"
                    placeholder="Enter the code"
                  />
                </div>
                <div className="relative w-full">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                    Low Stock Alert
                  </label>
                  <input
                    type="number"
                    name="lowStockAlert"
                    value={createData?.lowStockAlert || ""}
                    onChange={handleChange}
                    className="pl-3 pr-3 py-3 w-full text-gray-800 focus:outline-none text-sm sm:text-base border rounded-lg border-gray-200 focus:border-[#E26300] transition-colors shadow-sm bg-white"
                    placeholder="Enter the low stock alert level"
                  />
                </div>
                <div className="relative w-full">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={createData?.location || ""}
                    onChange={handleChange}
                    className="pl-3 pr-3 py-3 w-full text-gray-800 focus:outline-none text-sm sm:text-base border rounded-lg border-gray-200 focus:border-[#E26300] transition-colors shadow-sm bg-white"
                    placeholder="rack 1 , rack 2 , etc."
                  />
                </div>
                <div className="relative w-full md:col-span-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                    Remarks
                  </label>
                  <textarea
                    name="remarks"
                    value={createData?.remarks || ""}
                    onChange={handleChange}
                    className="pl-3 pr-3 py-3 w-full text-gray-800 focus:outline-none text-sm sm:text-base border rounded-lg border-gray-200 focus:border-[#E26300] transition-colors shadow-sm bg-white"
                    placeholder="Enter remarks"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </section>
        </form>
      </DialogContent>

      <DialogActions className="px-6 py-5 border-t flex flex-col md:flex-row gap-3 md:gap-8 justify-end bg-transparent">
        <button
          className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-lg shadow-sm transition-colors duration-200 font-semibold text-sm sm:text-base"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
        <button
          className="bg-[#E26300] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#cf5902] transition-colors duration-200 font-semibold text-sm sm:text-base"
          onClick={handleSubmit}
        >
          Save Item
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default AddInventoryForm;
