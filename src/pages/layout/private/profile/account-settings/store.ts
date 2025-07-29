import { create } from "zustand";
import { IAccountTab, IProfileStore } from "./interface";
import { axios_auth } from "@/global/config";
import { useGlobalStore } from "@/global/store";

export const useAccountTabOptions = create<IAccountTab>((set) => ({
  currentTab: "account",
  setCurrentTab: (tab: string) => {
    set({ currentTab: tab });
  },
}));

export const useProfileStore = create<IProfileStore>((set) => ({
  // plans , account settings,business details
  openMyPlans: "",
  setOpenMyPlans: (toOpen: string) => {
    set({ openMyPlans: toOpen });
  },

  openBusinessDetails: "",
  setOpenBusinessDetails: (toOpen: string) => {
    set({ openBusinessDetails: toOpen });
  },

  getUserDetails: async () => {
    try {
      const res = await axios_auth.get("auth/me");

      if (res.status >= 200 && res.status <= 300) {
        const data = res?.data?.data;
        const appUser = useGlobalStore.getState().appUser;

        if (data) {
          useGlobalStore.getState().setAppUser({
            ...appUser,
            id: data?.id,
          });
        }

        console.log(appUser);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  },
  changePassword: async ( newPassword: string,confirmPassword: string) => {
    try {
      const res = await axios_auth.post(
        `auth/change-password?newPassword=${newPassword}&confirmPassword=${confirmPassword}`
      );
      return res?.data?.status === 200
        ? { message: res?.data?.message, severity: "success" }
        : { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },

  // api to delete everything from the current branch
  resetBranch: async () => {
    try {
      const res = await axios_auth.post(`appUser/reset-branch`);
      return res?.data?.status === 200
        ? { message: res?.data?.message, severity: "success" }
        : { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },

  // states for confirming the reset of the current branch
  openConfirmReset: false,
  setOpenConfirmReset: (status: boolean) => {
    set({
      openConfirmReset: status,
    });
  },

  // states fo reconfirming the reset of the current branch
  openReConfirmReset: false,
  setOpenReConfirmReset: (status: boolean) => {
    set({
      openReConfirmReset: status,
    });
  },
}));
