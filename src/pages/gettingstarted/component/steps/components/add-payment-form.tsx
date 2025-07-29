import { GettingStartedStep } from "@/global/components/enums/enums";
import { Check, Eye } from "lucide-react";
 
import { ChangeEvent, useEffect } from "react";
import { useGlobalStore } from "@/global/store";
import { useGettingStartedStore } from "@/pages/gettingstarted/store";
import PaymentMyQrModal from "../../paymentmode/component/payment-my-qr-modal";

const AddPaymentForm = () => {
  const {
    isApplied,
    currentStep,
    setCurrentStep,
    paymentDetails,
    setPaymentDetails,
    applyAffiliateDiscount,
    isQrOpen,
    setIsQrOpen,
  } = useGettingStartedStore();
  const { setToasterData } = useGlobalStore();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleApplyDiscount = async () => {
    if (!paymentDetails?.affiliateCode) {
      setToasterData({
        message: "Please enter an affiliate code.",
        severity: "error",
        open: true,
      });
      return;
    }
    const res = await applyAffiliateDiscount();
    setToasterData({
      message: res?.message,
      severity: res?.severity,
      open: true,
    });
  };

  useEffect(() => {
    if (currentStep === GettingStartedStep.PAYMENT) {
      setIsQrOpen(true);
    } else {
      setIsQrOpen(false);
    }
  }, [currentStep]);

  return (
    <div className="col-span-full lg:col-span-1 bg-white shadow-sm border border-gray-200
     rounded-lg overflow-hidden transition-all duration-300 transform hover:shadow-md relative">
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-orange-600 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-sm">
            <span className="text-white text-sm sm:text-base font-semibold">2</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Payment Details</h1>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <div
              onClick={() => {
                setIsQrOpen(!isQrOpen);
              }}
              className="flex items-center gap-2 cursor-pointer w-36"
            >
              <p className="capitalize underline text-orange-600 hover:text-orange-700 transition-all text-sm sm:text-base">
                View the QR
              </p>
              <Eye size={18} className="text-gray-600" />
            </div>
            <div className="mt-4 sm:mt-8 p-3 sm:p-6 bg-orange-50 border border-orange-100 rounded-lg flex items-start gap-3 sm:gap-4">
              <div className="bg-orange-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-1">
                  Need Help?
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Click on "View the QR" to open the QR Code and follow the
                  instructions.
                </p>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="affiliatecode"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
            >
              Discount Code (Optional)
            </label>
            <div className="flex gap-2 sm:gap-3 flex-col sm:flex-row">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM7.03 8l-1 4h2.938l1-4H7.03z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  className="pl-10 pr-3 py-2 bg-white w-full border border-gray-300 rounded-md text-gray-800 text-sm shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200"
                  name="affiliateCode"
                  value={paymentDetails?.affiliateCode}
                  onChange={handleChange}
                  placeholder="Enter discount code"
                />

                {isApplied && (
                  <p className="text-green-500 text-xs sm:text-sm mt-1">Discount code applied successfully!</p>
                )}
              </div>
              <button
                onClick={handleApplyDiscount}
                className="px-4 py-2 rounded-md bg-white border border-gray-300 hover:border-green-500 hover:bg-green-50 text-green-600 transition-all flex items-center justify-center sm:min-w-[60px]"
              >
                <Check className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8">
          <button
            className="w-full py-2 sm:py-3 bg-orange-600 text-white text-sm sm:text-base font-medium rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
            onClick={() => {
              setIsQrOpen(false);
              setCurrentStep(GettingStartedStep.COMPLETE);
            }}
          >
            Confirm Payment
          </button>
        </div>
      </div>

      {/* QR modal for all screen sizes */}
      {isQrOpen && (
        <div className="flex sm:hidden fixed  inset-0 overflow-hidden bg-gray-800/80 justify-center items-center z-50 p-4">
          {/* <div className="relative w-full max-w-md"> */}
          <PaymentMyQrModal setIsQrOpen={setIsQrOpen} />
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default AddPaymentForm;