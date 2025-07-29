import { IAuditDetails, IGenericFilterData, IResponse } from "@/global/interface";

export interface IDayEndClosingData{
  
  // }
  actualClosingCash: number;
  cashDiscrepancy: number;
  cashDiscrepancyReason: string;
  actualClosingBank: number;
  bankDiscrepancy: number;
  bankDiscrepancyReason: string;
  handledBy: string;
  remarks: string;

}

export interface IDayEndClosingDetails extends IAuditDetails {
  openingCash: number;
  totalCashIncome: number;
  totalCashExpense: number;
  expectedClosingCash: number;
  actualClosingCash: number;
  cashDiscrepancy: number; // actual - expected
  cashDiscrepancyReason: string;

  // ---- BANK FIELDS ----
  openingBank: number;
  totalBankIncome: number;
  totalBankExpense: number;
  expectedClosingBank: number;
  actualClosingBank: number;
  bankDiscrepancy: number; // optional
  bankDiscrepancyReason: string; // optional
  handledBy: string; // employee or user id
  remarks: string;
}

export type IDayEndClosingStore = {
  data: IDayEndClosingData;
  setData: (data: IDayEndClosingData) => void;
  clearData: () => void;

  dayEndClosingDetails: IDayEndClosingDetails;
  dayEndClosingDetailsList: IDayEndClosingDetails[];

  getToday: () => Promise<void>;

  entry: () => Promise<IResponse>;

  filter: IGenericFilterData;
  setFilter: (data: IGenericFilterData) => void;
  clearFilter: () => void;
  searchQuery: () => Promise<IResponse>;

    // for changing filter
    currentTab: string,
    setCurrentTab: (value:string) => void;
};
 