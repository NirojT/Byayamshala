/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axios_auth } from "../../../../../../global/config";
import { ISupplierDetails } from "../../../list/gymoperatiions/supplier/interface";
import { IEditSupplierStore } from "./interface";
const defaultData = {} as ISupplierDetails;
export const useEditSupplierFormStore = create<IEditSupplierStore>(
  (set, get) => ({
    data: { ...defaultData }, // Initialize an empty object to store form data
    setData: (data: ISupplierDetails) => set({ data }), // Set form data
    clearData: () => set({ data: { ...defaultData } }), // Clear form data

    updateSupplier: async (id: number) => {
      try {
        const res = await axios_auth.put(
          `supplier/update/${id}`,
          get().data
        );

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
  })
);
