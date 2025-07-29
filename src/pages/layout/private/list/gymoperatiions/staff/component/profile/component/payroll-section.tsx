import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Dialog, TablePagination } from "@mui/material";
import { useGlobalStore } from "@/global/store";
import { IResponse } from "@/global/interface";
import { IStaffDetails } from "../../../interface";
import { useStaffProfileStore } from "../store";

const PayrollSection: React.FC<{ staff: IStaffDetails }> = ({ staff }) => {
  const {
    loading,
    payrolls,
    getPayrolls,
    deletePayroll,
    page3,
    setPage3,
    rowsPerPage3,
    setRowsPerPage3,
  } = useStaffProfileStore();
  const { setToasterData } = useGlobalStore();
  const [dialogOpenId, setDialogOpenId] = useState<number | null>(null);

  useEffect(() => {
    staff.id && getPayrolls(staff.id);
  }, [staff.id, getPayrolls]);

  const confirmDelete = async (id: number) => {
    try {
      const res: IResponse = await deletePayroll(id);
      setToasterData({
        message: res.message,
        severity: res.severity,
        open: true,
      });
    } catch (e: any) {
      setToasterData({ message: e.message, severity: "error", open: true });
    }
    setDialogOpenId(null);
  };

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <div className="py-10 text-center text-gray-500">Loading Payrolls…</div>
      ) : (
        <table className="min-w-full overflow-hidden rounded-lg border">
          <thead className="bg-gray-100 text-xs font-medium text-gray-600">
            <tr>
              {[
                "Date",
                "Base Salary",
                "Adjustments",
                "Net Pay",
                "Future Pay",
                "Action",
              ].map((h) => (
                <th key={h} className="p-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-slate-50 text-sm text-gray-700">
            {payrolls.map((p) => (
              <tr
                key={p.id}
                className=" text-center transition"
              >
                <td className="p-2">{p.processedDate}</td>
                <td className="p-2">{p.baseSalary}</td>
                <td className="p-2">{p.totalAdjustments}</td>
                <td className="p-2">{p.netPay}</td>
                <td className="p-2">{p.futurePay}</td>
                <td className="p-2 pl-10 ">
                  <FaTrash
                    size={16}
                    className=" cursor-pointer text-orange-400 hover:text-orange-600 transition"
                    onClick={() => setDialogOpenId(p.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-4 flex justify-end">
        <TablePagination
          component="div"
          count={payrolls.length}
          page={page3}
          onPageChange={(_, num) => setPage3(num)}
          rowsPerPage={rowsPerPage3}
          onRowsPerPageChange={(e) =>
            setRowsPerPage3(parseInt(e.target.value, 10))
          }
          rowsPerPageOptions={[5, 10, 25]}
          className="rounded-md"
        />
      </div>

      <Dialog
        open={dialogOpenId !== null}
        onClose={() => setDialogOpenId(null)}
        PaperProps={{ className: "p-6 rounded-lg" }}
      >
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Confirm Delete?
          </h2>
          <p className="text-sm text-gray-600">Are you sure you want to delete ? This action cannot <br /> be undone.</p>
          <div className="mt-2 flex justify-end space-x-3">
            <button
              onClick={() => setDialogOpenId(null)}
              className="rounded-md bg-gray-400 px-4 py-2 text-white hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => dialogOpenId && confirmDelete(dialogOpenId)}
              className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PayrollSection;
