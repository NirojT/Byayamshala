import { PartyType, PaymentMode } from "@/global/components/enums/enums";
import { IResponse } from "../../../../../../global/interface";

export type IAddPurchaseStore = {
  data: IPurchaseData;
  setData: (data: IPurchaseData) => void;
  clearData: () => void;
  createPurchase: (data: IPurchaseData) => Promise<IResponse>;
  constructFormData: (data: IPurchaseData) => FormData;
  thirdPartyNames: string[];
  supplierNames: string[];
  memberNames: string[];
  items: IItemSpAndCp[];
  getNamesOfMemberAndItem: () => void;
  updatePurchase: (id: number, data: IPurchaseData) => Promise<IResponse>;
  getPurchaseById: (id: number) => Promise<void>;
  openDelete: boolean;
  setOpenDelete: (open: boolean) => void;
};

export type IPurchaseData = {
  partyType: PartyType;
  partialAmt: number;
  billNo: string;
  date: string;
  partyName: string;
  // supplierName: string;
  // thirdPartyName: string;

  purchaseItemsReq: IPurchaseItem[];
  paymentMode: PaymentMode;
  totalAmt: number;
  notes: string;
  image: null | File;
  imageName: string;
};

export type IPurchaseItem = {
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
