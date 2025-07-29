import { HelpCircle } from "lucide-react";

const HelpCard: React.FC = () => {
  return (
    <div className="mt-6 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden ">
      <div className="p-5">
        <h3 className="text-[#1A1A1A] text-sm font-medium mb-3 flex items-center">
          <HelpCircle className="h-4 w-4 mr-2 text-[#E26300]" />
          Need Help?
        </h3>
        <div className="text-[#2E2E2E] text-xs space-y-2.5">
          <p>
            <span className="text-[#E26300] font-medium">Purchase Records</span>{" "}
            help you track items bought from suppliers and other vendors.
          </p>
          <p className="flex items-start">
            <span className="text-[#E26300] mr-2 text-xs leading-5">•</span>
            <span>
              Fill out all required fields marked with an asterisk (*)
            </span>
          </p>
          <p className="flex items-start">
            <span className="text-[#E26300] mr-2 text-xs leading-5">•</span>
            <span>Add purchase items with quantities and pricing</span>
          </p>
          <p className="flex items-start">
            <span className="text-[#E26300] mr-2 text-xs leading-5">•</span>
            <span>
              For partial payments, select "Partial Credit" as the payment mode
            </span>
          </p>
          <p className="flex items-start">
            <span className="text-[#E26300] mr-2 text-xs leading-5">•</span>
            <span>
              Click "Additional Details" to add bill number, date, and notes
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpCard;
