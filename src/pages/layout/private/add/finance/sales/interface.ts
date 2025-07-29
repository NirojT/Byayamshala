import { PartyType, PaymentMode } from "@/global/components/enums/enums";
import { IResponse } from "../../../../../../global/interface"; 

 

 
 

export type IAddSalesStore = {
  data: ISalesData;
  setData: (data: ISalesData) => void;
  clearData: () => void;
  createSales: (data: ISalesData) => Promise<IResponse>;
  updateSales: (id: number, data: ISalesData) => Promise<IResponse>;
  getSalesById: (id: number) => Promise<void>;
 getNamesOfItem: () => Promise<void>
 quickSales: (data: ISalesItem[],paymentMode:PaymentMode) => Promise<IResponse>
items: IItemSpAndCp[];

  pdf: Blob | null;
  setPdf: (pdf: Blob | null) => void;

  // for additional details
  addAdditionalDetails: boolean;
  setAddAdditioalDetails: (curr: boolean) => void;

  openDelete: boolean;
  setOpenDelete: (openDelete: boolean) => void;
  printBill: boolean;
  setPrintBill: (printBill: boolean) => void;
};


export type ISalesData = {
  partyType: PartyType;
  partialAmt: number;
  billNo: string;
  date: string;

  salesItemsReq: ISalesItem[];
  paymentMode: PaymentMode;
  totalAmt: number;
  notes: string;

  partyName: string;
  // memberName: string;
  // supplierName: string; // if it is supplier
 
  // thirdPartyName: string; // if it is third party
};

export type ISalesItem = {
  originalPrice: number;
  itemName: string;
  quantity: number;
  returnedQty: number;
  discount: number;
  price: number;
};
export type IItemSpAndCp = {
  name: string;
  sp: number;
  cp: number; 
};

 