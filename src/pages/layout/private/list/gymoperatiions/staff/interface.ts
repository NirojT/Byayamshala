import { BulkTask, ShiftType, StaffType } from "@/global/components/enums/enums";
import { IAuditDetails, IResponse } from "../../../../../../global/interface";
 

export type IListStaffStore = {
  staffs: IStaffDetails[];
  getStaffs: () => Promise<void>;
  bulkAction: () => Promise<IResponse>;

  totalLength: number;

  searchQuery: (data: IStaffFilterData) => Promise<void>;
  filteredData: IStaffDetails[];
  setFilteredData: (data: IStaffDetails[]) => void;

  page: number;
  setPage: (data: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (data: number) => void;

  isSearching: boolean;
  currentSearchData: IStaffFilterData | null;
  resetSearch: () => void;
  filters: IStaffFilterData;
  setFilters: (data: IStaffFilterData) => void;

  toggleSelectStaff: (id: number) => void;
  toggleSelectAll: () => void;
  bulkTask: BulkTask | null;
  setBulkTask: (data: BulkTask | null) => void;
  openModal: boolean;
  setOpenModal: (data: boolean) => void;
};
   
export interface IStaffDetails extends IAuditDetails {
  remarks: string;

  fullName: string;
  gender: string;
  address: string;
  phone: string;
  email: string;
  specialization: string[];
  members: string[];
  profileImageName: string;
  shiftType: ShiftType;
 
  isSelected: boolean;

  staffType: StaffType;
  cardNumber: string;
}

 export interface IStaffFilterData {
   
   fullName: string;
   shift: string; 
 }

 export interface DetailItemProps {
  label: string;
  value: string | number | null | undefined;
  status?: boolean;
}

 