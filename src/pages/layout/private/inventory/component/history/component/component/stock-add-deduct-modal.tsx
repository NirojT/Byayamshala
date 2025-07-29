import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useGlobalStore } from "@/global/store";
import { useItemHistoryListStore } from "../../store";
import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import "@zener/nepali-datepicker-react/index.css";
import { useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useItemFormStore } from "../../../form/store";
import { defaultNepaliDate } from "@/global/config";

const StockAddDeductModal = ({
  open,
  setOpen,
  id,
  task,
  setTask,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data, setData, stockAddorDeduct, clearData, deleteAddOrDeduct } =
    useItemHistoryListStore();
  const { getItem } = useItemFormStore();
  const { setToasterData } = useGlobalStore();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleNepaliDateChange = (e: NepaliDate | null) => {
    setData({ ...data, date: (e as NepaliDate)?.toString() });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!data?.quantity) {
      setToasterData({
        message: "Please fill the quantity field",
        severity: "error",
        open: true,
      });
      return;
    }

    const response = await stockAddorDeduct(task);
    setToasterData({
      message: response.message,
      severity: response.severity,
      open: true,
    });

    if (response.severity === "success") {
      clearData();
      setOpen(false);
      setTask("");
      await getItem(id);
    }
  };
  const handleDelete = async (historyId: number, task: string) => {
    const response = await deleteAddOrDeduct(historyId, task);
    setToasterData({
      message: response.message,
      severity: response.severity,
      open: true,
    });
    if (response.severity === "success") {
      clearData();
      setOpen(false);
      setTask("");
      await getItem(id);
    }
  };

  useEffect(() => {
    setData({ ...data, itemId: id });
    // eslint-disable-next-line
  }, [id]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 w-full rounded-2xl shadow-2xl border border-gray-100">
          <DialogTitle
            className="text-2xl font-extrabold text-center text-[#E26300] mb-1 relative tracking-wide"
            sx={{ pb: 1 }}
          >
            {task} Stock
            {data?.id > 0 && (
              <button
                type="button"
                className="absolute top-2 right-2 hover:bg-red-100 p-1 rounded-full transition"
                title="Delete"
                onClick={() => handleDelete(data?.id, task)}
              >
                <MdDeleteOutline size={26} className="text-red-500" />
              </button>
            )}
          </DialogTitle>

          <DialogContent className="flex flex-col gap-4 mt-1">
            <TextField
              fullWidth
              label={`Quantity to ${task}`}
              name="quantity"
              value={data?.quantity || ""}
              onChange={handleChange}
              margin="dense"
              variant="outlined"
              InputProps={{
                className: "bg-white rounded-lg",
                inputProps: { min: 1, style: { fontWeight: 600 } },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  fontSize: "1.15rem",
                },
              }}
            />
            <TextField
              fullWidth
              label="Remarks"
              name="remarks"
              value={data?.remarks}
              onChange={handleChange}
              margin="dense"
              variant="outlined"
              multiline
              minRows={2}
              InputProps={{
                className: "bg-white rounded-lg",
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  fontSize: "1.05rem",
                },
              }}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <NepaliDatePicker
                value={
                  data?.date ? new NepaliDate(data.date) : defaultNepaliDate
                }
                placeholder="Select date"
                onChange={handleNepaliDateChange}
                className="text-base border border-gray-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E26300] focus:border-[#E26300] bg-white"
              />
            </div>
          </DialogContent>

          <DialogActions className="flex flex-col sm:flex-row gap-2 sm:justify-between px-3 pt-4 pb-2">
            <button
              type="button"
              className="w-full sm:w-auto bg-gray-100 text-gray-700 border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-200 hover:text-black transition font-semibold"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#E26300] text-white px-7 py-2 rounded-lg hover:bg-[#b95205] transition font-semibold shadow"
            >
              Save
            </button>
          </DialogActions>
        </div>
      </form>
    </Dialog>
  );
};

export default StockAddDeductModal;
