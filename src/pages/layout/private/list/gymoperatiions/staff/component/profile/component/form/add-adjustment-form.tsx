import { AdjustmentType } from "@/global/components/enums/enums";
import { PrivateRoute } from "@/global/config";
import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import { useNavigate } from "react-router-dom";
import { IStaffDetails } from "../../../../interface";
import { useStaffProfileStore } from "../../store";
import { useEffect } from "react";
import { FiCalendar } from "react-icons/fi";

const AddAdjustmentForm = ({
  staff,
  setShowAdd,
}: {
  staff: IStaffDetails;
  setShowAdd: (value: React.SetStateAction<boolean>) => void;
}) => {
  const navigate = useNavigate();
  const adjustmentData = useStaffProfileStore((s) => s.adjustmentData);
  const setAdjustmentData = useStaffProfileStore((s) => s.setAdjustmentData);
  const clearAdjustmentData = useStaffProfileStore(
    (s) => s.clearAdjustmentData
  );
  const addAdjustment = useStaffProfileStore((s) => s.addAdjustment);
  const handleNepaliDateChange = (e: NepaliDate, name: string) => {
    setAdjustmentData({ ...adjustmentData, [name]: e.toString() });
  };

  //escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearAdjustmentData();
        setShowAdd(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [clearAdjustmentData, setShowAdd]);

  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        if (staff?.id) {
          await addAdjustment();
          clearAdjustmentData();
          setShowAdd(false);
        }
      }}
    >
      <div>
        <div className="flex justify-end">
          <div
            className="hover:cursor-pointer capitalize bg-orange-50 hover:bg-orange-100 duration-300 text-orange-600 px-1 rounded-md"
            onClick={() =>
              navigate(`/${PrivateRoute}/staff/salary-adjustment/${staff?.id}`)
            }
          >
            {" "}
            view Adjustments
          </div>
        </div>
        <label className="block mb-1 font-medium">Type</label>
        <div className="flex justify-end"></div>
        <select
          value={adjustmentData?.type}
          onChange={(e) =>
            setAdjustmentData({
              ...adjustmentData,
              type: e.target.value as unknown as AdjustmentType,
            })
          }
          className="input w-full border border-gray-200 py-2.5 rounded-lg bg-[#FAFAFA] focus:outline-none focus:ring-1 focus:ring-[#E26300] focus:border-[#E26300] text-sm p-2"
        >
          <option value="">Select Type</option>
          {Object.values(AdjustmentType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Amount</label>
        <input
          type="number"
          onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
          value={adjustmentData?.amount || ""}
          onChange={(e) =>
            setAdjustmentData({
              ...adjustmentData,
              amount: Number(e.target.value),
              staffId: staff?.id,
            })
          }
          required
          className="input w-full border border-gray-200 py-2.5 rounded-lg bg-[#FAFAFA] focus:outline-none focus:ring-1 focus:ring-[#E26300] focus:border-[#E26300] text-sm p-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Reason</label>
        <input
          type="text"
          value={adjustmentData?.reason}
          onChange={(e) =>
            setAdjustmentData({ ...adjustmentData, reason: e.target.value })
          }
          className="input w-full border border-gray-200 py-2.5 rounded-lg bg-[#FAFAFA] focus:outline-none focus:ring-1 focus:ring-[#E26300] focus:border-[#E26300] text-sm p-2"
        />
      </div>

      <div>
        {" "}
        <label className="block mb-1 font-medium">Date </label>
        <div className="relative">
          <div className="absolute left-3 z-50  top-1/2 transform -translate-y-1/2 text-[#2E2E2E]">
            <FiCalendar className="w-4 h-4" />
          </div>
          <NepaliDatePicker
            value={adjustmentData?.adjustmentDate}
            placeholder="Select date"
            onChange={(e) =>
              handleNepaliDateChange(e as NepaliDate, "effectiveFrom")
            }
            className="pl-9 w-full text-sm border border-gray-200 py-2.5 rounded-lg bg-[#FAFAFA] focus:outline-none focus:ring-1 focus:ring-[#E26300] focus:border-[#E26300]"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          className="btn bg-orange-500 mt-4 hover:bg-orange-600 duration-300 text-white rounded-full py-2.5  btn-primary btn-sm w-full"
        >
          Add
        </button>
        <button
          type="button"
          className="btn bg-gray-200 mt-4 hover:bg-gray-300 duration-300 text-slate-700 rounded-full py-2.5  btn-primary btn-sm w-full"
          onClick={() => {
            clearAdjustmentData();
            setShowAdd(false);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddAdjustmentForm;
