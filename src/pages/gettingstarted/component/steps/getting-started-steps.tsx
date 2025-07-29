import { GettingStartedStep } from "@/global/components/enums/enums";
import { useGettingStartedStore } from "../../store";
import GettingStartedPlans from "./getting-started-plans";
import { Check } from "lucide-react";
import BusinessDetailsForm from "./business-details-form";

import CompleteGettingStarted from "./complete-getting-started";
import AddPaymentForm from "./components/add-payment-form";

const GettingStartedSteps = () => {
  const {
    currentStep,
    selectedPlan,
    paymentDetails,
    businessDetails,
    setCurrentStep,
  } = useGettingStartedStore();

  return (
    <div className="w-full flex flex-col justify-center p-6 sm:ml-20 ">
      <div className="max-w-4xl w-full">
        {
          // all the plans view and slect plan section
          currentStep === GettingStartedStep.PLANS ? (
            <GettingStartedPlans
              onNext={() => {
                setCurrentStep(GettingStartedStep.BUSINESS_DETAILS);
              }}
            />
          ) : (
            <>
              {/* current step */}
              <div className="w-full mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
                  Getting Started
                </h1>

                <p className="text-gray-600 text-center mt-3 max-w-2xl mx-auto">
                  Set up your gym management services to elevate your business
                  to the next level
                </p>

                {/* Enhanced Progress Tracker */}
                <div className="mt-10 mb-8 relative flex items-center justify-center">
                  <div className="h-1 w-96 bg-gray-200 absolute top-5"></div>

                  <div className="flex justify-between w-96 relative">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center z-10">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                          currentStep == GettingStartedStep.BUSINESS_DETAILS
                            ? "bg-orange-600 shadow-lg shadow-orange-300"
                            : "bg-white border border-gray-300"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            currentStep != GettingStartedStep.BUSINESS_DETAILS
                              ? "bg-green-500"
                              : "bg-white border border-gray-300"
                          } transition-all duration-300`}
                        >
                          {currentStep !=
                          GettingStartedStep.BUSINESS_DETAILS ? (
                            <Check size={20} className="text-white" />
                          ) : (
                            <span className="text-gray-700 font-semibold">
                              1
                            </span>
                          )}
                        </div>
                      </div>
                      <h2
                        className={`mt-2 font-medium text-sm uppercase tracking-wider ${
                          currentStep != GettingStartedStep.BUSINESS_DETAILS
                            ? "text-gray-800"
                            : "text-gray-500"
                        }`}
                      >
                        Business
                      </h2>
                    </div>

                    {/* Step 2 */}
                    {selectedPlan.type !== "FREE_TRIAL" && (
                      <div className="flex flex-col items-center z-10">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                            currentStep == GettingStartedStep.COMPLETE
                              ? "bg-orange-600 shadow-lg shadow-orange-300/30"
                              : "bg-white border border-gray-300"
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              currentStep == GettingStartedStep.COMPLETE
                                ? "bg-green-500"
                                : "bg-white border border-gray-300"
                            } transition-all duration-300`}
                          >
                            {currentStep == GettingStartedStep.COMPLETE ? (
                              <Check size={20} className="text-white" />
                            ) : (
                              <span className="text-gray-700 font-semibold">
                                2
                              </span>
                            )}
                          </div>
                        </div>
                        <h2
                          className={`mt-2 font-medium text-sm uppercase tracking-wider ${
                            currentStep == GettingStartedStep.PAYMENT
                              ? "text-gray-800"
                              : "text-gray-500"
                          }`}
                        >
                          Payment
                        </h2>
                      </div>
                    )}

                    {/* Step 3 */}
                    <div className="flex flex-col items-center z-10">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                          currentStep == GettingStartedStep.COMPLETE
                            ? "bg-orange-600 shadow-lg shadow-orange-300/30"
                            : "bg-white border border-gray-300"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            currentStep == GettingStartedStep.COMPLETE
                              ? "bg-green-500"
                              : "bg-white border border-gray-300"
                          } transition-all duration-300`}
                        >
                          {currentStep > GettingStartedStep.REVIEW_DETAILS ? (
                            <Check size={20} className="text-white" />
                          ) : (
                            <span className="text-gray-700 font-semibold">
                              {selectedPlan.type === "FREE_TRIAL" ? 2 : 3}
                            </span>
                          )}
                        </div>
                      </div>
                      <h2
                        className={`mt-2 font-medium text-sm uppercase tracking-wider ${
                          currentStep == GettingStartedStep?.REVIEW_DETAILS ||
                          currentStep >= GettingStartedStep.COMPLETE
                            ? "text-gray-800"
                            : "text-gray-500"
                        }`}
                      >
                        Confirm
                      </h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full">
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 w-full max-w-2xl mx-auto">
                  {/* Business Details Panel */}
                  {currentStep === GettingStartedStep.BUSINESS_DETAILS ? (
                    <BusinessDetailsForm />
                  ) : (
                    <div className="col-span-full lg:col-span-1 bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 transform hover:shadow-md group">
                      <div className="p-5 flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            currentStep > GettingStartedStep.BUSINESS_DETAILS
                              ? "bg-green-500"
                              : "bg-white border border-gray-300"
                          }`}
                        >
                          {currentStep > GettingStartedStep.BUSINESS_DETAILS ? (
                            <Check size={20} className="text-white" />
                          ) : (
                            <span className="text-gray-700 font-semibold">
                              1
                            </span>
                          )}
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-gray-800">
                            Business Profile
                          </h2>
                          {currentStep >
                            GettingStartedStep.BUSINESS_DETAILS && (
                            <p className="text-sm text-gray-500 mt-1">
                              {businessDetails.businessName ||
                                "Business details completed"}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Payment Details Panel */}
                  {selectedPlan.type !== "FREE_TRIAL" &&
                    (currentStep === GettingStartedStep.PAYMENT ? (
                      <AddPaymentForm />
                    ) : (
                      <div className="col-span-full lg:col-span-1 bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 transform hover:shadow-md group">
                        <div className="p-5 flex items-center gap-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              currentStep === GettingStartedStep.COMPLETE
                                ? "bg-green-500"
                                : "bg-white border border-gray-300"
                            }`}
                          >
                            {currentStep === GettingStartedStep.COMPLETE ? (
                              <Check size={20} className="text-white" />
                            ) : (
                              <span className="text-gray-700 font-semibold">
                                2
                              </span>
                            )}
                          </div>
                          <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                              Payment Method
                            </h2>
                            {currentStep == GettingStartedStep.COMPLETE && (
                              <p className="text-sm text-gray-500 mt-1">
                                {paymentDetails?.paymentMode ||
                                  "Payment details completed"}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* Complete Panel */}
                  {currentStep === GettingStartedStep.COMPLETE ? (
                    <CompleteGettingStarted />
                  ) : (
                    <div className="col-span-full lg:col-span-1 bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 transform hover:shadow-md group">
                      <div className="p-5 flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            currentStep > GettingStartedStep.REVIEW_DETAILS
                              ? "bg-green-500"
                              : "bg-white border border-gray-300"
                          }`}
                        >
                          {currentStep > GettingStartedStep.REVIEW_DETAILS ? (
                            <Check size={20} className="text-white" />
                          ) : (
                            <span className="text-gray-700 font-semibold">
                              {selectedPlan.type === "FREE_TRIAL" ? 2 : 3}
                            </span>
                          )}
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-gray-800">
                            Confirm
                          </h2>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )
        }
      </div>
    </div>
  );
};

export default GettingStartedSteps;
