import Select from "react-select";
import { useAddPurchaseFormStore } from "../store";
import { IPurchaseItem } from "../interface";
import { Package, X, Plus } from "lucide-react";

const PurchaseItemCard = () => {
  const { data, setData, items } = useAddPurchaseFormStore();

  const handleItemChange = (
    index: number,
    field: keyof IPurchaseItem,
    value: string | number
  ) => {
    const updatedItems = [...data.purchaseItemsReq];

    if (field === "itemName") {
      const selectedItem = items.find((item) => item?.name === value);
      updatedItems[index] = {
        ...updatedItems[index],
        itemName: value as string,
        quantity: 1,
        originalPrice: selectedItem ? selectedItem?.cp : 0, // Store original sp
        price: selectedItem ? selectedItem?.cp : 0,
        discount: 0, // Reset discount when item changes
      };
    } else if (field === "discount") {
      const originalPrice = updatedItems[index].originalPrice ?? 0;
      const discountValue = Math.min(
        Number(value) || 0,
        originalPrice * updatedItems[index].quantity
      ); // Prevent excessive discount

      updatedItems[index] = {
        ...updatedItems[index],
        discount: discountValue,
      };
    } else if (field === "quantity") {
      const originalPrice = updatedItems[index].originalPrice ?? 0; // Ensure we use original price
      const quantityValue = Math.max(Number(value) || 1, 1); // Minimum quantity should be 1

      updatedItems[index] = {
        ...updatedItems[index],
        quantity: quantityValue,
        price: Math.max(originalPrice - updatedItems[index].discount, 0), // Apply discount after quantity multiplication
      };
    } else {
      updatedItems[index] = { ...updatedItems[index], [field]: value };
    }

    setData({ ...data, purchaseItemsReq: updatedItems });
  };

  const addNewItem = () => {
    setData({
      ...data,
      purchaseItemsReq: [
        ...data.purchaseItemsReq,
        {
          itemName: "",
          quantity: 1,
          discount: 0,
          price: 0,
          originalPrice: 0,
          returnedQty: 0,
        }, // Add new item with default values
      ],
    });
  };

  const removeItem = (index: number) => {
    const updatedItems = [...data.purchaseItemsReq];
    updatedItems?.splice(index, 1); // Remove item at index
    setData({ ...data, purchaseItemsReq: updatedItems });
  };

  return (
    <div>
      <h2 className="text-sm font-medium text-[#1A1A1A] mb-3">Items</h2>
      {data.purchaseItemsReq?.map((item, index) => (
        <div
          key={index}
          className={`p-4 ${
            index > 0 ? "border-t border-gray-100 mt-3 pt-4" : ""
          } bg-white rounded-lg shadow-sm border border-gray-100 mb-3`}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-[#1A1A1A] flex items-center">
              <Package className="w-3.5 h-3.5 mr-1.5 text-[#E26300]" />
              Item {index + 1}
            </h3>
            {data.purchaseItemsReq?.length > 1 && (
              <button
                onClick={() => removeItem(index)}
                className="text-red-500 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
                aria-label="Remove item"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 items-start relative pr-10">
            {/* Select item */}
            <div className="sm:col-span-4 md:col-span-2">
              <label className="block text-xs text-[#2E2E2E]/70 mb-1.5">
                Item Name
              </label>
              <div className="relative">
                <Package className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-[#2E2E2E] z-10 w-4 h-4" />
                <Select
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      backgroundColor: "#FAFAFA",
                      borderColor: state.isFocused ? "#E26300" : "#E5E7EB",
                      boxShadow: state.isFocused ? "0 0 0 1px #E26300" : "none",
                      minHeight: "42px",
                      borderRadius: "0.5rem",
                      paddingLeft: "1.75rem",
                      color: "#2E2E2E",
                      "&:hover": {
                        borderColor: "#E26300",
                      },
                    }),
                    input: (base) => ({
                      ...base,
                      color: "#2E2E2E",
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#9CA3AF",
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: "#2E2E2E",
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused
                        ? "#F3F4F6"
                        : state.isSelected
                        ? "#E5E7EB"
                        : "white",
                      color: "#2E2E2E",
                      cursor: "pointer",
                      ":active": {
                        backgroundColor: "#E5E7EB",
                      },
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: "white",
                      color: "#2E2E2E",
                      zIndex: 10,
                      borderRadius: "0.5rem",
                      overflow: "hidden",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    }),
                  }}
                  value={
                    item?.itemName
                      ? { label: item?.itemName, value: item?.itemName }
                      : null
                  }
                  options={items
                    .filter(
                      (item) =>
                        !data.purchaseItemsReq?.some(
                          (selected, i) =>
                            selected.itemName === item?.name && i !== index
                        )
                    )
                    .map((item) => ({
                      label: item?.name,
                      value: item?.name,
                    }))}
                  onChange={(selectedOption) =>
                    handleItemChange(
                      index,
                      "itemName",
                      selectedOption?.value || ""
                    )
                  }
                  placeholder="Select item"
                  noOptionsMessage={() => "No items available"}
                />
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-xs text-[#2E2E2E]/70 mb-1.5">
                Quantity
              </label>
              <input
                type="number"
                onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
                className="p-2.5 bg-[#FAFAFA] text-[#2E2E2E] block w-full rounded-lg focus:outline-none border border-gray-200 focus:border-[#E26300] focus:ring-1 focus:ring-[#E26300] text-sm"
                placeholder="Quantity"
                value={item?.quantity || ""}
                onChange={(e) =>
                  handleItemChange(index, "quantity", Number(e.target.value))
                }
              />
            </div>

            {/* Discount */}
            <div>
              <label className="block text-xs text-[#2E2E2E]/70 mb-1.5">
                Discount
              </label>
              <input
                type="number"
                onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
                className="p-2.5 bg-[#FAFAFA] text-[#2E2E2E] block w-full rounded-lg focus:outline-none border border-gray-200 focus:border-[#E26300] focus:ring-1 focus:ring-[#E26300] text-sm"
                placeholder="Discount"
                value={item?.discount || ""}
                onChange={(e) =>
                  handleItemChange(index, "discount", Number(e.target.value))
                }
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs text-[#2E2E2E]/70 mb-1.5">
                Price
              </label>
              <input
                type="number"
                onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
                className="p-2.5 bg-[#FAFAFA] text-[#2E2E2E] block w-full rounded-lg focus:outline-none border border-gray-200 focus:border-[#E26300] focus:ring-1 focus:ring-[#E26300] text-sm"
                placeholder="Price"
                value={item?.price || ""}
                onChange={(e) =>
                  handleItemChange(index, "price", Number(e.target.value))
                }
              />
            </div>
          </div>

          <div className="mt-2 flex justify-end">
            <div className="text-xs text-[#2E2E2E]/70">
              Item total:{" "}
              <span className="text-[#1A1A1A] font-medium">
                NPR {(item?.price * item?.quantity - item?.discount).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addNewItem}
        className="mt-1 text-[#E26300] text-sm hover:text-[#D25200] transition-colors flex items-center"
      >
        <Plus size={14} className="mr-1" />
        Add Another Item
      </button>
    </div>
  );
};

export default PurchaseItemCard;
