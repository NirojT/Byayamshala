import { useCallback, useMemo } from "react";
import { useAddSavingAcc } from "../../store";
import { useGlobalStore } from "../../../../../../../../global/store";
import { SavingHelper } from "../../helper";

const AddSavingAccModal = () => {
  // Initialize helper class
  const helper = useMemo(() => new SavingHelper(), []);
  // Stores data and methods
  const { setToasterData } = useGlobalStore();
  const {
    setIsModalOpen,
    data,
    setData,
    createSavingAcc,
    clearData,
    loading,
    setLoading,
  } = useAddSavingAcc();

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "openingBalance") {
      setData({ ...data, [name]: parseInt(value || "0") });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  // Memoized function for API call
  const handleAddAccount = useCallback(() => {
    helper.createNewSavingAccount(
      data,
      createSavingAcc,
      clearData,
      setToasterData,
      setIsModalOpen,
      setLoading
    );
  }, [
    clearData,
    createSavingAcc,
    data,
    helper,
    setIsModalOpen,
    setLoading,
    setToasterData,
  ]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-poppins">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-6 text-center">
          Add New Savings Account
        </h3>

        {/* Account Name Field */}
        <div className="">
          <label className="block text-sm font-medium text-[#2E2E2E]">
            Account Name
          </label>
          <input
            name="accountName"
            className="mb-5 p-3 w-full text-[#2E2E2E] bg-transparent focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors appearance-none"
            placeholder="Enter account name"
            defaultValue={data?.accountName || ""}
            onChange={handleChange}
            required
          />
        </div>

        {/* Opening Balance Field */}
        <div className="">
          <label className="block text-sm font-medium text-[#2E2E2E] ">
            Opening Balance
          </label>
          <input
            type="number"
            name="openingBalance"
            className="p-3 w-full text-[#2E2E2E] bg-transparent focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors appearance-none"
            placeholder="Enter opening balance"
            defaultValue={data?.openingBalance || ""}
            onChange={handleChange}
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={() => setIsModalOpen(false)}
            className="py-2 px-5 bg-gray-200 text-[#2E2E2E] rounded-lg shadow-md hover:bg-gray-300 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleAddAccount}
            className="py-2 px-5 bg-[#E26003] text-white rounded-lg shadow-md hover:bg-[#D25200] transition duration-200 focus:outline-none focus:ring-1 focus:ring-[#E26003] focus:ring-offset-1"
          >
            {loading ? "Loading..." : "Add Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSavingAccModal;
