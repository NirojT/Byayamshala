import { AppUserPaymentMode, GettingStartedStep } from "@/global/components/enums/enums";
 
import { IResponse } from "@/global/interface";
import { ISuperPlansDetails } from "../layout/super/plans/interface";

export interface IGettingStartedStore {
  paymentDetails: IAppUserPaymentData;
  selectedPlan: ISuperPlansDetails;
  businessDetails: IAppUserBusinessData;
  currentStep: GettingStartedStep;
  discountedPrice: number; // Add discountedPrice to the state
  applyAffiliateDiscount: () => Promise<IResponse>; // Function to apply discount
  submitInfo: () => Promise<IResponse>; // Function to apply discount

  setSelectedPlan: (plan: ISuperPlansDetails) => void;
  setPaymentDetails: (paymentDetails: IAppUserPaymentData) => void;
  setBusinessDetails: (businessDetails: IAppUserBusinessData) => void;
  setCurrentStep: (step: GettingStartedStep) => void;

  clearBusinessDetails: () => void;
  clearPaymentDetails: () => void;

  // for reviewing details
  reviewDetails: boolean,
  setOpenReviewDeatils : (isOpen:boolean) => void

  // for qr
  isQrOpen : boolean;
  setIsQrOpen: (status: boolean) => void;

  // isapplied for affiliate code apply
  isApplied: boolean;
  setIsApplied: (state: boolean) => void;
}

export type IAppUserPaymentData = {
  paymentMode: AppUserPaymentMode;
  affiliateCode: string;
};
export type IAppUserBusinessData = {
   
    businessName: string;
    businessAddress: string;
    businessPhone: string;
    panNo: string;
};
