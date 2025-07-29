import { useGlobalStore } from "@/global/store";
import CustomReportCard from "./component/custom-report-card";
import { useEffect } from "react";

const Reports = () => {
  // stores
  const {  scrollPosition } = useGlobalStore();
  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  return (
    <div className="text-white p-6 mt-4">
      <h2 className="text-xl text-center  mb-4 text-[#E26300] underline font-poppins">
        Report Summary
      </h2>
      {/* <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-6"> */}
      <CustomReportCard />
      {/* </div> */}
    </div>
  );
};

export default Reports;
