/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { AppUserPlanType, AppUserRoles } from "@/global/components/enums/enums";
import { ISuperAppUserData, ISuperAppUserStore } from "./interface";
import { axios_auth } from "@/global/config";

const defaultData = {
  email: "",
  password: "",
  // roles to role changed !
  role: AppUserRoles.ROLE_ADMIN,
  affiliateCode: "",
  planType: AppUserPlanType.FREE_TRIAL,
};

export const useSuperAppUserStore = create<ISuperAppUserStore>((set, get) => ({
  data: {
    ...defaultData,
  },
  setData: (data: ISuperAppUserData) => set({ data }),
  clearData: () => set({ data: { ...defaultData } }),
  superAppUsers: [],
  superSubscriptions: [],

  createSuperAppUser: async () => {
    try {
      const res = await axios_auth.post(
        "appUser/create-from-super",
        get().data
      );
      if (res?.data?.status === 200) {
        set({ superAppUsers: [...get().superAppUsers, res?.data?.data] });
      }
      return res?.data?.status === 200
        ? { message: res?.data?.message, severity: "success" }
        : { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },
  updateSuperAppUser: async () => {
    try {
      const res = await axios_auth.put(
        `appUser/update-from-super/${get().id}`,
        get().data
      );
      if (res?.data?.status === 200) {
        const data = res?.data?.data;
        set({
          superAppUsers: [
            ...get().superAppUsers.map((plan) =>
              plan?.id === data?.id ? data : plan
            ),
          ],
        });
      }
      return res?.data?.status === 200
        ? { message: res?.data?.message, severity: "success" }
        : { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },
  getSuperAppUser: async () => {
    try {
      const res = await axios_auth.get("appUser/get-all");
      set({ superAppUsers: res?.data?.data });
    } catch (error: any) {
      console.log(error);
    }
  },
  getSuperAppUserSubscription: async () => {
    try {
      const res = await axios_auth.get("appUser/get-subscriptions/" + get().id);
      set({ superSubscriptions: res?.data?.data });
    } catch (error: any) {
      console.log(error);
    }
  },

  deactivateUser: async () => {
    try {
      const res = await axios_auth.put(
        `appUser/activate-status/${get().id}`,
        get().data
      );
      if (res?.data?.status === 200) {
        const data = res?.data?.data;
        set({
          superAppUsers: [
            ...get().superAppUsers.map((user) =>
              user?.id === data?.id ? data : user
            ),
          ],
        });
      }
      return res?.data?.status === 200
        ? { message: res?.data?.message, severity: "success" }
        : { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },

  open: false,
  setOpen: (open: boolean) => {
    set({ open });
  },
  id: 0,
  setId: (id: number) => {
    set({ id });
  },

  //for subscription opena nd close
  openSubscription: false,
  setOpenSubscription: (openSubscription: boolean) => {
    set({ openSubscription });
  },

  //*********************for subscription cancel and add*********************
  cancelSubscription: async (subId: number) => {
    try {
      const res = await axios_auth.patch(
        `appUser/cancel-subscription/${subId}`
      );
      if (res?.data?.status === 200) {
        const data = res?.data?.data;
        set({
          superSubscriptions: [
            ...get().superSubscriptions.map((plan) =>
              plan?.id === subId ? { ...data } : plan
            ),
          ],
        });
      }
      return res?.data?.status === 200
        ? { message: res?.data?.message, severity: "success" }
        : { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },
  activateSubscription: async (subId: number) => {
    try {
      const res = await axios_auth.patch(
        `appUser/activate-subscription/${subId}`
      );
      if (res?.data?.status === 200) {
        const data = res?.data?.data;
        set({
          superSubscriptions: [
            ...get().superSubscriptions.map((plan) =>
              plan?.id === subId ? { ...data } : plan
            ),
          ],
        });
      }
      return res?.data?.status === 200
        ? { message: res?.data?.message, severity: "success" }
        : { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },

  /*
  *  @PatchMapping("add-subscription/{id}")
    public ResponseEntity<?> addSubscription(@PathVariable Long id, @RequestParam AppUserPlanType type,
    @RequestParam String startDate
    ) {

  */
  addSubscription: async (type: AppUserPlanType, startDate: string) => {
    try {
      const res = await axios_auth.patch(
        `appUser/add-subscription/${
          get().id
        }?type=${type}&startDate=${startDate}`
      );
      if (res?.data?.status === 200) {
        const data = res?.data?.data;
        set({
          superSubscriptions: [...get().superSubscriptions, { ...data }],
        });
      }
      return res?.data?.status === 200
        ? { message: res?.data?.message, severity: "success" }
        : { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },

  deleteUser: async (id: number) => {
    try {
      const res = await axios_auth.delete("appUser/delete/" + id);

      return res?.data?.status === 200
        ? { message: res?.data?.message, severity: "success" }
        : { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },
  changeStatus: async (id: number) => {
    try {
      const res = await axios_auth.put("appUser/activate-status/" + id);
      if (res?.data?.status === 200) {
        const data = res?.data?.data;
        set({
          superAppUsers: [
            ...get().superAppUsers.map((appUser) =>
              appUser?.id === id ? { ...data } : appUser
            ),
          ],
        });
      }
      return res?.data?.status === 200
        ? { message: res?.data?.message, severity: "success" }
        : { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },
}));
