import { useEffect } from "react";
import { useAddMessageStore } from "../store";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PrivateRoute } from "../../../../../global/config";
import { useGlobalStore } from "../../../../../global/store";
import MessageFilters from "./component/message-filters";
import { useIsDesktop } from "@/global/desktop-checker";

const MessageList = () => {
  const { messages, searchQuery, filterData, cancelMessage } =
    useAddMessageStore();
  const navigate = useNavigate();
  const { setToasterData } = useGlobalStore();

  const handleCancel = async (id: number) => {
    const res = await cancelMessage(id);
    setToasterData({
      message: res?.message,
      severity: res?.severity,
      open: true,
    });
  };
  const isDesktop = useIsDesktop(640); // 640px matches Tailwind 'sm'
  useEffect(() => {
    searchQuery();
  }, [filterData?.reportPeriod, filterData?.startDate, filterData?.endDate]);

  return (
    <Box sx={{ padding: { xs: 1, md: 3 }, margin: 1, fontFamily: "poppins" }}>
      {/* Title */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          color: "#2E2E2E",
          fontWeight: 600,
          textAlign: "center",
          fontSize: { xs: "1.2rem", md: "1.5rem" },
          mb: 2,
        }}
      >
        Message History
      </Typography>

      {/* Filters */}
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: 1,
          mb: 4,
          p: { xs: 2, md: 4 },
        }}
      >
        <MessageFilters />
      </Box>

      {/* Responsive Table Container */}
      {isDesktop ? (
        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
            bgcolor: "white",
            border: "1px solid #eee",
            borderRadius: 3,
            boxShadow: 1,
          }}
        >
          <table className="min-w-full table-auto border-collapse font-poppins">
            <thead>
              <tr className="bg-[#FAFAFA] text-[#2E2E2E] text-left border-b border-gray-200">
                <th className="p-3 text-xs md:text-sm font-semibold">SN</th>
                <th className="p-3 text-xs md:text-sm font-semibold text-center">
                  Content
                </th>
                <th className="p-3 text-xs md:text-sm font-semibold text-center">
                  Reason
                </th>
                <th className="p-3 text-xs md:text-sm font-semibold text-center">
                  Method
                </th>
                <th className="p-3 text-xs md:text-sm font-semibold text-center">
                  Type
                </th>
                <th className="p-3 text-xs md:text-sm font-semibold text-center">
                  Time
                </th>
                <th className="p-3 text-xs md:text-sm font-semibold text-center">
                  Status
                </th>
                <th className="p-3 text-xs md:text-sm font-semibold text-center">
                  To
                </th>
                <th className="p-3 text-xs md:text-sm font-semibold text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(messages) && messages?.length > 0 ? (
                messages.map((data, index: number) => (
                  <tr
                    key={data?.id ?? index}
                    className="hover:bg-[#f5f5f5] border-t border-gray-100 transition-colors duration-200"
                  >
                    <td className="p-3 text-center text-xs md:text-sm">
                      {index + 1}
                    </td>
                    <td className="p-3 max-w-[220px] md:max-w-[360px] truncate text-left text-xs md:text-sm">
                      {data?.content}
                    </td>
                    <td className="p-3 text-xs md:text-sm text-center">
                      {data?.messageType}
                    </td>
                    <td className="p-3 text-xs md:text-sm text-center">
                      {data?.deliveryMethod}
                    </td>
                    <td className="p-3 text-xs md:text-sm text-center">
                      <span
                        className={
                          data?.schedule
                            ? "inline-block bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs"
                            : "inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs"
                        }
                      >
                        {data?.schedule ? "Schedule" : "Direct"}
                      </span>
                    </td>
                    <td className="p-3 text-xs md:text-sm text-center">
                      <span className="whitespace-nowrap">
                        {data?.createdNepDate}-{data?.localTimeZone}
                      </span>
                    </td>
                    <td className="p-3 text-xs md:text-sm text-center">
                      <span
                        className={
                          data?.status === "DELIVERED"
                            ? "inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold text-xs"
                            : data?.status === "PENDING"
                            ? "inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold text-xs"
                            : "inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-semibold text-xs"
                        }
                      >
                        {data?.status}
                      </span>
                    </td>
                    <td className="p-3 text-xs md:text-sm text-center">
                      {data?.sendWhom}
                    </td>
                    <td className="p-3 text-xs md:text-sm text-center">
                      {data?.status === "PENDING" && (
                        <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
                          <button
                            className="px-4 py-1.5 rounded-md bg-[#E26300] text-white hover:bg-[#D25200] transition-colors text-xs md:text-sm"
                            onClick={() =>
                              navigate(`/${PrivateRoute}/message/edit`, {
                                state: { data: data },
                              })
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="px-4 py-1.5 rounded-md bg-[#1A1A1A] text-white hover:bg-black transition-colors text-xs md:text-sm"
                            onClick={() => handleCancel(data?.id)}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="p-8 text-center text-gray-400 text-sm"
                  >
                    No messages have been added
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Pagination can be added here */}
        </Box>
      ) : (
        // ---- MOBILE BEAUTIFUL CARD VIEW ----
        <div className="flex flex-col gap-4">
          {Array.isArray(messages) && messages.length > 0 ? (
            messages.map((data, idx) => (
              <div
                key={data?.id ?? idx}
                className="rounded-xl shadow-md border border-orange-50 bg-white p-4 flex flex-col"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#E26300] font-semibold">#{idx + 1}</span>
                  <span
                    className={
                      data?.status === "DELIVERED"
                        ? "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold"
                        : data?.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold"
                        : "bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-bold"
                    }
                  >
                    {data?.status}
                  </span>
                </div>
                <div className="mb-1">
                  <span className="block text-xs text-gray-400">Message</span>
                  <span className="block font-medium break-words">{data?.content}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                  <div>
                    <div className="text-gray-400">Type</div>
                    <div className="font-semibold">{data?.messageType}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Method</div>
                    <div className="font-semibold">{data?.deliveryMethod}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Send To</div>
                    <div className="font-semibold">{data?.sendWhom}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Scheduled?</div>
                    <div className={`font-semibold ${data?.schedule ? "text-green-700" : "text-blue-700"}`}>
                      {data?.schedule ? "Yes" : "No"}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Time</div>
                    <div className="font-semibold">{data?.createdNepDate}-{data?.localTimeZone}</div>
                  </div>
                </div>
                {/* Action buttons */}
                {data?.status === "PENDING" && (
                  <div className="flex gap-2 mt-2">
                    <button
                      className="flex-1 px-3 py-1 rounded-md bg-[#E26300] text-white text-xs font-semibold shadow hover:bg-[#D25200] transition"
                      onClick={() =>
                        navigate(`/${PrivateRoute}/message/edit`, {
                          state: { data: data },
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="flex-1 px-3 py-1 rounded-md bg-gray-800 text-white text-xs font-semibold shadow hover:bg-gray-900 transition"
                      onClick={() => handleCancel(data?.id)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center p-6 text-gray-400 bg-white rounded-lg shadow">
              No messages have been added
            </div>
          )}
        </div>
      )}
    </Box>
  );
};

export default MessageList;