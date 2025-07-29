 
import React from "react";
import StaffAttendanceFilters from "./staff-attendance-filters";
import { useLocation } from "react-router-dom";
import { IStaffDetails } from "../../interface";
import { useAddAttendanceFormStore } from "@/pages/layout/private/attendance/store";

const StaffProfileAttendance = () => {
  const location=useLocation()
  const staff:IStaffDetails= location.state
const {staffAttendances}=useAddAttendanceFormStore()
 
  return (
    <div>
      <div className="overflow-hidden  my-3 transition-all px-6 2xl:px-8">
        {/* Filters */}

        <StaffAttendanceFilters staff={staff} />

        <div className="text-slate-700 pb-4 text-2xl">
          Attendance of {staff?.fullName}
        </div>

        <div className="overflow-x-auto border border-gray-200 shadow-sm rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-slate-200 text-gray-800">
              <tr className="text-gray-500">
                {[
                  "SN",
                  "Date",
                  "Check IN",
                  "Check OUT",
                  "Attendance From",
                  "Status",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-4 py-3 text-left text-slate-700 text-xs font-medium uppercase tracking-wider"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {Array.isArray(staffAttendances) &&
              staffAttendances.length > 0 ? (
                staffAttendances.map((attendance, index) => (
                  <React.Fragment key={attendance?.id ?? index}>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-200">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-200">
                        {attendance?.createdNepDate}
                      </td>
                      <td className="px-4 py-3  whitespace-nowrap text-sm text-gray-600 dark:text-gray-200">
                        {attendance?.checkInTime === null
                          ? "--"
                          : attendance?.checkInTime}
                      </td>

                      <td className="px-4 py-3  whitespace-nowrap text-sm text-gray-600 dark:text-gray-200">
                        {attendance?.checkInTime === null
                          ? "--"
                          : attendance?.checkOutTime}
                      </td>
                      <td className="px-4 py-3  whitespace-nowrap text-sm text-gray-600 dark:text-gray-200">
                        {attendance?.checkInTime === null
                          ? "--"
                          : attendance?.attendanceFrom || "Manual"}
                      </td>
                      <td
                        className={`px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-200 ${
                          attendance?.isPresent
                            ? "text-green-500 "
                            : "text-red-500"
                        }`}
                      >
                        {attendance?.isPresent ? "Present" : "Absent"}
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="text-[14px] p-3 text-center text-red-400"
                  >
                    No attendance
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

export default StaffProfileAttendance;
