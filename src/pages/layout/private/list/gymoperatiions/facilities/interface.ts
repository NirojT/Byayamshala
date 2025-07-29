import { IAuditDetails } from "../../../../../../global/interface";

 

export interface IFacilitiesDetails extends IAuditDetails {
 
  facilityName: string;
  price: number;
  remarks: string;
  currentlyAdded: boolean;
}
export type IListFacilitiesStore = {
  // selectedOption: IFacilitiesDetails;
  // getSelectedOption: (data:IFacilitiesDetails) => void;
  // setSelectedOption: () => void

  facilities: IFacilitiesDetails[];
  addFacilitiesToList: (data: IFacilitiesDetails) => void;
  getFacilities: () => Promise<void>;
  selectedFacility: IFacilitiesDetails[];
  setSelectedFacility: (data: IFacilitiesDetails[]) => void;
  totalLength: number;

  searchQuery: (data: IFacilitiesFilterData) => Promise<void>;
  filteredData: IFacilitiesDetails[];
  setFilteredData: (data: IFacilitiesDetails[]) => void;

  page: number;
  setPage: (data: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (data: number) => void;

  isSearching: boolean;
  currentSearchData: IFacilitiesFilterData | null;
  resetSearch: () => void;
  filters: IFacilitiesFilterData;
  setFilters: (data: IFacilitiesFilterData) => void;
};

 
export interface IFacilitiesFilterData {
  name: string;
 
}
