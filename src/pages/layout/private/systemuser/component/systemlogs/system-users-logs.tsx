import { LogIn, LogOut, User2 } from "lucide-react";
import SystemLogsFilter from "./system-logs-filters";
import { useSystemUserStore } from "../../store";

const SystemUsersLogs = () => {
  const { logs } = useSystemUserStore();
/////
  return (
    <div className="min-h-[65vh] bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="my-6 mx-auto  px-4 2xl:px-8">
        <div className="mb-4">
          <SystemLogsFilter />
        </div>

        <div className="overflow-x-auto rounded-xl shadow ring-1 ring-slate-200 bg-white/70 backdrop-blur border border-slate-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-slate-100 to-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wide">
                  SN
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wide">
                  <span className="inline-flex items-center gap-1">
                    <User2 className="w-4 h-4" /> User
                  </span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wide">
                  <span className="inline-flex items-center gap-1">
                    <LogIn className="w-4 h-4" /> SessionType
                  </span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wide">
                  <span className="inline-flex items-center gap-1">
                    <LogOut className="w-4 h-4" /> Date
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(logs) && logs.length > 0 ? (
                logs.map((log, idx) => (
                  <tr
                    key={log?.id ?? idx}
                    className="hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-700 font-semibold">
                      {idx + 1}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-700">
                      {log?.userName || "--"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-700">
                      {log?.systemUserSession || "--"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-700">
                      {log?.createdNepDate || "--"}__{log?.localTimeZone}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-[15px] p-5 text-center text-red-400 bg-red-50"
                  >
                    No log records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SystemUsersLogs;
