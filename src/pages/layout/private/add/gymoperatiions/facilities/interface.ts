import { IResponse } from "../../../../../../global/interface";

export interface IFacilitiesFormField {
  name: string;
  label: string;
  type: "text" | "number" | "textarea" | "select";
  required: boolean;
  options?: string[]; // Only applicable for "select" type
}

export interface IFacilitiesOption {
  value: string;
  label: string;
}
export type IAddFacilitiesStore = {
  data: Record<string, string | IFacilitiesOption | null>; // Single object or null
  setData: (key: string, value: string | IFacilitiesOption | null) => void; // Single value setter
  clearData: () => void;
  createFacilities: (data: Record<string, string>) => Promise<IResponse>;

  // for submitting form
  // for submitting state
  isSubmitting: boolean;
  setIsSubmitting: (status: boolean) => void;

  // for submitting state
  showPreview: boolean;
  setShowPreview: (status: boolean) => void;

  // for attempt of validation
  validationAttempted: boolean;
  setIsValiationAttempted: (status: boolean) => void;
};
