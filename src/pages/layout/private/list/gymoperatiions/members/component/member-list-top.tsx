import { BulkTask } from "@/global/components/enums/enums";
import { useListMemberStore } from "../store";
import MemberModal from "./modal/member-list-modal";
import { Power, Trash2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const actions = [
  {
    key: BulkTask.DEACTIVATE,
    label: "Deactivate",
    icon: <Power className="w-5 h-5" color="orange" />,
    color: "hover:text-orange-500",
    bg: "hover:bg-orange-50",
    tooltip: "Deactivate members",
  },
  {
    key: BulkTask.DELETE,
    label: "Delete",
    icon: <Trash2 className="w-5 h-5" color="red" />,
    color: "hover:text-red-600",
    bg: "hover:bg-red-50",
    tooltip: "Delete members",
  },
  {
    key: BulkTask.WHATSAPP_SAVED,
    label: "WhatsApp Saved",
    icon: <FaWhatsapp className="w-5 h-5" color="green" />,
    color: "hover:text-green-500",
    bg: "hover:bg-green-50",
    tooltip: "Mark WhatsApp Saved",
  },
];

const MemberListTop = () => {
  const { setBulkTask, openModal, setOpenModal } = useListMemberStore();

  const handleAction = (bulkTask: BulkTask) => {
    setBulkTask(bulkTask);
    setOpenModal(true);
    
  };

  return (
    <div className="z-50 w-full px-2 sm:px-6 pt-4">
      <div
        className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl py-2 px-4 sm:py-4 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4
        relative ring-1 ring-orange-100"
      >
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-orange-500 font-bold uppercase tracking-wide text-xs sm:text-sm">
            <span className="hidden sm:inline">Bulk Actions Enabled</span>
            <span className="inline sm:hidden">Actions</span>
          </span>
        </div>

        <div className="flex gap-2 sm:gap-4">
          {actions.map((action) => (
            <button
              key={action.key}
              className={`
                group flex flex-col sm:flex-row items-center justify-center px-2 sm:px-4 py-2 rounded-xl
                bg-gradient-to-br from-white/80 to-orange-50/60
                ${action.bg} ${action.color}
                shadow-sm transition-all duration-200
                outline-none focus:ring-2 focus:ring-orange-300
                relative
              `}
              onClick={() => handleAction(action.key)}
              aria-label={action.label}
              tabIndex={0}
            >
              {/* Icon only on mobile, icon+text on desktop */}
              <span className="block">{action.icon}</span>
              <span className="hidden sm:inline ml-2 font-semibold">{action.label}</span>
              {/* Tooltip for mobile (shows on long press/hover) */}
              <span className="sm:hidden absolute -bottom-7 left-1/2 -translate-x-1/2 text-[11px] bg-black/70 text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition">
                {action.tooltip}
              </span>
            </button>
          ))}
        </div>
      </div>
      {openModal && <MemberModal />}
    </div>
  );
};

export default MemberListTop;