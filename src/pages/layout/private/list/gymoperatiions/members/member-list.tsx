import Back from "@/global/components/back/back";
import { useIsDesktop } from "@/global/desktop-checker";
import { TablePagination } from "@mui/material";
import React, { useState } from "react";
import {
  FaEye,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp,
  FaCalendarAlt,
  FaUserFriends,
  FaCheckCircle,
  FaTicketAlt, 
  FaLock,
  FaLockOpen,
} from "react-icons/fa";
import { IoMdCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { TbUsers } from "react-icons/tb";
import { HiOutlineUserGroup } from "react-icons/hi";
import { useNavigate } from "react-router-dom"; //
import { PrivateRoute } from "../../../../../../global/config";
import MemberFilters from "./component/member-filters";
import MemberListTop from "./component/member-list-top";
import { IMemberDetails } from "./interface";
import { useListMemberStore } from "./store";
import { useSystemUserStore } from "../../../systemuser/store";
import { SystemUserType } from "@/global/components/enums/enums";

// Loading Skeleton Components
const TableSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    <div className="bg-gradient-to-r from-orange-50 to-orange-100 px-6 py-4 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <div className="w-5 h-5 bg-orange-200 rounded animate-pulse"></div>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-4 bg-orange-200 rounded animate-pulse flex-1"
          ></div>
        ))}
      </div>
    </div>
    {Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className="px-6 py-4 border-b border-gray-100 last:border-b-0"
      >
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse flex-1"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
          <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    ))}
  </div>
);

const CardSkeleton = () => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse"></div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
        </div>
      ))}
    </div>
    <div className="flex justify-end">
      <div className="w-28 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
  </div>
);

// Status Badge Component
const StatusBadge = ({
  expired,
  className,
}: {
  expired: boolean;
  className?: string;
}) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
      expired
        ? "bg-red-100 text-red-700 border border-red-200"
        : "bg-green-100 text-green-700 border border-green-200"
    } ${className}`}
  >
    <div
      className={`w-2 h-2 rounded-full mr-2 ${
        expired ? "bg-red-500" : "bg-green-500"
      }`}
    ></div>
    {expired ? "Expired" : "Active"}
  </span>
);

// WhatsApp Badge Component
const WhatsAppBadge = ({ saved }: { saved: boolean }) => (
  <span
    className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
      saved
        ? "bg-green-50 text-green-700 border border-green-200"
        : "bg-gray-50 text-gray-500 border border-gray-200"
    }`}
  >
    <FaWhatsapp
      className={`w-3 h-3 mr-1 ${saved ? "text-green-600" : "text-red-400"}`}
    />
    {saved ? "Linked" : "No"}
  </span>
);

// Empty State Component
const EmptyState = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <HiOutlineUserGroup className="w-10 h-10 text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      No members found
    </h3>
    <p className="text-gray-500 mb-6 max-w-md mx-auto">
      Get started by adding your first member or import members from a CSV/Excel
      file.
    </p>
  </div>
);

