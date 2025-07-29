import { useGlobalStore } from "@/global/store";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IItemDetails } from "../../list/interface";
import { useItemCategoryStore } from "../category/store";
import { useItemFormStore } from "../store";

const UpdateInventoryForm = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { updateData, setUpdateData, updateItem } = useItemFormStore();
  const { itemCategorys, getItemCategorys } = useItemCategoryStore();
  const item: IItemDetails = useLocation().state;

  const { setToasterData } = useGlobalStore();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (["sp", "cp"].includes(name)) {
      setUpdateData({ ...updateData, [name]: parseFloat(value) });
    } else if (["openingStock", "lowStockAlert"].includes(name)) {
      setUpdateData({ ...updateData, [name]: parseInt(value) });
    } else {
      setUpdateData({ ...updateData, [name]: value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await updateItem(item?.id);
    setToasterData({
      message: response.message,
      severity: response.severity,
      open: true,
    });

    if (response.severity === "success") {
      setOpen(false);
    }
  };

  useEffect(() => {
    getItemCategorys();
  }, []);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: "1rem",
          backgroundColor: "#FAFAFA", // Minimal Zen theme background
          fontFamily: "Poppins",
        },
      }}
    >
      <DialogTitle className="font-poppins text-2xl font-semibold text-[#1A1A1A] border-b pb-4">
        Edit Inventory Item
      </DialogTitle>

      <DialogContent className="px-8 py-6 font-poppins">
        <form className="space-y-6">
          {/* Name and Category */}
          <div>
            <h3 className="text-lg uppercase font-medium text-[#2E2E2E] mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
                  Name
                </label>
                <input
                  name="name"
                  value={updateData?.name || ""}
                  onChange={handleChange}
                  className="p-3 w-full text-[#2E2E2E] bg-white focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors"
                  placeholder="Enter item name"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={updateData?.category || ""}
                  onChange={handleChange}
                  className="p-3 w-full text-[#2E2E2E] bg-white focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors appearance-none"
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
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                  ▼
                </span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-lg uppercase font-medium text-[#2E2E2E] mb-4">
              Pricing
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
                  Selling Price
                </label>
                <span className="absolute left-3 top-1/2 transform  text-gray-500">
                  रु
                </span>
                <input
                  type="number" onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
                  name="sp"
                  value={updateData?.sp || ""}
                  onChange={handleChange}
                  className="pl-8 pr-3 py-3 w-full text-[#2E2E2E] bg-white focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors rounded-sm"
                  placeholder="Enter selling price"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
                  Purchase Price
                </label>
                <span className="absolute left-3 top-1/2 transform  text-gray-500">
                  रु
                </span>
                <input
                  type="number" onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
                  name="cp"
                  value={updateData?.cp || ""}
                  onChange={handleChange}
                  className="pl-8 pr-3 py-3 w-full text-[#2E2E2E] bg-white focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors rounded-sm"
                  placeholder="Enter purchase price"
                  required
                />
              </div>
            </div>
          </div>

          {/* Stock Information */}
          <div>
            <h3 className="text-lg uppercase font-medium text-[#2E2E2E] mb-4">
              Stock Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
                  Opening Stock
                </label>
                <input
                  type="number" onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
                  name="openingStock"
                  value={updateData?.openingStock || ""}
                  onChange={handleChange}
                  className="p-3 w-full text-[#2E2E2E] bg-white focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors"
                  placeholder="Enter opening stock"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
                  Low Stock Alert
                </label>
                <input
                  type="number" onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
                  name="lowStockAlert"
                  value={updateData?.lowStockAlert || ""}
                  onChange={handleChange}
                  className="p-3 w-full text-[#2E2E2E] bg-white focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors"
                  placeholder="Enter low stock alert level"
                  required
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-lg uppercase font-medium text-[#2E2E2E] mb-4">
              Additional Information
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
                  Code
                </label>
                <input
                  name="code"
                  value={updateData?.code || ""}
                  onChange={handleChange}
                  className="p-3 w-full text-[#2E2E2E] bg-white focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors"
                  placeholder="Enter code"
                  required={false}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
                  Location
                </label>
                <input
                  name="location"
                  value={updateData?.location || ""}
                  onChange={handleChange}
                  className="p-3 w-full text-[#2E2E2E] bg-white focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors"
                  placeholder="Enter location"
                  required={false}
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
                  Remarks
                </label>
                <textarea
                  name="remarks"
                  value={updateData?.remarks || ""}
                  onChange={handleChange}
                  className="p-3 w-full text-[#2E2E2E] bg-white focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors rounded-sm"
                  placeholder="Enter remarks"
                  rows={3}
                />
              </div>
            </div>
          </div>
        </form>
      </DialogContent>

      <DialogActions className="px-8 py-6 border-t flex justify-end gap-6">
        <button
          className="bg-white border border-gray-300 hover:bg-gray-100 text-[#2E2E2E] px-6 py-3 rounded-md shadow-md transition-colors duration-200"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
        <button
          className="bg-[#E26300] text-white px-6 py-3 rounded-md shadow-md hover:bg-[#D25200] transition-colors duration-200"
          onClick={handleSubmit}
        >
          Save Changes
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateInventoryForm;