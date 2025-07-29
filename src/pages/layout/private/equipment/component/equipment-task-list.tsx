import { useEffect, useState } from "react";
import { useEquipmentStore } from "../store";
import { TaskStatus } from "@/global/components/enums/enums";
import { useGlobalStore } from "@/global/store";
import { CheckCircle, Trash2, ClipboardList } from "lucide-react";
import clsx from "clsx";
import { FaSpinner } from "react-icons/fa";

const statusColors: Record<TaskStatus, string> = {
  PENDING: "bg-yellow-50 text-yellow-800 border-yellow-200",
  COMPLETED: "bg-green-50 text-green-800 border-green-200",
  IN_PROGRESS: "bg-blue-50 text-blue-800 border-blue-200",
  CANCELLED: "bg-blue-50 text-blue-800 border-blue-200",
};

const MAX_DESCRIPTION_LENGTH = 65;

function TruncatedDescription({ text }: { text?: string }) {
  const [expanded, setExpanded] = useState(false);
  if (!text) return null;
  if (text.length <= MAX_DESCRIPTION_LENGTH) return <span>{text}</span>;
  return (
    <span>
      {expanded ? text : text.slice(0, MAX_DESCRIPTION_LENGTH) + "..."}
      <button
        className="ml-1 text-blue-500 hover:underline text-xs"
        onClick={() => setExpanded((v) => !v)}
        tabIndex={0}
        type="button"
      >
        {expanded ? "Show less" : "Show more"}
      </button>
    </span>
  );
}

export default function EquipmentTaskList({
  equipmentName,
}: {
  equipmentName: string;
}) {
  const { tasks, getTasks, changeTaskStatus, deleteTask } = useEquipmentStore();
  const { setToasterData } = useGlobalStore();

  const handleToggle = async (t: { id: number; status: TaskStatus }) => {
    const newStatus =
      t?.status === TaskStatus.COMPLETED
        ? TaskStatus.PENDING
        : TaskStatus.COMPLETED;
    const res = await changeTaskStatus(t?.id, newStatus);
    setToasterData({ message: res?.message, severity: "success", open: true });
  };

  const handleDelete = async (taskId: number) => {
    const res = await deleteTask(taskId);
    setToasterData({ message: res?.message, severity: "success", open: true });
  };

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const filtered = tasks.filter((t) => t?.equipmentName === equipmentName);

  return (
    <div className="mt-2">
      <h4 className="text-base sm:text-lg font-semibold mb-3 font-poppins text-gray-800">
        Scheduled Tasks
      </h4>
      <ul className="space-y-2">
        {filtered.length > 0 ? (
          filtered.map((t) => (
            <li
              key={t?.id}
              className={clsx(
                "flex items-center justify-between bg-white border rounded-xl px-3 sm:px-4 py-3 shadow-sm transition-all",
                t?.status === TaskStatus.COMPLETED
                  ? "opacity-60 line-through"
                  : "hover:shadow-md"
              )}
            >
              <div className="flex items-center gap-3 w-full">
                <button
                  aria-label={
                    t?.status === TaskStatus.COMPLETED
                      ? "Mark as Pending"
                      : "Mark as Completed"
                  }
                  className={clsx(
                    "transition-colors rounded-full p-1 flex items-center justify-center border focus:outline-none focus:ring-2 focus:ring-blue-300",
                    t?.status === TaskStatus.COMPLETED
                      ? "border-green-400 bg-green-100 hover:bg-green-200"
                      : "border-gray-300 bg-white hover:bg-yellow-50"
                  )}
                  onClick={() => handleToggle(t)}
                >
                  <span className="sr-only">
                    {t?.status === TaskStatus.COMPLETED
                      ? "Completed"
                      : "Mark as Completed"}
                  </span>
                  <span className="relative flex items-center justify-center">
                    {t?.status === TaskStatus.COMPLETED ? (
                      <CheckCircle className="text-green-500 h-6 w-6 scale-110" />
                    ) : (
                      <span className="relative h-6 w-6 flex items-center justify-center">
                        {/* Animated spinner for pending */}
                        <FaSpinner
                          size={15}
                          className="absolute text-yellow-400 animate-spin"
                        />
                        <span className="absolute h-8 w-8 rounded-full border-2 border-yellow-400 opacity-50 animate-pulse -z-10" />
                      </span>
                    )}
                  </span>
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-medium truncate text-gray-900">
                      {new Date(t?.taskDate)?.toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                    <span
                      className={clsx(
                        "px-2 py-0.5 rounded text-xs border capitalize mt-0.5 sm:mt-0 w-fit",
                        statusColors[t?.status] || "bg-gray-50 border-gray-200"
                      )}
                    >
                      {t?.status.replace("_", " ")}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5 break-words max-w-[260px] sm:max-w-[300px]">
                    <TruncatedDescription text={t?.description} />
                  </div>
                </div>
              </div>
              <button
                className="ml-1 text-red-500 hover:text-red-700 transition-colors"
                onClick={() => handleDelete(t?.id)}
                title="Delete Task"
                aria-label="Delete Task"
              >
                <Trash2 className="h-5 w-5 " />
              </button>
            </li>
          ))
        ) : (
          <li className="flex flex-col items-center justify-center py-8 text-gray-400">
            <ClipboardList className="h-8 w-8 mb-2" />
            <span className="text-sm text-center max-w-[18rem]">
              No scheduled tasks for this equipment yet.
              <br />
              Click{" "}
              <span className="font-semibold text-green-600">
                "Create Task"
              </span>{" "}
              to add your first one!
            </span>
          </li>
        )}
      </ul>
      <style>{`
        @media (max-width: 640px) {
          .font-poppins { font-size: 1rem; }
        }
        /* Pulsating circle animation for pending tasks */
        .animate-pulse {
          animation: pulse 1.5s cubic-bezier(0.4,0,0.6,1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1);}
          50% { opacity: 0.2; transform: scale(1.25);}
        }
      `}</style>
    </div>
  );
}
