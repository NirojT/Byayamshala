import { IoMdCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

import { BulkSelect, BulkTask } from "@/global/components/enums/enums";
import { useArcheivedStore } from "../../store";
import { useEffect } from "react";

const StaffArcheiveTables: React.FC = () => {
  const {
    staffs,
    filteredStaffs,
    setFilteredStaffs,

    toggleStaff,
    toggleStaffAll,
    bulkTask,

    selected,
  } = useArcheivedStore();

  // Check if all staffs are selected
  const isAllSelected =
    filteredStaffs?.length > 0 &&
    filteredStaffs?.every((item) => item?.isSelected);

  useEffect(() => {
    if (selected === BulkSelect.STAFF) {
      if (bulkTask === BulkTask.ACTIVATE) {
        setFilteredStaffs(
          staffs?.filter((item) => item?.activeStatus === false)
        );
      } else if (bulkTask === BulkTask.RESTORE) {
        setFilteredStaffs(staffs?.filter((item) => item?.deleted === true));
      }
    }
  }, [bulkTask]);

  useEffect(() => {
    setFilteredStaffs(staffs);
  }, [staffs]);

  return (
    <div className="min-h-screen py-6 font-poppins text-[#2E2E2E]">
      {/* Table for large screens */}
      <div className="overflow-x-auto sm:flex sm:flex-col hidden text-[#2E2E2E] py-6 w-full rounded-lg">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-[#F5F5F5] text-left border-b border-gray-200">
              <th
                className="p-4 text-sm font-semibold cursor-pointer"
                onClick={toggleStaffAll}
              >
                {isAllSelected ? (
                  <IoMdCheckbox size={20} />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank size={20} />
                )}
              </th>
              <th className="p-4 text-sm font-semibold text-center">SN</th>
              <th className="p-4 text-sm font-semibold">Full Name</th>
              <th className="p-4 text-sm font-semibold">Phone</th>
              <th className="p-4 text-sm font-semibold">Address</th>
              <th className="p-4 text-sm font-semibold">Shift</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredStaffs) && filteredStaffs.length > 0 ? (
              filteredStaffs.map((data, index: number) => (
                <tr
                  key={data?.id ?? index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td
                    className="p-4 text-center text-sm cursor-pointer"
                    onClick={() => toggleStaff(data.id)}
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
                  <td className="p-4 text-sm">{data?.fullName}</td>
                  <td className="p-4 text-sm">{data?.phone}</td>
                  <td className="p-4 text-sm">{data?.address}</td>
                  <td className="p-4 text-sm">{data?.shiftType}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-red-500 text-sm"
                >
                  No staffs are added
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffArcheiveTables;