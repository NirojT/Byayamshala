import { useGlobalStore } from "@/global/store";
import { useListMemberStore } from "../../store";
import { FaUsersCog } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const MemberModal = () => {
  const { setToasterData } = useGlobalStore();

  const { bulkAction, bulkTask, setBulkTask, filteredData, setOpenModal } =
    useListMemberStore();

  const selectedCount =
    filteredData?.filter((item) => item?.isSelected)?.length || 0;

  const handleBulkAction = async () => {
    const res = await bulkAction();
    setToasterData({
      message: res?.message,
      severity: res?.severity,
      open: true,
    });

    if (res?.severity === "success") {
      setOpenModal(false);
      setBulkTask(null);
      filteredData?.map(mem=>mem.isSelected = false); // Reset selection after action
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl max-w-md w-full px-8 py-7">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
          onClick={() => setOpenModal(false)}
          aria-label="Close"
        >
          <IoClose className="text-xl text-neutral-500" />
        </button>
        {/* Icon */}
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900 mx-auto mb-4">
          <FaUsersCog className="text-3xl text-[#E26003]" />
        </div>
        {/* Title */}
        <h3 className="text-2xl font-bold text-center text-neutral-900 dark:text-white mb-2">
          Bulk {bulkTask} Operation
        </h3>
        {/* Subtitle */}
        <div className="text-center text-sm text-neutral-600 dark:text-neutral-300 mb-6">
          You are about to perform{" "}
          <span className="font-semibold text-[#E26003]">{bulkTask}</span> on{" "}
          <span className="font-semibold">{selectedCount}</span> member
          {selectedCount === 1 ? "" : "s"}.
        </div>
        {/* Call to action */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={() => setOpenModal(false)}
            className="w-full sm:w-auto px-5 py-2 rounded-lg text-neutral-700 dark:text-neutral-200 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleBulkAction}
            className="w-full sm:w-auto px-5 py-2 rounded-lg text-white font-semibold bg-[#E26003] hover:bg-[#c05403] transition shadow"
          >
            Confirm {bulkTask}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberModal;
