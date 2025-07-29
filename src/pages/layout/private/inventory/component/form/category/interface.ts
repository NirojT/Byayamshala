import { IResponse } from "@/global/interface";

export interface IItemCategoryDetails {
  id: number;
  category: string;
}

export type IItemCategoryStore = {
  category: string;
  setCategory: (data: string) => void;
  clearCategory: () => void;
  createItemCategory: () => Promise<IResponse>;
  updateItemCategory: (id: number) => Promise<IResponse>;

  //create
  itemCategorys: IItemCategoryDetails[];
  getItemCategorys: () => void;

  filteredData: IItemCategoryDetails[];
  setFilteredData: (data: IItemCategoryDetails[]) => void;

  search: string;
  setSearch: (data: string) => void;

  deleteItemCategory: (id: number) => Promise<IResponse>;
};

 