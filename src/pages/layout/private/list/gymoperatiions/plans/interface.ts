import { BulkTask } from "@/global/components/enums/enums";
import { IAuditDetails, IResponse } from "../../../../../../global/interface";
import { IFacilitiesDetails } from "../facilities/interface";

export type IListPlansStore = {
  plans: IPlansDetails[];
  getPlans: () => Promise<void>;

  searchQuery: (data: IPlansFilterData) => Promise<void>;
  bulkAction: () => Promise<IResponse>;

  filteredData: IPlansDetails[];
  setFilteredData: (data: IPlansDetails[]) => void;

  totalLength: number;
  page: number;
  setPage: (data: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (data: number) => void;

  isSearching: boolean;
  currentSearchData: IPlansFilterData | null;
  resetSearch: () => void;
  filters: IPlansFilterData;
  setFilters: (data: IPlansFilterData) => void;

  toggleSelectPlans: (id: number) => void;
  toggleSelectAll: () => void;
  bulkTask: BulkTask | null;
  setBulkTask: (data: BulkTask | null) => void;
  openModal: boolean;
  setOpenModal: (data: boolean) => void;
};

export interface IPlansDetails extends IAuditDetails {
  planName: string;
  durationInDays: number;
  price: number;
  discount  : number;
  description: string;
  facilities: IFacilitiesDetails[];
  isSelected: boolean;
}

export interface IPlansFilterData {
  name: string;
 
}
