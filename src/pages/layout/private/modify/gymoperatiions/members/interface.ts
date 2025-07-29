import { IResponse } from "../../../../../../global/interface";

export interface IMemberEditFormField {
  name: string;
  label: string;
  type:
    | "text"
    | "number"
    | "textarea"
    | "select"
    | "multiSelect"
    | "email"
    | "tel"
    | "date";
    options?: { label: string; value: number | string }[]; // Applicable for "select" or "multiSelect" types
    required: boolean;  
}

export interface IMemberFacilityOption {
  value: string;
  label: string;
}

export type IEditMemberStore = {
  data: Record<string, string | IMemberFacilityOption[] | number | boolean>; // Edited support for numeric fields like `remainingDays`
  setData: (
    key: string,
    value: string | IMemberFacilityOption[] | number | boolean
  ) => void; // Updated function to handle numeric values

  updateMember: (
    data: Record<string, string | number | boolean>, // Edited support for numeric fields
    id: number
  ) => Promise<IResponse>;
};
