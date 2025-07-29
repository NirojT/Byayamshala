import "@zener/nepali-datepicker-react/index.css";
import { useEffect } from "react";
import AddNewFacilityCards from "./component/add-new-facility-cards";
import { useListFacilitiesStore } from "@/pages/layout/private/list/gymoperatiions/facilities/store";
import { usePlansOperationFormStore } from "../../../store";
import { useToggleAddFacilityStore } from "./add-new-facility-store";
import AddNewFacilityForm from "./component/add-new-facility-form";

const AddNewFacility = () => {
  // Stores
  const { getFacilities } = useListFacilitiesStore();
  const { isOpen } = useToggleAddFacilityStore();
  const { searchedMember } = usePlansOperationFormStore();

  useEffect(() => {
    // Fetch facilities when the component mounts
    getFacilities();
  }, [getFacilities]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Conditionally render based on whether a member is selected */}
      {Object.keys(searchedMember)?.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Add New Facility Form - shown when `isOpen` is true */}
          {isOpen && (
            <div className="w-full lg:w-1/2">
              <AddNewFacilityForm />
            </div>
          )}

          {/* Add New Facility Cards - shown when `isOpen` is true */}
          {isOpen && (
            <div className="w-full lg:w-1/2">
              <AddNewFacilityCards />
            </div>
          )}
        </div>
      ) : (
        // Placeholder message when no member is selected
        <div className="flex items-center justify-center h-[70vh] text-slate-500 text-2xl font-semibold text-center">
          <p>
            Search for a member to add or view their facility plans.
            <br />
            <span className="text-orange-600 font-bold tracking-wider mt-2 block">
              Powered by Gym Udaan
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default AddNewFacility;
