
import { useEffect } from "react";
import { useListMemberStore } from "../list/gymoperatiions/members/store";
import CustomPlansOperationsCard from "./custom-plans-operations-card";

const PlansOperation = () => {

  const { getMembers } = useListMemberStore();


  useEffect(() => {
    getMembers();
  }, [getMembers]);

  return (
    <div className="p-4">
      <h2 className="text-xl text-center  mb-4 text-[#E26300] underline font-poppins">Plans Operations</h2>

      {/* <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-6"> */}
      <CustomPlansOperationsCard />
      {/* </div> */}

    </div>
  );
};

export default PlansOperation;
