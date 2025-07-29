import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useItemUnitStore } from "../store";
import { useGlobalStore } from "@/global/store";

const ItemUnitDeleteModal = ({
  open,
  setOpen,
  id,
  setId,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  setId: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { deleteItemUnit } = useItemUnitStore();
  const { setToasterData } = useGlobalStore();

  const handleSubmit = async () => {
    const res = await deleteItemUnit(id);
    setToasterData({
      open: true,
      message: res?.message || "Unit deleted successfully!",
      severity: res?.severity || "success",
    });

    setId(0);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
      <div className="p-6 w-full bg-white rounded-lg shadow-xl">
        <DialogTitle className="text-xl font-semibold text-center text-gray-800">
          ⚠️ Confirm Deletion
        </DialogTitle>

        <DialogContent className="flex flex-col gap-4 mt-2 text-center">
          <p className="text-gray-700">
            Are you sure you want to delete this unit? This action cannot be
            undone.
          </p>
        </DialogContent>

        <DialogActions className="p-4 flex justify-between">
          <button
            className="bg-gray-200 px-5 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-200"
            onClick={handleSubmit}
          >
            Delete
          </button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ItemUnitDeleteModal;
