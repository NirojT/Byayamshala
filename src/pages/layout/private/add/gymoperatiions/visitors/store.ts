import { create } from "zustand";
import { IValidationErrors, IVisitorsData, IVisitorStore } from "./interface";
import { axios_auth } from "@/global/config";

const defaultData = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  notes: "",
};
const defaultError = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  notes: "",
};

export const useVisitorStore = create<IVisitorStore>((set, get) => ({
  data: defaultData,
  setData: (data: IVisitorsData) => {
    set((state: IVisitorStore) => ({
      data: { ...state.data, ...data },
    }));
  },
  clearData: () => {
    set({ data: defaultData });
  },

  addVisitor: async () => {
    try {
      const res = await axios_auth.post(`visitor/create`, get().data);
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

  // for form validation
  errors: defaultError,
  clearErrors: () => {
    set({ errors: defaultError });
  },
  setErrors: (data: IValidationErrors) => {
    set((state) => ({
      errors: { ...state.errors, ...data },
    }));
  },
}));
