import { useGlobalStore } from "@/global/store";
import CustomGymOperationsCard from "./components/custom-gym-operations-card";
import { useEffect } from "react";

const List = () => {
  // stores
  const {  scrollPosition } = useGlobalStore();
  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  return (
    <div className=" p-4">
      {/* Gym Operations Section */}
      <h2 className="text-center text-xl font-poppins mb-4 text-[#E26300] underline">
        Gym Operations
      </h2>
      {/* <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-6"> */}
      <CustomGymOperationsCard />
      {/* </div> */}
    </div>
  );
};

export default List;
