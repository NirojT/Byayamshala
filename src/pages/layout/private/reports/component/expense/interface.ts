import { ExpenseType, PaymentMode, ReportPeriod } from "@/global/components/enums/enums";
import { IAuditDetails, IResponse } from "../../../../../../global/interface";
 

export interface IExpenseDetails extends IAuditDetails {
  expenseType:ExpenseType
   paymentMode: PaymentMode;
  //  date:string,
   totalAmt: number;
   notes: string;
}

 
export type IListExpenseStore = {
  expense: IExpenseDetails[];

  getExpenseById: (id: number) => void;
  deleteExpense: (id: number) => Promise<IResponse>;

  searchQuery: () => Promise<IResponse>;
  filterData: IExpenseFilterData;
  setFilterData: (data: IExpenseFilterData) => void;
  
  totalAmt: number;
  setTotalAmt: (total: number) => void;
};

 
export interface IExpenseFilterData {
  
  reportPeriod: ReportPeriod | null; // e.g., Today, This Week, This Month, Custom
  startDate: string;
  endDate: string;
}
 
