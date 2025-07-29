import { IResponse } from "../../../../../../global/interface";
 

export interface IPlansEditFormField {
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
  required: boolean;
  options?: string[]; // Applicable for "select" or "multiSelect" types
  hidden?: boolean; // New property to conditionally hide fields
}

export interface IPlansFacilitiesOption {
  value: number;
  label: string;
}

export type IEditPlansStore = {
  data: Record<
    string,
    string | string[] | number[] | IPlansFacilitiesOption[] | number | boolean
  >; // Edited support for numeric fields like `remainingDays`
  setData: (
    key: string,
    value:
      | string
      | string[]
      | number[]
      | IPlansFacilitiesOption[]
      | number
      | boolean
  ) => void; // Updated function to handle numeric values

  updatePlans: (
    data: Record<string, string | number | number[] | boolean>, // Edited support for numeric fields
    id: number
  ) => Promise<IResponse>;
};


 
 