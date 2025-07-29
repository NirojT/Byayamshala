import { PartyMoneyType } from "@/global/components/enums/enums";
import { IAuditDetails } from "../../../../../../global/interface"; 

export type IListSupplierStore = {
  supplier: ISupplierDetails[];
  getSupplier: () => Promise<void>;

  totalLength: number;

  searchQuery: (data: ISupplierFilterData) => Promise<void>;
  filteredData: ISupplierDetails[];
  setFilteredData: (data: ISupplierDetails[]) => void;

  page: number;
  setPage: (data: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (data: number) => void;

  isSearching: boolean;
  currentSearchData: ISupplierFilterData | null;
  resetSearch: () => void;
  filters: ISupplierFilterData;
  setFilters: (data: ISupplierFilterData) => void;
};

export interface ISupplierDetails extends IAuditDetails {
  name: string;

  address: string;
  phoneNo: string;
  email: string;
  panNo: string;
  partyMoneyType: PartyMoneyType; // while creating they may have to give or receive money

  initialBalance: number;
}

export interface ISupplierFilterData {
  name: string;
}
