import { useGlobalStore } from "@/global/store";
import { useAddAttendanceFormStore } from "../store";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { defaultNepaliDate } from "@/global/config";
import { useEffect } from "react";
import { Clock } from "lucide-react";

dayjs.extend(customParseFormat);

const AttendanceTable = () => {
  const {
    details,
    setDetails,
    selectAll,
    setSelectAll,
    toggleAttendance,
    toggelAllAttendance,
    addNewAttendance,
    date,
  } = useAddAttendanceFormStore();
  const { setToasterData } = useGlobalStore();

  const convertLocalDateToTime = (localDateTimeString: string) => {
    if (!localDateTimeString) return null;
    const formats = [
      "YYYY-MM-DD hh:mm:ss A",
      "YYYY-MM-DD HH:mm:ss",
      "YYYY-MM-DDTHH:mm:ss",
    ];
    for (const fmt of formats) {
      const parsed = dayjs(localDateTimeString, fmt, true);
      if (parsed.isValid()) {
        return parsed;
      }
    }
    return null;
  };

  // Always output string in 12-hour format with AM/PM for storage
  const convertTimeObjectToString = (timeObj: any, format = "hh:mm A") => {
    if (!timeObj) return null;
    return timeObj.format(format);
  };

  const handleTimeChange = (id: number, field: string, value: string) => {
    setDetails(
      details.map((entry) =>
        entry.member.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const toggelAll = () => {
    toggelAllAttendance();
  };

  const handleCreateNewAttendence = async () => {
    if (date === defaultNepaliDate?.toString()) return;
    const res = await addNewAttendance();
    if (res) {
      setToasterData({
        open: true,
        message: res.message,
        severity: res.severity,
      });
    }
  };

  useEffect(() => {
    const allChecked = details.every((entry) => entry?.isPresent);
    setSelectAll(allChecked);
  }, [details, setSelectAll]);

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-2 sm:p-4 min-h-[320px] overflow-x-auto transition">
      <Table className="w-full min-w-[650px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-10 text-center">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggelAll}
                className="form-checkbox text-[#E26300] w-5 h-5 accent-[#E26300] rounded transition"
                aria-label="Select all"
              />
            </TableHead>
            <TableHead className="w-32 text-center text-gray-700 text-sm font-semibold">
              Name
            </TableHead>
            <TableHead className="w-24 text-center text-gray-700 text-sm font-semibold">
              Shift
            </TableHead>
            <TableHead className="w-24 text-center text-gray-700 text-sm font-semibold">
              Status
            </TableHead>
            <TableHead className="w-24 text-center text-gray-700 text-sm font-semibold">
              AttendanceFrom
            </TableHead>
            <TableHead className="w-32 text-center text-gray-700 text-sm font-semibold">
              Check-in
            </TableHead>
            <TableHead className="w-32 text-center text-gray-700 text-sm font-semibold">
              Check-out
            </TableHead>
          </TableRow>
        </TableHeader>

        {details?.length > 0 ? (
          details.map((entry) => (
            <TableRow
              key={entry.id}
              className="hover:bg-indigo-50 transition-colors duration-150"
            >
              <TableCell className="py-2 w-10 text-center">
                <input
                  type="checkbox"
                  checked={entry?.isPresent}
                  onChange={() => toggleAttendance(entry?.member?.id)}
                  className="form-checkbox text-[#E26300] w-5 h-5 accent-[#E26300] rounded transition"
                  aria-label={`Mark present for ${entry?.member?.fullName}`}
                />
              </TableCell>
              <TableCell className="py-2 w-32 text-center font-medium text-gray-800">
                {entry?.member?.fullName}
              </TableCell>
              <TableCell className="py-2 w-24 text-center text-gray-600">
                {entry?.member?.shift}
              </TableCell>
              <TableCell className="py-2 w-24 text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold ${
                    entry?.isPresent
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {entry?.isPresent ? "Present" : "Absent"}
                </span>
              </TableCell>
              <TableCell className="py-2 w-24 text-center text-gray-600">
                {entry?.attendanceFrom || "Manual"}
              </TableCell>
              {/* Check-in */}
              <TableCell className="py-2 text-center">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="relative flex items-center justify-center">
                    <Clock className="absolute left-2 text-gray-300 w-4 h-4 pointer-events-none" />
                    <TimePicker
                      ampm={true}
                      format="hh:mm A"
                      value={convertLocalDateToTime(entry?.checkInTime || "")}
                      onChange={(newValue) => {
                        const timeString = convertTimeObjectToString(newValue);
                        handleTimeChange(
                          entry.member.id,
                          "checkInTime",
                          timeString
                        );
                      }}
                      slotProps={{
                        textField: {
                          size: "small",
                          className:
                            "pl-7 w-full bg-white border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 shadow w-24 h-9 mx-auto transition-all text-center",
                          inputProps: {
                            style: { textAlign: "center", letterSpacing: 1 },
                            placeholder: "hh:mm AM",
                          },
                        },
                      }}
                      minutesStep={5}
                    />
                  </div>
                </LocalizationProvider>
              </TableCell>
              {/* Check-out */}
              <TableCell className="py-2  text-center">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="relative flex items-center justify-center">
                    <Clock className="absolute left-2 text-gray-300 w-4 h-4 pointer-events-none" />
                    <TimePicker
                      ampm={true}
                      format="hh:mm A"
                      value={convertLocalDateToTime(entry?.checkOutTime || "")}
                      onChange={(newValue) => {
                        const timeString = convertTimeObjectToString(newValue);
                        handleTimeChange(
                          entry.member.id,
                          "checkOutTime",
                          timeString
                        );
                      }}
                      slotProps={{
                        textField: {
                          size: "small",
                          className:
                            "pl-7 w-full bg-white border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 shadow w-24 h-9 mx-auto transition-all text-center",
                          inputProps: {
                            style: { textAlign: "center", letterSpacing: 1 },
                            placeholder: "hh:mm PM",
                          },
                        },
                      }}
                      minutesStep={5}
                    />
                  </div>
                </LocalizationProvider>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={7}
              className="py-7 text-center font-medium text-gray-400 hover:cursor-pointer"
              onClick={handleCreateNewAttendence}
            >
              {date !== defaultNepaliDate?.toString()
                ? "No attendance records found. Click to add."
                : "No attendance records found"}
            </TableCell>
          </TableRow>
        )}
      </Table>
    </div>
  );
};

export default AttendanceTable;
