import { FiCalendar, FiClock } from "react-icons/fi";
import { useAddTaskFormStore } from "../store";
import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import { defaultNepaliDate } from "@/global/config";
import { useEffect } from "react";

const Schedule = () => {
  const { data, setData, errors } = useAddTaskFormStore();
  
  // For nepali date change
  const handleNepaliDateChange = (e: NepaliDate | null, name: string) => {
    if (!e) return;
    if (name === "endDate") {
      setData({ ...data, endDate: (e as NepaliDate)?.toString() });
      return;
    }
    setData({ ...data, startDate: (e as NepaliDate)?.toString() });
  };

  // for setting the default date and duration
  useEffect(() => {
    setData({
      ...data,
      startDate: defaultNepaliDate.toString(),
      endDate: defaultNepaliDate.toString(),
      sessionDuration: "30",
    });
  }, [data?.memberId]);

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="h-px bg-gray-200 flex-grow"></div>
        <h3 className="mx-4 text-lg text-[#2E2E2E] font-medium">Schedule</h3>
        <div className="h-px bg-gray-200 flex-grow"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Start Date */}
        <div>
          <label className="text-[#2E2E2E] font-medium mb-2 flex items-center">
            Start Date <span className="text-[#E26300] ml-1">*</span>
          </label>
          <div className="relative mt-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A] opacity-70">
              <FiCalendar />
            </div>
            <NepaliDatePicker
              value={
                data?.startDate
                  ? new NepaliDate(data.startDate)
                  : defaultNepaliDate
              }
              placeholder="Select start date"
              onChange={(e) => handleNepaliDateChange(e, "startDate")}
              className="pl-10 pr-3 py-3 text-[#2E2E2E] bg-white border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A]"
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1 animate-fadeIn">
                {errors.startDate}
              </p>
            )}
          </div>
        </div>

        {/* End Date */}
        <div>
          <label className="text-[#2E2E2E] font-medium mb-2 flex items-center">
            End Date <span className="text-[#E26300] ml-1">*</span>
          </label>
          <div className="relative mt-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A] opacity-70">
              <FiCalendar />
            </div>
            <NepaliDatePicker
              value={
                data?.endDate
                  ? new NepaliDate(data?.endDate)
                  : defaultNepaliDate
              }
              placeholder="Select end date"
              onChange={(e) => handleNepaliDateChange(e, "endDate")}
              className="pl-10 pr-3 py-3 text-[#2E2E2E] bg-white border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A]"
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm mt-1 animate-fadeIn">
                {errors.endDate}
              </p>
            )}
          </div>
        </div>

        {/* Session Duration */}
        <div>
          <label className="text-[#2E2E2E] font-medium mb-2 flex items-center">
            Session Duration (minutes){" "}
            <span className="text-[#E26300] ml-1">*</span>
          </label>
          <div className="relative mt-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A] opacity-70">
              <FiClock />
            </div>
            <input
              type="number"
              className="pl-10 pr-3 py-3 text-[#2E2E2E] bg-white border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A]"
              placeholder="e.g., 60"
              name="sessionDuration"
              value={data?.sessionDuration || "30"}
              onChange={(e) =>
                setData({ ...data, sessionDuration: e.target.value })
              }
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
              minutes
            </div>
          </div>

          {/* Quick Duration Selector */}
          <div className="mt-2 flex flex-wrap gap-2">
            {[30, 45, 60, 90, 120].map((duration) => (
              <button
                key={duration}
                type="button"
                onClick={() =>
                  setData({ ...data, sessionDuration: duration.toString() })
                }
                className={`px-3 py-1 rounded-md text-sm transition-all ${
                  data?.sessionDuration === duration.toString()
                    ? "bg-[#E26300] text-white"
                    : "bg-gray-100 text-[#2E2E2E] hover:bg-gray-200"
                }`}
              >
                {duration} min
              </button>
            ))}
          </div>
          {errors.sessionDuration && (
            <p className="text-red-500 text-sm mt-1 animate-fadeIn">
              {errors.sessionDuration}
            </p>
          )}
        </div>
      </div>

      {/* Notes Field */}
      <div>
        <label className="text-[#2E2E2E] font-medium mb-2 flex items-center">
          Notes
        </label>
        <textarea
          className="p-4 text-[#2E2E2E] bg-white border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] resize-none"
          placeholder="Add any special instructions or notes about this training assignment..."
          rows={3}
          value={data?.notes || ""}
          onChange={(e) => setData({ ...data, notes: e.target.value })}
        />
      </div>
    </div>
  );
};

export default Schedule;