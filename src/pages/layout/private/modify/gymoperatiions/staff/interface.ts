import { IResponse } from "../../../../../../global/interface";
import { IStaffSpecializationOption } from "../../../add/gymoperatiions/staff/interface";

export interface IStaffEditFormField {
  name: string;
  label: string;
  type:
    | "text"
    | "number"
    | "textarea"
    | "select"
    | "multiSelect"
    | "email"
    | "tel";
  required: boolean;
  options?: { label: string; value: number | string }[]; // Applicable for "select" or "multiSelect" types
 
}

export interface IStaffFacilityOption {
  value: string;
  label: string;
}

export type IEditStaffStore = {
  data: Record<string, string| string[] | IStaffSpecializationOption[] | number | boolean>; // Edited support for numeric fields like `remainingDays`
  setData: (
    key: string,
    value: string |  string[] | IStaffFacilityOption[] | number | boolean
  ) => void; // Updated function to handle numeric values

  updateStaff: (
    data: Record<string, string | number | boolean>, // Edited support for numeric fields
    id: number
  ) => Promise<IResponse>;
};


// export interface IStaffFormField {
//   name: string;
//   label: string;
//   type: "text" | "number" | "textarea" | "select" | "multiSelect" | "email" | "tel";
//   required: boolean;
//   options?: string[]; // Applicable for "select" or "multiSelect" types
// }
 