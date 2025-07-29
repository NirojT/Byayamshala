import { IResponse } from "../../../../../../global/interface";
 

export interface IFacilitiesEditFormField {
  name: string;
  label: string;
  type: "text" | "number" | "textarea" | "select";
  required: boolean;
  options?: string[]; // Only applicable for "select" type
}

export interface IFacilitiesEditOption {
  value: string;
  label: string;
}

export type IEditFacilitiesStore = {
  data: Record<string, string | IFacilitiesEditOption | null>; // Single object or null
  setData: (key: string, value: string | IFacilitiesEditOption | null) => void; // Single value setter

  updateFacilities: (
   data: Record<string, string>, // Edited support for numeric fields
    id: number
  ) => Promise<IResponse>;
};



// export interface IFacilitiesFormField {
//   name: string;
//   label: string;
//   type: "text" | "number" | "textarea" | "select" | "multiSelect" | "email" | "tel";
//   required: boolean;
//   options?: string[]; // Applicable for "select" or "multiSelect" types
// }
