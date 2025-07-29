import { useGlobalStore } from "@/global/store";
import { useArcheivedStore } from "../store";
import { BulkSelect, BulkTask } from "@/global/components/enums/enums";
  

const ProfileArcheiveModal = () => {
  const { setToasterData } = useGlobalStore();

  const {
    //       bulkAction,
    bulkTask,

    filteredMembers,
    filteredPlans,
    filteredStaffs,

    setOpenModal,
    selected,
    bulkAction,
    setBulkTask,
  } = useArcheivedStore();

 
  const memberCount =
    filteredMembers?.length > 0 &&
    filteredMembers?.filter((item) => item?.isSelected)?.length;
  const plansCount =
    filteredPlans?.length > 0 &&
    filteredPlans?.filter((item) => item?.isSelected)?.length;
  const trainerCount =
    filteredStaffs?.length > 0 &&
    filteredStaffs?.filter((item) => item?.isSelected)?.length;

  const handleBulkAction = async () => {
    let ids: number[] = [];
    switch (selected) {
      case BulkSelect.MEMBER:
        ids = filteredMembers
          ?.filter((item) => item?.isSelected)
          ?.map((item) => item?.id);
        break;
      case BulkSelect.PLAN:
        ids = filteredPlans
          ?.filter((item) => item?.isSelected)
          ?.map((item) => item?.id);
        break;
      case BulkSelect.STAFF:
        ids = filteredStaffs
          ?.filter((item) => item?.isSelected)
          ?.map((item) => item?.id);
        break;
      default:
        ids = [];
        break;
    }

    const res = await bulkAction(ids);
    setToasterData({
      message: res?.message,
      severity: res?.severity,
      open: true,
    });
    if (res?.severity === "success") {
      setOpenModal(false);
      setBulkTask(BulkTask.DELETE);
    }
  };

  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-xl font-semibold text-white mb-4">
          Perform Bulk Operation on
          {selected === BulkSelect.MEMBER && ` ${memberCount} Members`}
          {selected === BulkSelect.PLAN && ` ${plansCount} Plan`}
          {selected === BulkSelect.STAFF && ` ${trainerCount} Trainer`}
        </h3>

        <p className="text-gray-300 mb-6">
          Do you want to perform bulk {bulkTask} Action ?
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => setOpenModal(false)}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleBulkAction}
            className="px-4 py-2 bg-[#E26003] text-white rounded-md hover:bg-[#c05403] transition-colors"
          >
            {bulkTask}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileArcheiveModal;
