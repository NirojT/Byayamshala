import { useState } from "react";
import EquipmentCardList from "./component/equipment-card-list";
import AddEquipmentModal from "./component/equipment-form";
import CreateTaskModal from "./component/equipment-task-modal";
import { IEquipmentDetails } from "./interface";
import { useEquipmentStore } from "./store";

export default function EquipmentDashboard() {
  const { setEquipmentId, clearEquipmentData, equipments } =
    useEquipmentStore();

  const [showAdd, setShowAdd] = useState(false);
  const [showTask, setShowTask] = useState<null | IEquipmentDetails>(null);

  const handleAddEquipment = () => {
    setEquipmentId(0);
    clearEquipmentData();
    setShowAdd(true);
  };

  const totalItems = equipments?.length || 0;
  const totalValue = equipments?.reduce(
    (sum, item) => sum + item?.quantity * item?.rate,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Equipment</h1>
        <button
          onClick={handleAddEquipment}
          className="bg-[#E26300] text-white px-4 py-2 rounded hover:bg-orange-400 transition-colors font-medium flex items-center gap-2"
        >
          + Add Equipment
        </button>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 shadow-md rounded-md border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-500">
            Total Equipment Types
          </h2>
          <p className="text-2xl font-bold text-blue-800">{totalItems}</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-md border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-500">
            Total Equipment Value
          </h2>
          <p className="text-2xl font-bold text-green-700">
            Rs. {totalValue?.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Equipment Cards */}
      <EquipmentCardList onCreateTask={setShowTask} setShowAdd={setShowAdd} />

      <AddEquipmentModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onAdded={() => setShowAdd(false)}
      />

      {showTask && (
        <CreateTaskModal
          equipment={showTask}
          onClose={() => setShowTask(null)}
          onCreated={() => setShowTask(null)}
        />
      )}
    </div>
  );
}
