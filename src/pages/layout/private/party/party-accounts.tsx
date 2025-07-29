import { PrivateRoute } from "@/global/config";
import { useIsDesktop } from "@/global/desktop-checker";
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { HiUserGroup } from "react-icons/hi";
import { TbFileInfo } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { IPartyAccDetials } from "./interface";
import PartyFilters from "./party-filters";
import { usePartyStore } from "./store";
import { useGlobalStore } from "@/global/store";

const getPartyTypeBadge = (type: string) => {
  if (type === "MEMBER")
    return "bg-blue-100 text-blue-700 border border-blue-200";
  if (type === "SUPPLIER")
    return "bg-purple-100 text-purple-700 border border-purple-200";
  return "bg-gray-100 text-gray-700 border border-gray-200";
};

const PartyAccounts: React.FC = () => {
  const { filteredData, getPartyAccounts } = usePartyStore();
  const navigate = useNavigate();
  const { scrollPosition } = useGlobalStore();

  const handleNavigate = (data: IPartyAccDetials) => {
    navigate(`/${PrivateRoute}/party-accounts-transaction`, {
      state: { partyName: data?.partyName, partyType: data?.partyType },
    });
  };

  const isDesktop = useIsDesktop(640);

  useEffect(() => {
    getPartyAccounts();
  }, [getPartyAccounts]);

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-pink-50">
      <Box
        sx={{
          px: { xs: 1, sm: 3 },
          pt: { xs: 2, sm: 5 },
          pb: 2,
          position: "relative",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* Title */}
        <Typography
          variant="h4"
          className="capitalize text-center mb-8 text-gray-900 tracking-wide font-semibold"
          sx={{ mb: { xs: 3, sm: 6 } }}
        >
          Party Accounts
        </Typography>

        {/* Filters */}
        <div className="mb-8">
          <PartyFilters />
        </div>

        {/* Desktop Table */}
        {isDesktop ? (
          <div className="overflow-hidden border border-gray-200 rounded-2xl shadow-xl bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead>
                  <tr className="bg-slate-50 text-gray-700">
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest">
                      SN
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest">
                      Party Name
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest">
                      Type
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest">
                      Status
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest">
                      Balance
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(filteredData) && filteredData.length > 0 ? (
                    filteredData.map((data, index) => (
                      <tr
                        key={data?.id ?? index}
                        className="even:bg-gray-50 hover:bg-indigo-50 transition-colors duration-150 group"
                      >
                        <td className="px-5 py-4 text-gray-600 font-medium">
                          {index + 1}
                        </td>
                        <td className="px-5 py-4 text-gray-900 font-semibold">
                          {data?.partyName}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1 text-xs rounded-full font-semibold shadow-sm border ${getPartyTypeBadge(
                              data?.partyType || ""
                            )}`}
                          >
                            {data?.partyType}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex px-3 py-1 text-xs rounded-full font-semibold shadow-sm ${
                              data?.balance > 0
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : "bg-gray-100 text-gray-500 border border-gray-200"
                            }`}
                          >
                            {data?.partyMoneyType}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-bold">
                          <span
                            className={`flex items-center gap-1 ${
                              data?.balance > 0
                                ? "text-green-600"
                                : "text-gray-500"
                            }`}
                          >
                            <span className="text-base">रु</span>
                            {data?.balance <= 0 ? "0" : data?.balance}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-medium text-gray-600">
                          <button
                            className="cursor-pointer inline-flex items-center gap-1 px-3 py-1 rounded-lg border border-orange-200 bg-white hover:bg-orange-50 hover:text-orange-600 transition font-semibold group-hover:shadow"
                            title="View Details"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNavigate(data);
                            }}
                          >
                            <TbFileInfo size={20} className="text-orange-500" />
                            <span className="hidden md:inline text-[#E26300] font-semibold">
                              View
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-[15px] px-5 py-8 text-center text-red-400 bg-white"
                      >
                        No party accounts found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // Mobile Cards
          <div className="flex flex-col gap-4">
            {Array.isArray(filteredData) && filteredData.length > 0 ? (
              filteredData.map((data) => (
                <div
                  className="border border-gray-200 rounded-2xl bg-white shadow-md p-4 flex flex-col gap-2 hover:shadow-lg transition"
                  key={data.id}
                  onClick={() => handleNavigate(data)}
                >
                  {/* Card header */}
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
                    <span className="font-semibold text-gray-900 text-lg truncate">
                      {data.partyName}
                    </span>
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 text-xs rounded-full font-semibold border ${getPartyTypeBadge(
                        data?.partyType || ""
                      )}`}
                    >
                      {data.partyType}
                    </span>
                  </div>
                  {/* Info grid */}
                  <div className="flex flex-wrap gap-y-2 text-sm">
                    <div className="flex items-center gap-2 w-1/2 min-w-[120px]">
                      <HiUserGroup className="text-blue-500" size={19} />
                      <span className="text-gray-700 font-medium">
                        {data.partyType}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 w-1/2 min-w-[120px]">
                      <span className="text-base">रु</span>
                      <span
                        className={`font-semibold ${
                          data?.balance > 0 ? "text-green-600" : "text-gray-500"
                        }`}
                      >
                        {data?.balance <= 0 ? "0" : data?.balance}
                      </span>
                      <span className="ml-1 text-xs text-gray-500">
                        {data?.partyMoneyType}
                      </span>
                    </div>
                  </div>
                  {/* Action button */}
                  <div className="flex justify-end mt-2">
                    <button
                      className="flex items-center gap-1 text-[#E26300] font-semibold underline hover:text-orange-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate(data);
                      }}
                    >
                      <TbFileInfo size={18} />
                      Transactions
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full flex justify-center items-center p-8 border border-gray-200 rounded-2xl bg-white shadow-md">
                <div className="text-center text-red-400">
                  <p>No party accounts found</p>
                </div>
              </div>
            )}
          </div>
        )}
      </Box>
    </div>
  );
};

export default PartyAccounts;
