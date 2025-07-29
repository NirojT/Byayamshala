import { IEquipmentDetails } from "../interface";
import { useEquipmentStore } from "../store";
import EquipmentTaskList from "./equipment-task-list";
import { MdEdit } from "react-icons/md";

export default function EquipmentCard({
  equipment,
  onCreateTask,
  setShowAdd,
}: {
  equipment: IEquipmentDetails;
  onCreateTask: (eq: IEquipmentDetails) => void;
  setShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setEquipmentId, setEquipmentData } = useEquipmentStore();

  const handleEdit = () => {
    setEquipmentId(equipment?.id);
    setEquipmentData(equipment); // Prefill the form
    setShowAdd(true);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-5 flex flex-col border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold text-blue-900 tracking-tight">
          {equipment?.name}
        </h2>
        <button
          className="p-1 rounded hover:bg-blue-50 transition-colors"
          onClick={handleEdit}
          title="Edit equipment"
        >
          <MdEdit className="h-5 w-5 text-blue-600" />
        </button>
      </div>

      {/* Equipment Info Section */}
      <div className="text-sm text-gray-700 space-y-1 mb-4">
        <p>
          <span className="font-semibold">Quantity:</span> {equipment?.quantity}
        </p>
        <p>
          <span className="font-semibold">Rate:</span> Rs. {equipment?.rate}
        </p>

        <p>
          <span className="font-semibold">Description:</span>{" "}
          <span className="text-gray-600">
            {equipment?.description || "N/A"}
          </span>
        </p>

        <p>
          <span className="font-semibold">Total:</span> Rs.{" "}
          {equipment?.rate * equipment?.quantity}
        </p>
      </div>

      <button
        className="mt-1 mb-3 bg-green-600 hover:bg-green-700 text-white py-1.5 px-4 rounded transition-all font-medium w-fit self-end"
        onClick={() => onCreateTask(equipment)}
      >
        + Create Task
      </button>

      <div className="max-h-[400px] overflow-y-scroll hide-scrollbar">
        <EquipmentTaskList equipmentName={equipment?.name} />
      </div>
    </div>
  );
}
