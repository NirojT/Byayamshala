import { zenSelectStyles } from "@/global/components/desing/design";
import { useGlobalStore } from "@/global/store";
import { Package, Plus, X } from "lucide-react";
import React, { useEffect } from "react";
import Select from "react-select";
import { ISalesItem } from "../../add/finance/sales/interface";
import { useAddSalesFormStore } from "../../add/finance/sales/store";
import { PaymentMode } from "@/global/components/enums/enums";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const paymentOptions = [
  { value: "CASH", label: "Cash" },
  { value: "BANK", label: "Bank" },
];

const QuickSalesModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { items, getNamesOfItem, data, setData, clearData, quickSales } =
    useAddSalesFormStore();
  const { setToasterData } = useGlobalStore();

  // Handle changes for sales items
  const handleItemChange = (
    index: number,
    field: keyof ISalesItem,
    value: string | number
  ) => {
    const updatedItems = [...data.salesItemsReq];

    if (field === "itemName") {
      const selectedItem = items.find((item) => item?.name === value);
      updatedItems[index] = {
        ...updatedItems[index],
        itemName: value as string,
        quantity: 1,
        originalPrice: selectedItem ? selectedItem.sp : 0,
        price: selectedItem ? selectedItem.sp : 0,
        discount: 0,
      };
    } else if (field === "discount") {
      const originalPrice = updatedItems[index].originalPrice ?? 0;
      const discountValue = Math.min(
        Number(value) || 0,
        originalPrice * updatedItems[index].quantity
      );
      updatedItems[index] = {
        ...updatedItems[index],
        discount: discountValue,
      };
    } else if (field === "quantity") {
      const originalPrice = updatedItems[index].originalPrice ?? 0;
      const quantityValue = Math.max(Number(value) || 1, 1);
      updatedItems[index] = {
        ...updatedItems[index],
        quantity: quantityValue,
        price: Math.max(originalPrice - updatedItems[index].discount, 0),
      };
    } else {
      updatedItems[index] = { ...updatedItems[index], [field]: value };
    }

    setData({ ...data, salesItemsReq: updatedItems });
  };

  // Handle changes for payment mode
  const handlePaymentModeChange = (val: PaymentMode) => {
    setData({ ...data, paymentMode: val });
  };

  const addNewItem = () => {
    setData({
      ...data,
      salesItemsReq: [
        ...data.salesItemsReq,
        {
          itemName: "",
          quantity: 1,
          discount: 0,
          price: 0,
          originalPrice: 0,
          returnedQty: 0,
        },
      ],
    });
  };

  const removeItem = (index: number) => {
    const updatedItems = [...data.salesItemsReq];
    updatedItems.splice(index, 1);
    setData({ ...data, salesItemsReq: updatedItems });
  };

  const handleSubmit = async () => {
    if (!data.paymentMode) {
      setToasterData({
        message: "Please select a payment mode.",
        severity: "error",
        open: true,
      });
      return;
    }

    const res = await quickSales(data?.salesItemsReq, data.paymentMode);
    setToasterData({
      message: res?.message,
      severity: res?.severity,
      open: true,
    });

    if (res?.severity === "success") {
      clearData();
    }
    onClose();
  };

  useEffect(() => {
    if (isOpen) getNamesOfItem();
    // eslint-disable-next-line
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/30 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Responsive modal container */}
      <div
        className="relative w-full max-w-lg md:max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-3 xs:p-4 sm:p-6 md:p-8 animate-fadeIn
        flex flex-col max-h-[90dvh] sm:max-h-[100dvh] overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition-colors z-20"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-[#E26300] mb-2 text-center">
          Quick Sales
        </h2>
        <p className="text-xs text-gray-500 mb-4 text-center">
          Add products and complete a quick sale in moments.
        </p>

        {/* Item List Scrollable Area */}
        <div
          className="space-y-4 flex-1 min-h-0 overflow-y-auto pr-1"
          style={{
            maxHeight: "40vh", // allow room for actions and payment mode
            minHeight: "10vh",
          }}
        >
          {data.salesItemsReq?.map((item, index) => (
            <div
              key={index}
              className={`p-4 ${
                index > 0 ? "border-t border-gray-100 pt-4" : ""
              } bg-[#FAFAFA] rounded-lg shadow-sm border border-gray-100 mb-2`}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-[#1A1A1A] flex items-center">
                  <Package className="w-3.5 h-3.5 mr-1.5 text-[#E26300]" />
                  Item {index + 1}
                </h3>
                {data.salesItemsReq?.length > 1 && (
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
                    aria-label="Remove item"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 items-start">
                {/* Select item */}
                <div className="sm:col-span-2">
                  <label className="block text-xs text-[#2E2E2E]/70 mb-1.5">
                    Item Name
                  </label>
                  <div className="relative">
                    <Package className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-[#2E2E2E] z-10 w-4 h-4" />
                    <Select
                      styles={{
                        ...zenSelectStyles,
                        menuPortal: (base) => ({
                          ...base,
                          zIndex: 9999,
                        }),
                      }}
                      menuPortalTarget={document.body}
                      menuPosition="fixed"
                      value={
                        item?.itemName
                          ? { label: item?.itemName, value: item?.itemName }
                          : null
                      }
                      options={items
                        .filter(
                          (itm) =>
                            !data.salesItemsReq?.some(
                              (selected, i) =>
                                selected.itemName === itm?.name && i !== index
                            )
                        )
                        .map((itm) => ({
                          label: itm?.name,
                          value: itm?.name,
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
                    type="number"  onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
                    min={1}
                    className="p-2.5 bg-white text-[#2E2E2E] block w-full rounded-lg focus:outline-none border border-gray-200 focus:border-[#E26300] focus:ring-1 focus:ring-[#E26300] text-sm"
                    placeholder="Quantity"
                    value={item?.quantity || ""}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs text-[#2E2E2E]/70 mb-1.5">
                    Price
                  </label>
                  <input
                    type="number"  onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
                    min={0}
                    className="p-2.5 bg-white text-[#2E2E2E] block w-full rounded-lg focus:outline-none border border-gray-200 focus:border-[#E26300] focus:ring-1 focus:ring-[#E26300] text-sm"
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
                    NPR{" "}
                    {(
                      item?.price * item?.quantity -
                      item?.discount * item?.quantity
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Mode */}
        <div className="my-4">
          <label className="block text-xs text-[#2E2E2E]/70 mb-1.5 font-medium">
            Payment Mode
          </label>
          <div className="flex gap-4 flex-wrap">
            {paymentOptions.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="paymentMode"
                  value={opt.value}
                  checked={data.paymentMode === opt.value}
                  onChange={(e) =>
                    handlePaymentModeChange(e.target.value as PaymentMode)
                  }
                  className="accent-[#E26300]"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-4 flex flex-col xs:flex-row justify-between gap-2">
          <button
            onClick={addNewItem}
            className="flex-1 py-2 px-3 rounded-lg flex items-center justify-center bg-[#fff7f0] text-[#E26300] hover:bg-[#FFE7D1] transition-colors text-sm font-medium"
            type="button"
          >
            <Plus size={16} className="mr-1" />
            Add Another Item
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2 px-3 rounded-lg flex items-center justify-center bg-[#E26300] text-white hover:bg-[#D25200] transition-colors text-sm font-semibold"
            type="button"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 px-3 rounded-lg flex items-center justify-center bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm"
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickSalesModal;
