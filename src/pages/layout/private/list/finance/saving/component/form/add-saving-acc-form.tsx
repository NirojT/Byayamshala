import { useState } from "react";

const AddSavingAccModal = ({
  setIsModalOpen,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [newAccount, setNewAccount] = useState({ name: "", balance: "" });

  const handleAddAccount = () => {
    if (!newAccount.name || !newAccount.balance) return;

    setNewAccount({ name: "", balance: "" });
    //        setIsModalOpen(false); // Close modal after adding the account
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-bold text-white mb-4">
          Add New Savings Account
        </h3>
        <div className="mb-4">
          <label className="block text-gray-400 mb-1">Account Name</label>
          <input
            type="text"
            value={newAccount.name}
            onChange={(e) =>
              setNewAccount({ ...newAccount, name: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 mb-1">Initial Balance</label>
          <input
            type="number"
            value={newAccount.balance}
            onChange={(e) =>
              setNewAccount({ ...newAccount, balance: e.target.value })
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
            onClick={handleAddAccount}
            className="bg-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Add Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSavingAccModal;
