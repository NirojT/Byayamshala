import { PartyMoneyType } from "@/global/components/enums/enums";
import { useGlobalStore } from "@/global/store";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Tooltip,
} from "@mui/material";
import { CheckCircle2, StickyNote, Wallet, X } from "lucide-react";
import { useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { usePartyAccTransactionStore } from "../store";

const PartyTransactionModal = () => {
  const {
    task,
    setOpen,
    setTask,
    open,
    data,
    setData,
    clearData,
    partyGaveOrReceive,
    deletePartyGaveOrReceive,
    getSpecificPartyAccTransactions,
    partyAccDetail,
  } = usePartyAccTransactionStore();

  const { setToasterData } = useGlobalStore();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!data?.amt || isNaN(+data?.amt) || +data?.amt <= 0) {
      setToasterData({
        message: "Please enter a valid amount",
        severity: "error",
        open: true,
      });
      return;
    }

    const response = await partyGaveOrReceive();
    setToasterData({
      message: response.message,
      severity: response.severity,
      open: true,
    });

    if (response.severity === "success") {
      clearData();
      setOpen(false);
      setTask(PartyMoneyType.YOU_RECEIVED);
      await getSpecificPartyAccTransactions(
        partyAccDetail?.partyName,
        partyAccDetail?.partyType
      );
    }
  };

  const handleDelete = async (id: number) => {
    const response = await deletePartyGaveOrReceive(id);
    setToasterData({
      message: response.message,
      severity: response.severity,
      open: true,
    });
    if (response.severity === "success") {
      clearData();
      setOpen(false);
      setTask(PartyMoneyType.YOU_RECEIVED);
      await getSpecificPartyAccTransactions(
        partyAccDetail?.partyName,
        partyAccDetail?.partyType
      );
    }
  };

  useEffect(() => {
    if (partyAccDetail) {
      setData({
        ...data,
        partyName: partyAccDetail?.partyName,
        partyType: partyAccDetail?.partyType,
        partyMoneyType: task,
      });
    }
    // eslint-disable-next-line
  }, [partyAccDetail]);

  const isEdit = data?.id > 0;

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
      <form onSubmit={handleSubmit} className="font-poppins">
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <DialogTitle className="flex items-center justify-between px-6 pt-6 pb-2 bg-gradient-to-r from-[#FFE1CC] to-[#FFF8F3]">
            <div className="flex items-center gap-2 text-[#E26300] text-lg font-semibold">
              <Wallet size={22} />
              {task === PartyMoneyType.YOU_RECEIVED
                ? `Received from ${data?.partyName}`
                : `Gave to ${data?.partyName}`}
            </div>
            <IconButton
              onClick={() => setOpen(false)}
              size="small"
              className="hover:bg-gray-200 transition"
              aria-label="Close"
            >
              <X size={20} />
            </IconButton>
          </DialogTitle>

          <DialogContent className="flex flex-col gap-6 px-6 pt-4 pb-1">
            <div className="grid grid-cols-1  gap-4">
              {/* Amount */}
              <div className="flex flex-col">
                <label className="flex items-center mb-2 text-sm font-medium text-[#E26300]">
                  रु Amount <span className="text-red-500 ml-1">*</span>
                </label>
                <TextField
                  fullWidth
                  type="number"
                  name="amt"
                  value={data?.amt || ""}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  required
                  InputProps={{
                    inputProps: {
                      min: 1,
                      onWheel: (e) => e.currentTarget.blur(), // 👈 prevent scroll
                    },
                    className: "text-lg font-bold",
                  }}
                  className="bg-white rounded-md"
                />
              </div>
              {/* Notes */}
              <div className="flex flex-col">
                <label className="flex items-center mb-2 text-sm font-medium text-[#E26300]">
                  <StickyNote size={18} className="mr-2" /> Notes
                </label>
                <TextField
                  fullWidth
                  name="notes"
                  value={data?.notes || ""}
                  onChange={handleChange}
                  placeholder="Add notes (optional)"
                  className="bg-white rounded-md"
                  multiline
                  rows={2}
                />
              </div>
            </div>

            {isEdit && (
              <div className="flex justify-end">
                <Tooltip title="Delete Transaction">
                  <button
                    type="button"
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium hover:underline"
                    onClick={() => handleDelete(data?.id)}
                  >
                    <MdDeleteOutline size={18} />
                    Delete Transaction
                  </button>
                </Tooltip>
              </div>
            )}
          </DialogContent>

          <DialogActions className="px-6 pb-6 pt-3 flex justify-between items-center">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2 rounded-lg bg-[#E26300] text-white hover:bg-[#D25200] font-semibold flex items-center gap-2 shadow transition"
            >
              <CheckCircle2 size={18} />
              {isEdit ? "Update" : "Save"}
            </button>
          </DialogActions>
        </div>
      </form>
    </Dialog>
  );
};

export default PartyTransactionModal;
