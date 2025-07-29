 
import { IResponse } from "../../../../../../global/interface"; 
import { IPurchaseDetails } from "../../../reports/component/purchase/interface";
 
 

 
 

export type IAddPurchaseReturnStore = {
  data: IPurchaseReturnData[];
  setData: (data: IPurchaseReturnData) => void;
  setDataList: (data: IPurchaseReturnData[]) => void;
  clearData: () => void;
  returnPurchase: (id: number) => Promise<IResponse>;

  billNo: string;
  setBillNo: (billNo: string) => void;
  purchaseDetail: IPurchaseDetails;
  clearPurchaseDetail: () => void;
  getPurchaseByBillNo: () => Promise<IResponse>;
  getPurchaseById: (id: number) => Promise<void>;

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


export type IPurchaseReturnData = {
  itemName: string;
  returnedQty: number;
  quantity: number;
};
 
 