import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { IStaffSalaryDetails } from "../../interface";
import { useStaffProfileStore } from "../../store";
import { Dialog, TablePagination } from "@mui/material";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { IResponse } from "@/global/interface";
import { useGlobalStore } from "@/global/store";

const SalaryList = () => {
  const { id } = useParams();
  const staffId = Number(id || "0");

  const {
    salaries,
    getSalarys,
    loading,
    deleteSalary,
    rowsPerPage1,
    page1,
    totalLength1,
    setPage1,
  } = useStaffProfileStore();

  const [openDialog, setOpenDialog] = useState(false);
  
  const { setToasterData } = useGlobalStore();

  const handleDelete = async (id: number) => {
    try {
      const res: IResponse = await deleteSalary(id);
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
    if (staffId) getSalarys(staffId);
  }, [staffId, getSalarys]);

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
          Salary List History{" "}
        </h2>
      </div>
      <div className="bg-white p-4 max-w-[95%] mx-auto md:min-h-[80vh] rounded-lg shadow-md  ">
        <div className="overflow-x-auto mx-auto rounded-lg shadow border border-zinc-200 bg-white">
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr className="bg-orange-50 text-orange-700">
                <th className="py-3 px-4 font-semibold text-left">Sn</th>
                <th className="py-3 px-4 font-semibold text-left">
                  Base Salary
                </th>
                <th className="py-3 px-4 font-semibold text-left">
                  Effective From
                </th>
                <th className="py-3 px-4 font-semibold text-left">
                  Effective To
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
                  <td colSpan={5} className="text-center p-4 text-zinc-400">
                    Loading...
                  </td>
                </tr>
              ) : salaries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-zinc-400">
                    No salary records found.
                  </td>
                </tr>
              ) : (
                salaries.map((salary: IStaffSalaryDetails, idx: number) => (
                  <tr
                    key={salary?.id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-zinc-50"}
                  >
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2 font-mono font-bold text-zinc-700">
                      Rs. {salary?.baseSalary}
                    </td>
                    <td className="px-4 py-2">{salary?.effectiveFrom}</td>
                    <td className="px-4 py-2">
                      {salary?.effectiveTo ? (
                        salary?.effectiveTo
                      ) : (
                        <span className="text-zinc-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-zinc-500">
                      {salary?.createdNepDate}
                    </td>
                    <td
                      className="px-4 py-2 text-zinc-500"
                      onClick={() => setOpenDialog(true)}
                    >
                      <FaTrash className="text-orange-400 hover:text-orange-500 duration-200" />
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
                            Are you sure you want to delete this payroll record?{" "}
                            <br />
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
                              handleDelete(salary?.id);
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
                ))
              )}
            </tbody>
          </table>
          <div>
            <TablePagination
              component="div"
              count={totalLength1}
              page={page1}
              onPageChange={(_, newPage) => setPage1(newPage)}
              rowsPerPage={rowsPerPage1}
              onRowsPerPageChange={(e) => setPage1(Number(e.target.value))}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryList;
