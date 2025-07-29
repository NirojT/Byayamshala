/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

import { axios_auth } from "@/global/config";
import { IAffilaterStore } from "./interface";

const defaultData = {
  noOfUsers: 0,
  totalCodeUsed: 0,
  totalEarnings: 0,
  totalPaid: 0,
  totalUnPaid: 0,
};

export const useAffilaterStore = create<IAffilaterStore>((set, get) => ({
  cardData: {
    ...defaultData,
  },
  affilatedSubs: [],

  getCardData: async (email: string) => {
    try {
      const res = await axios_auth.get(`affilate/get-card-data?email=${email}`);
      set({ cardData: res?.data?.data });
    } catch (error: any) {
      console.log(error);
    }
  },
  getAffilatedSubscription: async (email: string) => {
    try {
      const res = await axios_auth.get(
        `affilate/get-affilated-sub/${get().page}/${
          get().rowsPerPage
        }?email=${email}`
      );

      set({
        affilatedSubs: res?.data?.data?.content,
        totalLength: res?.data?.data?.totalElements,
      });
    } catch (error: any) {
      console.log(error);
    }
  },
  changeAffilatePaymentStatus: async (subId: number) => {
    try {
      const res = await axios_auth.patch(
        `affilate/change-payment-status/${subId}`
      );
      if (res?.data?.status === 200) {
        const data = res?.data?.data;
        set({
          affilatedSubs: [
            ...get().affilatedSubs.map((plan) =>
              plan?.id === subId ? { ...data } : plan
            ),
          ],
        });
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
  totalLength: 0,
  page: 0,

  setPage: (data: number) => {
    set(() => ({
      page: data,
    }));
  },

  rowsPerPage: 10,

  setRowsPerPage: (data: number) => {
    set(() => ({
      rowsPerPage: data,
    }));
  },




  currentSearchData: null,
  isSearching: false,
  resetSearch: () => {
    set({
      currentSearchData: null,
      isSearching: false,
    })

    set({page:0})
    set({rowsPerPage:10})
  }
}));

