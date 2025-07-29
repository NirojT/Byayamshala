import { useListMemberStore } from "@/pages/layout/private/list/gymoperatiions/members/store";
import { useEffect } from "react";
import { useListFacilitiesStore } from "@/pages/layout/private/list/gymoperatiions/facilities/store";
import { usePlansOperationFormStore } from "../../../../store";

// Define a type for the date item props for better readability and type checking
interface DateItemProps {
  label: string;
  date: string;
}

const AddNewFacilitiesCards = () => {
  // Stores
  const { getFacilities } = useListFacilitiesStore();
  const { searchedMember } = usePlansOperationFormStore();
  const { memberFacilities, getMemberFacilityByMemberId } =
    useListMemberStore();

  useEffect(() => {
    // Fetch all facilities and member-specific facilities when `searchedMember` changes
    getFacilities();
    if (searchedMember?.id) {
      getMemberFacilityByMemberId(searchedMember.id);
    }
  }, [searchedMember, getFacilities, getMemberFacilityByMemberId]);

  // Helper component for displaying date labels
  const DateItem: React.FC<DateItemProps> = ({ label, date }) => (
    <div className="flex-1 text-center">
      <p className="text-gray-500 text-xs sm:text-sm font-medium">{label}</p>
      <p className="font-semibold text-gray-800 text-sm sm:text-base mt-1">
        {new Date(date).toLocaleDateString()}
      </p>
    </div>
  );

  return (
    <div className="px-4 py-6 bg-white rounded-xl shadow-lg max-h-[80vh] overflow-y-auto font-poppins">
      {/* Section Header */}
      <div className="mb-6 pb-4 border-b-2 border-orange-100 flex items-center justify-between">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
          Member Facilities
          <span className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-base font-semibold shadow-sm">
            {memberFacilities?.length || 0}
          </span>
        </h3>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {memberFacilities?.length > 0 ? (
          memberFacilities.map((memberFacility, index) => (
            <div
              key={memberFacility?.id || index}
              className="rounded-xl bg-gray-50 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Facilities Header */}
              <div
                className={`p-4 sm:p-5 ${
                  memberFacility?.memberShipStatus === "ACTIVE"
                    ? "bg-green-50"
                    : "bg-red-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-800 capitalize">
                    {memberFacility?.facilityName}
                  </h4>
                  <span
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                      memberFacility?.memberShipStatus === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {memberFacility?.memberShipStatus}
                  </span>
                </div>
              </div>

              {/* Facilities Details */}
              <div className="p-4 sm:p-5 space-y-4">
                <div className="border-t border-gray-100 pt-4 flex justify-around items-center">
                  <DateItem
                    label="Start Date"
                    date={memberFacility?.facilityStartDate}
                  />
                  <DateItem
                    label="End Date"
                    date={memberFacility?.facilityEndDate}
                  />
                </div>

                {/* More details */}
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                  <div>
                    <p className="font-medium">Price:</p>
                    <p className="text-gray-900">
                      Rs. {memberFacility?.price?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Discount:</p>
                    <p className="text-gray-900">
                      Rs. {memberFacility?.discount?.toLocaleString() || "0"}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-medium">Payment Mode:</p>
                    <p className="text-gray-900">
                      {memberFacility?.paymentMode}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-medium">Description:</p>
                    <p className="text-gray-900">
                      {memberFacility?.description || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500 text-lg">
            No facilities found for this member.
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNewFacilitiesCards;
