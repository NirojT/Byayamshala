import { TaskStatus } from "@/global/components/enums/enums";
import { IEquipmentDetails } from "../interface";
import { useGlobalStore } from "@/global/store";
import { useEquipmentStore } from "../store";
import { useState, useRef, useEffect } from "react";
import { X, CalendarDays, FileText, Flag } from "lucide-react";

const statusOptions: TaskStatus[] = [
  TaskStatus.PENDING,
  TaskStatus.IN_PROGRESS,
  TaskStatus.COMPLETED,
];

export default function CreateTaskModal({
  equipment,
  onClose,
  onCreated,
}: {
  equipment: IEquipmentDetails;
  onClose: () => void;
  onCreated: () => void;
}) {
  const { setToasterData } = useGlobalStore();
  const { data, setData, clearData, createTask } = useEquipmentStore();
  const [error, setError] = useState<string>();
  const descRef = useRef<HTMLInputElement>(null);

  // Autofill equipmentId when modal is opened
  useEffect(() => {
    setData({ ...data, equipmentId: equipment.id });
    setTimeout(() => descRef.current?.focus(), 120);
    // eslint-disable-next-line
  }, [equipment.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.taskDate) {
      setError("Please select date and time.");
      return;
    }
    if (!data.description?.trim()) {
      setError("Description is required.");
      descRef.current?.focus();
      return;
    }
    const res = await createTask({
      ...data,
      equipmentId: equipment.id,
      status: data.status ?? TaskStatus.PENDING,
    });
    setToasterData({ message: res?.message, severity: res?.severity, open: true });
    if (res?.severity === "success") {
      setError(undefined);
      clearData();
      onCreated();
    } else {
      setError(res?.message || "Failed to create task");
    }
  };

  if (!equipment) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white p-7 rounded-2xl shadow-2xl w-[420px] max-w-[96vw] animate-fadein relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors"
          onClick={() => { onClose(); clearData(); }}
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        {/* Title */}
        <h3 className="font-semibold text-xl mb-4 text-blue-900 flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-blue-500" />
          Create Maintenance Task
        </h3>
        <div className="mb-1 text-sm text-gray-700">
          For: <span className="font-bold text-blue-700">{equipment.name}</span>
        </div>
        <form onSubmit={handleSubmit} className="mt-2">
          <label className="block mb-2">
            <span className="text-xs text-gray-600 font-medium">Date &amp; Time</span>
            <input
              type="datetime-local"
              className="border-2 w-full mt-1 mb-3 p-2 rounded-lg focus:outline-none focus:border-blue-400 transition-all"
              value={data.taskDate}
              onChange={e => setData({ ...data, taskDate: e.target.value })}
              required
            />
          </label>
          <label className="block mb-2">
            <span className="text-xs text-gray-600 font-medium flex items-center gap-1">
              <FileText className="h-4 w-4 mr-1" /> Description
            </span>
            <input
              ref={descRef}
              className={`border-2 w-full mt-1 mb-3 p-2 rounded-lg focus:outline-none focus:border-blue-400 transition-all ${
                error ? "border-red-400" : "border-gray-200"
              }`}
              placeholder="Brief description of the task"
              value={data.description}
              onChange={e => {
                setData({ ...data, description: e.target.value });
                setError(undefined);
              }}
              maxLength={128}
              required
            />
          </label>
          <label className="block mb-2">
            <span className="text-xs text-gray-600 font-medium flex items-center gap-1">
              <Flag className="h-4 w-4 mr-1" /> Status
            </span>
            <select
              className="border-2 w-full mt-1 mb-3 p-2 rounded-lg focus:outline-none focus:border-blue-400 transition-all"
              value={data.status ?? TaskStatus.PENDING}
              onChange={e => setData({ ...data, status: e.target.value as TaskStatus })}
            >
              {statusOptions.map(st => (
                <option key={st} value={st}>{st.replace("_", " ")}</option>
              ))}
            </select>
          </label>
          {error && <div className="text-red-500 mb-2 text-sm px-1">{error}</div>}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium"
              onClick={() => { onClose(); clearData(); }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-1.5 rounded-lg bg-[#E26300] text-white font-semibold hover:bg-orange-500 transition-colors shadow-sm"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
      <style>{`
        .animate-fadein {
          animation: fadeInUp .21s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px);}
          to   { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}