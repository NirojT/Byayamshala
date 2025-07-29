import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useGlobalStore } from "@/global/store";
import { useListTaskStore } from "../store";
import { TaskStatus } from "@/global/components/enums/enums";
import { FiTrash2 } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import clsx from "clsx";
import React from "react";

// Optionally, make status labels more user-friendly
const statusLabel: Record<TaskStatus, string> = {
  [TaskStatus.IN_PROGRESS]: "In Progress",
  [TaskStatus.COMPLETED]: "Completed",
  [TaskStatus.CANCELLED]: "Cancelled",
  [TaskStatus.PENDING]: "Pending", // Add this if TaskStatus.PENDING exists
};

const TaskModal = () => {
  const {
    openModal,
    setOpenModal,
    setSelectedTask,
    selectedTask,
    delete: deleteItem,
    changeStatus,
    taskStatus,
    setTaskStatus,
  } = useListTaskStore();
  const { setToasterData } = useGlobalStore();

  // For local loading state of update
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    if (!selectedTask?.id) return;
    setLoading(true);
    const res = await deleteItem(selectedTask.id);
    setToasterData({
      open: true,
      message: res.message,
      severity: res.severity,
    });
    setLoading(false);
    if (res.severity === "success") {
      setSelectedTask(null);
      setOpenModal(false);
    }
  };

  const updateStatus = async () => {
    if (!selectedTask?.id) return;
    setLoading(true);
    const res = await changeStatus(selectedTask.id);
    setToasterData({
      open: true,
      message: res.message,
      severity: res.severity,
    });
    setLoading(false);
    if (res.severity === "success") {
      setSelectedTask(null);
      setOpenModal(false);
    }
  };

  // For graceful modal close
  const handleCancel = () => {
    setSelectedTask(null);
    setOpenModal(false);
  };

  if (!selectedTask) return null;

  return (
    <AlertDialog open={openModal} onOpenChange={setOpenModal}>
      <AlertDialogContent className="sm:max-w-[420px] rounded-xl shadow-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-8 py-7">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-4">
            <MdOutlineEdit className="text-2xl text-blue-500" />
            <AlertDialogTitle className="text-lg font-bold tracking-tight">
              Edit or Delete Task
            </AlertDialogTitle>
          </div>
        </AlertDialogHeader>
        <AlertDialogDescription className="mb-5 text-neutral-600 dark:text-neutral-300 text-[15px]">
          Change the status or delete this task. Click <b>Update</b> to save
          changes.
        </AlertDialogDescription>

        <div className="mb-3">
          {/* Task status */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm mb-1 text-neutral-700 dark:text-neutral-200">
              Status
            </label>
            <select
              className={clsx(
                "w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 transition",
                "border-neutral-300 dark:border-neutral-700",
                "bg-neutral-50 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100",
                "hover:border-blue-400 focus:ring-blue-400"
              )}
              value={taskStatus as TaskStatus}
              onChange={(e) => setTaskStatus(e.target.value as TaskStatus)}
              disabled={loading}
            >
              {Object.values(TaskStatus).map((statusValue) => (
                <option
                  key={statusValue}
                  value={statusValue}
                  className="text-neutral-800 dark:text-neutral-100"
                >
                  {statusLabel[statusValue] || statusValue}
                </option>
              ))}
            </select>
          </div>
          <button
            className={clsx(
              "mt-4 flex items-center justify-center gap-2 px-4 py-2 w-full rounded-lg font-semibold shadow",
              "bg-blue-500 hover:bg-blue-600 text-white transition-colors",
              loading && "opacity-60 cursor-not-allowed"
            )}
            onClick={updateStatus}
            disabled={
              loading || !taskStatus || taskStatus === selectedTask.taskStatus
            }
          >
            <FaCheckCircle className="text-lg" />
            {loading ? "Updating..." : "Update"}
          </button>
        </div>

        {/* Details */}
        <div className="mb-6 rounded-xl bg-neutral-100 dark:bg-neutral-800 p-3 shadow-sm">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <div>
              <div className="text-xs text-neutral-500">Trainer</div>
              <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                {selectedTask.trainerName}
              </div>
            </div>
            <div>
              <div className="text-xs text-neutral-500">Member</div>
              <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                {selectedTask.memberName}
              </div>
            </div>
            <div>
              <div className="text-xs text-neutral-500">Start</div>
              <div className="text-neutral-800 dark:text-neutral-200">
                {selectedTask.startDate}
              </div>
            </div>
            <div>
              <div className="text-xs text-neutral-500">End</div>
              <div className="text-neutral-800 dark:text-neutral-200">
                {selectedTask.endDate}
              </div>
            </div>
          </div>
        </div>

        <AlertDialogFooter className="flex justify-between items-center">
          {/* Delete Button */}
          <button
            className={clsx(
              "inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors shadow focus:outline-none",
              loading && "opacity-60 cursor-not-allowed"
            )}
            onClick={handleDelete}
            disabled={loading}
          >
            <FiTrash2 className="text-lg" />
            Delete
          </button>

          {/* Cancel Button */}
          <AlertDialogCancel
            className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-100 rounded hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors ml-2"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TaskModal;
