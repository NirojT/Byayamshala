import { IGenericFilterData, IResponse } from "../../../../../../global/interface";
import { IMemberships } from "../../../list/gymoperatiions/members/interface";
 
 

export type IListMembershipStore = {
  memberShips: IMemberships[];
  setMemberShips: (memberShips: IMemberships[]) => void;
  getMembershipById: (id: number) => Promise<void>;
  deleteMembership: (id: number) => Promise<IResponse>;
  deleteMemberFacility: (id: number) => Promise<IResponse>;
  // added below
  searchQuery: () => Promise<IResponse>;
  filterData: IGenericFilterData;
  setFilterData: (data: IGenericFilterData) => void;

  // added above

  // deleteMembership: (id: number) => Promise<IResponse>;
  // printMembership: (id: number) => Promise<IResponse>;
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
  data: IMemberships | null;
  setData: (data: IMemberships | null) => void;
  inDepthReport: boolean;
  setInDepthReport: (inDepthReport: boolean) => void;
};

 

 