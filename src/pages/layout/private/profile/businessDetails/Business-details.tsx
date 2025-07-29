import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useBusinessDetailsStore } from "../account-settings/component/store";
import { useProfileStore } from "../account-settings/store";

const BusinessDetails = () => {
  const { getBusinessDetails, data } = useBusinessDetailsStore();
  const { setOpenBusinessDetails } = useProfileStore();
  const navigate = useNavigate();

  useEffect(() => {
    getBusinessDetails();
  }, []);
  
  return (
    <div className="w-full text-black  p-8 font-poppins">
      <button onClick={() => setOpenBusinessDetails("")}>
        <FaArrowLeft className="text-[#E26003] text-xl absolute top-[20%] " />
      </button>

      <h2 className="text-lg font-semibold   flex items-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 text-[#E26003]"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 00-1-1H7a1 1 0 00-1 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
            clipRule="evenodd"
          />
        </svg>
        Business Details
      </h2>

      {/* Desktop View - Table Layout */}
      <div className="overflow-x-auto hidden sm:block   py-4 rounded-lg shadow-md">
        <table className="table-auto w-full border-collapse border border-gray-100 shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="  text-left  ">
              <th className="p-3 text-sm font-semibold">Field</th>
              <th className="p-3 text-sm font-semibold">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100 border-t border-b border-gray-600 transition-colors duration-200">
              <td className="p-3 text-sm font-medium  ">Business Name</td>
              <td className="p-3 text-sm  ">
                {data?.businessName || "Not available"}
              </td>
            </tr>
            <tr className="hover:bg-gray-100 border-t border-b border-gray-600 transition-colors duration-200">
              <td className="p-3 text-sm font-medium  ">Address</td>
              <td className="p-3 text-sm  ">
                {data?.businessAddress || "Not available"}
              </td>
            </tr>
            <tr className="hover:bg-gray-100 border-t border-b border-gray-600 transition-colors duration-200">
              <td className="p-3 text-sm font-medium  ">Phone Number</td>
              <td className="p-3 text-sm  ">
                {data?.businessPhone || "Not available"}
              </td>
            </tr>
            <tr className="hover:bg-gray-100 border-t border-b border-gray-600 transition-colors duration-200">
              <td className="p-3 text-sm font-medium  ">PAN Number</td>
              <td className="p-3 text-sm  ">
                {data?.panNo || "Not available"}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => navigate("/profile/account-settings")}
            className="px-4 py-2 bg-[#E26003] hover:bg-[#c05403]   rounded-md transition-colors duration-200 text-sm font-medium"
          >
            Update Details
          </button>
        </div>
      </div>

      {/* Mobile View - Card Layout */}
      <div className="mt-4 sm:hidden">
        <div className="bg-black rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:border-gray-500 transition-all">
          <div className="p-5 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium  ">Business Name:</span>
                <span className="text-sm  ">
                  {data?.businessName || "Not available"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium  ">Address:</span>
                <span className="text-sm  ">
                  {data?.businessAddress || "Not available"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium  ">Phone Number:</span>
                <span className="text-sm  ">
                  {data?.businessPhone || "Not available"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium  ">PAN Number:</span>
                <span className="text-sm  ">
                  {data?.panNo || "Not available"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
