import {
  PaymentMode,
  ReportPeriod,
  TransactionType,
} from "@/global/components/enums/enums";
import { IAuditDetails, IResponse } from "@/global/interface";

export interface IBusinessStatsDetails {
  totalDiscount: number;
  purchase: number;
  sales: number;
  expenses: number;
  purchaseReturn: number;
  totalMemberShip: number;
  totalAdmissionFee: number;
 
  salesReturn: number;
  accountPayable: number;
  accountReceivable: number;
  closingStock: number;
  noOfStock: number;

  //for management
  totalMember: number;
  activeMember: number;
  inActiveMember: number;
  deactivatedMember: number;
  deletedMember: number;
  totalVisitor: number;
  totalTrainer: number;
  totalFacility: number;
  totalPlan: number;
}

export type IBusinessStatsStore = {
  businessStats: IBusinessStatsDetails;
  getBusinessStats: () => Promise<void>;
  generatePdf: () => Promise<IResponse>;
  generateExcel: () => Promise<IResponse>;
  filterData: IBusinessStatsFilterData;
  setFilterData: (data: IBusinessStatsFilterData) => void;
  filters: IBusinessStatsFilterData;
  setFilters: (data: IBusinessStatsFilterData) => void;
  pdf: Blob | string | null;
  setPdf: (pdf: Blob | null) => void;

  transactions: ITransactionDetails[];
  getTransaction: () => Promise<void>;

  // for setting the current tab
  currentTab: string;
  setCurrentTab: (tab: string) => void;
};

export interface IBusinessStatsFilterData {
  reportPeriod: ReportPeriod | null; // e.g., Today, This Week, This Month, Custom
  startDate: string;
  endDate: string;
}

export interface ITransactionDetails extends IAuditDetails {
  memberFacilityId: any;
  paymentMode: PaymentMode;
  amt: number;
  purchaseId: number;
  salesId: number;
  expenseId: number;
  memberId: number;
  memberShipId: number;
  savingId: number;
  savingArchiveId: number;
  partyAccountId: number;

  transactionType: TransactionType; // sales, purchase, expense, membership, cash, bank, inventory, par
}
