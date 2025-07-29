import { useNavigate } from "react-router-dom";
import { PrivateRoute } from "../../../../../../../../global/config";
import { ISavingDetails } from "../../../../../list/finance/saving/interface";
import { PiggyBank } from "lucide-react";
 
const SavingCard = ({ account }: { account: ISavingDetails }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() =>
        navigate(`/${PrivateRoute}/add/finance/savings/${account.id}`, {
          state: account,
        })
      }
      key={account?.id}
      className="w-44 bg-black h-[15em] rounded-lg shadow-md flex flex-col items-center justify-center 
                 cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out 
                 border border-gray-600 hover:border-[#E26003] focus:ring-[#E26003] hover:border-b-4 hover:border-r-4 "
    >
      <PiggyBank className="h-6 w-6 text-blue-600" />
      <h3 className="font-semibold text-gray-300 tracking-wide capitalize ">
        {account?.accountName}
      </h3>
      <p className="text-gray-400">Balance: Rs {account?.netBalance}</p>
    </button>
  );
};

export default SavingCard;
