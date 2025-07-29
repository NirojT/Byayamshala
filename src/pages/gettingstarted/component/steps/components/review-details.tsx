import { GettingStartedStep } from "@/global/components/enums/enums";
import { useGettingStartedStore } from "@/pages/gettingstarted/store";
import { Edit } from "lucide-react";
 

const ReviewDetails = () => {
  const {
    setOpenReviewDeatils,
    selectedPlan,
    businessDetails,
    paymentDetails,
    setCurrentStep,
  } = useGettingStartedStore();

  return (
    <div className="w-[28rem] sm:w-[32rem]">
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden
       transition-all duration-300 transform hover:shadow-md">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-orange-600 w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
              <p className="text-white font-bold">#</p>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Review Summary</h1>
            <button
              className="ml-auto p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => {
                setOpenReviewDeatils(false);
                setCurrentStep(GettingStartedStep.BUSINESS_DETAILS);
              }}
            >
              <Edit size={18} className="text-gray-600" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                Business Information
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex justify-between">
                  <span>Business Name:</span>
                  <span className="text-gray-800 font-medium">
                    {businessDetails.businessName || "Your Business Name"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Business Address:</span>{" "}
                  <span className="text-gray-800 font-medium">
                    {businessDetails.businessAddress}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Business Phone:</span>{" "}
                  <span className="text-gray-800 font-medium">
                    {businessDetails.businessPhone}
                  </span>
                </li>
              </ul>
            </div>

            {selectedPlan.type !== "FREE_TRIAL" && (
              <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Payment Details
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex justify-between">
                    <span>Payment Mode:</span>{" "}
                    <span className="text-gray-800 font-medium">
                      {paymentDetails?.paymentMode}
                    </span>
                  </li>
                  {paymentDetails?.affiliateCode && (
                    <li className="flex justify-between">
                      <span>Affiliate Code:</span>{" "}
                      <span className="text-gray-800 font-medium">
                        {paymentDetails.affiliateCode}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-8">
            <button
              onClick={() => {
                setOpenReviewDeatils(false);
              }}
              className="w-full py-3 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
