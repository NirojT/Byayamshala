// String fullName,
// String email,
// String phone,
// String address,
// String notes

import { IResponse } from "@/global/interface";

export interface IVisitorsData {
  // id:number;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

export interface IValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
}

// for validating the form

export type section =
  | "fullName"
  | "email"
  | "phone"
  | "address"
  | "notes";

export interface IVisitorStore {
  data: IVisitorsData;
  setData: (data: IVisitorsData) => void;
  clearData: () => void;
  addVisitor: () => Promise<IResponse>;

  // for form validation
  errors :IValidationErrors,
  clearErrors: () => void;
  setErrors: (data:IValidationErrors) => void;
}
