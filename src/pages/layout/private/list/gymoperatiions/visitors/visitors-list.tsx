import { Box, TablePagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

 
import VisitorsFilters from "./component/visitors-filters";
import VistorModal from "./component/vistor-modal";
import { IVisitorDetails } from "./interface";
import { useVisitorsListStore } from "./store";
import Back from "@/global/components/back/back";
import {  RotateCw } from "lucide-react";
import { MdDelete } from "react-icons/md";
import VisitorDeleteModal from "./component/visitor-delete-modal";
import { useIsDesktop } from "@/global/desktop-checker";

const VisitorsList: React.FC = () => {
  const [selectedVisitor, setSelectedVisitor] =
    useState<IVisitorDetails | null>(null);

  const {
    searchQuery,
    filterData,
    visitors,
    isModelOpen,
    setIsModelOpen,
    // Add these pagination states to your store if they don't exist
    rowsPerPage = 10,
    setRowsPerPage = () => {},
    page = 0,
    setPage = () => {},
    totalLength = visitors?.length || 0,
    openDelete,
    setOpenDelete,
    setVisitorId
  } = useVisitorsListStore();

  // handlers
  const handleChangePage = async (_event: unknown, newPage: number) => {
    setPage(newPage);
    await searchQuery();
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset to first page
    await searchQuery();
  };

  const handleOpenModal = (visitor: IVisitorDetails) => {
    setSelectedVisitor(visitor);
    setIsModelOpen(true);
  };
  const handleDelete = (visitor: IVisitorDetails) => {
    setVisitorId(visitor?.id);
    setOpenDelete(true);
  };
  const isDesktop = useIsDesktop(640); // 640px matches Tailwind 'sm'
  useEffect(() => {
    searchQuery();
  }, [filterData?.reportPeriod, filterData?.startDate, filterData?.endDate]);

  useEffect(() => {
    searchQuery();
  }, []);

  return (
    <div className="min-h-screen font-poppins">
      <Box sx={{ padding: 2, position: "relative" }}>
        <div className="absolute top-0 left-0 mb-10 w-full">
          <Typography
            variant="h6"
            className="text-white capitalize relative"
            gutterBottom
          >
            Visitors List
          </Typography>
        </div>
        <Back />

        {/* Filters */}
        <div className="mt-24">
          <VisitorsFilters />
        </div>

        {/* Table Wrapper */}
        {isDesktop ? (
          <div className="  overflow-hidden border border-gray-200 rounded-lg shadow-sm mt-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-slate-200 text-gray-800">
                  <tr className="text-gray-600">
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      SN
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Visit Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Notes
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {Array.isArray(visitors) && visitors.length > 0 ? (
                    visitors.map((data, index) => (
                      <React.Fragment key={data?.id ?? index}>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                            {index + 1}
                          </td>
                          <td
                            className={`px-4 py-3 whitespace-nowrap text-sm ${
                              data?.isTransformed
                                ? "text-green-600"
                                : "text-red-600"
                            } font-medium`}
                          >
                            {data?.fullName} (
                            {data?.isTransformed ? "Member" : "Visitor"})
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                            {data?.phone}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                            {data?.email || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono shadow-sm">
                              {data?.address}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                            {data?.createdNepDate}_{data?.localTimeZone}
                          </td>
                          <td className="px-5 py-3 whitespace-nowrap text-gray-600 max-w-[150px] overflow-hidden text-ellipsis">
                            <span
                              className="cursor-pointer text-blue-500 hover:underline"
                              onClick={(e) => {
                                e.stopPropagation();
                                alert(data?.notes); // Or open a modal
                              }}
                            >
                              {data?.notes?.slice(0, 30)}...
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium flex gap-2">
                            {!data?.isTransformed && (
                              <RotateCw
                                color="green"
                                size={20}
                                onClick={() => handleOpenModal(data)}
                                className="hover:cursor-pointer hover:scale-110 transition-transform duration-200"
                              />
                            )}

                            <MdDelete
                              color="#E26003"
                              size={20}
                              onClick={() => handleDelete(data)}
                              className="hover:cursor-pointer hover:scale-110 transition-transform duration-200"
                              title="Delete visitor"
                            />
                          </td>
                        </tr>
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-[14px] p-3 text-center text-red-400"
                      >
                        No visitors found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {
              <div className="flex justify-center dark:text-gray-200 w-full mt-2">
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={totalLength ?? 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  className="dark:text-gray-200"
                />
              </div>
            }
          </div>
        ) : (
          <div className="  flex flex-col h-full p-3">
            {Array.isArray(visitors) && visitors.length > 0 ? (
              visitors.map((data) => (
                <div
                  className="border border-gray-300 rounded-lg text-sm flex flex-col mb-4 p-4 bg-white shadow-md"
                  key={data?.id}
                >
                  {/* Header with status */}
                  <div className="flex items-center justify-between mb-3 border-b border-gray-300 pb-2">
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-1">
                        Status:
                      </span>
                      {data?.isTransformed ? (
                        <span className="px-2 py-0.5 bg-green-500 rounded-full text-xs text-white">
                          Member
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-red-500 rounded-full text-xs text-white">
                          Visitor
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">
                      {data?.createdNepDate}
                    </span>
                  </div>
                  {/* Main content grid */}
                  <div className="grid grid-cols-2 gap-y-3 text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs">Name:</span>
                      <span
                        className={`font-medium ${
                          data?.isTransformed
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {data?.fullName}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs">Phone:</span>
                      <span className="font-medium">{data?.phone}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs">Address:</span>
                      <span className="font-medium">{data?.address}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs">Email:</span>
                      <span className="font-medium">
                        {data?.email || "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Notes section */}
                  {data?.notes && (
                    <div className="mb-3">
                      <span className="text-gray-400 text-xs block mb-1">
                        Notes:
                      </span>
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded-md">
                        {data?.notes.length > 100
                          ? `${data?.notes?.substring(0, 100)}...`
                          : data?.notes}
                      </p>
                    </div>
                  )}
                  {/* Action buttons */}
                  <div className="flex justify-end mt-1">
                    {!data?.isTransformed && (
                      <RotateCw
                        color="green"
                        size={20}
                        onClick={() => handleOpenModal(data)}
                        className="hover:cursor-pointer hover:scale-110 transition-transform duration-200"
                      />
                    )}
                    <MdDelete
                      color="#E26003"
                      size={20}
                      onClick={() => handleDelete(data)}
                      className="hover:cursor-pointer hover:scale-110 transition-transform duration-200"
                      title="Delete visitor"
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full flex justify-center items-center p-5 border border-gray-300 rounded-lg bg-white shadow-md">
                <div className="text-center text-red-400">
                  <p>No visitors found</p>
                </div>
              </div>
            )}

            {/* Pagination for mobile */}
            {visitors && visitors?.length > 0 && (
              <div className="mt-4">
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={totalLength ?? 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            )}
          </div>
        )}

        {/* for smaller screens - UPDATED MOBILE UI */}
      </Box>
      {openDelete && <VisitorDeleteModal />}
      {isModelOpen && (
        <VistorModal
          selectedVisitor={selectedVisitor}
          setIsModelOpen={setIsModelOpen}
        />
      )}
    </div>
  );
};

export default VisitorsList;
