import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useArcheivedStore } from "./store";
import { FiArchive, FiTrash2 } from "react-icons/fi";
import ProfileArcheiveTop from "./component/profile-archeive-top";
import { BulkSelect, BulkTask } from "@/global/components/enums/enums";
import MemberArcheiveTables from "./component/tables/member-archieve-tables";
import PlansArcheiveTables from "./component/tables/plans-archieve-tables";
import { FaArrowLeft } from "react-icons/fa";
import StaffArcheiveTables from "./component/tables/staff-archieve-tables";

const ProfileArcheived: React.FC = () => {
  const {
    getArcheived,
    members,
    plans,
    staffs,

    bulkTask,
    setBulkTask,
    selected,
    setSelected,
  } = useArcheivedStore();

  useEffect(() => {
    getArcheived();
  }, [getArcheived]);

  //  function to handle toggle of members data

  //for  seeing tick mark in select all
  const handleTask = (task: BulkTask) => {
    setBulkTask(task);
  };

  return (
    <div className="h-full w-full  ">
      <Box sx={{ padding: 2 }}>
        <ProfileArcheiveTop />

        <div className="max-w-7xl mx-auto space-y-8">
          <button onClick={() => window.history.go(-1)}>
            <FaArrowLeft className="text-[#E26003] text-xl absolute top-[6%] left-[6%] " />
          </button>

          {/* Selection Tabs */}
          <div className="flex flex-col sm:flex-row gap-6 border-b border-[#2d2d2d] pb-4">
            <div className="flex flex-1 gap-2 overflow-x-auto scrollbar-hide">
              {[
                {
                  type: BulkSelect.MEMBER,
                  label: "Members",
                  count: members?.length,
                },
                {
                  type: BulkSelect.STAFF,
                  label: "Staffs",
                  count: staffs?.length,
                },
                { type: BulkSelect.PLAN, label: "Plans", count: plans?.length },
              ].map(({ type, label, count }) => (
                <button
                  key={type}
                  onClick={() => setSelected(type)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${
                  selected === type
                    ? "bg-green-500 text-white shadow-lg"
                    : "bg-gray-600 text-gray-100 hover:bg-[#292929] hover:text-white"
                }`}
                >
                  <span>{label}</span>
                  <span className="bg-black/30 px-2 py-1 rounded text-xs font-semibold">
                    {count}
                  </span>
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 sm:gap-4 items-center">
              {[
                {
                  task: BulkTask.ACTIVATE,
                  icon: <FiArchive />,
                  label: "Deactivated",
                },
                {
                  task: BulkTask.RESTORE,
                  icon: <FiTrash2 />,
                  label: "Deleted",
                },
              ].map(({ task, icon, label }) => (
                <button
                  key={task}
                  onClick={() => handleTask(task)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${
                  bulkTask === task
                    ? "bg-red-500 text-white shadow-lg"
                    : "bg-[#1a1a1a] text-gray-300 hover:bg-[#292929] hover:text-white"
                }`}
                >
                  {icon}
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Table Content */}
          <div className="  rounded-2xl overflow-hidden">
            {selected === BulkSelect.MEMBER ? (
              <MemberArcheiveTables />
            ) : selected === BulkSelect.STAFF ? (
              <StaffArcheiveTables />
            ) : (
              <PlansArcheiveTables />
            )}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default ProfileArcheived;
