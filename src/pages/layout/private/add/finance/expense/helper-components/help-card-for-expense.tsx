import { FiInfo } from "react-icons/fi";

const HelpCardForExpense = () => {
  return (
    <div className="mt-6 bg-white border border-gray-100 rounded-xl shadow-sm p-5 flex items-start gap-4">
      <div className="bg-[#FAFAFA] p-3 rounded-lg border border-gray-100">
        <FiInfo className="h-4 w-4 text-[#E26300]" />
      </div>
      <div>
        <h4 className="text-[#1A1A1A] font-medium mb-2 text-sm">
          Tips for Expense Management
        </h4>
        <ul className="text-[#2E2E2E] text-sm space-y-2.5">
          <li className="flex items-start">
            <span className="text-[#E26300] mr-2 text-xs leading-5">•</span>
            <span className="text-xs leading-5">
              Select the appropriate expense type to keep your financial records
              organized.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-[#E26300] mr-2 text-xs leading-5">•</span>
            <span className="text-xs leading-5">
              Include detailed notes to help with future auditing and tracking
              expenses.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-[#E26300] mr-2 text-xs leading-5">•</span>
            <span className="text-xs leading-5">
              Keep your receipts organized for any cash transactions.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HelpCardForExpense;
