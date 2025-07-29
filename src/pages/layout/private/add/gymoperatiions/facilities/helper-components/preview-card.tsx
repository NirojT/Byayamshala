import { FiCheckCircle, FiDollarSign, FiPackage } from "react-icons/fi";
import { useAddFacilitiesFormStore } from "../store";

const FacilitiesPreviewCard = () => {
    const {data,showPreview} = useAddFacilitiesFormStore();
  return (
    <div className="lg:col-span-2">
      <div
        className={`sticky top-6 transition-all duration-300 ${
          showPreview && data.facilityName
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-800/50 to-orange-700/30 p-4">
            <h3 className="text-white font-bold flex items-center">
              <span className="mr-2">Facility Preview</span>
              <span className="bg-orange-600/50 text-xs px-2 py-1 rounded-full">
                Live Preview
              </span>
            </h3>
          </div>

          <div className="p-6">
            {data.facilityName ? (
              <div className="space-y-4">
                <h4 className="text-2xl font-bold text-white">
                  {data.facilityName as string}
                </h4>

                {data.price && (
                  <div className="flex items-center text-green-400 font-medium text-xl">
                    <FiDollarSign className="mr-1" />
                    <span>NPR {data.price as string}</span>
                  </div>
                )}

                {data.capacityLimit && (
                  <div className="flex items-center text-blue-400 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <span>Capacity: {data.capacityLimit as string} people</span>
                  </div>
                )}

                {data.description && (
                  <div className="mt-4">
                    <h5 className="text-gray-300 font-medium mb-2">
                      Description:
                    </h5>
                    <p className="text-gray-400 text-sm">
                      {data.description as string}
                    </p>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-2">
                    <FiCheckCircle className="text-orange-500" />
                    <span className="text-gray-300 text-sm">
                      This facility can be added to membership plans
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="bg-gray-700/50 p-4 rounded-full mb-3">
                  <FiPackage className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-400">
                  Fill in the facility details to see a preview
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Example Usage Card */}
        {showPreview && data.facilityName && (
          <div className="mt-6 bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg overflow-hidden animate-fadeIn">
            <div className="p-4 border-b border-gray-700">
              <h4 className="text-white font-medium">Example Usage</h4>
            </div>

            <div className="p-4">
              <div className="bg-gray-700/30 rounded-lg p-3 mb-3">
                <p className="text-sm text-gray-400">
                  This facility will appear in:
                </p>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center text-sm">
                    <span className="bg-blue-600/20 p-1 rounded-full mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-blue-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                    </span>
                    <span className="text-white">
                      Facility selection when creating plans
                    </span>
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="bg-green-600/20 p-1 rounded-full mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-green-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
                        />
                      </svg>
                    </span>
                    <span className="text-white">
                      Facility usage reports and analytics
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacilitiesPreviewCard;
