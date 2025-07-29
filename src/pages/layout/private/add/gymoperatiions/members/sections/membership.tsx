import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import { useAddMemberFormStore } from "../store";
import { useMemberFormFields } from "../component/member-form-fields";
import { defaultNepaliDate } from "@/global/config";
import { useEffect } from "react";

const Membership = () => {
  const {
    activeSection,
    validationAttempted,
    isExistingMember,
    data,
    setData,
  } = useAddMemberFormStore();

  const fields = useMemberFormFields(isExistingMember);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleDateChange = (e: NepaliDate | null, name: string) => {
    setData(name, (e as NepaliDate)?.toString());
  };

  // for filtering the membership fields
  const membershipFields = fields.filter(
    (field) =>
      ["planId", "shiftType", "joiningDate","startDate", "admissionDate","paymentMethod","cardNumber", "remarks"].includes(
        field.name
      ) && !field.hidden
  );

  useEffect(() => {
    setData('joiningDate', defaultNepaliDate.toString())
    setData('startDate', defaultNepaliDate.toString());
  }, []);

  return (
    <div
      className={`space-y-6 ${
        activeSection === "membership" ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center mb-6">
        <div className="h-px bg-gray-200 flex-grow"></div>
        <h3 className="mx-4 text-lg text-[#2E2E2E] font-medium">
          Membership Details
        </h3>
        <div className="h-px bg-gray-200 flex-grow"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {membershipFields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label
              htmlFor={field.name}
              className="text-[#2E2E2E] font-medium mb-2 flex items-center"
            >
              {field.label}
              {field.required && <span className="text-[#E26300] ml-1">*</span>}
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[#1A1A1A] opacity-70">
                {field.icon}
              </span>
              {field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={(data[field.name] as string) || ""}
                  onChange={handleChange}
                  className={`bg-white pl-10 pr-10 py-3 text-[#2E2E2E] block w-full rounded-md border focus:outline-none shadow-sm focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] transition-all duration-200 appearance-none
                    ${
                      validationAttempted?.membership &&
                      field?.required &&
                      !data[field.name]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  required={field.required}
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.name === "joiningDate" ||
                field.name === "startDate" ||
                field.name === "admissionDate" ? (
                <div className="relative w-full">
                  <NepaliDatePicker
                    value={
                      typeof data?.[field.name] === "string"
                        ? new NepaliDate(data[field.name] as string)
                        : defaultNepaliDate
                    }
                    placeholder="Select date"
                    // onChange={(e) => handleDateChange(e, "joiningDate")}
                    onChange={(e) => handleDateChange(e, field.name)}
                    className={`w-full pl-10 pr-3 py-3 bg-white text-[#2E2E2E] border rounded-md focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none transition-all duration-200
                      ${
                        validationAttempted?.membership &&
                        field?.required &&
                        !data[field.name]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                  />
                </div>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={(data[field.name] as string) || ""}
                  onChange={handleChange}
                  className={`bg-white pl-10 pr-3 py-3 w-full border rounded-md text-[#2E2E2E] shadow-sm focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none transition-all duration-200
                    ${
                      validationAttempted?.membership &&
                      field?.required &&
                      !data[field.name]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  required={field.required}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              )}

              {field.type === "select" && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>

            {validationAttempted?.membership &&
              field?.required &&
              !data[field?.name] && (
                <p className="mt-1 text-sm text-red-500 animate-fadeIn">
                  {field.label} is required.
                </p>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Membership;