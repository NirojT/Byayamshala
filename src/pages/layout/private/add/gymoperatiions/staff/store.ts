/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axios_auth } from "../../../../../../global/config";
import { IAddStaffStore } from "./interface";

const defaultValidationAttemptData = {
  personal: false,
  professional: false,
}

export const useAddStaffFormStore = create<IAddStaffStore>((set) => ({
  data: {}, // Initialize an empty object to store form data
  setData: (key, value) =>
    set((state) => ({
      data: {
        ...state.data,
        [key]: value, // Dynamically update the specific field in the form data
      },
    })),
  clearData: () => set({ data: {} }),
  createStaff: async (data: Record<string, string>) => {
    try {
      const res = await axios_auth.post("staff/create", data);
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

  // for the current active section
  activeSection:"personal",
  setActiveSection:(section: string) => {
    set({activeSection:section})
  },
  validationAttempted: defaultValidationAttemptData,
  setValidationAttempted: (option: string, value: boolean) => {
    set((state)=> ({
      validationAttempted: {...state.validationAttempted, [option]: value}
    }))
  },
  resetValidation: () =>
    set(() => ({
      validationAttempted: defaultValidationAttemptData
    })),

}));
