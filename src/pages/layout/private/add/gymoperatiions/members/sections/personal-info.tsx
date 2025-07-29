import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import { useAddMemberFormStore } from "../store";
import { useMemberFormFields } from "../component/member-form-fields";
import { GmailField } from "@/global/components/email/GmailField";
import { useEffect } from "react";

const PersonalInfo = () => {
  const {
    activeSection,
    validationAttempted,
    isExistingMember,
    data,
    setData,
  } = useAddMemberFormStore();

  const fields = useMemberFormFields(isExistingMember);

  // Only the main fields for personal info (excluding gender)
  const personalFields = fields.filter(
    (field) =>
      [
        "fullName",
        "email",
        "phone",
        "address",
        "emergencyContact",
        "weight",
        "height",
        "occupation",
        "bloodGroup",
        "guardianName",
        "healthCondition",
      ].includes(field.name) && !field.hidden
  );

  // Gender field (to be rendered last)
  const genderField = fields.find(
    (field) => field.name === "gender" && !field.hidden
  );

  // Set default for gender if not already set
  useEffect(() => {
    if (!data.gender) {
      setData("gender", "M");
    }
  }, [data?.gender, setData]);

  const handleAddBirthDate = (e: NepaliDate | null) => {
    setData("birthDate", (e as NepaliDate)?.toString());
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  return (
    <div
      className={`space-y-6 ${
        activeSection === "personal" ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center mb-6">
        <div className="h-px bg-gray-200 flex-grow"></div>
        <h3 className="mx-4 text-lg text-[#2E2E2E] font-medium">
          Personal Information
        </h3>
        <div className="h-px bg-gray-200 flex-grow"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {personalFields.map((field) => (
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
              {field.name === "email" ? (
                <GmailField
                  value={(data[field.name] as string) || ""}
                  onChange={(val) => setData(field.name, val)}
                  placeholder={`Enter ${field.label?.toLowerCase()}`}
                  error={
                    validationAttempted.personal &&
                    field.required &&
                    !data[field.name]
                      ? `${field.label} is required`
                      : undefined
                  }
                  className={`bg-white pl-10 pr-3 py-3  w-[25em] md:w-[28em] border rounded-md text-[#2E2E2E] shadow-sm focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none transition-all duration-200
                    ${
                      validationAttempted.personal &&
                      field.required &&
                      !data[field.name]
                        ? "border-red-500"
                        : "border-gray-300"
                    }
                    
                    `}
                />
              ) : field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={(data[field.name] as string) || ""}
                  onChange={handleChange}
                  className={`bg-white pl-10 pr-3 py-3 w-full border rounded-md text-[#2E2E2E] shadow-sm focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none transition-all duration-200
                    ${
                      validationAttempted.personal &&
                      field.required &&
                      !data[field.name]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  rows={2}
                  required={field.required}
                  placeholder={`Enter ${field.label?.toLowerCase()}`}
                />
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={(data[field.name] as string) || ""}
                  onChange={handleChange}
                  className={`bg-white pl-10 pr-3 py-3 w-full border rounded-md text-[#2E2E2E] shadow-sm focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none transition-all duration-200
                    ${
                      validationAttempted.personal &&
                      field.required &&
                      !data[field.name]
                        ? "border-red-500"
                        : "border-gray-300"
                    } `}
                  required={field.required}
                  placeholder={`Enter ${field.label?.toLowerCase()}`}
                />
              )}

              {/* Error indicator */}
              {validationAttempted.personal &&
                field.required &&
                !data[field.name] && (
                  <span className="absolute right-3 text-red-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                )}
            </div>

            {/* Validation error messages */}
            {validationAttempted.personal &&
              field.required &&
              !data[field.name] &&
              field.name !== "email" && (
                <p className="mt-1 text-sm text-red-500 animate-fadeIn">
                  {field.label} is required
                </p>
              )}

            {/* Phone validation */}
            {validationAttempted.personal &&
              field.name === "phone" &&
              data[field?.name] &&
              data["phone"].toString().length !== 10 && (
                <p className="mt-1 text-sm text-red-500 animate-fadeIn">
                  Please make sure that the number is 10 digits.
                </p>
              )}
          </div>
        ))}

        {/* Birth Date */}
        <div>
          <label className="block text-[#2E2E2E] font-medium mb-2">
            Birth Date 
          </label>
          <div className="relative">
            <NepaliDatePicker
              value={data?.date as string}
              placeholder="Add birthdate"
              onChange={(e) => handleAddBirthDate(e)}
              className="bg-white pl-10 pr-3 py-3 w-full border border-gray-300 rounded-md text-[#2E2E2E] shadow-sm focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1A1A1A] opacity-70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Gender at last */}
        {genderField && (
          <div className="flex flex-col">
            <label
              htmlFor={genderField.name}
              className="text-[#2E2E2E] font-medium mb-2 flex items-center"
            >
              {genderField.label}
              {genderField.required && (
                <span className="text-[#E26300] ml-1">*</span>
              )}
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[#1A1A1A] opacity-70">
                {genderField.icon}
              </span>
              <div className="pl-10 flex gap-6">
                {genderField.options?.map((option) => (
                  <label key={option.value} className="flex items-center gap-1">
                    <input
                      type="radio"
                      name={genderField.name}
                      value={option.value}
                      checked={data[genderField.name] === option.value}
                      onChange={handleChange}
                      required={genderField.required}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
              {/* Error indicator */}
              {validationAttempted.personal &&
                genderField.required &&
                !data[genderField.name] && (
                  <span className="absolute right-3 text-red-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                )}
            </div>
            {validationAttempted.personal &&
              genderField.required &&
              !data[genderField.name] && (
                <p className="mt-1 text-sm text-red-500 animate-fadeIn">
                  {genderField.label} is required
                </p>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;
