/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axios_auth } from "../../../../../../global/config";
import { IAddFacilitiesStore } from "./interface";
import { useListFacilitiesStore } from "../../../list/gymoperatiions/facilities/store";

export const useAddFacilitiesFormStore = create<IAddFacilitiesStore>((set) => ({
  data: {}, // Initialize an empty object to store form data
  setData: (key, value) =>
    set((state) => ({
      data: {
        ...state.data,
        [key]: value, // Dynamically update the specific field in the form data
      },
    })),
  clearData: () => set({ data: {} }),
  createFacilities: async (data: Record<string, string>) => {
    try {
      const res = await axios_auth.post("facilities/create", data);
      useListFacilitiesStore.getState().addFacilitiesToList(res?.data?.data); // Add the new facility to the list in the store
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

  isSubmitting: false,
  setIsSubmitting: (status: boolean) => {
    set({ isSubmitting: status });
  },

  showPreview: false,
  setShowPreview: (status: boolean) => {
    set({ showPreview: status });
  },

  // for attempt of validation
  validationAttempted: false,
  setIsValiationAttempted: (status: boolean) =>
    set({ validationAttempted: status }),
}));
