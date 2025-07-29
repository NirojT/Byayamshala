import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ChevronLeft, Cpu } from "lucide-react";
import { IBiometricsDetails } from "../interface";
import { useBiometricsStore } from "../store";
import { TablePagination } from "@mui/material";

const BiometricDeviceCommands = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { commands, getBiometricsCommnads ,page,setPage,rowsPerPage,setRowsPerPage,totalLength} = useBiometricsStore();
  // Receive deviceSN and deviceName from location.state
  const { device } = location.state;

  const bioDevice: IBiometricsDetails = device || {};

   const handleChangeRowsPerPage = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  
    
      if(bioDevice?.deviceSN)  await getBiometricsCommnads(bioDevice?.deviceSN);
      
    };
  
    const handleChangePage = async (_event: unknown, newPage: number) => {
      setPage(newPage);
   
      if (bioDevice?.deviceSN) await getBiometricsCommnads(bioDevice?.deviceSN);
     
    };

  useEffect(() => {
    if (bioDevice?.deviceSN) {
      getBiometricsCommnads(bioDevice.deviceSN);
    }
    // eslint-disable-next-line
  }, [bioDevice?.deviceSN]);

  return (
    <div className="min-h-screen py-8 px-2 bg-gradient-to-br from-blue-50 via-indigo-50 to-pink-50 text-[#2E2E2E] font-poppins">
      <button
        className="flex items-center gap-2 text-blue-600 hover:underline mb-4"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft size={18} />
        Back
      </button>
      <div className="max-w-2xl mx-auto">
        <h2 className="flex items-center gap-3 bg-white rounded-xl shadow px-4 py-2 border border-blue-100 text-xl font-bold mb-4">
          <Cpu className="text-blue-600" size={22} />
          Commands for{" "}
          <span className="text-indigo-700">
            {bioDevice?.deviceName || bioDevice?.deviceSN}
          </span>
        </h2>
        <div className="rounded-xl bg-white border border-indigo-100 shadow-inner px-2 py-2">
          <div className="font-semibold text-indigo-700 mb-1 text-sm">
            Recent Commands
          </div>
          {commands?.length === 0 ? (
            <div className="text-gray-400 text-xs italic px-2 py-3">
              No commands found.
            </div>
          ) : (
            <ul className="divide-y divide-indigo-50 max-h-[400px] overflow-y-auto">
              {commands.map((cmd, idx: number) => (
                <li
                  key={cmd?.id || idx}
                  className="flex items-center gap-2 px-2 py-1 text-xs"
                >
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      cmd?.status === "SUCCESS"
                        ? "bg-green-100 text-green-700"
                        : cmd?.status === "FAILED"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {cmd?.status}
                  </span>
                  <span className="font-mono text-blue-700">
                    {cmd?.commandPayload}
                  </span>
                  <span className="ml-auto text-gray-400 font-normal">
                    {cmd?.createdNepDate}__{cmd?.localTimeZone}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex justify-center dark:text-gray-200 w-full mt-2">
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={totalLength ?? 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="dark:text-gray-200"
        />
      </div>
    </div>
  );
};

export default BiometricDeviceCommands;
