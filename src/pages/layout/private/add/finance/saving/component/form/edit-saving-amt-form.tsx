import { useAddSavingAcc } from "../../store";
import { useGlobalStore } from "../../../../../../../../global/store";
import { useListSavingStore } from "@/pages/layout/private/list/finance/saving/store";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditSavingAmtModal = ({
  setEditModalOpen,
}: {
  setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { editData, setEditData, clearEditData, editSavingAmt } =
    useAddSavingAcc();
  const { deleteActivity } = useListSavingStore();
  const { setToasterData } = useGlobalStore();
  const [deletePopup, setDeletePopup] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // handles both add and withdraw amt
  const handleEditAmt = async () => {
    if (!editData?.amt) {
      setToasterData({
        open: true,
        message: "Amount is required",
        severity: "error",
      });
      return;
    }

    const res = await editSavingAmt();
    setToasterData({
      open: true,
      message: res.message,
      severity: res.severity,
    });

    if (res.severity === "success") {
      setEditModalOpen(false);
      clearEditData();
    }
  };
  const handleDelete = async () => {
    const res = await deleteActivity(editData?.id);
    setToasterData({
      open: true,
      message: res.message,
      severity: res.severity,
    });

    if (res.severity === "success") {
      setEditModalOpen(false);
      clearEditData();
    }
  };

  return (
    <div className="fixed inset-0  bg-slate-50     flex items-center justify-center z-50">
      {deletePopup ? (
        <div className="flex flex-col border border-gray-400 p-6 rounded-lg shadow-lg w-96">
          <p className="text-black">
            Are you sure you want to delete this savings amount history?
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => {
                navigate(`/tenant/add/finance/savings`);
              }}
              className="border w-20 py-2  rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="border w-20 py-2  rounded-lg"
            >
              Yes
            </button>
          </div>
        </div>
      ) : (
        <div className="border border-gray-400 p-6 rounded-lg shadow-lg w-96">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-bold ">Edit New Savings Amount</h3>
            <button
              onClick={() => {
                setDeletePopup(!deletePopup);
              }}
              className="text-red-500"
            >
              <MdOutlineDelete size={30} />
            </button>
          </div>

          {/* {amt} */}
          <div className="mb-4">
            <label className="block text-gray-800 mb-1">Amount</label>
            <input
              type="number"
              value={editData?.amt || ""}
              onChange={handleChange}
              name="amt"
              // className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              className="p-3 block w-full rounded-md focus:outline-none border border-gray-600 shadow-sm focus:border-[#E26003] focus:ring-[#E26003]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800 mb-1">Notes</label>
            <input
              type="text"
              value={editData?.remarks || ""}
              onChange={handleChange}
              name="remarks"
              // className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              className="p-3    block w-full rounded-md focus:outline-none border border-gray-600 shadow-sm focus:border-[#E26003] focus:ring-[#E26003]"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setEditModalOpen(false)}
              className="  border border-gray-400 px-4 py-2 rounded-lg shadow-md hover:bg-white hover:text-black transition"
            >
              Cancel
            </button>

            <button
              onClick={() => handleEditAmt()}
              // className="bg-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
              className="bg-[#E26003] text-white py-2 px-4 rounded-md focus:outline-none focus:ring-1 border border-gray-600"
            >
              Edit Amt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditSavingAmtModal;
