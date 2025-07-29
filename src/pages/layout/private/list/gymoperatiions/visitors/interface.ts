 
import { ReportPeriod } from "@/global/components/enums/enums";
import { IAuditDetails, IResponse } from "../../../../../../global/interface"; 

export interface IVistorListStore {
  visitors: IVisitorDetails[];
  // getVisitors: () => void,
  //  searchVisitors: (name: string) => Promise<void>,
  page: number;
  setPage: (data: number) => void;
  totalLength: number;
  rowsPerPage: number;
  setRowsPerPage: (data: number) => void;
  isSearching: boolean;
  isModelOpen: boolean;
  setIsModelOpen: (isOpen: boolean) => void;

  searchQuery: () => Promise<IResponse>;
  filterData: IVisitorFilterData;
  setFilterData: (data: IVisitorFilterData) => void;

  openDelete: boolean;
  setOpenDelete: (openDelete: boolean) => void;
  visitorId: number;
  setVisitorId: (id: number) => void;
  delete: (id: number) => Promise<IResponse>;
}

export interface IVisitorDetails extends IAuditDetails  {
    fullName:string;
    phone: string;
    email: string;
    address: string;
    notes:string;
    isTransformed:boolean;
}

export interface IVisitorFilterData {
  name: string;
  reportPeriod: ReportPeriod | null; // e.g., Today, This Week, This Month, Custom
  startDate: string;
  endDate: string;
}
 