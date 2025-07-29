import { AdjustmentType } from "@/global/components/enums/enums";
import { IAuditDetails, IResponse } from "@/global/interface";

export interface IStaffFilterData {
  fullName: string;
  shift: string;
}

export interface DetailItemProps {
  label: string;
  value: string | number | null | undefined;
  status?: boolean;
}

// --- Salary & Adjustment & Payroll interfaces (example, adjust as needed) ---
export interface IStaffSalaryData {
  staffId: number;
  baseSalary: number;
  effectiveFrom: string;
  effectiveTo?: string | null;
}
export interface ISalaryAdjustmentData {
  staffId: number;
  type: AdjustmentType;
  amount: number;
  reason?: string;
  adjustmentDate: string;
}
export interface IPayrollRecordData {
  staffId: number;

  processedDate: string;
  baseSalary: number;
  totalAdjustments: number;
  netPay: number;
  futurePay: number;
  adjustments: ISalaryAdjustmentData[];
}

//details
export interface IStaffSalaryDetails extends IAuditDetails {
  staffId: number;
  baseSalary: number;
  effectiveFrom: string;
  effectiveTo?: string | null;
}
export interface ISalaryAdjustmentDetails extends IAuditDetails {
  staffId: number;
  type: AdjustmentType;
  amount: number;
  reason?: string;
  adjustmentDate: string;
}
export interface IPayrollRecordDetails extends IAuditDetails {
  staffId: number;

  processedDate: string;
  baseSalary: number;
  totalAdjustments: number;
  netPay: number;
  futurePay: number;
  adjustments: ISalaryAdjustmentDetails[];
}

export interface IStaffProfileStore {
  salaries: IStaffSalaryDetails[];
  adjustments: ISalaryAdjustmentDetails[];
  payrolls: IPayrollRecordDetails[];
  loading: boolean;

  fetchAll: (staffId: number) => Promise<void>;
  addSalary: () => Promise<void>;
  addAdjustment: () => Promise<void>;
  addPayroll: () => Promise<void>;
  uploadProfileImage: (file: File, memberId: number) => Promise<IResponse>;

  salaryData: IStaffSalaryData;
  setSalaryData: (data: IStaffSalaryData) => void;
  adjustmentData: ISalaryAdjustmentData;
  setAdjustmentData: (data: ISalaryAdjustmentData) => void;
  payrollData: IPayrollRecordData;
  setPayrollData: (data: IPayrollRecordData) => void;

  clearSalaryData: () => void;
  clearAdjustmentData: () => void;
  clearPayrollData: () => void;

  getSalarys: (staffId: number) => Promise<void>;
  getAdjustments: (staffId: number) => Promise<void>;
  getPayrolls: (staffId: number) => Promise<void>;
  getLatestSalary: (staffId: number) => Promise<void>;
  prepareForPayroll: (staffId: number) => Promise<void>;

  deleteSalary: (id: number) => Promise<IResponse>;
  deleteSalaryAdjustment: (id: number) => Promise<IResponse>;
  deletePayroll: (id: number) => Promise<IResponse>;

  //pagination
  page1: number;
  setPage1: (data: number) => void;
  rowsPerPage1: number;
  setRowsPerPage1: (data: number) => void;
  totalLength1: number;

  page2: number;
  setPage2: (data: number) => void;
  rowsPerPage2: number;
  setRowsPerPage2: (data: number) => void;
  totalLength2: number;

  page3: number;
  setPage3: (data: number) => void;
  rowsPerPage3: number;
  setRowsPerPage3: (data: number) => void;
  totalLength3: number;

  salaryAdjFilterdata: ISalaryAdjustmentDetails[];
  setSalaryAdjFilterdata: (data: ISalaryAdjustmentDetails[]) => void;
}
