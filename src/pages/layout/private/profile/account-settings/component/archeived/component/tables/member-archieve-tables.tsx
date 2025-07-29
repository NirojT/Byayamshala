import React, { useEffect } from "react";
import { IoMdCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

import { BulkSelect, BulkTask } from "@/global/components/enums/enums";
import { useArcheivedStore } from "../../store";

const MemberArcheiveTables: React.FC = () => {
  const {
    members,
    filteredMembers,
    setFilteredMembers,

    toggleMember,
    toggleMemberAll,
    bulkTask,

    selected,
  } = useArcheivedStore();
const [searchText, setSearchText] = React.useState("");

  // Check if all members are selected
  const isAllSelected =
    filteredMembers?.length > 0 &&
    filteredMembers?.every((item) => item?.isSelected);

  useEffect(() => {
    if (selected === BulkSelect.MEMBER) {
      if (bulkTask === BulkTask.ACTIVATE) {
        setFilteredMembers(
          members?.filter((item) => item?.activeStatus === false)
        );
      } else if (bulkTask === BulkTask.RESTORE) {
        setFilteredMembers(members?.filter((item) => item?.deleted === true));
      }
    }
  }, [bulkTask]);

  useEffect(() => {
    setFilteredMembers(members);
  }, [members]);
useEffect(() => {
  let result = members;

  if (bulkTask === BulkTask.ACTIVATE) {
    result = result?.filter((item) => item?.activeStatus === false);
  } else if (bulkTask === BulkTask.RESTORE) {
    result = result?.filter((item) => item?.deleted === true);
  }

  if (searchText.trim()) {
    result = result?.filter(
      (item) =>
        item?.fullName?.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.phone?.toString().includes(searchText)
    );
  }

  setFilteredMembers(result);
}, [members, searchText, bulkTask]);

  return (
    <div className="min-h-screen  py-6 font-poppins text-[#2E2E2E]">
      {/* Table for large screens */}
      <div className="overflow-x-auto sm:flex sm:flex-col hidden text-[#2E2E2E] py-6 w-full rounded-lg  ">
        <div className="mb-4 w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search by name or phone"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-[#F5F5F5] text-left border-b border-gray-200">
              <th
                className="p-4 text-sm font-semibold cursor-pointer"
                onClick={toggleMemberAll}
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
              <th className="p-4 text-sm font-semibold">Joining Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredMembers) && filteredMembers.length > 0 ? (
              filteredMembers.map((data, index: number) => (
                <tr
                  key={data?.id ?? index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td
                    className="p-4 text-center text-sm cursor-pointer"
                    onClick={() => toggleMember(data.id)}
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
                  <td className="p-4 text-sm">{data?.joiningDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="p-8 text-center text-red-500 text-sm"
                >
                  No members are added
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberArcheiveTables;