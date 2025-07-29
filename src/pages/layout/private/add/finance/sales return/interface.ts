import { IResponse } from "../../../../../../global/interface";
import { ISalesDetails } from "../../../reports/component/sales/interface";

export type IAddSalesReturnStore = {
  data: ISalesReturnData[];
  setData: (data: ISalesReturnData) => void;
  setDataList: (data: ISalesReturnData[]) => void;
  clearData: () => void;
  returnSales: (id: number) => Promise<IResponse>;

  billNo: string;
  setBillNo: (billNo: string) => void;
  salesDetail: ISalesDetails;
  clearSalesDetail: () => void;
  getSalesByBillNo: () => Promise<IResponse>;
  getSalesById: (id: number) => Promise<void>;

  // for submitting state
  isSubmitting: boolean;
  setIsSubmitting: (status: boolean) => void;

  // for submitting state
  isSearching: boolean;
  setIsSearching: (status: boolean) => void;

  // for submitting state
  showSucesssMessage: boolean;
  setShowSuccessMessage: (status: boolean) => void;
};

export type ISalesReturnData = {
  itemName: string;
  returnedQty: number;
  quantity: number;
};
