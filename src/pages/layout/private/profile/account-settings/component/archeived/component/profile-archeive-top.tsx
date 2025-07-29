import { BulkTask } from "@/global/components/enums/enums";
import { Typography } from "@mui/material";
import { useArcheivedStore } from "../store";
import ProfileArcheiveModal from "./profile-archeive-modal";
import Back from "@/global/components/back/back";

const ProfileArcheiveTop = () => {
  const {
    bulkTask,
    openModal,
    setOpenModal,
    setBulkTask,

    filteredMembers,
    filteredPlans,
    filteredStaffs,
  } = useArcheivedStore();

  const isSomeFilteredMemberselected =
    filteredMembers?.length > 0 &&
    filteredMembers?.some((item) => item?.isSelected);
  const isSomeFilteredTrainerSelected =
    filteredStaffs?.length > 0 &&
    filteredStaffs?.some((item) => item?.isSelected);
  const isSomeFilteredPlansSelected =
    filteredPlans?.length > 0 &&
    filteredPlans?.some((item) => item?.isSelected);

  const handleAction = (bulkTask: BulkTask) => {
    setBulkTask(bulkTask);
    setOpenModal(true);
  };
  console.log(bulkTask);
  return (
    <div>
      <Back />
      <Typography
        variant="h6"
        className="text-white text-center p-4 capitalize relative"
        gutterBottom
      >
        Member List
      </Typography>
      {(isSomeFilteredMemberselected ||
        isSomeFilteredTrainerSelected ||
        isSomeFilteredPlansSelected) && (
        <Typography
          variant="h6"
          className="text-blue-400 bg-zinc-800 px-3 py-2 rounded-md shadow mb-3 font-semibold
            flex justify-between"
          gutterBottom
        >
          <div className=""> Bulk Actions Enabled</div>
          <div className="flex gap-3 hover:cursor-pointer">
            {bulkTask === BulkTask.RESTORE ||
            bulkTask === BulkTask.DELETE_PERMANENTLY ? (
              <div className="flex gap-3">
                <div
                  className="hover:bg-green-500 p-1 rounded-md text-green-700 font-semibold"
                  onClick={() => handleAction(BulkTask.RESTORE)}
                >
                  Restore
                </div>

             
                    <div
                      className="hover:bg-red-500 p-1 rounded-md text-red-700 font-semibold"
                      onClick={() => handleAction(BulkTask.DELETE_PERMANENTLY)}
                    >
                      Delete Permanently
                    </div>
                  
                {/* only for plans  */}
                {/* {!isSomeFilteredMemberselected &&
                  !isSomeFilteredTrainerSelected &&
                  isSomeFilteredPlansSelected  && (
                   <div
                  className="hover:bg-red-500 p-1 rounded-md text-red-700 font-semibold"
                  onClick={() => handleAction(BulkTask.DELETE_PERMANENTLY)}
                >
                  Delete Permanently
                </div> 
                  )} */}
              </div>
            ) : (
              <div
                className="hover:cursor-pointer"
                onClick={() => handleAction(BulkTask.ACTIVATE)}
              >
                Activate
              </div>
            )}
          </div>
        </Typography>
      )}

      {(isSomeFilteredMemberselected ||
        isSomeFilteredTrainerSelected ||
        isSomeFilteredPlansSelected) &&
        openModal && <ProfileArcheiveModal />}
    </div>
  );
};

export default ProfileArcheiveTop;
