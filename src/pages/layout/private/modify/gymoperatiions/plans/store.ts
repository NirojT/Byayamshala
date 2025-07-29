/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axios_auth } from "../../../../../../global/config";
import { IEditPlansStore } from "./interface";

export const useEditPlansFormStore = create<IEditPlansStore>((set) => ({
  data: {}, // Initialize an empty object to store form data
  setData: (key, value) =>
    set((state) => ({
      data: {
        ...state.data,
        [key]: value, // Dynamically update the specific field in the form data
      },
    })),
  updatePlans: async (
    data: Record<string, string | string[] | number | number[] | boolean>,
    id: number
  ) => {
    try {
      const res = await axios_auth.put(`plans/update/${id}`, data);

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
