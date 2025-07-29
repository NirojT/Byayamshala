import { ShiftType } from "@/global/components/enums/enums";
import { IMemberEditFormField } from "../interface";

export const useMemberEditFormFields = (): IMemberEditFormField[] => {
  return [
    { name: "fullName", label: "Full Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: false },
    { name: "phone", label: "Phone", type: "tel", required: true },
    { name: "address", label: "Address", type: "text", required: true },
    {
      name: "shiftType",
      label: "Shift Type",
      type: "select",

      options: Object.values(ShiftType).map((shiftType: ShiftType) => ({
        value: shiftType.toString(),
        label: shiftType.toString(),
      })),

      required: true,
    },

    // Hide or make optional if Existing Member

    { name: "remarks", label: "Remarks", type: "textarea", required: false },
    {
      name: "birthDate",
      label: "Birth Date",
      type: "tel",
      required: true,
    },
    {
      name: "joiningDate",
      label: "Joining Date",
      type: "tel",
      required: true,
    },
    {
      name: "emergencyContact",
      label: "Emergency Contact",
      type: "tel",
      required: false,
    },
    {
      name: "admissionFee",
      label: "Admission Fee",
      type: "number",
      required: false,
    },

    {
      name: "gender",
      label: "Gender",
      type: "select",

      options: Object.values(["M", "F"]).map((shiftType: string) => ({
        value: shiftType.toString(),
        label: shiftType.toString(),
      })),

      required: true,
    },
    {
      name: "cardNumber",
      label: "Door Card Number",
      type: "text",
      required: false,
    },

    {
      name: "weight",
      label: "Weight (kg)",
      type: "number",
      required: false,
    },
    {
      name: "height",
      label: "Height (ft)",
      type: "number",
      required: false,
    },
    // occupation,bloodGroup,gaurdianName,healthCondition

    {
      name: "bloodGroup",
      label: "Blood Group",
      type: "text",
      required: false,
    },
    {
      name: "guardianName",
      label: "Guardian Name",
      type: "text",
      required: false,
    },
    {
      name: "healthCondition",
      label: "Health Condition",
      type: "text",
      required: false,
    },
    {
      name: "occupation",
      label: "Occupation",
      type: "text",
      required: false,
    },
  ];
};
