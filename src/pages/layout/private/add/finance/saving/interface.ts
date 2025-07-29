import { PaymentMode } from "@/global/components/enums/enums";
import { IResponse } from "../../../../../../global/interface";
//while creating account only the interface is created
export interface ISavingCreateData {
  accountName: string;
  openingBalance: number;
}
export interface ISavingAddData {
  id: number;
  amt: number;
  remarks: string;
  paymentMode: PaymentMode;
}
export interface ISavingEditData {
  savingId: number;
  archiveId: number;
  amt: number;
  remarks: string;
  paymentMode: PaymentMode;
}

 

export type IAddSavingStore = {
  //for creating new saving account
  data: ISavingCreateData;
  setData: (data: ISavingCreateData) => void; // Updated function to handle numeric values
  clearData: () => void;
  createSavingAcc: (data: ISavingCreateData) => Promise<IResponse>;

  //for just adding amtto saving account
  addData: ISavingAddData;
  setAddData: (data: ISavingAddData) => void; // Updated function to handle numeric values
  clearAddData: () => void;
  addSavingAmt: (task: string) => Promise<IResponse>;

  editData: ISavingAddData;
  setEditData: (data: ISavingAddData) => void; // Updated function to handle numeric values
  clearEditData: () => void;
  editSavingAmt: () => Promise<IResponse>;

  isModalOpen: boolean;
  setIsModalOpen: (value?: boolean) => void;
  loading: boolean;
  setLoading: (value?: boolean) => void;
};
