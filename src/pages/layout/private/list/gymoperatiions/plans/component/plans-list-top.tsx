import { BulkTask } from "@/global/components/enums/enums";
import { Typography } from "@mui/material";
import { useListPlansStore } from "../store";
import PlansModal from "./modal/plans-list-modal";
import { Power, Trash2 } from "lucide-react";

const PlansListTop = () => {
  const {
    setBulkTask,
    openModal,
    setOpenModal,
    filteredData,
  } = useListPlansStore();

  const isSomeSelected =
    filteredData?.length > 0 && filteredData?.some((item) => item?.isSelected);

  const handleAction = (bulkTask: BulkTask) => {
    setBulkTask(bulkTask);
    setOpenModal(true);
  };

  return (
    <div className="z-50 mt-5 ml-4 mr-4">
      {isSomeSelected && (
        <Typography
          variant="h6"
          className="text-[#1A1A1A] bg-gray-100 px-4 py-3 rounded-md shadow-sm mb-4 
            flex justify-between items-center font-poppins"
          gutterBottom
        >
          <p className="sm:font-extrabold sm:text-lg font-poppins font-bold text-sm text-center">Bulk Actions Enabled</p>

          <div className="flex gap-4 font-poppins">
            <button
              className="sm:text-gray-600 text-sm sm:text-base border-none sm:border sm:border-gray-800
               sm:p-2 rounded-lg hover:text-[#E26300] transition-colors flex items-center justify-center
                gap-2 sm:hover:scale-110 hover:zoom-out-50 underline sm:no-underline text-[#E26300]"
              onClick={() => handleAction(BulkTask.DEACTIVATE)}
            >
              <Power className="w-4" color="orange" />
              Deactivate
            </button>

            <button
              className="sm:text-gray-600 text-sm sm:text-base border-none sm:border sm:border-gray-800
               sm:p-2 rounded-lg hover:text-red-600 transition-colors flex items-center justify-center
                gap-2 sm:hover:scale-110 hover:zoom-out-50 underline sm:no-underline text-red-600"
              onClick={() => handleAction(BulkTask.DELETE)}
            >
              <Trash2 className="w-4" color="red" />
              Delete
            </button>
          </div>
        </Typography>
      )}

      {isSomeSelected && openModal && <PlansModal />}
    </div>
  );
};

export default PlansListTop;