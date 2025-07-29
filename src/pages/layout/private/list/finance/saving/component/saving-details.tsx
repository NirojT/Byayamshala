import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AddSavingAmtModal from "./form/add-saving-amt-form ";

const SavingDetails = () => {
  const { accountId } = useParams(); // Get the account ID from the URL
  const navigate = useNavigate();
 const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountDetails, setAccountDetails] = useState<any | null>(null);

  useEffect(() => {
    // Mock fetching account details by accountId
    const fetchAccountDetails = async () => {
      // Replace this with an actual API call
      const mockAccounts = [
        { id: "1", name: "Emergency Fund", balance: 5000, transactions: [] },
        { id: "2", name: "Equipment Savings", balance: 3000, transactions: [] },
      ];

      const account = mockAccounts.find((acc) => acc.id === accountId);
      if (account) {
        setAccountDetails(account);
      } else {
        // Handle account not found
        console.error("Account not found!");
        navigate("/add/finance/savings"); // Redirect to savings list
      }
    };

    fetchAccountDetails();
  }, [accountId, navigate]);

  if (!accountDetails) {
    return <div className="text-white p-4">Loading account details...</div>;
  }

  return (
    <div className="text-white p-4">
      <h2 className="text-xl font-bold mb-4">{accountDetails?.name}</h2>
      <div className="mb-6">
        <p className="text-lg">
          <strong>Balance:</strong> ${accountDetails?.balance}
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end">
        <button
           
          className="bg-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={() => setIsModalOpen(true)}
        >
          Add Transaction
        </button>
      </div>

      {/* Transactions Section */}
      <div>
        <h3 className="text-lg font-bold mb-2">Transactions</h3>
        {accountDetails.transactions.length > 0 ? (
          <ul className="space-y-2">
            {accountDetails.transactions.map(
              (transaction: any, index: number) => (
                <li
                  key={index}
                  className="bg-gray-800 p-2 rounded-lg shadow-md flex justify-between"
                >
                  <span>{transaction?.description}</span>
                  <span>${transaction?.amount}</span>
                </li>
              )
            )}
          </ul>
        ) : (
          <p className="text-gray-400">No transactions found.</p>
        )}
      </div>

      {/* Modal for Adding New Account */}
      {isModalOpen && <AddSavingAmtModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default SavingDetails;
