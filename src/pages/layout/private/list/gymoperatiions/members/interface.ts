import {
  BulkTask,
  MemberShipStaus,
  PartyMoneyType,
  PaymentMode,
  ShiftType,
} from "@/global/components/enums/enums";
import { IAuditDetails, IResponse } from "../../../../../../global/interface";
import { IFacilitiesDetails } from "../facilities/interface";

export interface IMemberDetails extends IAuditDetails {
  doorAccess: boolean;
  isSelected: boolean;
  fullName: string;
  email?: string;
  phone: string;
  address: string;
  shiftType: "Morning" | "Afternoon" | "Evening";
  trainerId: string;
  planId: string;
  joiningDate: string;
  membershipEndDate: string;
  remarks?: string;
  emergencyContact?: string;
  birthDate?: string;
  height: number;
  weight: number;
  // occupation,bloodGroup,gaurdianName,healthCondition

  occupation: string;
  bloodGroup: string;
  guardianName: string;
  healthCondition: string;

  isExistingMember?: boolean;
  isWhatsAppSaved?: boolean;

  // uncommented this memberShips array
  memberShips: IMemberships[];
  // uncommented this memberships arrary

  // for attendence of a user
  memberId: number;
  //for table shake
  memberShipStatus: "ACTIVE" | "INACTIVE";
  currentMemberShipExpired: boolean;
  gender: string;
  profileImageName: string; // URL or base64 string
  addedBy: string; // ID of the user who added this member
  cardNumber: string; // Card number for the member
  cardFee: number; // Card fee for the member
  lockerFee: number; // Locker fee for the member
  admissionFee: number; // Admission fee for the member
}

export interface IMemberships extends IAuditDetails {
  memberId: number;
  memberName: string;
  remainingDays: number;
  memberShipStatus: MemberShipStaus;
  membershipStartDate: string;
  membershipEndDate: string;

  // memberShipStatus: "ACTIVE" | "INACTIVE";

   

  // plans: IPlansDetails;
  //we are using plans fields directly in membership

  addedFacilities: IFacilitiesDetails[];
  planName: string;

  durationInDays: number;
  price: number;
  defaultDiscount: number;
  discount: number;
  description: string;
  paymentMode: PaymentMode;
  facilities: IFacilitiesDetails[];
}
 
export interface IMemberFacilitiesDetails extends IAuditDetails {
  memberId: number;
  memberName: string;
  facilityStartDate: string; // format: "yyyy-MM-dd"
  facilityEndDate: string; // format: "yyyy-MM-dd"
  memberShipStatus: MemberShipStaus;
  facilityName: string;
  price: number;
  discount: number; // discount
  description: string;
  paymentMode: PaymentMode;
  addedBy: string; // ID of the user who added this facility
   
}
export type IListMemberStore = {
  members: IMemberDetails[];
  memberShips: IMemberships[];
  memberFacilities: IMemberFacilitiesDetails[];
  member: IMemberDetails;
  memberFinance: IMemberFinanceDetails;
  updateMemberShips: (data: IMemberships) => void;
  getMembers: () => Promise<void>;
  searchByName: () => Promise<IResponse>;
  searchByOtherInfo: () => Promise<IResponse>;
  getMemberById: (id: number) => Promise<void>;
  getMemberShipByMemberId: (id: number) => Promise<void>;
  getMemberFacilityByMemberId: (id: number) => Promise<void>;
  getMemberFinance: (id: number) => Promise<void>;
  addMembshipToList: (data: IMemberships) => void;
  addMemberFacilityInList: (data: IMemberFacilitiesDetails) => void;
  updateMembershipInList: (data: IMemberships) => void;
  updateMemberFacilityInList: (data: IMemberFacilitiesDetails) => void;
  removeMembershipFromList: (id: number) => void;
  removeMemberFacilityFromList: (id: number) => void;
  totalLength: number;

  searchQuery: (data: IMemberFilterData) => Promise<IResponse>;
  cancelMembership: (id: number) => Promise<IResponse>;
  exportMembers: () => Promise<void>;
  bulkAction: () => Promise<IResponse>;

  filteredData: IMemberDetails[];
  setFilteredData: (data: IMemberDetails[]) => void;

  page: number;
  setPage: (data: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (data: number) => void;

  isSearching: boolean;
  setIsSearching: (data: boolean) => void;
  currentSearchData: IMemberFilterData | null;
  resetSearch: () => void;
  filters: IMemberFilterData;
  setFilters: (data: IMemberFilterData) => void;

  toggleSelectMember: (id: number) => void;
  toggleSelectAll: () => void;
  bulkTask: BulkTask | null;
  setBulkTask: (data: BulkTask | null) => void;
  openModal: boolean;
  setOpenModal: (data: boolean) => void;

  name: string;
  setName: (name: string) => void;
  info: string;
  setInfo: (info: string) => void;
  uploadProfileImage: (file: File, memberId: number) => Promise<IResponse>;

  qrCode: string | null;
  generateQrCode: (memberId: number) => Promise<void>;
  doorControl: (allows: boolean, memberId: number) => Promise<IResponse>;

  currentSelect: 'membership'| 'facility' 
  setCurrentSelect: (select: 'membership' | 'facility') => void;
};
export interface IMemberFilterData {
  shift: ShiftType | null;
  status: string;

  whatsApp: "saved" | "unsaved" | "";
  doorCard: "entered" | "not entered" | "";
  doorAccess: "blocked" | "allowed" | "";

}
export interface IMemberFinanceDetails {
  amt: number;
  partyMoneyType: PartyMoneyType;
}


// member profile plan card
export type MemberProfilePlanCardProps = {
 
  expandedPlanIndex: number | null;
  togglePlanDetails: (index: number) => void;
};


export type FacilitySectionProps = {
  title: string;
  facilities: {
    id: number;
    facilityName: string;
    price: number;
  }[];
};


export type ChevronIconProps = {
  isExpanded: boolean;
};


//for member profile top
export interface DetailItemProps {
  label: string;
  value: string | number | null | undefined;
  status?: boolean;
}


//for to show attendence
export interface IShowDence {
  isShowAttendence: boolean;
  setIsShowAttendence: () => void;
  setIsHideAttendence: () => void;
}
