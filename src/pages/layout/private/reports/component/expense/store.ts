/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axios_auth, defaultNepaliDate } from "../../../../../../global/config";
import { IExpenseFilterData, IListExpenseStore } from "./interface";
import { ReportPeriod } from "@/global/components/enums/enums";
const defaultFilterData = {
  reportPeriod: ReportPeriod.THIS_MONTH,
   startDate: defaultNepaliDate.toString(),
     endDate: defaultNepaliDate.toString(),
};
export const useListExpenseStore = create<IListExpenseStore>((set, get) => ({
  expense: [], // Initialize an empty object to store  data

  // for pagination we neeed total length of expense

  getExpenseById: async (id: number) => {
    try {
      const res = await axios_auth.get("expense/get/" + id);

      if (res?.data?.status === 200) {
        set({ expense: [res.data.data] });
      }
    } catch (error: any) {
      console.log(error);
    }
  },

  deleteExpense: async (id: number) => {
    try {
      const res = await axios_auth.delete("expense/delete/" + id);

      if (res?.data?.status === 200) {
        set({ expense: get().expense.filter((item) => item.id !== id) });
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
  // added
  //for searching api
  searchQuery: async () => {
    try {
      const res = await axios_auth.patch(`expense/search`, get().filterData);

      if (res?.data?.status === 200) {
        set({
          expense: res?.data?.data,
        });
        return {
          message: res?.data?.message,
          severity: "success",
        };
      } else {
        set({
          expense: [],
        });
        return {
          message: "No Expense Found",
          severity: "error",
        };
      }
    } catch (error: any) {
      set({
        expense: [],
      });
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },
  filterData: {
    ...defaultFilterData,
  },
  setFilterData: (data: IExpenseFilterData) => {
    set(() => ({
      filterData: data,
    }));
  },
 
  
  totalAmt: 0,
  setTotalAmt: (totalAmt: number) => {
    set(() => ({
      totalAmt: totalAmt,
    }));
  },
}));
