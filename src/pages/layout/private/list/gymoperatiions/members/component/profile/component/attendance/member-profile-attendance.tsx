import { useAddAttendanceFormStore } from "@/pages/layout/private/attendance/store";
import MemberAttendanceFilters from "./member-attendance-filters";
import {
  CheckCircle,
  XCircle,
  Calendar,
  LogIn,
  LogOut,
  Smartphone,
  User,
} from "lucide-react";

const MemberProfileAttendance = () => {
  const { memberAttendances } = useAddAttendanceFormStore();

  const getStatusBadge = (isPresent: boolean) =>
    isPresent ? (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-green-100 text-green-700 text-xs font-semibold">
        <CheckCircle className="w-4 h-4" /> Present
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-red-100 text-red-700 text-xs font-semibold">
        <XCircle className="w-4 h-4" /> Absent
      </span>
    );

  const getSourceBadge = (from: string | null | undefined) => {
    if (!from || from === "Manual")
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-medium">
          <User className="w-4 h-4" /> Manual
        </span>
      );
    if (
      from.toLowerCase().includes("app") ||
      from.toLowerCase().includes("mobile")
    )
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-purple-100 text-purple-700 text-xs font-medium">
          <Smartphone className="w-4 h-4" /> {from}
        </span>
      );
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-gray-100 text-gray-700 text-xs font-medium">
        {from}
      </span>
    );
  };

  return (
    <div className="min-h-[65vh] bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="my-6 mx-auto  px-4 2xl:px-8">
        <div className="mb-4">
          <MemberAttendanceFilters />
        </div>

        {memberAttendances?.length > 0 && (
          <div className="flex items-center gap-3 pb-6">
            <User className="w-8 h-8 text-blue-500" />
            <span className="text-slate-800 font-semibold text-xl tracking-tight">
              Attendance of{" "}
              <span className="capitalize">
                {memberAttendances?.[0]?.member?.fullName}
              </span>
            </span>
          </div>
        )}

        <div className="overflow-x-auto rounded-xl shadow ring-1 ring-slate-200 bg-white/70 backdrop-blur border border-slate-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-slate-100 to-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wide">
                  SN
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wide">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> Date
                  </span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wide">
                  <span className="inline-flex items-center gap-1">
                    <LogIn className="w-4 h-4" /> Check IN
                  </span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wide">
                  <span className="inline-flex items-center gap-1">
                    <LogOut className="w-4 h-4" /> Check OUT
                  </span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wide">
                  <span className="inline-flex items-center gap-1">
                    <Smartphone className="w-4 h-4" /> Source
                  </span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wide">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(memberAttendances) &&
              memberAttendances.length > 0 ? (
                memberAttendances.map((attendance, idx) => (
                  <tr
                    key={attendance?.id ?? idx}
                    className="hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-700 font-semibold">
                      {idx + 1}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-700">
                      {attendance?.createdNepDate || "--"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {attendance?.checkInTime ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                          <LogIn className="w-4 h-4" /> {attendance.checkInTime}
                        </span>
                      ) : (
                        <span className="text-slate-400">--</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {attendance?.checkInTime ? (
                        attendance?.checkOutTime ? (
                          <span className="inline-flex items-center gap-1 text-amber-700 font-medium">
                            <LogOut className="w-4 h-4" />{" "}
                            {attendance.checkOutTime}
                          </span>
                        ) : (
                          <span className="text-slate-400">--</span>
                        )
                      ) : (
                        <span className="text-slate-400">--</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {attendance?.checkInTime ? (
                        getSourceBadge(attendance.attendanceFrom)
                      ) : (
                        <span className="text-slate-400">--</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {getStatusBadge(attendance?.isPresent)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-[15px] p-5 text-center text-red-400 bg-red-50"
                  >
                    No attendance records found.
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

export default MemberProfileAttendance;
