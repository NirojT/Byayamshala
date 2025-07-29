import { useEffect } from "react";
import { ISalesReturnData } from "../interface";
import { useAddSalesReturnFormStore } from "../store";
import { ShoppingCart, ArrowLeftRight } from "lucide-react";

const SalesItemCard = () => {
  const { salesDetail, data, setData, setDataList } =
    useAddSalesReturnFormStore();

  const handleItemChange = (
    index: number,
    field: keyof ISalesReturnData,
    value: string | number
  ) => {
    if (field === "returnedQty") {
      const maxQuantity = salesDetail.salesItemsRes[index].quantity; // Get available quantity
      let quantityValue = Math.max(Number(value) || 0, 0); // Allow zero for no return

      if (quantityValue > maxQuantity) {
        quantityValue = maxQuantity; // Ensure it does not exceed available quantity
      }

      const updatedItem = {
        itemName: salesDetail.salesItemsRes[index].itemName,
        quantity: salesDetail.salesItemsRes[index].quantity,
        returnedQty: quantityValue,
      };

      setData(updatedItem);
    }
  };

  useEffect(() => {
    if (salesDetail) {
      const items: ISalesReturnData[] = salesDetail?.salesItemsRes?.map(
        (item) => ({
          itemName: item?.itemName,
          quantity: item?.quantity,
          returnedQty: item?.returnedQty || 0,
        })
      );
      setDataList(items);
    }
  }, [salesDetail]);

  return (
    <div>
      <div className="mb-4">
        <div className="grid grid-cols-1 gap-y-2">
          {data?.map((item, index) => (
            <div
              key={index}
              className="border border-gray-100 rounded-md p-3 bg-white"
            >
              <div className="flex items-center mb-2">
                <ShoppingCart className="h-3.5 w-3.5 mr-1.5 text-[#E26300]" />
                <h3 className="text-[#1A1A1A] text-sm font-medium">
                  {item?.itemName}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div>
                  <label className="block text-xs text-[#2E2E2E]/70 mb-1">
                    Original Quantity
                  </label>
                  <div className="bg-[#FAFAFA] border border-gray-100 rounded-md p-2 text-sm text-[#2E2E2E]">
                    {item?.quantity}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor={`returnedQty-${index}`}
                    className="block text-xs text-[#2E2E2E]/70 mb-1"
                  >
                    Return Quantity
                  </label>
                  <div className="relative">
                    <ArrowLeftRight className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-[#2E2E2E] w-3 h-3" />
                    <input
                      id={`returnedQty-${index}`}
                      type="number"
                      className="pl-8 py-1.5 bg-[#FAFAFA] text-[#2E2E2E] block w-full rounded-md focus:outline-none border border-gray-200 focus:border-[#E26300] focus:ring-1 focus:ring-[#E26300] text-sm"
                      placeholder="0"
                      value={item?.returnedQty || ""}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "returnedQty",
                          Number(e.target.value)
                        )
                      }
                      min={0}
                      max={item?.quantity}
                    />
                  </div>
                  {item?.returnedQty > 0 && (
                    <p className="text-xs text-[#E26300] mt-1">
                      Returning {item.returnedQty} of {item.quantity}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {data?.length === 0 && (
        <div className="text-center p-4 text-[#2E2E2E]/70 text-sm">
          No items available for return.
        </div>
      )}
    </div>
  );
};

export default SalesItemCard;