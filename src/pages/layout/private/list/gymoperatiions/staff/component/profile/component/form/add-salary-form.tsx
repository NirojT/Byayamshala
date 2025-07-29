import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import { useEffect } from "react";
import { FiCalendar } from "react-icons/fi";
import { IStaffDetails } from "../../../../interface";
import { useStaffProfileStore } from "../../store";
import { useNavigate } from "react-router-dom";
import { PrivateRoute } from "@/global/config";

const AddSalaryForm = ({
  staff,
  onSuccess,
}: { staff: IStaffDetails; onSuccess?: () => void }) => {

  const navigate=useNavigate();
  const {salaryData,setSalaryData,clearSalaryData,addSalary,getLatestSalary} = useStaffProfileStore( );
 
  const handleNepaliDateChange = (e: NepaliDate  , name: string) => {
    setSalaryData({ ...salaryData, [name]: e.toString() });
  };

 
  useEffect(() => {

    
    if (staff?.id) {
      getLatestSalary(staff?.id);
    }
  },[staff?.id])

  //escape key 
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearSalaryData();
        onSuccess?.();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [clearSalaryData, onSuccess]);

  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        if (staff?.id) {
          await addSalary();
          clearSalaryData();
          onSuccess?.();
        }
      }}
    >
      <div>
        <div className="flex justify-end">
          <div
            className="hover:cursor-pointer capitalize bg-orange-50 hover:bg-orange-100 duration-300 text-orange-600 px-1 rounded-md"
            onClick={() =>
              navigate(`/${PrivateRoute}/staff/salary/${staff?.id}`)
            }
          >
            view Salaries
          </div>
        </div>
        <label className="block mb-1 font-medium">Base Salary</label>
        <input
          type="number"
          onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
          value={salaryData?.baseSalary || ""}
          onChange={(e) =>
            setSalaryData({
              ...salaryData,
              baseSalary: Number(e.target.value),
              staffId: staff?.id,
            })
          }
          required
          className="input w-full border border-gray-200 py-2.5 rounded-lg bg-[#FAFAFA] focus:outline-none focus:ring-1 focus:ring-[#E26300] focus:border-[#E26300] text-sm p-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">
          Effective From <span className="text-[#E26300]">*</span>
        </label>
        <div className="relative">
          <div className="absolute left-3 z-50  top-1/2 transform -translate-y-1/2 text-[#2E2E2E]">
            <FiCalendar className="w-4 h-4" />
          </div>
          <NepaliDatePicker
            value={salaryData?.effectiveFrom}
            placeholder="Select date"
            onChange={(e) =>
              handleNepaliDateChange(e as NepaliDate, "effectiveFrom")
            }
            className="pl-9 w-full text-sm border border-gray-200 py-2.5 rounded-lg bg-[#FAFAFA] focus:outline-none focus:ring-1 focus:ring-[#E26300] focus:border-[#E26300]"
          />
        </div>
      </div>
      <div>
        <label className="block mb-1 font-medium">
          Effective To <span className="text-[#E26300]">*</span>
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-50 text-[#2E2E2E]">
            <FiCalendar className="w-4 h-4" />
          </div>
          <NepaliDatePicker
            value={salaryData?.effectiveTo}
            placeholder="Select date"
            onChange={(e) =>
              handleNepaliDateChange(e as NepaliDate, "effectiveTo")
            }
            className="pl-9 w-full text-sm border border-gray-200 py-2.5 rounded-lg bg-[#FAFAFA] focus:outline-none focus:ring-1 focus:ring-[#E26300] focus:border-[#E26300]"
          />
        </div>
      </div>
      <div className="">
        <button
          type="submit"
          className="btn mt-4 bg-orange-500 hover:bg-orange-600 duration-300 text-white rounded-full py-2.5  btn-primary btn-sm w-full"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddSalaryForm;