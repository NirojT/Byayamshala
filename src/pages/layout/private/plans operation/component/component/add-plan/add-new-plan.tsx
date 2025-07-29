import { useListMemberStore } from "@/pages/layout/private/list/gymoperatiions/members/store";

import "@zener/nepali-datepicker-react/index.css";
import { useEffect } from "react";
import { MemberShipStaus } from "../../../../../../../global/components/enums/enums";
import { useListPlansStore } from "../../../../list/gymoperatiions/plans/store";
import { usePlansOperationFormStore } from "../../../store";
import { useToggleAddPlanStore } from "./add-new-plan-store";
import PlanModal from "../../plan-print-modal";


import AddNewPlanForm from "./component/add-new-plan-form";
import AddNewPlanCards from "./component/add-new-plans-cards";

const AddNewPlan = () => {
  // stores
  const { getPlans } = useListPlansStore();
  const { isOpen } = useToggleAddPlanStore();

  const { data, setData, searchedMember, pdf } = usePlansOperationFormStore();

  const { memberShips } = useListMemberStore();

  useEffect(() => {
    getPlans();
  }, [getPlans]);

  useEffect(() => {
    // dont use the end date of  canceled membership
    if (
      memberShips?.length > 0 &&
      memberShips[0]?.memberShipStatus !== MemberShipStaus.CANCELED
    ) {
      const latestMemberShip = memberShips[0];
      const formattedDate = latestMemberShip?.membershipEndDate
        ? latestMemberShip.membershipEndDate.split(" ")[0] // Extract only the date part
        : "";
      setData({ ...data, startDate: formattedDate });
    }
  }, [searchedMember, memberShips]);

  
  return (
    <div>
      {/* for large screens , show only after any user is selected */}

      {Object.keys(searchedMember)?.length > 0 ? (
        <div className="flex flex-col  items-center justify-center mx-auto sm:p-6 rounded-lg  text-white sm:border-none sm:border sm:border-gray-600">

          {/* it means member is there */}
          <div className="flex flex-col   lg:flex-row lg:justify-evenly gap-10  w-full">
            {isOpen && <AddNewPlanForm />}
            {isOpen && <AddNewPlanCards />}
          </div>
        </div>
      ) : (
        // when none is selected and in searching state
        <div className="text-slate-600 mt-10 text-center ">
          Search a member to add a new plan <br />
          Powered by{" "}
          <span className="text-orange-500 font-semibold tracking-wider">
            Gym Udaan
          </span>
        </div>
      )}

      {pdf && <PlanModal />}
    </div>
  );
};

export default AddNewPlan;