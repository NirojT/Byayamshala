import { IResponse } from "../../../../../../global/interface";

export interface IPlanFormField {
  name: string;
  label: string;
  type: "text" | "number" | "textarea" | "select" | "multiSelect";
  required: boolean;
  options?: { value: string | number; label: string }[] | string[]; // Updated to allow string[] for simple cases
}

export interface IPlanFacilityOption {
  value: string;
  label: string;
}

export type IAddPlanStore = {
  data: Record<string, string | IPlanFacilityOption[] | number[]>;
  setData: (
    key: string,
    value: string | IPlanFacilityOption[] | number[]
  ) => void; // Include number[] here
  clearData: () => void;
  createPlan: (data: Record<string, string | number[]>) => Promise<IResponse>;

  // for selecting the duration 
  selectedDuration : string;
  setSelectedDuration: (newDuration: string) => void;

  // for submitting state
  isSubmitting: boolean,
  setIsSubmitting: (status: boolean) => void;

  // for attempt of validation
  validationAttempted :boolean;
  setIsValiationAttempted : (status:boolean) => void;

};
