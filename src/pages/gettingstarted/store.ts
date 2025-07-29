import {
  AppUserPaymentMode,
  GettingStartedStep,
} from "@/global/components/enums/enums";
import { axios_auth } from "@/global/config";
import { create } from "zustand";
import { ISuperPlansDetails } from "../layout/super/plans/interface";
import {
  IAppUserBusinessData,
  IAppUserPaymentData,
  IGettingStartedStore,
} from "./interface";

const defaultPayment = {
  paymentMode: AppUserPaymentMode.QR,
  affiliateCode: "",
};
const defaultBusiness = {
  businessName: "",
  businessAddress: "",
  businessPhone: "",
  panNo: "",
};

export const useGettingStartedStore = create<IGettingStartedStore>(
  (set, get) => ({
    //for selected plan

    selectedPlan: {} as ISuperPlansDetails,
    paymentDetails: { ...defaultPayment } as IAppUserPaymentData,
    businessDetails: { ...defaultBusiness } as IAppUserBusinessData,
    currentStep: GettingStartedStep.PLANS,
    discountedPrice: 0, // Add discountedPrice to the state
    setSelectedPlan: (plan: ISuperPlansDetails) => {
      set(() => ({
        selectedPlan: plan,
      }));
    },
    setPaymentDetails: (paymentDetails: IAppUserPaymentData) => {
      set({
        paymentDetails: paymentDetails,
      });
    },
    setBusinessDetails: (businessDetails: IAppUserBusinessData) => {
      set({
        businessDetails: businessDetails,
      });
    },
    clearBusinessDetails: () => {
      set({
        businessDetails: defaultBusiness,
      });
    },
    clearPaymentDetails: () => {
      set({
        paymentDetails: defaultPayment,
      });
    },
    setCurrentStep: (step: GettingStartedStep) => set({ currentStep: step }),
    isQrOpen : false,
    setIsQrOpen: (status: boolean) => {
      set({isQrOpen:status})
    },

    applyAffiliateDiscount: async () => {
      try {
        const { paymentDetails, selectedPlan } = get();
        const price = selectedPlan.price; // Default to 0 if no plan
        const affiliateCode = paymentDetails.affiliateCode?.trim();
        const res = await axios_auth.get(
          `appUser/apply-affiliate-code?code=${affiliateCode}`
        );

        if (res?.data?.status !== 200) {
          get().setIsApplied(false);
          set({ discountedPrice: 0 }); // Reset if no/invalid code
          return { message: "invalid affiliate code ", severity: "success" };
        }

       const discount = price * 0.05; // 5% discount
        set({ discountedPrice: price - discount});
       get().setIsApplied(true);

        return { message: res?.data?.message, severity: "success" };
      } catch (error: any) {
        if (error?.response?.data?.message) {
          return { message: error?.response?.data?.message, severity: "error" };
        }
        return { message: "something went wrong", severity: "error" };
      }
    },

    /*
     * Function to submit the form data to the server
     */
    submitInfo: async () => {
      try {
        const { selectedPlan, paymentDetails, businessDetails } = get();
        const formData = {
          selectedPlanId: selectedPlan.id,
          paymentDetails,
          businessDetails,
        };
        const res = await axios_auth.post("appUser/getting-started", formData);
        if (res?.data?.status === 200) {
          set({ currentStep: GettingStartedStep.COMPLETE });
          return { message: res?.data?.message, severity: "success" };
        }
        return { message: "problem ", severity: "error" };
      } catch (error: any) {
        if (error?.response?.data?.message) {
          return { message: error?.response?.data?.message, severity: "error" };
        }
        return { message: "something went wrong", severity: "error" };
      }
    },

    // for opeining the review section
    reviewDetails: false,
    setOpenReviewDeatils: (isOpen:boolean) => {
      set({reviewDetails:isOpen})
    },

    // isapplied for affiliate code apply
    isApplied: false,
    setIsApplied: (state: boolean) => {
      set({
        isApplied: state
      })
    }
  })
);
