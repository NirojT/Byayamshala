import { IResponse } from "@/global/interface";
import { MultiValue } from "react-select";
import { IMenuDetails } from "../menus/interface";

export type ITakeOrderStore = {
  constructPayload(): any;
  selectedMenus: IMenuDetails[];
  selectedTables: MultiValue<ITableSelects>;

  addSelectedMenu: (menu: IMenuDetails) => void;
  replaceSelectedMenu: (menus: IMenuDetails[]) => void;
  removeSelectedMenu: (menuId: number) => void;
  clearSelectedMenus: () => void;
  increaseMenuQuantity: (menuId: number) => void;
  decreaseMenuQuantity: (menuId: number) => void;

  addSelectedTable: (table: MultiValue<ITableSelects>) => void;
  replaceSelectedTable: (tables: MultiValue<ITableSelects>) => void;
  removeSelectedTable: (tableId: number) => void;
  clearSelectedTables: () => void;

  remarks: string;
  setRemarks: (remarks: string) => void;

  placeOrder: () => Promise<IResponse>;
  updateOrder: (id: number) => Promise<IResponse>;
  dashboardData: ICafeDashboardData;
  getDashBoard: () => Promise<void>;
};
export type ITakeOrderData = {
  id: number;
  takeOrderNo: string;
  capacity: number;
};
export type ITableSelects = {
  isAvailable: unknown;
  value: string;
  label: string;
  id: number;
};
export type ICafeDashboardData = {
  pendingOrders: number;
  occupiedTables: number;

  enabledMenus: number;
};
