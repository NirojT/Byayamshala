import React, { useEffect } from "react";
import { IoMdCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

import { BulkSelect, BulkTask } from "@/global/components/enums/enums";
import { useArcheivedStore } from "../../store";

const PlansArcheiveTables: React.FC = () => {
  const {
    plans,
    filteredPlans,
    setFilteredPlans,

    togglePlans,
    togglePlansAll,
    bulkTask,

    selected,
  } = useArcheivedStore();

  // Check if all plans are selected
  const isAllSelected =
    filteredPlans?.length > 0 &&
    filteredPlans?.every((item) => item?.isSelected);

  useEffect(() => {
    if (selected === BulkSelect.PLAN) {
      if (bulkTask === BulkTask.ACTIVATE) {
        setFilteredPlans(plans?.filter((item) => item?.activeStatus === false));
      } else if (bulkTask === BulkTask.RESTORE) {
        setFilteredPlans(plans?.filter((item) => item?.deleted === true));
      }
    }
  }, [bulkTask]);

  useEffect(() => {
    setFilteredPlans(plans);
  }, [plans]);

  return (
    <div className="min-h-screen py-6 font-poppins text-[#2E2E2E]">
      {/* Table for large screens */}
      <div className="overflow-x-auto sm:flex sm:flex-col hidden text-[#2E2E2E] py-6 w-full rounded-lg">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-[#F5F5F5] text-left border-b border-gray-200">
              <th
                className="p-4 text-sm font-semibold cursor-pointer"
                onClick={togglePlansAll}
              >
                {isAllSelected ? (
                  <IoMdCheckbox size={20} />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank size={20} />
                )}
              </th>
              <th className="p-4 text-sm font-semibold">SN</th>
              <th className="p-4 text-sm font-semibold">Plan Name</th>
              <th className="p-4 text-sm font-semibold">Price</th>
              <th className="p-4 text-sm font-semibold">Facilities</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredPlans) && filteredPlans.length > 0 ? (
              filteredPlans.map((data, index: number) => (
                <tr
                  key={data?.id ?? index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td
                    className="p-4 text-center text-sm cursor-pointer"
                    onClick={() => togglePlans(data.id)}
                  >
                    {data?.isSelected ? (
                      <IoMdCheckbox size={20} className="text-[#E26300]" />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank size={20} />
                    )}
                  </td>

                  <td className="p-4 text-center text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="p-4 text-sm">{data?.planName}</td>
                  <td className="p-4 text-sm">Rs {data?.price}</td>
                  <td className="p-4 text-sm">
                    {data?.facilities
                      ?.map((facility) => facility.facilityName)
                      ?.join(", ")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="p-8 text-center text-red-500 text-sm"
                >
                  No plans are added
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlansArcheiveTables;
