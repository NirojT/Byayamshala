import { useGettingStartedStore } from "@/pages/gettingstarted/store";
import nicqr from "../../../../../assets/nicqr.jpeg";

const PaymentMyQrModal = ({
  setIsQrOpen,
}: {
  setIsQrOpen: (status: boolean) => void;
}) => {
  const { discountedPrice, selectedPlan } = useGettingStartedStore();
  const handleCloseQrPopup = () => {
    setIsQrOpen(false);
  };

  return (
    <div className=" fixed top-0 right-0 w-full lg:w-1/3 h-full flex flex-col justify-center items-center z-50">
      <div className="w-full overflow-hidden bg-white h-full sm:h-auto max-h-[32rem] border border-gray-200 
                    rounded-lg shadow-lg  relative mt-auto mb-auto">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Payment Instructions
        </h2>

        {/* QR Code */}
        <div className="flex justify-center items-center mb-6">
          <div className="w-48 h-48">
            <img
              src={nicqr}
              alt="QR Code"
              className="w-full h-full object-cover rounded-lg shadow-md border border-gray-300"
            />
          </div>
        </div>

        {/* Payment Instructions */}
<p className="text-center text-gray-600 mb-2">
  Scan the QR code and make the payment of{" "}
  {discountedPrice > 0 && (
    <del className="text-red-500 mx-1">
      Rs {selectedPlan.price}
    </del>
  )}
  <span className="font-bold text-green-600">
    Rs {discountedPrice > 0 ? discountedPrice : selectedPlan.price}
  </span>
  . Send the payment statement to{" "}
  <a
    href="https://wa.me/9800960639"
    className="text-orange-600 hover:text-orange-800 hover:underline"
    target="_blank"
    rel="noopener noreferrer"
  >
    WhatsApp: 9800960639
  </a>
</p>


        {/* Close Button */}
        <div className="flex justify-center">
          <button
            onClick={handleCloseQrPopup}
            className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMyQrModal;
