import { create } from "zustand";
import { IToasterData } from "./components/toaster/interface";
import { IGlobalStore } from "./interface";
import { AppUserPlanType, MemberShipStatus } from "./components/enums/enums";
import { axios_auth } from "./config"; 
import { useBusinessDetailsStore } from "@/pages/layout/private/profile/account-settings/component/store";

const defaultAppUser = {
  id: 0,
  email: "",
  roles: [],
  subscriptionStatus: MemberShipStatus.INACTIVE,
  isNew: false,
  currentBranch: "",
  planType: AppUserPlanType.LIFETIME,
};
export const useGlobalStore = create<IGlobalStore>((set) => ({
  activeUrl: "",
  setActiveUrl: (url: string) => set({ activeUrl: url }),
  toasterData: {
    open: false,
    message: "",
    severity: undefined,
  },
  setToasterData: (data: IToasterData) => {
    set(() => ({
      toasterData: { ...data },
    }));
  },
  closeToaster: () => {
    set(() => ({
      toasterData: {
        open: false,
        message: "",
        severity: undefined,
      },
    }));
  },

  //appuser

  appUser: {
    ...defaultAppUser,
  },
  setAppUser: (data) => {
    set(() => ({
      appUser: { ...data },
    }));
  },

  clearAppUser: () => {
    set(() => ({
      appUser: { ...defaultAppUser },
    }));
  },

  getUserDetails: async () => {
    try {
      const res = await axios_auth.get("auth/me");

      if (res.status >= 200 && res.status <= 300) {
        const data = res?.data?.data;
        const business = data?.businessDetails;
        

        if (data) {
          set((state) => ({
            // Correct way to update state
            appUser: {
              ...state.appUser,
              ...data,
            },
          }));
        }

        if (business) {
          useBusinessDetailsStore.getState().setData(business);
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  },

  scrollPosition: 0,
  setScrollPosition: (scrollPosition) => set({ scrollPosition }),
}));
