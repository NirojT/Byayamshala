/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpenseType, PaymentMode } from "@/global/components/enums/enums";
import { create } from "zustand";
import { axios_auth } from "../../../../../../global/config";
import { IAddExpenseStore, IExpenseData } from "./interface";

const defaultData = {
  expenseType: ExpenseType.UTILITIES,
  paymentMode: PaymentMode.CASH,
  totalAmt: 0,
  notes: "",
  date: "",
};

export const useAddExpenseFormStore = create<IAddExpenseStore>((set) => ({
  supplierNames: [],
  items: [],
  data: { ...defaultData }, // Initialize an empty object to store form data
  setData: (data: IExpenseData) => set({ data }), // Set form data
  clearData: () => set({ data: { ...defaultData } }), // Clear form data
  createExpense: async (data: IExpenseData) => {
    try {
      const res = await axios_auth.post("expense/create", data);
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
  updateExpense: async (id: number, data: IExpenseData) => {
    try {
      const res = await axios_auth.put("expense/update/" + id, data);
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
  getExpenseById: async (id: number) => {
    try {
      const res = await axios_auth.get(`expense/get/${id}`);

      if (res?.data?.status === 200) {
        const data = res?.data?.data;
        //the key is expenseItemsRes in the response and in the form it is expenseItemsReq
        // so manually setting the key to expenseItemsReq
        const serverData=res?.data?.data;
        set({
          data: {
            ...serverData,
            date: serverData?.createdNepDate,
            expenseItemsReq: data?.expenseItemsRes,
          },
        });
      }
    } catch (error: any) {
      console.log(error);
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
  openDelete: false,
  setOpenDelete: (openDelete) => {
    set({ openDelete });
  },
}));
