import { IResponse } from "../../../../../../global/interface";
import { ISupplierDetails } from "../../../list/gymoperatiions/supplier/interface";
 

 

 
export type IEditSupplierStore = {
  data: ISupplierDetails;
  setData: (data: ISupplierDetails) => void;
  clearData: () => void;
  updateSupplier: (
  
    id: number
  ) => Promise<IResponse>;
};


  

 
 