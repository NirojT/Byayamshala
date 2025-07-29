/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axios_auth } from "../../../../../../global/config";
import { IEditStaffStore } from "./interface";

export const useEditStaffFormStore = create<IEditStaffStore>((set) => ({
  data: {}, // Initialize an empty object to store form data
  setData: (key, value) =>
    set((state) => ({
      data: {
        ...state.data,
        [key]: value, // Dynamically update the specific field in the form data
      },
    })),
  updateStaff: async (data: Record<string, string | number | boolean>,id:number) => {
    try {
         
      const res = await axios_auth.put(`staff/update/${id}`, data);
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
  

 
 
}));
