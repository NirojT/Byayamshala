import { create } from "zustand";
import { ISuperConfigStore } from "./interface";
import { axios_auth } from "@/global/config";

const defaultData = {
  id: 0,
  aboutCompany: "",
  email: "",
  phoneNumber: "",
};
export const useSuperConfigStore = create<ISuperConfigStore>((set, get) => ({
  data: defaultData,
  setData: (data) =>
    set((state) => ({
      data: { ...state.data, ...data },
    })),
 
   
  create: async () => {
    try {
      const res = await axios_auth.post(
        "super-admins-stuff/create",
        get().data
      );

      if (res?.data?.status === 200) {
        set({ data: res?.data?.data });
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
  update: async () => {
    try {
      const res = await axios_auth.put(
        "super-admins-stuff/update",
        get().data
      );
      if (res?.data?.status === 200) {
        set({ data: res?.data?.data });
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

  getSuperConfigs: async () => {
    try {
      const res = await axios_auth.get(
        `super-admins-stuff/get`
      );

      if (res?.data?.status === 200) {
        set({ data: res?.data?.data });
      }
    } catch (error: any) {
      console.log(error);
    }
  },

 
}));
