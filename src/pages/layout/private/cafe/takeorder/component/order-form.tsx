import { defaultNepaliDate } from "@/global/config";
import { useGlobalStore } from "@/global/store";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTable, FaTimes, FaUtensils } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Select, { MultiValue } from "react-select";
import { IMenuDetails } from "../../menus/interface";
import { ITableDetails } from "../../tables/interface";
import { useTableStore } from "../../tables/store";
import { ITableSelects } from "../interface";
import { useTakeOrderStore } from "../store";

const OrderForm = () => {
  //hooks
  const navigate = useNavigate();
  const table: ITableDetails = useLocation().state;

  const {
    selectedMenus,
    selectedTables,
    removeSelectedMenu,
    clearSelectedMenus,

    replaceSelectedTable,
    replaceSelectedMenu,
    increaseMenuQuantity,
    decreaseMenuQuantity,
    remarks,
    setRemarks,
    placeOrder,
    updateOrder,
  } = useTakeOrderStore();

  const { tables, getTables } = useTableStore();
  const { setToasterData } = useGlobalStore();

  //this is for react multi select of table
  const [tableOptions, setTableOptions] = useState<MultiValue<ITableSelects>>(
    []
  );
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // Handler for selection change
  const handleSelectionChange = (
    selectedOptions: MultiValue<ITableSelects>
  ) => {
    replaceSelectedTable(selectedOptions);
  };

  const handlePlaceOrder = async () => {
    let res;

    if (table && table?.tableNo !== "Take Away" && table?.orders) {
      res = await updateOrder(table?.orders?.id);
    } else {
      res = await placeOrder();
      navigate(-1);
    }

    setToasterData({
      open: true,
      message: res?.message,
      severity: res?.severity,
    });

    // if (res?.severity === "success") {
    //   clearSelectedMenus();
    //   clearSelectedTables();
    // }
  };

  useEffect(() => {
    setTableOptions(
      tables?.map((table) => ({
        value: table?.tableNo?.toString(),
        label: `${table?.tableNo}`,
        id: table?.id,
        isAvailable: table?.isAvailable,
      }))
    );
  }, [tables, selectedTables]);

  useEffect(() => {
    getTables();
  }, [getTables]);

  useEffect(() => {
    if (table && !table?.isAvailable) {
      const orderedMenus = table?.orders?.orderItems;
      replaceSelectedMenu(
        orderedMenus?.map(
          (menu) =>
            ({
              id: menu?.id,
              name: menu?.name,
              price: menu?.price,
              menuType: menu?.menuType,
              quantity: menu?.quantity,
            } as IMenuDetails)
        )
      );
    }
  }, []);

  // Calculate total amount
  useEffect(() => {
    const sum = selectedMenus?.reduce((total, menu) => {
      return total + menu?.price * (menu?.quantity || 1);
    }, 0);
    setTotalAmount(sum || 0);
  }, [selectedMenus]);

  // Custom styles for react-select
  const selectStyles = {
    control: (provided: any) => ({
      ...provided,
      border: "none",
      borderBottom: "2px solid #d1d5db", // Tailwind gray-300
      borderRadius: "0",
      boxShadow: "none",
      padding: "0",
      "&:hover": {
        borderColor: "#4F46E5", // indigo-600
      },
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: "8px 0",
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: "#2563EB", // blue-600
      borderRadius: "9999px",
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: "white",
      fontWeight: "500",
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: "white",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        color: "white",
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: "0.5rem",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      overflow: "hidden",
      backgroundColor: "#FAFAFA",
      border: "1px solid rgba(26, 26, 26, 0.1)",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#2563EB" // blue-600
        : state.isFocused
        ? "rgba(37, 99, 235, 0.1)" // soft blue focus
        : "transparent",
      color: state.isSelected ? "white" : "#2E2E2E",
      "&:active": {
        backgroundColor: "rgba(37, 99, 235, 0.2)",
      },
    }),
  };

  return (
    <div className="rounded-lg space-y-6">
      {/* Order Header */}
      <div className="flex justify-between items-center border-b border-[#1A1A1A]/10 pb-3">
        <div className="flex items-center">
          <div className="bg-[#1A1A1A]/5 p-2 rounded-lg mr-3">
            <FaUtensils className="text-[#E26300]" size={16} />
          </div>
          <div>
            <h2 className="font-bold text-[#1A1A1A]">
              {table?.tableNo !== "Take Away" && table?.orders
                ? "Update Order"
                : "New Order"}
            </h2>
            <p className="text-xs text-[#2E2E2E]/70">
              {table?.tableNo !== "Take Away" && table?.orders
                ? `Order #${table?.orders?.id} • ${table?.orders?.createdNepDate}`
                : defaultNepaliDate.toString()}
            </p>
          </div>
        </div>
        {selectedMenus?.length > 0 && (
          <button
            onClick={clearSelectedMenus}
            className="text-sm text-[#E26300] hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Selected Tables Section */}
      <div className="space-y-3">
        <label className="block text-sm text-[#2E2E2E]/70">
          Select Table <span className="text-[#E26300]">*</span>
        </label>

        <Select
          options={tableOptions?.filter((table) => table?.isAvailable)}
          isClearable
          isMulti
          value={selectedTables}
          onChange={handleSelectionChange}
          placeholder="Select table"
          styles={selectStyles}
        />

        {selectedTables?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedTables?.map((selected, index) => (
              <div
                key={index}
                className="inline-flex items-center bg-[#1A1A1A]/5 text-[#1A1A1A] px-3 py-1 rounded-full text-sm"
              >
                <FaTable className="mr-1 text-blue-700" size={12} />
                Table {selected?.value ?? table?.tableNo}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Menus */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-[#1A1A1A]">Selected Items</h3>
          <span className="text-sm text-[#2E2E2E]/70">
            {selectedMenus?.length} item{selectedMenus?.length !== 1 ? "s" : ""}
          </span>
        </div>

        {selectedMenus?.length === 0 ? (
          <div className="bg-[#1A1A1A]/5 rounded-lg p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-[#1A1A1A]/10 rounded-full flex items-center justify-center mb-3">
              <FaUtensils className="text-[#1A1A1A]/30" size={20} />
            </div>
            <p className="text-[#2E2E2E] font-medium">No items selected</p>
            <p className="text-[#2E2E2E]/70 text-sm mt-1">
              Select menu items to place an order
            </p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {selectedMenus?.map((menu, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#FAFAFA] p-3 rounded-lg border border-[#1A1A1A]/10"
              >
                <div>
                  <div className="flex items-center">
                    <FaUtensils className="text-[#E26300] mr-2" size={14} />
                    <p className="font-medium text-[#1A1A1A]">{menu?.name}</p>
                  </div>
                  <p className="text-sm text-[#2E2E2E]/70 mt-1">
                    {menu?.price}×{menu?.quantity || 1} ={" "}
                    {menu?.price * (menu?.quantity || 1)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseMenuQuantity(menu?.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-[#1A1A1A]/10 text-[#2E2E2E] hover:bg-[#1A1A1A]/5 transition-colors"
                  >
                    <FaMinus size={10} />
                  </button>
                  <span className="w-6 text-center font-medium">
                    {menu?.quantity || 1}
                  </span>
                  <button
                    onClick={() => increaseMenuQuantity(menu?.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-[#1A1A1A]/10 text-[#2E2E2E] hover:bg-[#1A1A1A]/5 transition-colors"
                  >
                    <FaPlus size={10} />
                  </button>
                  <button
                    onClick={() => removeSelectedMenu(menu?.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-[#E26300] text-white hover:bg-[#D25800] transition-colors ml-1"
                  >
                    <FaTimes size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Remarks */}
        {selectedMenus?.length > 0 && (
          <div>
            <label className="block text-sm text-[#2E2E2E]/70 mb-1">
              Remarks
            </label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="remarks..."
              className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors bg-transparent"
            />
          </div>
        )}
      </div>

      {/* Order Summary */}
      {selectedMenus?.length > 0 && (
        <div className="border-t border-[#1A1A1A]/10 pt-4 mt-4">
          <div className="flex justify-between mb-2">
            <span className="text-[#2E2E2E]/70">Subtotal</span>
            <span className="text-[#1A1A1A] font-medium">रु {totalAmount}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span className="text-[#1A1A1A]">Total</span>
            <span className="text-[#E26300]"> रु {totalAmount}</span>
          </div>

          {/* Action Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={
              selectedMenus?.length === 0 || selectedTables?.length === 0
            }
            className="w-full mt-4 bg-[#E26300] text-white rounded-lg py-3 font-medium hover:bg-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {table?.tableNo !== "Take Away" && table?.orders
              ? "Update Order"
              : "Place Order"}
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
