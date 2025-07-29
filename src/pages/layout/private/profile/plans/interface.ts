import { AffilaterPaymentStatus, AppUserPlanType, MemberShipStatus } from "@/global/components/enums/enums";
import { IAuditDetails } from "@/global/interface";

export interface IUserPlansStore {
    subscriptions: ISubscriptionDetails[];
    
    getUserSubscriptions: (appUserId: number) => void
}

export type ISubscriptionData = {

}

export interface ISubscriptionDetails extends IAuditDetails {
  status: MemberShipStatus;
 
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