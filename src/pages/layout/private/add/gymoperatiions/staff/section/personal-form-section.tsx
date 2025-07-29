import { GmailField } from "@/global/components/email/GmailField";
import { StaffFormFields } from "../component/staff-form-fields";
import { useAddStaffFormStore } from "../store";

const PersonalFormSection = () => {
  const { data, setData, activeSection, validationAttempted } =
    useAddStaffFormStore();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  // Group fields by category for better organization
  const personalInfoFields = StaffFormFields.filter((field) =>
    [
      "fullName",
      "email",
      "phone",
      "address",
      "shiftType",
      "staffType",
      "emergencyContact",
      "cardNumber",
      "remarks",
    ].includes(field.name)
  );

  return (
    <div
      className={`${
        activeSection === "personal" ? "block" : "hidden"
      } space-y-6`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {personalInfoFields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label
              htmlFor={field.name}
              className="text-[#2E2E2E] font-medium mb-2 flex items-center"
            >
              {field.label}
              {field.required && <span className="text-[#E26300] ml-1">*</span>}
            </label>
            <div className="relative flex items-center">
              {field.icon && (
                <span className="absolute left-3 text-[#1A1A1A] opacity-70">
                  {field.icon}
                </span>
              )}
              {/* Use GmailField for the email field */}
              {field.name === "email" ? (
                <GmailField
                  value={(data[field.name] as string) || ""}
                  onChange={(val) => setData(field.name, val)}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  error={
                    validationAttempted?.personal &&
                    field?.required &&
                    !data[field.name]
                      ? `${field.label} is required.`
                      : undefined
                  }
                  className={`bg-white pl-10 pr-3 py-3 w-[25em] md:w-[28em] border rounded-md text-[#2E2E2E] shadow-sm focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none transition-all duration-200
                    ${
                      validationAttempted?.personal &&
                      field?.required &&
                      !data[field.name]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                />
              ) : field.type === "select" ? (
                <div className="relative w-full">
                  <select
                    id={field.name}
                    name={field.name}
                    value={(data[field.name] as string) || ""}
                    onChange={handleChange}
                    className={`bg-white pl-10 pr-10 py-3 text-[#2E2E2E] w-full rounded-md border focus:outline-none shadow-sm focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] appearance-none transition-all duration-200
                      ${
                        validationAttempted?.personal &&
                        field?.required &&
                        !data[field.name]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    required={field.required}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((option) => (
                      <option key={option.label} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
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
                </div>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={(data[field.name] as string) || ""}
                  onChange={handleChange}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className={`bg-white pl-10 pr-3 py-3 w-full border rounded-md text-[#2E2E2E] shadow-sm focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none transition-all duration-200
                    ${
                      validationAttempted?.personal &&
                      field?.required &&
                      !data[field.name]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  required={field.required}
                />
              )}
            </div>
            {validationAttempted?.personal &&
              field?.required &&
              !data[field?.name] && (
                <p className="mt-1 text-sm text-red-500 animate-fadeIn">
                  {field.label} is required.
                </p>
              )}

            {/* Validation for phone number length */}
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
      </div>
    </div>
  );
};

export default PersonalFormSection;
