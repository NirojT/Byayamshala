import Back from "@/global/components/back/back";
import { useIsDesktop } from "@/global/desktop-checker";
import { Box } from "@mui/material";
import React from "react";
import { BsCalendarDate } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IoFitnessOutline } from "react-icons/io5";
import { MdOutlineDiscount } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbFileInfo } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { PrivateRoute } from "../../../../../../global/config";
import MembershipFilters from "./component/membership-filters";
import { useListMembershipStore } from "./store";
import { useSystemUserStore } from "../../../systemuser/store";
import { SystemUserType } from "@/global/components/enums/enums";
import { HiOutlineUserGroup } from "react-icons/hi";

const MemberShipList: React.FC = () => {
  const navigate = useNavigate();

  const { currentSystemUser } = useSystemUserStore();
  const { memberShips, inDepthReport } = useListMembershipStore();

  const handleViewProfile = (memberId: number) => {
    navigate(`/${PrivateRoute}/member-profile`, {
      state: { id: memberId, scrollDown: true },
    });
  };
  const isDesktop = useIsDesktop(640); // 640px matches Tailwind 'sm'
  return (
    <div className="">
      <Box sx={{ padding: 2, position: "relative" }}>
        <Back />

        {/* Filters */}
        <div className="mt-16 mb-6">
          <MembershipFilters />
        </div>

        {/* Table Wrapper for desktop */}
        {isDesktop ? (
          <div className="  overflow-hidden border border-gray-200 rounded-lg shadow-sm mt-4">
            {!inDepthReport && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-slate-200 text-gray-800">
                    <tr className="text-gray-600">
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        SN
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        plan
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        price
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        discount
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Payment Mode
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Duration
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Added At
                      </th>
                      {currentSystemUser?.systemUserType ===
                        SystemUserType.ADMIN && (
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <HiOutlineUserGroup className="w-4 h-4 text-gray-400" />
                            Added By
                          </div>
                        </th>
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {Array.isArray(memberShips) && memberShips?.length > 0 ? (
                      memberShips.map((data, index) => (
                        <React.Fragment key={data?.id ?? index}>
                          <tr
                            className="even:bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewProfile(data?.memberId);
                            }}
                          >
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                              {index + 1}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                              {data?.planName} ({data?.memberName})
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                              <span className="text-green-600">
                                रु {data?.price} 
                                
                              </span>
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              {data?.discount}
                            </td>
                            {/* <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                          {data?.facilities
                            ?.map((facility) => facility?.facilityName)
                            .join(", ")}
                        </td> */}
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                              {data?.paymentMode}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                              {data?.membershipStartDate}--{" "}
                              {data?.membershipEndDate}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                              {data?.createdNepDate} {data?.localTimeZone}
                            </td>
                            {/* added by */}

                            {currentSystemUser?.systemUserType ===
                              SystemUserType.ADMIN && (
                              <td className="px-6 py-4 whitespace-nowrap">
                                {data?.addedBy || "unknown"}
                              </td>
                            )}
                          </tr>
                        </React.Fragment>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={11}
                          className="text-[14px] p-3 text-center text-red-400"
                        >
                          No membership records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className=" flex flex-col h-full p-3">
            {Array.isArray(memberShips) &&
            !inDepthReport &&
            memberShips.length > 0 ? (
              memberShips.map((data) => (
                <div
                  className="border border-gray-300 rounded-lg text-sm flex flex-col mb-4 p-4 bg-white shadow-md"
                  key={data?.id}
                  onClick={() => handleViewProfile(data?.memberId)}
                >
                  {/* Header with plan name and status */}
                  <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-2">
                    <span className="font-medium text-gray-800 text-base">
                      {data?.planName}
                    </span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${
                        data?.memberShipStatus === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {data?.memberShipStatus || "UNKNOWN"}
                    </span>
                  </div>

                  {/* Member name section */}
                  <div className="flex items-center gap-2 mb-3 bg-gray-50 p-2 rounded-md">
                    <FaUser className="text-blue-500" />
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs">Member:</span>
                      <span className="font-medium text-gray-800">
                        {data?.memberName || "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Main content grid */}
                  <div className="grid grid-cols-2 gap-y-3 text-sm mb-3">
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs">Price:</span>
                      <div className="flex items-center gap-1 mt-1">
                        <RiMoneyDollarCircleLine className="text-green-500" />
                        <span className="font-medium text-green-600">
                          रु {data?.price}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs">Discount:</span>
                      <div className="flex items-center gap-1 mt-1">
                        <MdOutlineDiscount className="text-orange-500" />
                        <span className="font-medium text-gray-700">
                          {data?.discount || "0"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col col-span-2">
                      <span className="text-gray-400 text-xs">Facilities:</span>
                      <div className="flex items-start gap-1 mt-1">
                        <IoFitnessOutline className="text-blue-500 mt-1" />
                        <span className="font-medium text-gray-700">
                          {data?.facilities?.length > 0
                            ? data?.facilities
                                .map((facility) => facility?.facilityName)
                                .join(", ")
                            : "None"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col col-span-2">
                      <span className="text-gray-400 text-xs">
                        Added Facilities:
                      </span>
                      <div className="flex items-start gap-1 mt-1">
                        <IoFitnessOutline className="text-blue-500 mt-1" />
                        <span className="font-medium text-gray-700">
                          {data?.addedFacilities?.length > 0
                            ? data?.facilities
                                .map((facility) => facility?.facilityName)
                                .join(", ")
                            : "None"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Date information */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-3 border-t border-gray-100 pt-2">
                    <div className="flex items-center gap-1">
                      <BsCalendarDate className="text-gray-400" />
                      <span>Start: {data?.membershipStartDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BsCalendarDate className="text-gray-400" />
                      <span>End: {data?.membershipEndDate}</span>
                    </div>
                  </div>

                  {/* Action button */}
                  <div className="flex justify-end mt-1">
                    <button
                      className="sm:text-gray-600 text-sm sm:text-base border-none sm:border sm:border-gray-800 
                     sm:p-2 rounded-lg hover:text-[#E26300] transition-colors flex items-center justify-center 
                     gap-2 sm:hover:scale-110 hover:zoom-out-50 underline sm:no-underline text-[#E26300]"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewProfile(data?.memberId);
                      }}
                    >
                      <TbFileInfo className="w-4" color="orange" />
                      View Profile
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full flex justify-center items-center p-5 border border-gray-300 rounded-lg bg-white shadow-md">
                <div className="text-center text-red-400">
                  <p>No membership records found</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* UPDATED mobile view */}
      </Box>
    </div>
  );
};

export default MemberShipList;
