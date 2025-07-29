import { Typography } from "@mui/material";
import React from "react";
import { useBusinessStatsStore } from "./store";
import BusinessFilters from "./component/business-filters";
import BusinessReportTabs from "./tabs/business-report-tabs";
import { TbChartBar, TbLoader } from "react-icons/tb";
import Back from "@/global/components/back/back";

const BusinessStats: React.FC = () => {
  const { businessStats } = useBusinessStatsStore();

  return (
    <div className="bg-gray-100 min-h-screen py-4 sm:py-8 font-poppins">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
         <Back />
        {/* Header with icon */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <TbChartBar className="text-[#E26003] hidden sm:block" size={28} />
            <Typography
              variant="h4"
              className="text-gray-800 text-base sm:text-lg font-bold sm:font-extrabold capitalize"
            >
              Business Statistics
            </Typography>
          </div>
          <Typography variant="body2" className="text-gray-500 text-sm">
            Overview of your key business performance indicators.
          </Typography>
        </div>
        
        {/* Filters */}
        <div className="mt-10 mb-6 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <BusinessFilters />
        </div>

        {/* Stats Categories */}
        {businessStats ? (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <BusinessReportTabs />
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center">
            <div className="animate-spin text-[#E26003] mb-3">
              <TbLoader size={24} />
            </div>
            <p className="text-gray-500">Loading business statistics...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessStats;