import { IAuditDetails } from "@/global/interface";

export interface IItemDetails extends IAuditDetails {
  name: string;
  category: string; // THIS CATEGORY IS A DYNAMIC

  // ITEM PRICING

  sp: number; // SELLING PRICE
  cp: number; // COST PRICE

  stockQuantity: number;
  primaryUnit: string; // THIS PRIMARY UNIT IS A DYNAMIC






  // for update we need this
  // STOCK DETAILS
  openingStock: number;
  lowStockAlert: number;

  // EXTRA DETAILS
  code: string;
  location: string;
  remarks: string;
}
export type IItemListStore = {
  //create
  items: IItemDetails[];
  setItem: (data: IItemDetails) => void;
  setItems: (data: IItemDetails[]) => void;
  getItems: () => void;

  getItemsbyId: (id: number) => void;

  totalLength: number;

  searchQuery: (data: IItemFilterData) => Promise<void>;
  filteredData: IItemDetails[];
  setFilteredData: (data: IItemDetails[]) => void;

  page: number;
  setPage: (data: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (data: number) => void;

  isSearching: boolean;
  currentSearchData: IItemFilterData | null;
  resetSearch: () => void;
  filters: IItemFilterData;
  setFilters: (data: IItemFilterData) => void;
};


export interface IItemFilterData {
 
  stock: "healthy" | "low" | "";
  name: string;
  category: string;
}