import {
  PartyType,
  PaymentMode,
  PrintFormat,
  ReportPeriod,
} from "@/global/components/enums/enums";
import { IAuditDetails, IResponse } from "../../../../../../global/interface";
import { ISalesItem } from "../../../add/finance/sales/interface";

export interface ISalesDetails extends IAuditDetails {
  billNo: string;
  // date: string;
  partyName: string;
  partyType: PartyType;
  salesItemsRes: ISalesItem[];
  paymentMode: PaymentMode;
  totalAmt: number;
  status: string;
  partialAmt: number;
  notes: string;
}

export type IListSalesStore = {
  sales: ISalesDetails[];
  getSalesById: (id: number) => Promise<void>;
  // added below
  searchQuery: () => Promise<IResponse>;
  filterData: ISalesFilterData;
  setFilterData: (data: ISalesFilterData) => void;

  // added above

  deleteSales: (id: number) => Promise<IResponse>;
  printSales: (id: number) => Promise<IResponse>;
  printFormat: PrintFormat;
  setPrintFormat: (printFormat: PrintFormat) => void;
  // pdf: Blob | null;
  // setPdf: (pdf: Blob | null) => void;

  totalAmt: number;
  setTotalAmt: (total: number) => void;
  discount: number;
  setDiscount: (discount: number) => void;

  inDepthReport: boolean;
  setInDepthReport: (inDepthReport: boolean) => void;
};

export interface ISalesFilterData {
  billNo: string;
  reportPeriod: ReportPeriod | null; // e.g., Today, This Week, This Month, Custom
  startDate: string;
  endDate: string;
}
