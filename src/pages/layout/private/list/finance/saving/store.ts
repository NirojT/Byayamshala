/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReportPeriod } from "@/global/components/enums/enums";
import { create } from "zustand";
import { axios_auth, defaultNepaliDate } from "../../../../../../global/config";
import {
  IListSavingStore,
  ISavingArchiveDetails,
  ISavingBalanceDetails,
  ISavingDetails,
  ISavingFilterData,
} from "./interface"; 
const defaultFilterData = {
  savingId: 0,
  reportPeriod: ReportPeriod.THIS_MONTH,
   startDate: defaultNepaliDate.toString(),
     endDate: defaultNepaliDate.toString(),
};
export const useListSavingStore = create<IListSavingStore>((set, get) => ({
  savings: [], // Initialize an empty object to store  data
  savingArchives: [], // Initialize an empty object to store  data
  savingBalance: {} as ISavingBalanceDetails,

  setSavings: (data: ISavingDetails) => {
    set((state) => ({
      savings: state.savings.some((saving) => saving.id === data.id)
        ? state.savings.map((saving) => (saving.id === data.id ? data : saving))
        : [...state.savings, data],
    }));
  },
  setSavingsArchives: (data: ISavingArchiveDetails) => {
    set((state) => ({
      savingArchives: state.savingArchives.some(
        (savingArchive) => savingArchive.id === data.id
      )
        ? state.savingArchives.map((savingArchive) =>
            savingArchive.id === data.id ? data : savingArchive
          )
        : [...state.savingArchives, data],
    }));
  },

  getSaving: async () => {
    try {
      const res = await axios_auth.get("saving/get-all");

      if (res?.data?.status === 200) {
        set({ savings: res?.data?.data });
      }
    } catch (error: any) {
      console.log(error);
    }
  },
  // getSavingActivity: async (id: number) => {
  //   try {
  //     const res = await axios_auth.get(
  //       `saving/get-activity/${id}/${get().page}/${get().rowsPerPage}`
  //     );

  //     if (res?.data?.status === 200) {
  //       set({ savingArchives: res?.data?.data?.content });
  //       set({ totalLength: res?.data?.data?.totalElements });
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // },
  deleteActivity: async (id: number) => {
    try {
      const res = await axios_auth.delete(`saving/delete-activity/${id}`);

      if (res?.data?.status === 200) {
        set({
          savingArchives: get().savingArchives.filter(
            (savingArchive) => savingArchive?.id !== id
          ),
        });
        return { message: res?.data?.message, severity: "success" };
      }
      return { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },

  getSavingBalance: async (id: number) => {
    try {
      const res = await axios_auth.get(`saving/get-saving-balance/${id}`);

      if (res?.data?.status === 200) {
        set({ savingBalance: res?.data?.data });
      }
    } catch (error: any) {
      console.log(error);
    }
  },

  //for searching api
  searchQuery: async () => {
    try {
      const res = await axios_auth.patch(
        `saving/search-archive`,
        get().filterData
      );

      if (res?.data?.status === 200) {
        set({
          savingArchives: res?.data?.data,
        });
        return {
          message: res?.data?.message,
          severity: "success",
        };
      } else {
        set({
          savingArchives: [],
        });
        return {
          message: "No SavingArchives Found",
          severity: "error",
        };
      }
    } catch (error: any) {
      set({
        savingArchives: [],
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
  setFilterData: (data: ISavingFilterData) => {
    set(() => ({
      filterData: data,
    }));
  },

  //filters
  totalAddedAmt: 0,
  setTotalAddedAmt: (totalAddedAmt: number) => {
    set(() => ({
      totalAddedAmt,
    }));
  },
  totalWithDrawAmt: 0,
  setTotalWithDrawAmt: (totalWithDrawAmt: number) => {
    set(() => ({
      totalWithDrawAmt,
    }));
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
}));
