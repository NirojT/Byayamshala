import { IToasterData } from "@/global/components/toaster/interface";
import { IMemberFacilityOption, IMemberFormField } from "./interface";
import { NepaliDate } from "@zener/nepali-datepicker-react";

export class AddMemberFormHelper {
  validateSection = (
    fields: IMemberFormField[],
    data: Record<
      string,
      string | number | boolean | IMemberFacilityOption[] | NepaliDate
    >
  ): { isValid: boolean; firstInvalidField: string } => {
    let isValid = true;
    let firstInvalidField = "";

    for (const field of fields) {
      const value = data[field.name];

      // Check required fields: for NepaliDate, ensure it's not null/undefined
      if (
        field.required &&
        (value === undefined ||
          value === null ||
          (typeof value === "string" && value.trim() === "") ||
          (value instanceof Array && value.length === 0))
      ) {
        isValid = false;
        if (!firstInvalidField) firstInvalidField = field.name;
        continue;
      }

      // Custom validation for phone (assumes phone is string)
      if (
        field.name === "phone" &&
        typeof value === "string" &&
        value &&
        !/^\d{10}$/.test(value.replace(/\D/g, ""))
      ) {
        isValid = false;
        if (!firstInvalidField) firstInvalidField = field.name;
      }

      // Custom validation for email (assumes email is string)
      if (
        field.name === "email" &&
        typeof value === "string" &&
        value &&
        !/^\S+@\S+\.\S+$/.test(value)
      ) {
        isValid = false;
        if (!firstInvalidField) firstInvalidField = field.name;
      }

      // Optionally, you can add validation for NepaliDate here if needed
      // Example: if field is a date field, ensure value is instanceof NepaliDate
      if (
        field.type === "date" &&
        value !== null &&
        value !== undefined &&
        !(value instanceof NepaliDate)
      ) {
        isValid = false;
        if (!firstInvalidField) firstInvalidField = field.name;
      }
    }

    return { isValid, firstInvalidField };
  };

  handleSectionTransition = (
    activeSection: string,
    validatePersonal: () => { isValid: boolean; firstInvalidField: string },
    validateMembership: () => { isValid: boolean; firstInvalidField: string },
    setToasterData: (data: IToasterData) => void,
    setActiveSection: (section: "personal" | "membership") => void,
    setValidationAttempted: (
      section: "personal" | "membership",
      attempted: boolean
    ) => void,
    setIsModalOpen: (open: boolean) => void
  ) => {
    if (activeSection === "personal") {
      setValidationAttempted("personal", true);
      const validation = validatePersonal();

      if (!validation.isValid) {
        setToasterData({
          message: "Please fill all required personal information",
          severity: "error",
          open: true,
        });

        setActiveSection("personal");
        setTimeout(() => {
          document.getElementById(validation.firstInvalidField)?.focus();
        }, 100);
        return;
      }

      setActiveSection("membership");
    } else if (activeSection === "membership") {
      setValidationAttempted("membership", true);
      const validation = validateMembership();

      if (!validation.isValid) {
        setToasterData({
          message: "Please fill all required membership information",
          severity: "error",
          open: true,
        });

        setActiveSection("membership");
        setTimeout(() => {
          document.getElementById(validation.firstInvalidField)?.focus();
        }, 100);
        return;
      }

      setIsModalOpen(true);
    }
  };
}
