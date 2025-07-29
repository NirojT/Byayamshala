/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { AppUserPlanType } from "@/global/components/enums/enums";
import { ISuperPlansData, ISuperPlansStore } from "./interface";
import { axios_auth } from "@/global/config";
const defaultData = {
  type: AppUserPlanType.FREE_TRIAL, // TRIAL, GOLD, PLATINUM, LIFETIME

  durationInDays: 15, // 14 days for Trial, 365 for Gold, etc.

  price: 0, // 0,
  features: "", // Feat
};
export const useSuperPlansStore = create<ISuperPlansStore>((set, get) => ({
  data: {
    ...defaultData,
  },
  setData: (data: ISuperPlansData) => set({ data }),
  clearData: () => set({ data: { ...defaultData } }),
  superPlans: [],
  createSuperPlan: async () => {
    try {
      const res = await axios_auth.post("appuser/plans/create", get().data);
      if (res?.data?.status === 200) {
        set({ superPlans: [...get().superPlans, res?.data?.data] });
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
  updateSuperPlan: async () => {
    try {
      const res = await axios_auth.put(`appuser/plans/update/${get().id}`, get().data);
      if (res?.data?.status === 200) {
        const data = res?.data?.data;
        set({
          superPlans: [
            ...get().superPlans.map((plan) =>
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
  getSuperPlans: async () => {
    try {
      const res = await axios_auth.get("appuser/plans/get-all");
        set({superPlans:res?.data?.data})
      
    } catch (error: any) {
      console.log(error);
     
  }
  },
  open:false,
  setOpen:(open:boolean)=>{set({open})},
  id:0,
  setId:  (id:number)=>{set({id})},
}));
