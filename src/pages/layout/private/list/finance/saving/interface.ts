import { ReportPeriod, SavingActivity } from "@/global/components/enums/enums";
import { IAuditDetails, IResponse } from "../../../../../../global/interface";

export type IListSavingStore = {
  savings: ISavingDetails[];
  setSavings: (data: ISavingDetails) => void;
  getSaving: () => Promise<void>;

  savingArchives: ISavingArchiveDetails[];
  setSavingsArchives: (data: ISavingArchiveDetails) => void;
  // getSavingActivity: (id: number) => Promise<void>;
  deleteActivity: (id: number) => Promise<IResponse>;
  savingBalance: ISavingBalanceDetails;
  getSavingBalance: (id: number) => Promise<void>;

  totalLength: number;
  page: number;
  setPage: (data: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (data: number) => void;



    searchQuery: () => Promise<IResponse>;
    filterData: ISavingFilterData;
    setFilterData: (data: ISavingFilterData) => void;
    totalAddedAmt: number;
    setTotalAddedAmt: (total: number) => void;
    totalWithDrawAmt: number;
    setTotalWithDrawAmt: (total: number) => void;
};

export interface ISavingDetails extends IAuditDetails {
  accountName: string;
  openingBalance: number;
  netBalance: number;
  remarks: string;
}
export interface ISavingArchiveDetails extends IAuditDetails {
  amt: number;
  remarks: string; 
  activity: SavingActivity;
}
export interface ISavingBalanceDetails {
  addedAmt: number;
  withDrawAmt: number;
}

export interface ISavingFilterData {
  savingId:number
  reportPeriod: ReportPeriod | null; // e.g., Today, This Week, This Month, Custom
  startDate: string;
  endDate: string;
}

