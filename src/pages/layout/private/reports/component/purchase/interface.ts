import {
  PartyType,
  PaymentMode,
  ReportPeriod,
} from "@/global/components/enums/enums";
import { IAuditDetails, IResponse } from "../../../../../../global/interface";
import { IPurchaseItem } from "../../../add/finance/purchase/interface";

export interface IPurchaseDetails extends IAuditDetails {
  billNo: string;
  // date: string;
  partyName: string;
  partyType: PartyType;
  purchaseItemsRes: IPurchaseItem[];
  paymentMode: PaymentMode;
  totalAmt: number;
  status: string;
  partialAmt: number;
  notes: string;
  imageName: string; // bill image
}

export type IListPurchaseStore = {
  purchase: IPurchaseDetails[];

  getPurchaseById: (id: number) => Promise<void>;
  deletePurchase: (id: number) => Promise<IResponse>;

  searchQuery: () => Promise<IResponse>;
  filterData: IPurchaseFilterData;
  setFilterData: (data: IPurchaseFilterData) => void;
  totalAmt: number;
  setTotalAmt: (total: number) => void;
};

export interface IPurchaseFilterData {
  billNo: string;
  reportPeriod: ReportPeriod | null; // e.g., Today, This Week, This Month, Custom
  startDate: string;
  endDate: string;
}

export interface IPaymentDetails extends IAuditDetails {
  amount: number; // Payment amount
  paymentMethod: string; // e.g., Cash, Card, Bank Transfer

  paymentStatus: string; // Successful or failed

  transactionReference: string; // Unique ID for tracking transactions Purchasehip,
}
