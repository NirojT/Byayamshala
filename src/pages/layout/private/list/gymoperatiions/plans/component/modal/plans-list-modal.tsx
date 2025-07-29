import { useGlobalStore } from "@/global/store";
import { useListPlansStore } from "../../store";

const PlansModal = ( ) => {
 const { setToasterData } = useGlobalStore();

    const {
      bulkAction,
      bulkTask,
      setBulkTask,
    
  
      filteredData,
      
      setOpenModal
    } = useListPlansStore();
    const selectedCount =
      filteredData?.length > 0 && filteredData?.filter((item) => item?.isSelected)?.length;
   
   

  const handleBulkAction =async () => {
    // Logic to transform visitor to plans
 
    // navigate to add plans
const res=    await bulkAction()
setToasterData({
  message: res?.message,
  severity: res?.severity,
  open: true,
})

if(res?.severity === "success"){

      setOpenModal(false);
    setBulkTask(null);
}
   

  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-xl font-semibold text-white mb-4">
         Perform Bulk Operation on {selectedCount} Planss
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

export default PlansModal;
