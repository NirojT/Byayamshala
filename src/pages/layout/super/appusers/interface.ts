import { AffilaterPaymentStatus, AppUserPlanType, AppUserRoles, MemberShipStaus } from "@/global/components/enums/enums";
import { IAuditDetails, IResponse, IRoleDetails } from "@/global/interface";
import { IBusinessDetails } from "../../private/profile/account-settings/component/interface";

export type ISuperAppUserStore = {
  data: ISuperAppUserData;
  setData: (data: ISuperAppUserData) => void; //
  clearData: () => void; //
  superAppUsers: ISuperAppUserDetails[];
  superSubscriptions: ISuperSubscriptionDetails[];
  getSuperAppUser: () => void;
  deleteUser: (id: number) => Promise<IResponse>;
  changeStatus: (id: number) => Promise<IResponse>;
  getSuperAppUserSubscription: () => void;
  createSuperAppUser: () => Promise<IResponse>;
  updateSuperAppUser: (id: number) => Promise<IResponse>;
  deactivateUser: () => Promise<IResponse>;

  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
  setId: (id: number) => void;
  openSubscription: boolean;
  setOpenSubscription: (open: boolean) => void;

  cancelSubscription: (subId: number) => Promise<IResponse>;
  activateSubscription: (subId: number) => Promise<IResponse>;
  addSubscription: (
    type: AppUserPlanType,
    startDate: string
  ) => Promise<IResponse>;
};
export type ISuperAppUserData = {
  email: string;
  password: string;
  role: AppUserRoles;
  affiliateCode: string;

  planType: AppUserPlanType;
};
export interface ISuperAppUserDetails extends IAuditDetails {
  email: string;
  password: string;

  currentPlan: string;
  status: boolean;

roles: IRoleDetails[];
  affiliateCode: string;
  businessDetails:IBusinessDetails
}
export interface ISuperSubscriptionDetails extends IAuditDetails {
  status: MemberShipStaus;
 
  id: number;
  appUserName: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  isCanceled: boolean;
  type: AppUserPlanType;
  // price: number;
  originalPrice: number;
  paymentMode: string;
  discountedPrice:number;
  
  affilater:string
  affilaterPaymentStatus:AffilaterPaymentStatus
  toGive:number;
  affilaterPercent:number;
}

// id : number;
// createdDate : string;
// createdNepDate : string;
// localTimeZone : string;
// activeStatus : boolean;
// deleted: boolean;
// lastModifiedDate : string;
