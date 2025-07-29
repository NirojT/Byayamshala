import { ReactNode } from "react";
import { IResponse } from "../../../../../../global/interface";

export interface IStaffFormField {
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
  icon: ReactNode;
}

export interface IStaffSpecializationOption {
  value: string;
  label: string;
}

type Section = "personal" | "professional";

export interface IValidationAttemptedOptions {
  personal: boolean;
  professional: boolean;
}

export type IAddStaffStore = {
  data: Record<string, string | string[] | IStaffSpecializationOption[]>; // Form data storage
  setData: (
    key: string,
    value: string | string[] | IStaffSpecializationOption[]
  ) => void; // Function to update form data
  clearData: () => void;
  createStaff: (data: Record<string, string>) => Promise<IResponse>;

  // for tracking validation attempted
  validationAttempted: Record<Section, boolean>;
  setValidationAttempted: (option: string, value: boolean) => void;
  resetValidation: () => void;

  // the state for managing the current active section
  activeSection: string;
  setActiveSection: (section: string) => void;
};
