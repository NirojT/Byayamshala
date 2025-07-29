import { MenuType } from "@/global/components/enums/enums";
import { useGlobalStore } from "@/global/store";
import { Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useItemListStore } from "../../../inventory/component/list/store";
import { IStockItems } from "../interface";
import { useMenuStore } from "../store";

const MenuModalForm = () => {
  const { data, setData, clearData, open, toggleOpen, saveMenu } =
    useMenuStore();
  const { setToasterData } = useGlobalStore();
  const { items, getItems } = useItemListStore();

  // Menu ingredients (stock deduction)
  const [stockItems, setStockItems] = useState<IStockItems[]>([]);

  const handleClose = () => {
    clearData();
    setStockItems([]);
    toggleOpen();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({
      ...data,
      [e.target.name]:
        e.target.name === "price" ? +e.target.value : e.target.value,
    });
  };

  const handleStockItemChange = (
    index: number,
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedStockItems = [...stockItems];

    if (name === "itemId") {
      const selectedItemId = parseInt(value);
      // Check for duplicates
      const isDuplicate = updatedStockItems.some(
        (item, i) => i !== index && item.itemId === selectedItemId
      );

      if (isDuplicate) {
        setToasterData({
          message: "This item has already been added.",
          severity: "error",
          open: true,
        });
        // Optionally, reset the select box for the current item or prevent the change
        // For now, we'll just show the toaster and keep the old value
        return;
      }

      const selectedItem = items.find((item) => item.id === selectedItemId);
      if (selectedItem) {
        updatedStockItems[index] = {
          ...updatedStockItems[index],
          itemId: selectedItem.id,
          name: selectedItem.name, // Set the name based on the selected item
        };
      }
    } else {
      updatedStockItems[index] = {
        ...updatedStockItems[index],
        [name]: value,
      };
    }
    setStockItems(updatedStockItems);
  };

  const addStockItem = () => {
    setStockItems([...stockItems, { itemId: 0, name: "", quantity: 0 }]);
  };

  const removeStockItem = (index: number) => {
    const updatedStockItems = stockItems.filter((_, i) => i !== index);
    setStockItems(updatedStockItems);
  };

  const handleSubmit = async () => {
    if (stockItems.map((item) => item.quantity).includes(0)) {
      setToasterData({
        message: "Quantity cannot be zero.",
        severity: "error",
        open: true,
      });
      return;
    }
    const res = await saveMenu({ ...data, stockItems });
    setToasterData({
      message: res?.message,
      severity: res?.severity,
      open: true,
    });

    if (res?.severity === "success") {
      handleClose();
    }
  };

  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    // If editing an existing menu with stockItems, initialize local state
    if (data?.stockItems?.length) {
      setStockItems(data.stockItems);
    } else {
      // Clear stock items if adding a new menu
      setStockItems([]);
    }
  }, [data?.stockItems]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      BackdropProps={{
        style: { backgroundColor: "rgba(26, 26, 26, 0.5)" },
      }}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#FAFAFA] rounded-xl shadow-lg p-6 outline-none">
        {/* Modal Header */}
        <div className="border-b border-[#1A1A1A]/10 pb-4 mb-6">
          <Typography
            variant="h6"
            component="h2"
            className="text-xl font-bold text-[#1A1A1A]"
          >
            {data?.id > 0 ? "Update" : "Add"} Menu Item
          </Typography>
        </div>

        <div className="space-y-6">
          {/* Menu Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm text-[#2E2E2E]/70 mb-1"
            >
              Menu Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={data?.name || ""}
              onChange={handleChange}
              placeholder="Enter menu name"
              className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors bg-transparent"
            />
          </div>
          {/* Menu Type */}
          <div>
            <label
              htmlFor="menuType"
              className="block text-sm text-[#2E2E2E]/70 mb-1"
            >
              Menu Type
            </label>
            <select
              id="menuType"
              name="menuType"
              value={data?.menuType || ""}
              onChange={handleChange}
              className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors bg-transparent cursor-pointer"
            >
              <option value="" disabled>
                Select menu type
              </option>
              {Object.values(MenuType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm text-[#2E2E2E]/70 mb-1"
            >
              Price (NPR)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              value={data?.price || ""}
              onChange={handleChange}
              placeholder="Enter price"
              className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors bg-transparent"
            />
          </div>

          {/* Stock to Deduct */}
          <div>
            <label className="block text-sm text-[#2E2E2E]/70 mb-2">
              Stock to Deduct
            </label>
            {stockItems.map((stockItem, index) => (
              <div key={index} className="flex gap-3 mb-2 items-end">
                <div className="flex-grow">
                  <label
                    htmlFor={`stockItem-${index}`}
                    className="block text-xs text-[#2E2E2E]/60 mb-1"
                  >
                    Item
                  </label>
                  <select
                    id={`stockItem-${index}`}
                    name="itemId"
                    value={stockItem.itemId || ""}
                    onChange={(e) => handleStockItemChange(index, e)}
                    className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors bg-transparent cursor-pointer"
                  >
                    <option value="" disabled>
                      Select an item
                    </option>
                    {items.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} ({item?.primaryUnit})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-24">
                  <label
                    htmlFor={`quantity-${index}`}
                    className="block text-xs text-[#2E2E2E]/60 mb-1"
                  >
                    Quantity
                  </label>
                  <input
                    id={`quantity-${index}`}
                    name="quantity"
                    type="number"
                    value={stockItem.quantity || ""}
                    onChange={(e) => handleStockItemChange(index, e)}
                    placeholder="Qty"
                    className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors bg-transparent"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeStockItem(index)}
                  className="p-2 text-red-500 hover:text-red-700 transition-colors"
                >
                  {/* You can replace this with an icon if you have one */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.927a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m-1.022.165 1.156 12.82c.078.868.295 1.705.657 2.502m-.657-2.502C5.397 18.28 6.536 19.14 7.82 19.833M7.82 19.833a48.017 48.017 0 0 0 3.82 0M7.82 19.833C9.104 20.526 10.513 20.89 12 20.89m-2.828-9.988a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0ZM15 12a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                    />
                  </svg>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addStockItem}
              className="mt-2 px-3 py-1 text-sm rounded-lg border border-[#E26300] text-[#E26300] hover:bg-[#E26300] hover:text-white transition-colors"
            >
              Add Stock Item
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-8 gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 rounded-lg border border-[#1A1A1A]/10 text-[#2E2E2E] hover:bg-[#1A1A1A]/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-[#E26300] text-white hover:bg-[#D25800] transition-colors"
          >
            {data?.id > 0 ? "Update" : "Save"} Menu
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-[#1A1A1A]/10 text-center">
          <Typography variant="caption" className="text-[#2E2E2E]/50 text-xs">
            {data?.id > 0
              ? "Updating existing menu ID: " + data?.id
              : "Creating new menu item"}
          </Typography>
        </div>
      </div>
    </Modal>
  );
};

export default MenuModalForm;
