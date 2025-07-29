/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axios_auth } from "../../../../../../global/config";
import { IAddPlanStore } from "./interface";

export const useAddPlansFormStore = create<IAddPlanStore>((set) => ({
  data: {}, // Initialize an empty object to store form data
  setData: (key, value) =>
    set((state) => ({
      data: {
        ...state.data,
        [key]: value, // Dynamically update the specific field in the form data
      },
    })),
  clearData: () => set({ data: {} }),
  createPlan: async (data: Record<string, string | number[]>) => {
    try {
      const res = await axios_auth.post("plans/create", data);
      console.log(res);
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
  // for duration
  selectedDuration: "30",
  setSelectedDuration: (newDuration: string) => {
    set({ selectedDuration: newDuration });
  },

  isSubmitting: false,
  setIsSubmitting: (status: boolean) => {
    set({ isSubmitting: status });
  },

  // for attempt of validation
  validationAttempted: false,
  setIsValiationAttempted: (status: boolean) =>
    set({ validationAttempted: status }),


  
}));