const MemberList: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    getMembers,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    filteredData,
    totalLength,
    isSearching,
    currentSearchData,
    searchQuery,
    resetSearch,
    toggleSelectAll,
    toggleSelectMember,
    setName,
  } = useListMemberStore();

  const { currentSystemUser } = useSystemUserStore();

  const handleViewProfile = (row: IMemberDetails) => {
    navigate(`/${PrivateRoute}/member-profile`, { state: { id: row?.id ,scrollDown: false} });
  };

  const handleRowClick = (data: IMemberDetails, event: React.MouseEvent) => {
    // Prevent row click when clicking on checkbox or action button
    const target = event.target as HTMLElement;
    if (
      target.closest("td[data-checkbox]") ||
      target.closest("td[data-actions]") ||
      target.closest("button") ||
      target.closest('input[type="checkbox"]')
    ) {
      return;
    }
    handleViewProfile(data);
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsLoading(true);
    setRowsPerPage(+event.target.value);
    setPage(0);

    if (isSearching && currentSearchData) {
      await searchQuery(currentSearchData);
    } else {
      await getMembers();
    }
    setIsLoading(false);
  };

  const handleChangePage = async (_event: unknown, newPage: number) => {
    setIsLoading(true);
    setPage(newPage);

    if (isSearching && currentSearchData) {
      await searchQuery(currentSearchData);
    } else {
      await getMembers();
    }
    setIsLoading(false);
  };

  const handleClearSearch = async () => {
    setIsLoading(true);
    resetSearch();
    await getMembers();
    setName("");
    setIsLoading(false);
  };

  const isDesktop = useIsDesktop(768);
  const isAllSelected =
    filteredData?.length > 0 && filteredData?.every((item) => item?.isSelected);
  const isSomeSelected =
    filteredData?.length > 0 && filteredData?.some((item) => item?.isSelected);

  const selectedCount =
    filteredData?.filter((item) => item?.isSelected)?.length || 0;

  return (
    <div className="min-h-screen font-inter bg-gray-50 p-4 lg:p-6">
      <div className="w-full mx-auto">
        <Back />

        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <TbUsers className="w-8 h-8 text-orange-500" />
                Member Management
              </h1>
            </div>
            {filteredData && filteredData.length > 0 && (
              <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 text-sm">
                  <FaUserFriends className="w-4 h-4 text-orange-500" />
                  <span className="font-medium text-gray-900">
                    {totalLength}
                  </span>
                  <span className="text-gray-500">total members</span>
                  {selectedCount > 0 && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="font-medium text-blue-600">
                        {selectedCount} selected
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Selection Actions or Filters */}
        {isSomeSelected ? (
          <div className="sticky top-4 z-30 mb-6">
            <MemberListTop />
          </div>
        ) : (
          <div className="mb-6">
            <MemberFilters handleClearSearch={handleClearSearch} />
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          isDesktop ? (
            <TableSkeleton />
          ) : (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          )
        ) : (
          <>
            {/* Desktop Table View */}
            {isDesktop ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {/* Select All Header */}
                        <th
                          className="px-6 py-2 text-left cursor-pointer hover:bg-gray-100 transition-colors duration-200 text-black"
                          onClick={toggleSelectAll}
                        >
                          <div className="flex items-center gap-2">
                            {isAllSelected ? (
                              <IoMdCheckbox className="w-5 h-5 text-blue-600" />
                            ) : (
                              <MdOutlineCheckBoxOutlineBlank className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </th>

                        {/* Member Profile Header */}
                        <th className="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <FaUser className="w-4 h-4 text-gray-400" />
                            Member
                          </div>
                        </th>

                        {/* Phone Header */}
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <FaPhone className="w-4 h-4 text-gray-400" />
                            Phone
                          </div>
                        </th>

                        {/* Address Header */}
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                            Address
                          </div>
                        </th>

                        {/* Shift Header */}
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <FaClock className="w-4 h-4 text-gray-400" />
                            Shift
                          </div>
                        </th>

                        {/* WhatsApp Header - Green icon only */}
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <FaWhatsapp className="w-4 h-4 text-green-500" />
                            WhatsApp
                          </div>
                        </th>

                        {/* Status Header */}
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <FaCheckCircle className="w-4 h-4 text-gray-400" />
                            Membership Status
                          </div>
                        </th>
                        {/* added by */}

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
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredData?.length > 0 ? (
                        filteredData.map((data, index) => (
                          <tr
                            key={data?.id ?? index}
                            className="hover:bg-orange-50 transition-all duration-200 group cursor-pointer"
                            onClick={(e) => handleRowClick(data, e)}
                          >
                            {/* Checkbox Cell */}
                            <td
                              className="px-6 py-4"
                              data-checkbox
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                className="p-1 rounded hover:bg-gray-100 transition-colors duration-200"
                                onClick={() => toggleSelectMember(data?.id)}
                              >
                                {data?.isSelected ? (
                                  <IoMdCheckbox className="w-5 h-5 text-blue-600" />
                                ) : (
                                  <MdOutlineCheckBoxOutlineBlank className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                                )}
                              </button>
                            </td>

                            {/* Profile Cell */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex flex-col items-center gap-4">
                                {data?.profileImageName ? (
                                  <img
                                    src={data?.profileImageName}
                                    alt={data?.fullName}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-orange-200 shadow-sm hover:scale-105 transition-transform duration-200"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      window.open(
                                        data?.profileImageName,
                                        "_blank"
                                      );
                                    }}
                                  />
                                ) : (
                                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 border-2 border-gray-200">
                                    <FaUser className="w-5 h-5 text-gray-400" />
                                  </div>
                                )}
                                <div>
                                  <div className="text-sm font-semibold text-gray-900 capitalize group-hover:text-orange-600 transition-colors duration-200">
                                    {data?.fullName?.slice(0, 27)}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Phone Cell */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FaPhone className="w-3 h-3 text-blue-400" />
                                <span className="font-medium">
                                  {/* {data?.phone} */}
                                  {data?.phone?.slice(0, 15)}

                                  <div className="flex gap-2">
                                    {data?.cardNumber && (
                                      <FaTicketAlt
                                        size={20}
                                        className="text-green-300 animate-in fade-in zoom-in"
                                      />
                                    )}
                                    {data?.doorAccess ? (
                                      <FaLockOpen
                                        size={20}
                                        className="text-green-400 animate-in fade-in zoom-in"
                                      />
                                    ) : (
                                      <FaLock
                                        size={20}
                                        className="text-red-400 animate-in fade-in zoom-in"
                                      />
                                    )}
                                  </div>
                                </span>
                              </div>
                            </td>

                            {/* Address Cell */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2 text-sm text-gray-600 max-w-40">
                                <FaMapMarkerAlt className="w-3 h-3 text-red-400 flex-shrink-0" />
                                <span className="truncate font-medium">
                                  {data?.address}
                                </span>
                              </div>
                            </td>

                            {/* Shift Cell */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200">
                                <FaClock className="w-3 h-3 mr-1" />
                                {data?.shiftType}
                              </span>
                            </td>

                            {/* WhatsApp Cell - Green themed */}
                            <td className="px-6 py-4 whitespace-nowrap ">
                              <WhatsAppBadge
                                saved={data?.isWhatsAppSaved || false}
                              />
                            </td>

                            {/* Status Cell */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <StatusBadge
                                expired={data?.currentMemberShipExpired}
                              />
                            </td>
                            {/* added by */}

                            {currentSystemUser?.systemUserType ===
                              SystemUserType.ADMIN && (
                              <td className="px-6 py-4 whitespace-nowrap">
                                {data?.addedBy || "unknown"}
                              </td>
                            )}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="p-0">
                            <EmptyState />
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Desktop Pagination */}
                {!isSearching &&
                  !isSomeSelected &&
                  filteredData &&
                  filteredData.length > 0 && (
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200">
                      <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        component="div"
                        count={totalLength ?? 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Members per page:"
                        className="text-gray-600"
                      />
                    </div>
                  )}
              </div>
            ) : (
              /* Mobile Card View */
              <div className="space-y-4">
                {/* Mobile Select All */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                  <button
                    className="flex items-center gap-3 w-full"
                    onClick={toggleSelectAll}
                  >
                    {isAllSelected ? (
                      <IoMdCheckbox className="w-5 h-5 text-blue-600" />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank className="w-5 h-5 text-gray-400" />
                    )}
                    <span className="text-sm font-medium text-gray-700">
                      Select all members ({filteredData?.length || 0})
                    </span>
                  </button>
                </div>

                {filteredData?.length > 0 ? (
                  filteredData.map((data, index) => (
                    <div
                      key={data?.id}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                      onClick={() => handleViewProfile(data)}
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          {data?.profileImageName ? (
                            <img
                              src={data?.profileImageName}
                              alt={data?.fullName}
                              className="w-16 h-16 rounded-full object-cover border-2 border-orange-200 shadow-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(data?.profileImageName, "_blank");
                              }}
                            />
                          ) : (
                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 border-2 border-gray-200">
                              <FaUser className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                          <button
                            className="p-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSelectMember(data?.id);
                            }}
                          >
                            {data?.isSelected ? (
                              <IoMdCheckbox className="w-6 h-6 text-blue-600" />
                            ) : (
                              <MdOutlineCheckBoxOutlineBlank className="w-6 h-6 text-gray-400" />
                            )}
                          </button>
                        </div>
                        <StatusBadge
                          expired={data?.currentMemberShipExpired}
                          className="text-xs"
                        />
                      </div>

                      {/* Member Info */}
                      <div className="space-y-3 mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 capitalize mb-1">
                            {data?.fullName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Member #{page * rowsPerPage + index + 1}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <FaPhone className="w-4 h-4 text-blue-400" />
                            <div>
                              <p className="text-xs text-gray-500">
                                Phone Number
                              </p>
                              <p className="text-sm font-medium text-gray-900">
                                {data?.phone}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <FaMapMarkerAlt className="w-4 h-4 text-red-400 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs text-gray-500">Address</p>
                              <p className="text-sm font-medium text-gray-900 leading-relaxed">
                                {data?.address}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <FaClock className="w-4 h-4 text-purple-400" />
                              <div>
                                <p className="text-xs text-gray-500">Shift</p>
                                <p className="text-sm font-medium text-gray-900">
                                  {data?.shiftType}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <FaCalendarAlt className="w-4 h-4 text-gray-400" />
                              <div>
                                <p className="text-xs text-gray-500">Joined</p>
                                <p className="text-sm font-medium text-gray-900">
                                  {data?.joiningDate}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                            <FaWhatsapp className="w-4 h-4 text-green-500" />
                            <div className="flex-1">
                              <p className="text-xs text-gray-500">
                                WhatsApp Status
                              </p>
                              <WhatsAppBadge
                                saved={data?.isWhatsAppSaved || false}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex justify-end">
                        <button
                          className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium text-sm shadow-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewProfile(data);
                          }}
                        >
                          <FaEye className="w-4 h-4 mr-2" />
                          View Details
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState />
                )}

                {/* Mobile Pagination */}
                {!isSearching &&
                  !isSomeSelected &&
                  filteredData &&
                  filteredData.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                      <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={totalLength ?? 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Per page:"
                        className="text-gray-600"
                      />
                    </div>
                  )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MemberList;
