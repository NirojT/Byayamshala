import { PartyMoneyType } from "@/global/components/enums/enums";
import { IResponse } from "../../../../../../global/interface";

export type IAddSupplierStore = {
  data: ISupplierData;
  setData: (data: ISupplierData) => void;
  clearData: () => void;
  createSupplier: (data: ISupplierData) => Promise<IResponse>;
};

export type ISupplierData = {
  name: string;

  address: string;
  phoneNo: string;
  email: string;
  panNo: string;
  partyMoneyType: PartyMoneyType; // while creating they may have to give or receive money

  initialBalance: number;
};

 
