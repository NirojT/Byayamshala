import { QueryFrom } from "@/global/components/enums/enums";
import { useClientQueryStore } from "@/global/components/headerfooter/components/message/store";
import { useIsDesktop } from "@/global/desktop-checker";
import { Box, TablePagination, Typography } from "@mui/material";
import React, { useEffect } from "react";

const ClientQueryList: React.FC = () => {
  const {
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    totalLength,
    getClientQuerys,
    clientQuerys,
    filteredData,
    setFilteredData,
    queryFrom,
    setQueryFrom,
  } = useClientQueryStore();

  // handlers
  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset to first page

    await getClientQuerys();
  };

  // handlers
  const handleChangePage = async (_event: unknown, newPage: number) => {
    setPage(newPage);

    await getClientQuerys();
  };
  const isDesktop = useIsDesktop(640); // 640px matches Tailwind 'sm'
  useEffect(() => {
    getClientQuerys();
  }, [getClientQuerys]);

  useEffect(() => {
    if (queryFrom !== QueryFrom.BOTH) {
      const filtered = clientQuerys.filter(
        (item) => item.queryFrom === queryFrom
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(clientQuerys);
    }
  }, [clientQuerys, queryFrom]);

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-2 sm:px-8">
      <Box sx={{ padding: 2 }}>
        <Typography
          variant="h6"
          className="text-black capitalize relative font-bold"
          gutterBottom
        >
          Client Query List
        </Typography>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <label className="font-medium text-gray-700" htmlFor="queryFrom">
            Filter by:
          </label>
          <select
            id="queryFrom"
            value={queryFrom as QueryFrom}
            onChange={(e) => {
              const selectedValue = e.target.value as QueryFrom;
              setQueryFrom(selectedValue);
            }}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
          >
            {Object.values(QueryFrom).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Table for desktop */}

        {isDesktop ? (
          <div className=" border border-gray-200 rounded-lg shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-slate-200 text-gray-800 sticky top-0 z-20">
                  <tr>
                    <th className="p-3 text-sm font-semibold">SN</th>
                    <th className="p-3 text-sm font-semibold">From</th>
                    <th className="p-3 text-sm font-semibold">Email</th>
                    <th className="p-3 text-sm font-semibold">Phone</th>
                    <th className="p-3 text-sm font-semibold">Message</th>
                    <th className="p-3 text-sm font-semibold">Messaged At</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(filteredData) && filteredData?.length > 0 ? (
                    filteredData.map((data, index: number) => (
                      <tr
                        key={data?.id ?? index}
                        className="hover:bg-orange-50 hover:text-black border-t transition-colors duration-200"
                      >
                        <td className="p-3 text-center text-sm">{index + 1}</td>
                        <td
                          className={`p-3 text-center text-sm
                          ${
                            data?.queryFrom === QueryFrom.INSIDER
                              ? "bg-green-100 text-green-600 font-semibold rounded"
                              : "bg-orange-100 text-orange-600 font-semibold rounded"
                          }
                        `}
                        >
                          {data?.queryFrom}
                        </td>
                        <td className="p-3 text-sm">{data?.email}</td>
                        <td className="p-3 text-sm">{data?.whatsapp}</td>
                        <td className="p-3 text-sm">{data?.message}</td>
                        <td className="p-3 text-sm">{data?.createdDate}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="p-6 text-center text-red-500 font-semibold"
                      >
                        No Client Queries are added
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="flex justify-center mt-2 bg-white">
                {/* pagination section starts here */}
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
            </div>
          </div>
        ) : (
          <div className="  flex flex-col gap-4 mt-4">
               {/* Mobile card view */}
            {Array.isArray(filteredData) && filteredData?.length > 0 ? (
              filteredData.map((data, idx) => (
                <div
                  key={data?.id ?? idx}
                  className="bg-white rounded-xl shadow-md p-4 flex flex-col border border-orange-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs px-2 py-1 rounded font-bold ${
                        data?.queryFrom === QueryFrom.INSIDER
                          ? "bg-green-100 text-green-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {data?.queryFrom}
                    </span>
                    <span className="text-xs text-gray-400">#{idx + 1}</span>
                  </div>
                  <div className="mb-1">
                    <span className="block text-xs text-gray-400">Email</span>
                    <span className="block font-medium break-all">
                      {data?.email}
                    </span>
                  </div>
                  <div className="mb-1">
                    <span className="block text-xs text-gray-400">Phone</span>
                    <span className="block font-medium">{data?.whatsapp}</span>
                  </div>
                  <div className="mb-1">
                    <span className="block text-xs text-gray-400">Message</span>
                    <span className="block font-medium">{data?.message}</span>
                  </div>
                  <div className="mt-1">
                    <span className="block text-xs text-gray-400">
                      Messaged At
                    </span>
                    <span className="block font-medium">
                      {data?.createdDate}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-6 text-red-500 bg-white rounded-lg shadow">
                No Client Queries are added
              </div>
            )}
          </div>
        )}
      </Box>
    </div>
  );
};

export default ClientQueryList;
