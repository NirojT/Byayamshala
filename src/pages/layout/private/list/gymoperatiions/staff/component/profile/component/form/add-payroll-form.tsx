import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import { useEffect, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { IStaffDetails } from "../../../../interface";
import { useStaffProfileStore } from "../../store";

/**
 * - User can change net pay (input field).
 * - If user sets net pay > calculated, "Extra Paid" (futurePay negative).
 * - If user sets net pay < calculated, "Due" (futurePay positive).
 * - Shows hint and submits correct futurePay.
 */

const AddPayrollForm = ({
  staff,
  onSuccess,
}: {
  staff: IStaffDetails;
  onSuccess?: () => void;
}) => {
  const {
    payrollData,
    setPayrollData,
    clearPayrollData,
    addPayroll,
    prepareForPayroll,
  } = useStaffProfileStore();

  const [netPayInput, setNetPayInput] = useState<number | undefined>(
    payrollData?.netPay
  );

  // Prepare payroll on staff change
  useEffect(() => {
    if (staff?.id) {
      prepareForPayroll(staff?.id);
    }
  }, [staff?.id, prepareForPayroll]);

  // Sync local netPayInput with store
  useEffect(() => {
    setNetPayInput(payrollData?.netPay <= 0 ? 0 : payrollData?.netPay);
  }, [payrollData?.netPay]);

  // Handle processed date
  const handleNepaliDateChange = (e: NepaliDate | null, name: string) => {
    setPayrollData({ ...payrollData, [name]: e ? e.toString() : "" });
  };

  // Calculations
  const calcNetPay =
    Number(payrollData?.baseSalary || 0) +
    Number(payrollData?.totalAdjustments || 0);
  const userNetPay = Number(netPayInput ?? 0);
  const diff = userNetPay - calcNetPay;

  // Calculate futurePay
  let futurePay = 0;
  let netPayMsg = "";

  if (userNetPay || calcNetPay) {
    if (diff > 0) {
      netPayMsg = `Extra Paid: Rs. ${Math.abs(
        diff
      )} will be deducted from next month's salary.`;
      futurePay = -Math.abs(diff);
    } else if (diff < 0) {
      netPayMsg = `Due: Rs. ${Math.abs(
        diff
      )} will be added to next month's salary.`;
      futurePay = Math.abs(diff);
    } else {
      netPayMsg = "Net Pay matches calculation. No carry-over.";
      futurePay = 0;
    }
  }

  // When user changes netPay input
  const handleNetPayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setNetPayInput(value);
    // Recalculate futurePay and update both in store
    const localDiff = value - calcNetPay;
    let localFuturePay = 0;
    if (localDiff > 0) localFuturePay = -Math.abs(localDiff);
    else if (localDiff < 0) localFuturePay = Math.abs(localDiff);
    setPayrollData({
      ...payrollData,
      netPay: value,
      futurePay: localFuturePay,
    });
  };

  return (
    <form
      className="space-y-6"
      onSubmit={async (e) => {
        e.preventDefault();
        if (staff?.id) {
          setPayrollData({
            ...payrollData,
            staffId: staff.id,
            netPay: userNetPay,
            futurePay,
          });
          await addPayroll();
          clearPayrollData();
          onSuccess?.();
        }
      }}
    >
      <div>
        <label className="block mb-1 font-medium text-zinc-700">
          Processed Date <span className="text-orange-600">*</span>
        </label>
        <div className="relative">
          <div className="absolute z-50 left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
            <FiCalendar className="w-4 h-4" />
          </div>
          <NepaliDatePicker
            value={payrollData?.processedDate}
            placeholder="Select processed date"
            onChange={(e) =>
              handleNepaliDateChange(e as NepaliDate, "processedDate")
            }
            className="pl-9 w-full text-sm border border-gray-200 py-2.5 rounded-lg bg-[#FAFAFA] focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>
      {(payrollData?.baseSalary ||
        payrollData?.totalAdjustments ||
        netPayInput) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3  bg-orange-50 rounded-lg p-4 border border-orange-100">
          <div className="border-r border-slate-200">
            <div className="text-xs text-zinc-500">Base Salary</div>
            <div className="font-semibold text-zinc-800">
              Rs. {payrollData?.baseSalary?.toLocaleString?.() || "-"}
            </div>
          </div>
          <div className="border-r border-slate-200">
            <div className="text-xs text-zinc-500">Total Adjustments</div>
            <div className="font-semibold text-blue-700">
              {payrollData?.totalAdjustments?.toLocaleString?.() || "-"}
            </div>
          </div>
          <div>
            <div className="text-xs text-zinc-500">Calculated Net Pay</div>
            <div className="font-semibold text-green-700">
              Rs. {calcNetPay.toLocaleString() || "-"}
            </div>
          </div>
        </div>
      )}

      {(payrollData?.baseSalary ||
        payrollData?.totalAdjustments ||
        netPayInput) && (
        <div className="">
          <div>
            <label className="text-xs text-zinc-500 mb-1 block">
              Actual Net Pay <span className="text-orange-600">*</span>
            </label>
            <input
              type="number"
              onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
              className="input w-full border border-orange-400 bg-white px-3 py-2 rounded focus:ring-1 focus:ring-orange-500 outline-none"
              value={netPayInput || ""}
              onChange={handleNetPayChange}
            />
            {netPayMsg && (
              <div
                className={`mt-1 text-xs ${
                  diff === 0
                    ? "text-green-600"
                    : diff > 0
                    ? "text-red-600"
                    : "text-blue-600"
                }`}
              >
                {netPayMsg}
              </div>
            )}
            {/* Show futurePay preview */}
            {diff !== 0 && (
              <div className="mt-1 text-xs text-zinc-500">
                (futurePay will be set to {futurePay})
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          className="btn bg-orange-500 mt-4 hover:bg-orange-600 duration-300 text-white rounded-full py-2.5  btn-primary btn-sm w-full"
        >
          Generate
        </button>
        <button
          type="button"
          className="btn bg-gray-200 mt-4 hover:bg-gray-300 duration-300 text-slate-700 rounded-full py-2.5  btn-primary btn-sm w-full"
          onClick={() => {
            clearPayrollData();
            onSuccess?.();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddPayrollForm;
