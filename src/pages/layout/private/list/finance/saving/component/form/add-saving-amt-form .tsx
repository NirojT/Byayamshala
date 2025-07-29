import { useState } from "react";

const AddSavingAmtModal = ({
  setIsModalOpen,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [newTransaction, setNewTransaction] = useState({
    name: "",
    amt: "",
  });

  const handleAddAmt = () => {
    if (!newTransaction.name || !newTransaction.amt) return;

    setNewTransaction({ name: "", amt: "" });
    //        setIsModalOpen(false); // Close modal after adding the Amt
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-bold text-white mb-4">
          Add New Savings Amt
        </h3>

        {/* {amt} */}
        <div className="mb-4">
          <label className="block text-gray-400 mb-1">Amount</label>
          <input
            type="number"
            value={newTransaction.amt}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, amt: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* {notes} */}

        <div className="mb-4">
          <label className="block text-gray-400 mb-1">Notes</label>
          <input
            type="text"
            value={newTransaction?.name}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, name: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAddAmt}
            className="bg-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Add Amt
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSavingAmtModal;
