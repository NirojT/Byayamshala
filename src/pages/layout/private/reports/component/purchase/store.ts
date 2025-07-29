/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axios_auth, defaultNepaliDate } from "../../../../../../global/config";
import { IListPurchaseStore, IPurchaseFilterData } from "./interface";
import { ReportPeriod } from "@/global/components/enums/enums";
const defaultFilterData = {
  billNo: "",
  reportPeriod: ReportPeriod.THIS_MONTH,
  startDate: defaultNepaliDate.toString(),
    endDate: defaultNepaliDate.toString(),
};
export const useListPurchaseStore = create<IListPurchaseStore>((set, get) => ({
  purchase: [], // Initialize an empty object to store  data

  getPurchaseById: async (id: number) => {
    try {
      const res = await axios_auth.get("purchase/get/" + id);

      if (res?.data?.status === 200) {
        set({ purchase: [res.data.data] });
      }
    } catch (error: any) {
      console.log(error);
    }
  },

  deletePurchase: async (id: number) => {
    try {
      const res = await axios_auth.delete("purchase/delete/" + id);

      if (res?.data?.status === 200) {
        set({ purchase: get().purchase.filter((item) => item.id !== id) });
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

  //for searching api
  searchQuery: async () => {
    try {
      const res = await axios_auth.patch(`purchase/search`, get().filterData);

      if (res?.data?.status === 200) {
        set({
          purchase: res?.data?.data,
        });
        return {
          message: res?.data?.message,
          severity: "success",
        };
      } else {
        set({
          purchase: [],
        });
        return {
          message: "No Purcahse Found",
          severity: "error",
        };
      }
    } catch (error: any) {
      set({
        purchase: [],
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
  setFilterData: (data: IPurchaseFilterData) => {
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
