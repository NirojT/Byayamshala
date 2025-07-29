import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useItemUnitStore } from "../store";
import { useGlobalStore } from "@/global/store";

const ItemUnitForm = ({
  open,
  setOpen,
  task,
  id,
  setId,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  task: "create" | "update";
  id: number;
  setId: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { unit, setUnit, clearUnit, createItemUnit, updateItemUnit } =
    useItemUnitStore();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnit(e.target.value);
  };
  const { setToasterData } = useGlobalStore();
  const handleSubmit = async () => {
    if (!unit) {
      setToasterData({
        open: true,
        message: "Unit name is required",
        severity: "error",
      });
      return;
    }
    if (task === "create") {
      const res = await createItemUnit();
      setToasterData({
        open: true,
        message: res?.message,
        severity: res?.severity,
      });
      clearUnit();
    } else if (task === "update") {
      const res = await updateItemUnit(id);
      setToasterData({
        open: true,
        message: res?.message,
        severity: res?.severity,
      });
      clearUnit();
      setId(0);
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className="p-6 w-full max-w-lg bg-white rounded-lg shadow-xl">
        <DialogTitle className="text-xl font-semibold text-center text-gray-800">
          {task === "create" ? "➕ Add Unit" : "✏️ Update Unit"}
        </DialogTitle>

        <DialogContent className="flex flex-col gap-4 mt-2">
          <TextField
            fullWidth
            label="Unit Name"
            name="name"
            value={unit || ""}
            onChange={handleChange}
            margin="dense"
            className="border border-gray-300 rounded-lg"
          />
        </DialogContent>

        <DialogActions className="p-4 flex justify-between">
          <button
            className="bg-gray-200 px-5 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            onClick={handleSubmit}
          >
            {task === "create" ? "Create" : "Update"}
          </button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ItemUnitForm;
