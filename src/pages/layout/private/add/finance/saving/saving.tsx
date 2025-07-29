import AddSavingAccModal from "./component/form/add-saving-acc-form";

import { useAddSavingAcc } from "./store";
import { useListSavingStore } from "../../../list/finance/saving/store";
import { useEffect } from "react";
import SavingCard from "./component/card/saving-card";
import Back from "@/global/components/back/back";

const Saving = () => {
  const { isModalOpen, setIsModalOpen } = useAddSavingAcc();

  const { getSaving, savings } = useListSavingStore();
  useEffect(() => {
    getSaving();
  }, [getSaving]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#2E2E2E]   border-gray-500 border-t-[0.5px] p-6 font-poppins">
      <Back />
      <div className="flex justify-between items-center mb-4 mt-4">
        <h2 className="text-xl ">Savings</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="hover:cursor-pointer float-end underline rounded-lg hover:text-[#E26003] hover:text-bold 
          transition-transform duration-300 ease-in-out hover:scale-105 text-[#E2300]"
        >
          Add New Account
        </button>
      </div>

      {/* Savings Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {savings?.length > 0 ? (
          savings.map((account) => (
            <SavingCard account={account} key={account?.id} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No savings accounts found. Add a new account to get started.
          </p>
        )}
      </div>

      {/* Modal for Adding New Account */}
      {isModalOpen && <AddSavingAccModal />}
    </div>
  );
};

export default Saving;
