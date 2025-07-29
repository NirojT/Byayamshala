import { IResponse } from "../../../../../../global/interface";
import { IItemDetails } from "../list/interface";

export interface IItemData {
  name: string;
  category: string; // THIS CATEGORY IS A DYNAMIC

  // ITEM PRICING
  primaryUnit: string; // THIS PRIMARY UNIT IS A DYNAMIC
  sp: number; // SELLING PRICE
  cp: number; // COST PRICE

  // STOCK DETAILS
  openingStock: number;
  lowStockAlert: number;

  // EXTRA DETAILS
  code: string;
  location: string;
  remarks: string;
}

export type IAddItemStore = {
  //create
  createData: IItemData;
  setCreateData: (data: IItemData) => void;
  clearCreateData: () => void;
  createItem: () => Promise<IResponse>;
  //update
  updateData: IItemDetails;
  setUpdateData: (data: IItemDetails) => void;
  clearUpdateData: () => void;
  updateItem: (id: number) => Promise<IResponse>;
  delete: (id: number) => Promise<IResponse>;

  getItem: (id: number) => Promise<void>;

  // for quick add
  // quickAddData: IItemData;
  addAdditonalItems: boolean;
  setAddAdditionalItems: (status: boolean) => void;
  openDelete: boolean;
  setOpenDelete: (openDelete: boolean) => void;
};
