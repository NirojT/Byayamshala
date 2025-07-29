import { useEffect } from "react";
import { IEquipmentDetails } from "../interface";
import { useEquipmentStore } from "../store";
import EquipmentCard from "./equipment-card";

export default function EquipmentCardList({
  onCreateTask,
  setShowAdd
}: {
  onCreateTask: (eq: IEquipmentDetails) => void;
  setShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { equipments, getEquipments } = useEquipmentStore();

  useEffect(() => {
    getEquipments();
  }, [getEquipments]);

  if (!equipments || equipments
  
    .length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-16 text-gray-500">
        <svg width="64" height="64" fill="none" viewBox="0 0 24 24" className="mb-3 text-gray-300">
          <path stroke="currentColor" strokeWidth="1.5" d="M16 3v4M8 3v4M3 9h18M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9"></path>
        </svg>
        <div className="text-lg font-medium">No equipment found</div>
        <div className="text-sm text-gray-400 mt-1">Add your first equipment to get started.</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {equipments.map(eq => (
        <EquipmentCard
          key={eq.id}
          equipment={eq}
          onCreateTask={onCreateTask}
          setShowAdd={setShowAdd}
        />
      ))}
    </div>
  );
}