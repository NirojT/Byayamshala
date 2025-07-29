import { Box, TablePagination, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { useListTaskStore } from "./store";
import Back from "@/global/components/back/back";
import { ITaskDetails } from "./interface";
import TaskModal from "./component/task-modal";

import { TbFileInfo } from "react-icons/tb";
import { useIsDesktop } from "@/global/desktop-checker";

// Define a color map for task statuses
const statusStyles: Record<string, string> = {
  COMPLETED: "bg-green-100 text-green-800 border-green-300",
  CANCELLED: "bg-red-100 text-red-700 border-red-300",
  IN_PROGRESS: "bg-blue-100 text-blue-800 border-blue-300",
   
  // Add more if you have more statuses
};

const rowStyles: Record<string, string> = {
  COMPLETED: "bg-green-50/90 hover:bg-green-100",
  CANCELLED: "bg-red-50/90 hover:bg-red-100",
  IN_PROGRESS: "bg-blue-50/90 hover:bg-blue-100",
  
};

const statusLabels: Record<string, string> = {
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  IN_PROGRESS: "In Progress",
  
};

const TaskList: React.FC = () => {
  const {
    getTask,
    tasks,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    totalLength,
    setOpenModal,
    setSelectedTask,
    selectedTask,
    openModal,
    setTaskStatus,
  } = useListTaskStore();

  const handleModal = (task: ITaskDetails) => {
    setSelectedTask(task);
    setTaskStatus(task?.taskStatus);
    setOpenModal(!openModal);
  };

  // handlers
  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset to first page

    await getTask();
  };

  const handleChangePage = async (_event: unknown, newPage: number) => {
    setPage(newPage);

    await getTask();
  };
  const isDesktop = useIsDesktop(640); // 640px matches Tailwind 'sm'
  useEffect(() => {
    getTask();
  }, [getTask]);

  return (
    <Box sx={{ padding: 2 }}>
      <Back />

      <Typography variant="h6" className="text-white" gutterBottom>
        Task List
      </Typography>

      {/* Table Wrapper */}
       { isDesktop ? (  <div className="  overflow-hidden border border-gray-200 rounded-lg shadow-sm mt-4 bg-white/90 dark:bg-[#181828]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-slate-200 text-gray-800">
              <tr className="text-gray-600">
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  SN
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  Trainer Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  Member Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  End Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  Added At
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(tasks) && tasks?.length > 0 ? (
                tasks.map((data, index) => (
                  <React.Fragment key={data?.id ?? index}>
                    <tr
                      className={`transition-all duration-150 even:bg-gray-50 border-b dark:border-slate-700 cursor-pointer ${
                        rowStyles[data?.taskStatus as string] || ""
                      }`}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-200">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                        {data?.trainerName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                        {data?.memberName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                        {data?.startDate}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                        {data?.endDate}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                        {data?.createdDate}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                        {data?.sessionDuration}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span
                          className={`inline-block min-w-[95px] text-center px-3 py-1 rounded-full border font-semibold shadow-sm transition ${
                            statusStyles[data?.taskStatus as string] ||
                            "bg-gray-100 text-gray-700 border-gray-300"
                          }`}
                        >
                          {statusLabels[data?.taskStatus as string] ||
                            data?.taskStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-mono shadow-sm bg-gray-200/50 dark:bg-gray-700/70">
                          {data?.notes?.length > 30
                            ? `${data?.notes?.substring(0, 30)}...`
                            : data?.notes}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <TbFileInfo
                          onClick={() => handleModal(data)}
                          title="Task Details"
                          size={19}
                          className="hover:scale-125 transition-transform duration-100 hover:cursor-pointer text-blue-500 hover:text-blue-700"
                        />
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    className="text-[15px] p-3 text-center text-red-400 bg-red-50"
                  >
                    No tasks are added
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center dark:text-gray-200 w-full mt-2 bg-transparent">
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
      </div>) :(<div className="  flex flex-col h-full text-white p-3">
        {Array.isArray(tasks) &&
          tasks.length > 0 &&
          tasks.map((data) => (
            <div
              className={`border-2 w-full flex flex-col items-center justify-center gap-3 mb-4 p-3 rounded-lg shadow-md transition-all duration-100 ${
                rowStyles[data.taskStatus as string] || ""
              } ${
                statusStyles[data.taskStatus as string]
                  ? statusStyles[data.taskStatus as string]
                  : "border-gray-400"
              }`}
              key={data.id}
            >
              <div className="flex flex-wrap justify-between w-full">
                <p className="flex flex-col items-center text-gray-400 gap-2">
                  Trainer:{" "}
                  <span className="text-white">{data.trainerName}</span>
                </p>
                <p className="flex flex-col items-center text-gray-400 gap-2">
                  Member: <span className="text-white">{data.memberName}</span>
                </p>
              </div>
              <div className="flex flex-wrap justify-between w-full">
                <p className="flex flex-col items-center text-gray-400 gap-2">
                  Start: <span className="text-white">{data.startDate}</span>
                </p>
                <p className="flex flex-col items-center text-gray-400 gap-2">
                  End: <span className="text-white">{data.endDate}</span>
                </p>
              </div>
              <div className="flex flex-col items-center text-gray-400 gap-2">
                Duration:{" "}
                <span className="text-white">{data.sessionDuration}</span>
              </div>
              <div className="flex flex-col items-center text-gray-400 gap-2">
                <span
                  className={`inline-block min-w-[95px] text-center px-3 py-1 rounded-full border font-semibold shadow-sm transition ${
                    statusStyles[data.taskStatus as string] ||
                    "bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {statusLabels[data.taskStatus as string] || data.taskStatus}
                </span>
              </div>
              <div className="flex flex-col items-center text-gray-400 gap-2">
                Notes: <span className="text-white">{data.notes}</span>
              </div>
              <div className="flex flex-row items-center gap-4 mt-2">
                <button
                  className="p-2 rounded-full bg-blue-500 hover:bg-blue-700 text-white shadow"
                  title="Task Details"
                  onClick={() => handleModal(data)}
                >
                  <TbFileInfo />
                </button>
              </div>
            </div>
          ))}

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
      </div>)}
    

      {/* for mobile smaller screens */}
      

      {openModal && selectedTask && <TaskModal />}
    </Box>
  );
};

export default TaskList;
