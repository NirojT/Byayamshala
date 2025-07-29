import { ActivityType } from "@/global/components/enums/enums";
import { IAuditDetails, IResponse } from "@/global/interface";

//  String name,
//         ActivityTYpe activityType,
//           double cp,
//           int quantity,

//           Long purchaseId,
//                   Long salesId,
//                   Long purchaseReturnId,
//                   Long salesReturnId,

export interface IItemHistoryDetails extends IAuditDetails {
  //for add or deduct
  remarks: string;
  date: string;
  quantity: number;
  name: string;
  activityType: ActivityType;
  cp: number;
  purchaseId: number;
  salesId: number;
  purchaseReturnId: number;
 

  salesReturnId: number;
  ordersId: number;
}
export type IItemHistoryListStore = {
  //create
  itemsHistory: IItemHistoryDetails[];
  setItemsHistory: (data: IItemHistoryDetails) => void;
  updateItemsHistory: (data: IItemHistoryDetails) => void;

  getItemsHistory: (itemId: number) => void;

  totalLength: number;

  searchQuery: (data: IItemFilterData) => Promise<void>;
  filteredData: IItemHistoryDetails[];
  setFilteredData: (data: IItemHistoryDetails[]) => void;

  page: number;
  setPage: (data: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (data: number) => void;

  isSearching: boolean;
  currentSearchData: IItemFilterData | null;
  resetSearch: () => void;
  filters: IItemFilterData;
  setFilters: (data: IItemFilterData) => void;

  data: IAddorDeductData;
  setData: (data: IAddorDeductData) => void;
  clearData: () => void;
  stockAddorDeduct: (task: string) => Promise<IResponse>;
  deleteAddOrDeduct: (id: number, task: string) => Promise<IResponse>;
};

export interface IItemFilterData {
  name: string;
  category: string;
  lowStock: string;
}
export interface IAddorDeductData {
  itemId: number;
  id: number; // this is the id for history for update purpose
  quantity: number;
  remarks: string;
  date: string | null;
}
