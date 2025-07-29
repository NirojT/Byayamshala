import { PaymentMode } from "../../../../global/components/enums/enums";
import { IResponse } from "../../../../global/interface";
import { IFacilitiesDetails } from "../list/gymoperatiions/facilities/interface";
import { IMemberDetails, IMemberships } from "../list/gymoperatiions/members/interface";
import { IPlansDetails } from "../list/gymoperatiions/plans/interface";

export type IPlansOperationStore = {
  data: IRenewData;
  setData: (data: IRenewData) => void;
  clearData: () => void;
  addNewPlan: () => Promise<IResponse>;
  renew: () => Promise<IResponse>;

  memberShip: IMemberships[];
  plan: IPlansDetails;
  facility: IFacilitiesDetails;
  setMemberShip: (memberShip: IMemberships[]) => void;
  setPlan: (plans: IPlansDetails) => void;
  setFacility: (facility: IFacilitiesDetails) => void;

  clearMemberShip: () => void;
  clearPlan: () => void;
  clearFacility: () => void;

  searchedMember: IMemberDetails;
  setSearchedMember: (searchedMember: IMemberDetails) => void;
  clearSearchedMember: () => void;
  //for just adding facilities
  facilitiesData: IAddFacilitiesData;
  setFacilitiesData: (data: IAddFacilitiesData) => void;
  clearFacilitiesData: () => void;
  addNewFacility: () => Promise<IResponse>;

  pdf: Blob | null;
  setPdf: (pdf: Blob | null) => void;

  // for modal
  openRenewPlanModal: boolean;
  setOpenRenewPlanModal: (status: boolean) => void;
  openRenewFacilityModal: boolean;
  setOpenRenewFacilityModal: (status: boolean) => void;

  // for confirming the renewal of plan || adding new plan
  confirmAction: boolean;
  setConfirmAction: (status: boolean) => void;

  printBill: boolean;
  setPrintBill: (printBill: boolean) => void;
  notify: boolean;
  setNotify: (printBill: boolean) => void;
};

export type IRenewData = {
  plansId: number;
  originalPrice: number;
  discount: number;
  memberId: number;
  paymentMode: PaymentMode;
  startDate: string;
  endDate: string;
  renewDate: string;
  notes: string;
};
export type IAddFacilitiesData = {
  facilityId: number;
  originalPrice: number;
  discount: number;
  memberId: number;
  paymentMode: PaymentMode;
  startDate: string;
  endDate: string;
  renewDate: string;
  
  basePrice: number;
  description: string;
  days: number;

  // memberId: number;
  // memberShipId: number;
  // notes: string;
  // paymentMode: PaymentMode;
  // newFacilities:IFacilitiesDetails[];
};
 
export type IFacilityOption ={
  id: string;
  facilityName: string;
  price: number;
}



export interface IFacilitySectionProps {
  title: string;
  facilities: IFacilitiesDetails[];
  iconColor: string;
  emptyMessage?: string;
  onAdd?: () => void;
}

export interface IDetailItemProps {
  label: string;
  value: string | number;
}

export interface IChevronIconProps {
  isExpanded: boolean;
}
