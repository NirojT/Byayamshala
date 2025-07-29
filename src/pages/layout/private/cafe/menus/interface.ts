import { MenuType } from "@/global/components/enums/enums";
import { IAuditDetails, IResponse } from "@/global/interface";

export type IMenuStore = {
  data: IMenuData;
  setData: (data: IMenuData) => void;
  clearData: () => void;
  saveMenu: (data: IMenuData) => Promise<IResponse>;
  changeStatus: (id: number) => Promise<IResponse>;
  getMenus: () => Promise<void>;
  getDisabledMenus: () => Promise<void>;
  menus: IMenuDetails[]; // for storing menu data
  disabledMenus: IMenuDetails[]; // for storing menu data

  // for submitting state
  isSubmitting: boolean;
  setIsSubmitting: (status: boolean) => void;

  open: boolean;
  toggleOpen: () => void;
};

export type IMenuData = {
  id: number;
  name: string;
  price: number;
  menuType: MenuType;

  stockItems: IStockItems[];
};
export interface IMenuDetails extends IAuditDetails {
  quantity: number;
  name: string;
  price: number;
  menuType: MenuType;
  stockItems: IStockItems[];
}
export interface IStockItems {
  name: string;
  itemId: number;
  quantity: number ;
}
