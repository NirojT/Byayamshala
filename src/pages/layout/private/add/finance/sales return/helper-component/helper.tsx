import { HelpCircle } from "lucide-react";

const HelpCard: React.FC = () => {
  return (
    <div className="mt-6 bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-white text-lg font-medium mb-3 flex items-center">
          <HelpCircle className="h-5 w-5 mr-2 text-blue-400" />
          Need Help?
        </h3>
        <div className="text-gray-400 text-sm space-y-3">
          <p>
            <span className="text-orange-500 font-medium">Sales Returns</span> let you process refunds or exchanges for previously sold items.
          </p>
          <p>
            <span className="text-blue-400">•</span> Enter the bill number of the original sale
          </p>
          <p>
            <span className="text-blue-400">•</span> Click "Search" to find the sales record
          </p>
          <p>
            <span className="text-blue-400">•</span> Select the items to be returned and adjust quantities if needed
          </p>
          <p>
            <span className="text-blue-400">•</span> Click "Return Sales" to complete the process
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpCard;