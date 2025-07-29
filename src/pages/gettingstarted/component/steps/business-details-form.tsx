import { GettingStartedStep } from "@/global/components/enums/enums";
 
import { useGlobalStore } from "@/global/store";
import { useGettingStartedStore } from "../../store";

const BusinessDetailsForm = () => {
  const { businessDetails, setBusinessDetails, setCurrentStep, selectedPlan } =
    useGettingStartedStore();
  const { setToasterData } = useGlobalStore();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setBusinessDetails({ ...businessDetails, [name]: value });
  };

  const handleNext = () => {
    const error = validate();

    if (error) {
      // Now it will properly detect validation errors
      setToasterData({ message: error, severity: "error", open: true });
      return;
    }
    if (selectedPlan.type === "FREE_TRIAL") {
      setCurrentStep(GettingStartedStep.COMPLETE);
    } else {
      setCurrentStep(GettingStartedStep.PAYMENT);
    }
  };

  const validate = () => {
    if (!businessDetails?.businessName) return "Business name is required";
    if (!businessDetails?.businessAddress) return "Business address is required";
    if (!businessDetails?.businessPhone) return "Business phone is required";
    return "";
  };

  return (
    <div className="col-span-full lg:col-span-1 bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 transform hover:shadow-md">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-orange-600 w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
            <p className="text-white font-bold">1</p>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Business Details</h1>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label
                htmlFor="businessname"
                className="block text-sm font-medium text-gray-700 ml-1"
              >
                Business Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="businessName"
                  value={businessDetails?.businessName}
                  onChange={handleInputChange}
                  className="pl-10 pr-3 py-2 bg-white w-full border border-gray-300 rounded-md text-gray-800 shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200"
                  placeholder="Enter business name"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 ml-1"
              >
                Business Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  name="businessAddress"
                  value={businessDetails?.businessAddress}
                  onChange={handleInputChange}
                  className="pl-10 pr-3 py-2 bg-white w-full border border-gray-300 rounded-md text-gray-800 shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200"
                  placeholder="Enter business address"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 ml-1"
              >
                Business Phone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <input
                  type="tel"
                  name="businessPhone"
                  value={businessDetails?.businessPhone}
                  onChange={handleInputChange}
                  className="pl-10 pr-3 py-2 bg-white w-full border border-gray-300 rounded-md text-gray-800 shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200"
                  placeholder="+1 (234) 567-8901"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="pan no"
                className="block text-sm font-medium text-gray-700 ml-1"
              >
                PAN No (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm8 8v2h1v1H4v-1h1v-2a1 1 0 011-1h8a1 1 0 011 1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="panNo"
                  value={businessDetails?.panNo}
                  onChange={handleInputChange}
                  className="pl-10 pr-3 py-2 bg-white w-full border border-gray-300 rounded-md text-gray-800 shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200"
                  placeholder="Enter PAN number"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-5 mt-8">
          <button
            className="w-full sm:w-44 py-3 px-6 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
            onClick={() => {
              handleNext();
            }}
          >
            Continue
          </button>

          <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-right">
            By clicking Continue you accept the Terms of Use and Privacy Policy.
            You confirm that the business details are correct.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailsForm;
