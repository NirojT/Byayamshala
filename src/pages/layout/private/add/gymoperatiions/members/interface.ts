import { ReactNode } from "react";
import { IResponse } from "../../../../../../global/interface";
import { NepaliDate } from "@zener/nepali-datepicker-react";
import { FileType } from "@/global/components/enums/enums";

export interface IMemberFormField {
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
    | "date"
    | "radio"
    ;
  required: boolean;
  options?: { label: string; value: number | string  }[]; // Supports label-value pairs for select options
  hidden?: boolean; // New property to conditionally hide fields
  icon?: ReactNode
}

export interface IMemberFacilityOption {
  value: string;
  label: string;
}

type Section =
  "personal" |
  "membership" |
  "additional"


export interface IValidationAttemptedOptions {
  personal: boolean,
  membership: boolean,
  additional:boolean,
}

export type IAddMemberStore = {
  // Add support for NepaliDate for 'birthDate'
  data: Record<
    string,
    string | IMemberFacilityOption[] | number | boolean | NepaliDate
  >; // Added support for numeric fields like `existingEndDate`
  setData: (
    key: string,
    value: string | IMemberFacilityOption[] | number | boolean
  ) => void; // Updated function to handle numeric values
  clearData: () => void; // Clears the form data
  createMember: (
    data: Record<string, string | number | boolean> // Added support for numeric fields
  ) => Promise<IResponse>;

  isModalOpen: boolean;
  setIsModalOpen: (value?: boolean) => void;
  setIsExistingMember: (value?: boolean) => void;
  // setIsModalOpen: () => void;
  // setIsExistingMember: (value: boolean) => void; // Updates the `isExistingMember` state

  isExistingMember: boolean; // Tracks if the member is an existing one
  existingEndDate?: number; // Tracks the remaining days for existing members
  setExistingEndDate: (value: number) => void; // Updates the `existingEndDate` state

  remainingDays: number;

  errors: Record<string, string | undefined>; // Add this for validation errors
  clearErrors: () => void;

  // for tracking validation attempted
  validationAttempted: Record<Section, boolean>;
  setValidationAttempted: (option: string, value: boolean) => void;
  resetValidation: () => void;

  // the state for managing the current active section
  activeSection: string;
  setActiveSection: (section: string) => void;

  //for bulk
  fileType: FileType; // Tracks the type of file being uploaded
  setFileType: (type: FileType) => void; // Updates the `fileType` state
  bulkAdd: (file: File) => Promise<IResponse>;

  printBill: boolean;
  setPrintBill: (printBill: boolean) => void;
}; 