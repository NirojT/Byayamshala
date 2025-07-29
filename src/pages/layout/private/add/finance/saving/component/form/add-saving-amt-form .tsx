import { useAddSavingAcc } from "../../store";
import { useGlobalStore } from "../../../../../../../../global/store";
import { useEffect } from "react";

const AddSavingAmtModal = ({
  setIsModalOpen,
  id,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { addData, setAddData, clearAddData, addSavingAmt } = useAddSavingAcc();
  const { setToasterData } = useGlobalStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddData({ ...addData, [e.target.name]: e.target.value });
  };

  // handles both add and withdraw amt
  const handleAddAmt = async (task: string) => {
    if (!addData?.amt) {
      setToasterData({
        open: true,
        message: "Amount is required",
        severity: "error",
      });
      return;
    }

    const res = await addSavingAmt(task);
    setToasterData({
      open: true,
      message: res.message,
      severity: res.severity,
    });

    if (res.severity === "success") {
      setIsModalOpen(false);
      clearAddData();
    }
  };

  useEffect(() => {
    setAddData({ ...addData, id: id });
  }, [id]);
  return (
    <div className="fixed inset-0 bg-slate-100  flex items-center justify-center z-50">
      <div className=" border border-gray-400 p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">
          Add New Savings Amt
        </h3>

        {/* {amt} */}
        <div className="mb-4">
          <label className="block text-gray-800 mb-1">Amount</label>
          <input
            type="number"
            value={addData?.amt || ""}
            onChange={handleChange}
            name="amt"
            // className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            className="p-3   block w-full rounded-md focus:outline-none border border-gray-600 shadow-sm focus:border-[#E26003] focus:ring-[#E26003]"
          />
        </div>

        {/* {notes} */}

        <div className="mb-4">
          <label className="block text-gray-800 mb-1">Notes</label>
          <input
            type="text"
            value={addData?.remarks || ""}
            onChange={handleChange}
            name="remarks"
            // className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            className="p-3 block w-full text-black rounded-md focus:outline-none border border-gray-600 shadow-sm focus:border-[#E26003] focus:ring-[#E26003]"
          />
        </div>

        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="  border border-gray-600  px-4 py-2 rounded-lg shadow-md transition"
          >
            Cancel
          </button>
          <button
            onClick={() => handleAddAmt("withdraw")}
            // className="bg-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            className="bg-red-500 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-1 "
          >
            WithDraw
          </button>
          <button
            onClick={() => handleAddAmt("add")}
            // className="bg-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            className="bg-[#E26003] text-white py-2 px-4 rounded-md focus:outline-none focus:ring-1"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSavingAmtModal;
