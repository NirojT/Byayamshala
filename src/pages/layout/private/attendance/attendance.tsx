import { useEffect } from "react";
import NepaliDatePicker from "@zener/nepali-datepicker-react";
import "@zener/nepali-datepicker-react/index.css";

import { defaultNepaliDate } from "@/global/config";
import { useGlobalStore } from "@/global/store";
import { ShiftType } from "@/global/components/enums/enums";
import AttendanceTable from "./component/attendance-table";
import { useAddAttendanceFormStore } from "./store";

const Attendance = () => {
  const {
    details,
    shift,
    setShift,
    search,
    setSearch,
    date,
    setDate,
    getAttendanceOfToday,
    searchAttendance,
    saveAttendance,
    attendenceFor,
    setAttendenceFor,
  } = useAddAttendanceFormStore();

  const { setToasterData } = useGlobalStore();

  useEffect(() => {
    setDate(defaultNepaliDate?.toString());
  }, [attendenceFor]);

  useEffect(() => {
    getAttendanceOfToday();
  }, [attendenceFor]);

  const handleSave = async () => {
    try {
      const payload = details.map((entry) => ({
        id: entry?.id,
        memberId: entry?.member?.id,
        checkInTime: formatToLocalDateTime(date, entry?.checkInTime),
        checkOutTime: formatToLocalDateTime(date, entry?.checkOutTime),
        isPresent: entry?.isPresent,
      }));

      const res = await saveAttendance(payload);

      setToasterData({
        open: true,
        message: res?.message,
        severity: res?.severity,
      });
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  const formatToLocalDateTime = (date: string, time?: string) => {
    if (!time) return null;
    return time.length === 5
      ? `${date}T${time}:00`
      : `${time.split(" ")[0]}T${time.split(" ")[1]}`;
  };

  const handleSwitchUser = () => {
    setAttendenceFor(attendenceFor === "member" ? "staff" : "member");
  };

  const handleClearSearch = () => {
    getAttendanceOfToday();
    setSearch("");
    setShift(ShiftType.ALL);
  };

  return (
    <div className="min-h-screen pt-6 font-poppins bg-gradient-to-tr from-sky-50 via-indigo-50 to-pink-50">
      <div className="max-w-6xl bg-white rounded-xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl  text-gray-900 tracking-tight">
              Attendance
            </h1>

            <div className="flex items-center gap-3">
              {/* Record Count Pill */}
              <span className="px-3 py-1 bg-white text-gray-700 text-sm font-medium rounded-full shadow-sm border border-gray-200">
                {details?.length} Records
              </span>

              {/* Toggle Pill Button */}
              <div className="flex items-center bg-gray-100 p-1 rounded-full shadow-inner border border-gray-200">
                <button
                  onClick={handleSwitchUser}
                  className={`px-3 py-1 text-sm rounded-full transition  ${
                    attendenceFor === "member"
                      ? "bg-orange-400 text-white shadow"
                      : "text-gray-700 hover:text-orange-600"
                  }`}
                >
                  Member
                </button>
                <button
                  onClick={handleSwitchUser}
                  className={`px-3 py-1 text-sm rounded-full transition  ${
                    attendenceFor === "staff"
                      ? "bg-orange-400 text-white shadow"
                      : "text-gray-700 hover:text-orange-600"
                  }`}
                >
                  Staff
                </button>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-60 h-10 px-4 text-sm text-gray-800 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                onClick={searchAttendance}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 transition px-4 py-2 text-sm rounded-md border border-gray-300 shadow-sm"
              >
                Search
              </button>
            </div>

            <button
              onClick={search ? handleClearSearch : handleSave}
              className="bg-orange-600 hover:bg-orange-700 text-white  transition px-5 py-2 rounded-md shadow-sm"
            >
              {search ? "Clear" : "Submit"}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {/* Shift Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shift
            </label>
            <select
              value={shift}
              onChange={(e) => setShift(e.target.value as ShiftType)}
              className="w-full text-sm p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {Object.values(ShiftType).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Nepali Date Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date *
            </label>
            <NepaliDatePicker
              value={date}
              placeholder="Select date"
              onChange={(e) => setDate(e as any)}
              className="w-full text-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden border border-gray-200 rounded-lg bg-white shadow-md">
          <AttendanceTable />
        </div>
      </div>
    </div>
  );
};

export default Attendance;
