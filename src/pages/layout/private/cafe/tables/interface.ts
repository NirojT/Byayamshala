 
import { IAuditDetails, IResponse } from "@/global/interface";
import { IOrderDetails } from "../orders/interface";

export type ITableStore = {
  data: ITableData;
  setData: (data: ITableData) => void;
  clearData: () => void;
  saveTable: (data: ITableData) => Promise<IResponse>;
  getTables: () => Promise<void>;
  tables: ITableDetails[]; // for storing table data

  // for submitting state
  isSubmitting: boolean;
  setIsSubmitting: (status: boolean) => void;

  open: boolean;
  toggleOpen: () => void;
};

export type ITableData = {
  id: number;
  tableNo: string;
  capacity: number;
};
export interface ITableDetails extends IAuditDetails {
  tableNo: string;
  capacity: number;
  isAvailable: boolean;

  orders:IOrderDetails
};
