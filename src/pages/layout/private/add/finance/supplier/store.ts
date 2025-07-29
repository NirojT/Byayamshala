/* eslint-disable @typescript-eslint/no-explicit-any */
import { PartyMoneyType } from "@/global/components/enums/enums";
import { create } from "zustand";
import { axios_auth } from "../../../../../../global/config";
import { IAddSupplierStore, ISupplierData } from "./interface";
 
const defaultData = {
  name: "",
  address: "",
  phoneNo: "",
  email: "",
  panNo: "",
  partyMoneyType: PartyMoneyType.TO_GIVE,
  initialBalance: 0,
};

export const useAddSupplierFormStore = create<IAddSupplierStore>((set) => ({
 
  data: { ...defaultData }, // Initialize an empty object to store form data
  setData: (data: ISupplierData) => set({ data }), // Set form data
  clearData: () => set({ data: { ...defaultData } }), // Clear form data
  createSupplier: async (data: ISupplierData) => {
    try {
      const res = await axios_auth.post("supplier/create", data);
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
