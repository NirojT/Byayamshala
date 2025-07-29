import { IGenericFilterData, IResponse } from "../../../../../../global/interface";
import { IMemberFacilitiesDetails } from "../../../list/gymoperatiions/members/interface";
 
 
 

export type IListMemberFacilityStore = {
  memberFacilities: IMemberFacilitiesDetails[];
  setMemberShips: (memberFacilities: IMemberFacilitiesDetails[]) => void;
  getMemberFacilityById: (id: number) => Promise<void>;
  deleteMemberFacility: (id: number) => Promise<IResponse>;
  // added below
  searchQuery: () => Promise<IResponse>;
  filterData: IGenericFilterData;
  setFilterData: (data: IGenericFilterData) => void;

  // added above

  // deleteMemberFacility: (id: number) => Promise<IResponse>;
  // printMemberFacility: (id: number) => Promise<IResponse>;
  // printFormat: PrintFormat;
  // setPrintFormat: (printFormat: PrintFormat) => void;
  // // pdf: Blob | null;
  // // setPdf: (pdf: Blob | null) => void;

  totalAmt: number;
  setTotalAmt: (total: number) => void;
  addedAmt: number;
  setAddedAmt: (added: number) => void;

  discount: number;
  setDiscount: (discount: number) => void;
  openDelete: boolean;
  setOpenDelete: (openDelete: boolean) => void;
  data: IMemberFacilitiesDetails | null;
  setData: (data: IMemberFacilitiesDetails | null) => void;
  inDepthReport: boolean;
  setInDepthReport: (inDepthReport: boolean) => void;
};

 

 