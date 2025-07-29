import React, { useEffect } from "react";
import { useTableStore } from "../tables/store";
import MenusOrder from "./component/menus-order";
import OrderForm from "./component/order-form";
import Back from "@/global/components/back/back";

const TakeOrder: React.FC = () => {
  const { getTables } = useTableStore();

  useEffect(() => {
    getTables();
  }, [getTables]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#2E2E2E] font-poppins">
      {/* Header */}
      <div className="border-b border-[#1A1A1A]/10 p-4 flex justify-between items-center">
        <Back />
        <div>
          <h1 className="text-xl font-bold text-[#1A1A1A]">Take Order</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 w-full mx-auto space-y-6 sm:space-y-0 sm:flex sm:gap-6 justify-between">
        {/* Select Menu Section */}
        <div className="w-full sm:w-1/2 bg-[#FAFAFA] p-6 rounded-xl shadow-sm border border-[#1A1A1A]/10">
          <h2 className="text-xl font-semibold mb-4 text-[#1A1A1A] border-b-2 border-[#E26300] inline-block pb-1">
            Select Menu
          </h2>

          <MenusOrder />
        </div>

        {/* Order Section */}
        <div className="w-full sm:w-1/2 bg-[#FAFAFA] p-6 rounded-xl shadow-sm border border-[#1A1A1A]/10">
          <h2 className="text-xl font-semibold mb-4 text-[#1A1A1A] border-b-2 border-[#E26300] inline-block pb-1">
            Order
          </h2>

          <OrderForm />
        </div>
      </div>
    </div>
  );
};

export default TakeOrder;
