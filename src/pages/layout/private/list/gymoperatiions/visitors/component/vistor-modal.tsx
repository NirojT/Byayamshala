import { useNavigate } from "react-router-dom";
import { IVisitorDetails } from "../interface";
import { PrivateRoute } from "@/global/config";

const VistorModal = ({
  selectedVisitor,
  setIsModelOpen,
}: {
  selectedVisitor: IVisitorDetails | null;
  setIsModelOpen: (isOpen: boolean) => void;
}) => {
  const navigate = useNavigate();

  const handleConfirmTransform = () => {
    // Logic to transform visitor to member
 
    // navigate to add member

    navigate(`/${PrivateRoute}/add/gym/operation/members`,{state:{visitor:selectedVisitor}});

    setIsModelOpen(false);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-xl font-semibold text-white mb-4">
          Transform Visitor to Member
        </h3>

        <p className="text-gray-300 mb-6">
          Do you want to transform{" "}
          <span className="font-bold text-white">
            {selectedVisitor?.fullName}
          </span>{" "}
          from visitor to member?
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsModelOpen(false)}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmTransform}
            className="px-4 py-2 bg-[#E26003] text-white rounded-md hover:bg-[#c05403] transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default VistorModal;
