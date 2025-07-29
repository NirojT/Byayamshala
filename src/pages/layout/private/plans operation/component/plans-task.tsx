import { useLocation } from "react-router-dom";
import SearchMember from "./component/search-member";
import { usePlansOperationFormStore } from "../store";
import AddNewPlan from "./component/add-plan/add-new-plan"; 
import { useGlobalStore } from "@/global/store";
import { useEffect } from "react";
import AddNewFacility from "./component/add-facility-new/add-new-facility";

// "Add New Plans", "Renew Plans", "Add Facilities";
const PlansTask = () => {
  const { state } = useLocation();
  const { searchedMember, clearSearchedMember } = usePlansOperationFormStore();

  // console.log(searchedMember);

  const task = state?.task.name || "";

  // stores
  const { scrollPosition } = useGlobalStore();
  // console.log(task);
  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  return (
    <div className="flex flex-col mt-3 p-3">
      {Object.keys(searchedMember)?.length === 0 ? (
        <div className="w-full">
          <SearchMember task={task}/>
        </div>
      ) : (
        <div className="flex justify-between items-center p-4 bg-slate-200 text-black rounded-lg mb-4">
          <h1 className="text-2xl font-semibold tracking-wider">{task}</h1>
          <p className="tracking-widest">
            Selected Member: {searchedMember?.fullName}
          </p>
          <button
            className="tracking-widest hover:cursor-pointer"
            onClick={clearSearchedMember}
          >
            Search Again
          </button>
        </div>
      )}
      <div className="p-6 ">
        {/* {task === "Add New Plans" && searchedMember && <AddNewPlan />}
        {task === "Renew Plans" && <RenewPlan />} */}
        {task === "Renew Plans" && searchedMember && <AddNewPlan />}
        {task === "Add Facilities" && searchedMember && <AddNewFacility />}
        {/* {task === "Add Facilities" && <AddFacilitiesInPlan />} */}
      </div>
    </div>
  );
};

export default PlansTask;
