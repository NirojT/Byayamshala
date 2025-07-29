import { useEffect, useState } from "react";

import { AdjustmentType } from "@/global/components/enums/enums";
import { useParams } from "react-router-dom";
import { ISalaryAdjustmentDetails } from "../../interface";
import { useStaffProfileStore } from "../../store";
import { FaArrowDown, FaArrowLeft, FaArrowUp, FaTrash } from "react-icons/fa";
import { Dialog, TablePagination } from "@mui/material";
import { useGlobalStore } from "@/global/store";
import { IResponse } from "@/global/interface";
import SearchSalaryAdj from "./search-salary-adj";

const AdjustmentList = () => {
  const { id } = useParams();
  const staffId = Number(id || "0");
  const {
    adjustments,
    getAdjustments,
    loading,
    deleteSalaryAdjustment,
    totalLength2,
    page2,
    rowsPerPage2,
    setPage2,
    salaryAdjFilterdata,
  } = useStaffProfileStore();

  console.log(salaryAdjFilterdata);
  const [openDialog, setOpenDialog] = useState(false);

  const { setToasterData } = useGlobalStore();

  const deleteAdjustment = async (id: number) => {
    try {
      const res: IResponse = await deleteSalaryAdjustment(id);
      setToasterData({
        message: res?.message,
        severity: res?.severity,
        open: true,
      });
    } catch (error: any) {
      console.log(error);

      setToasterData({
        message: error.message,
        severity: "error",
        open: true,
      });
    }
  };

  useEffect(() => {
    if (staffId) getAdjustments(staffId);
  }, [staffId, getAdjustments]);

  return (
    <div className="mt-4">
      <div className="mt-8 mb-6  flex items-center max-w-[95%] mx-auto justify-between">
        <div
          onClick={() => window.history.back()}
          className="flex items-center text-slate-600 bg-white p-3 rounded-full shadow-md cursor-pointer hover:bg-gray-50 duration-200"
        >
          <FaArrowLeft className="text-sm" />
        </div>
        <h2 className="font-semibold text-3xl tracking-wider text-slate-600">
          Salary History{" "}
        </h2>
      </div>

      <div>
        <SearchSalaryAdj id={staffId} />
      </div>

      <div className="bg-white p-4 max-w-[95%] mx-auto md:min-h-[80vh] rounded-lg shadow-md  ">
        <div className="overflow-x-auto mx-auto rounded-lg shadow border border-zinc-200 bg-white">
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr className="bg-orange-50 text-orange-700">
                <th className="py-3 px-4 font-semibold text-left">Sn</th>
                <th className="py-3 px-4 font-semibold text-left">Type</th>
                <th className="py-3 px-4 font-semibold text-left">
                  Amount (Rs.)
                </th>
                <th className="py-3 px-4 font-semibold text-left">Reason</th>
                <th className="py-3 px-4 font-semibold text-left">
                  Adjustment Date
                </th>
                <th className="py-3 px-4 font-semibold text-left">
                  Created At
                </th>
                <th className="py-3 px-4 font-semibold text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-zinc-400">
                    Loading...
                  </td>
                </tr>
              ) : adjustments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-zinc-400">
                    No adjustment records found.
                  </td>
                </tr>
              ) : (
                salaryAdjFilterdata.map(
                  (adj: ISalaryAdjustmentDetails, idx: number) => (
                    <tr
                      key={adj?.id}
                      className={idx % 2 === 0 ? "bg-white" : "bg-zinc-50"}
                    >
                      <td className="px-4 py-2">{idx + 1}</td>
                      <td className="px-4 py-2 font-medium">
                        {adj?.type === AdjustmentType.BONUS && (
                          <span className=" px-2 flex font-semibold text-slate-700 items-center gap-2 py-1 ">
                            {adj?.type}
                            <FaArrowUp className="inline-block mr-1 text-green-500" />
                          </span>
                        )}
                        {(adj?.type === AdjustmentType.DEDUCTION ||
                          adj?.type === AdjustmentType.ADVANCE) && (
                          <span className=" px-2 flex font-semibold text-slate-700 items-center gap-2 py-1 ">
                            {adj?.type}
                            <FaArrowDown className="inline-block mr-1 text-red-500" />
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 font-mono font-semibold">
                        {adj?.amount?.toLocaleString()}
                      </td>
                      <td className="px-4 py-2">
                        {adj?.reason || (
                          <span className="text-zinc-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-2">{adj?.adjustmentDate}</td>
                      <td className="px-4 py-2 text-zinc-500">
                        {adj?.createdNepDate}
                      </td>
                      <td className="px-4 py-2 text-zinc-500">
                        <span
                          className="cursor-pointer"
                          onClick={() => setOpenDialog(true)}
                        >
                          <FaTrash className="text-orange-400 hover:text-orange-500 duration-200" />
                        </span>
                      </td>
                      <Dialog
                        open={openDialog}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
                      >
                        <div className="flex flex-col items-center justify-center p-6">
                          <div className="flex flex-col pt-2 pb-3 gap-3">
                            <div className="text-xl font-semibold">
                              Delete Payroll Record
                            </div>
                            <div className="text-sm text-gray-600 ">
                              Are you sure you want to delete this payroll
                              record? <br />
                              This action cannot be undone.
                            </div>
                          </div>

                          <div className="mt-4 justify-between flex w-full">
                            <button
                              onClick={() => setOpenDialog(false)}
                              className="bg-slate-400 py-2 px-6 rounded-md text-white hover:bg-slate-500 duration-300"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                deleteAdjustment(adj?.id);

                                setOpenDialog(false);
                              }}
                              className="bg-red-600 py-2 duration-200 px-6 rounded-md text-white hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </Dialog>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
          <div>
            <TablePagination
              component="div"
              count={totalLength2}
              page={page2}
              onPageChange={(_, newPage) => setPage2(newPage)}
              rowsPerPage={rowsPerPage2}
              onRowsPerPageChange={(e) => setPage2(Number(e.target.value))}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdjustmentList;
