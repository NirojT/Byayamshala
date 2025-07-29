import { IResponse } from "@/global/interface";

export interface IItemUnitDetails {
  id: number;
  unit: string;
}

export type IItemUnitStore = {
  unit: string;
  setUnit: (data: string) => void;
  clearUnit: () => void;
  createItemUnit: () => Promise<IResponse>;
  updateItemUnit: (id: number) => Promise<IResponse>;

  //create
  itemUnits: IItemUnitDetails[];
  getItemUnits: () => void;

  filteredData: IItemUnitDetails[];
  setFilteredData: (data: IItemUnitDetails[]) => void;

  search: string;
  setSearch: (data: string) => void;

  deleteItemUnit: (id: number) => Promise<IResponse>;
};

 