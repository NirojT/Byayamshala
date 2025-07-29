import { AlertColor } from "@mui/material";
import { IToasterData } from "./components/toaster/interface";
import { AppUserPlanType, AppUserRoles, MemberShipStatus, ReportPeriod } from "./components/enums/enums";
export interface IGlobalStore {
  activeUrl: string;
  setActiveUrl: (url: string) => void;
  toasterData: IToasterData;
  setToasterData: (data: IToasterData) => void;
  closeToaster: () => void;

  appUser: IAppUserDetails;
  setAppUser: (data: IAppUserDetails) => void;
  clearAppUser: () => void;
  getUserDetails: () => void;

scrollPosition: number;
setScrollPosition: (scrollPosition: number) => void;


// for subscription


}

export type IResponse = {
  message: string;
  severity: AlertColor | undefined;
};
export interface IAuditDetails {
  id: number;
  createdDate: string;
  createdNepDate: string;
  localTimeZone: string;
  activeStatus: boolean;
  deleted: boolean;
  lastModifiedDate: string;
  addedBy: string;
}

export interface IHamburger {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  
}


export interface IUserProfile {
    isProfileOpen: boolean;
    setIsProfileOpen: (open: boolean) => void;
    isOpenTransaction: boolean;
    setIsOpenTransaction: (open: boolean) => void;
  }

  export interface IMobileActiveUrl {
    activeUrl: string;
    setActiveUrl: (url:string) => void;
  }


export interface IAppUserDetails {
  id: number;
  email: string;
  roles: IRoleDetails[];
  isNew: boolean;
  subscriptionStatus: MemberShipStatus;
  currentBranch: string;
  planType: AppUserPlanType
  
}

export interface IRoleDetails {
 
  roleName: AppUserRoles;
}

/*
for period report 
*/
export interface IGenericFilterData {
 
  reportPeriod: ReportPeriod | null; // e.g., Today, This Week, This Month, Custom
  startDate: string;
  endDate: string;

  //optional
  name?: string;
}


