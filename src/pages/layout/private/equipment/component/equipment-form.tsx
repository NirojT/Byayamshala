import { useGlobalStore } from "@/global/store";
import { useEquipmentStore } from "../store";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

export default function AddEquipmentModal({
  open,
  onClose,
  onAdded,
}: {
  open: boolean;
  onClose: () => void;
  onAdded: () => void;
}) {
  const { setToasterData } = useGlobalStore();
  const {
    equipmentData,
    setEquipmentData,
    create,
    equipmentId,
    deleteEquipment,
  } = useEquipmentStore();

  const [error, setError] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEquipmentData({
      ...equipmentData,
      [name]: name === "quantity" || name === "rate" ? Number(value) : value,
    });
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!open) setError(undefined);
  }, [open]);

  const handleSubmit = async () => {
    if (!equipmentData?.name?.trim()) {
      setError("Equipment name is required.");
      inputRef.current?.focus();
      return;
    }

    const res = await create();
    setToasterData({
      message: res?.message,
      severity: res.severity,
      open: true,
    });

    if (res?.severity === "success") {
      setError(undefined);
      onAdded();
    } else {
      setError(res?.message);
    }
  };

  const handleDelete = async () => {
     if (confirm(`Are you sure you want to delete "${equipmentData?.name}"?`)) {
       const res = await deleteEquipment(equipmentId);
       setToasterData({
         message: res?.message,
         severity: res.severity,
         open: true,
       });

       if (res?.severity === "success") {
         onAdded();
       }
     }
  };

  if (!open) return null;

  const isEdit = equipmentId > 0;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-96 max-w-[95vw] animate-fadein relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <h3 className="font-semibold text-xl mb-4 text-blue-900">
          {isEdit ? "Edit Equipment" : "Add Equipment"}
        </h3>

        {/* Name */}
        <input
          ref={inputRef}
          name="name"
          value={equipmentData?.name}
          onChange={handleChange}
          disabled={isEdit}
          placeholder="Equipment Name"
          className={`border-2 w-full mb-2 p-2 rounded-lg ${
            error ? "border-red-400" : "border-gray-200"
          }`}
          maxLength={48}
        />

        {/* Quantity */}
        <input
          name="quantity"
          type="number"
          value={equipmentData?.quantity || ""}
          onChange={handleChange}
          placeholder="Quantity"
          className="border-2 w-full mb-2 p-2 rounded-lg border-gray-200"
        />

        {/* Rate */}
        <input
          name="rate"
          type="number"
          value={equipmentData?.rate || ""}
          onChange={handleChange}
          placeholder="Rate"
          className="border-2 w-full mb-2 p-2 rounded-lg border-gray-200"
        />

        {/* Description */}
        <textarea
          name="description"
          value={equipmentData?.description}
          onChange={handleChange}
          placeholder="Description"
          className="border-2 w-full mb-2 p-2 rounded-lg border-gray-200"
          rows={3}
        />

        {/* Warning on delete */}
        {isEdit && (
          <div className="text-red-500 mb-2 text-sm">
            Deleting this equipment will remove all associated tasks.
          </div>
        )}

        {/* Error message */}
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        {/* Action buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg"
          >
            Cancel
          </button>

          {!isEdit ? (
            <button
              onClick={handleSubmit}
              className="px-5 py-1.5 bg-[#E26300] text-white hover:bg-orange-500 rounded-lg"
            >
              Add
            </button>
          ) : (
            <>
              <button
                onClick={handleSubmit}
                className="px-5 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-1.5 bg-red-600 text-white hover:bg-red-700 rounded-lg"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

