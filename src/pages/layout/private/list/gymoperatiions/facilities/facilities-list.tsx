import { Box, TablePagination, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { PrivateRoute } from "../../../../../../global/config";
import { IFacilitiesDetails } from "./interface";
import { useListFacilitiesStore } from "./store";
import FacilitiesFilters from "./component/facilities-filters";
import { TbFileInfo } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Back from "@/global/components/back/back"; 
import { FiRefreshCw } from "react-icons/fi";

const FacilitiyList: React.FC = () => {
  const navigate = useNavigate();
  const {
    getFacilities,
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
  } = useListFacilitiesStore();

  const handleEdit = (facility: IFacilitiesDetails) => {
    navigate(`/${PrivateRoute}/edit/gym/operation/facilities`, {
      state: facility,
    });
  };

  // handlers
  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset to first page

    if (isSearching && currentSearchData) {
      await searchQuery(currentSearchData);
    } else {
      await getFacilities();
    }
  };

  // handlers
  const handleChangePage = async (_event: unknown, newPage: number) => {
    setPage(newPage);

    if (isSearching && currentSearchData) {
      await searchQuery(currentSearchData);
    } else {
      await getFacilities();
    }
  };
  const handleClearSearch = async () => {
    await resetSearch(); // Reset search state
    await getFacilities(); // Load all Facilitiess
  };

  useEffect(() => {
    getFacilities();
  }, [getFacilities]);

  return (
    <Box sx={{ padding: 2, fontFamily: "poppins" }}>
      <Back />
      <Typography variant="h6" className="font-poppins text-xl " gutterBottom>
        Facilities List
      </Typography>

      {/* Filters */}
      {/* <div className="flex items-center justify-center mr-4">
        <FacilitiesFilters />

        <button
          onClick={handleClearSearch}
          className="bg-black border border-zinc-400 px-8 mb-4 py-4 ml-4 text-white rounded-md"
        >
          Clear Search
        </button>
      </div> */}

      <div className="flex flex-col items-center justify-center mb-8">
        <div className="flex items-center justify-center gap-3">
          <FacilitiesFilters />

          {/* clear search */}
          <button
            onClick={handleClearSearch}
            className="bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 text-[#2E2E2E] rounded-md flex items-center gap-2 transition-colors duration-200 h-[56px]"
          >
            <FiRefreshCw className="text-[#1A1A1A] opacity-70" />
          </button>
        </div>
      </div>

      {/* Table Wrapper */}
      <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm mt-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-slate-200 text-gray-800">
              <tr className="text-gray-600">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  SN
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Facility
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Remarks
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(filteredData) && filteredData?.length > 0 ? (
                filteredData.map((data, index) => (
                  <React.Fragment key={data?.id ?? index}>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                        {data?.facilityName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                        {data?.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-mono shadow-sm">
                          {data?.remarks ? data?.remarks : "N/A"}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-200">
                        <div
                          className="cursor-pointer"
                          title="Edit Facility"
                          onClick={() => handleEdit(data)}
                        >
                          <TbFileInfo size={20} color="orange" />
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-[14px] p-3 text-center text-red-400"
                  >
                    No facilities are added
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {
          <div className="flex justify-center dark:text-gray-200 w-full mt-2">
            <TablePagination
              rowsPerPageOptions={[100, 120, 150]}
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

      {/* for smaller screens */}
      {/* <div className="sm:hidden flex flex-col h-full text-white p-3">
        {Array.isArray(filteredData) &&
          filteredData.length > 0 &&
          filteredData.map((data) => (
            <div
              className="border border-gray-400 text-sm flex flex-col items-center justify-center gap-10 mb-4 p-3"
              key={data.id}
            >
              <div className="flex items-center justify-center gap-10">
                <p className="flex flex-col items-center text-gray-500 gap-2">
                  Facility:{" "}
                  <span className="text-white">{data.facilityName}</span>
                </p>
                <p className="flex flex-col items-center text-gray-500 gap-2">
                  Price: <span className="text-white">{data.price}</span>
                </p>
                <button
                  className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-md transition-transform duration-200 transform hover:scale-105"
                  title="Edit Facility"
                  onClick={() => handleEdit(data)}
                >
                  <TbFileInfo size={16} />
                </button>
              </div>
            </div>
          ))}
      </div> */}
    </Box>
  );
};

export default FacilitiyList;
