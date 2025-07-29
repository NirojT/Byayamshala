/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { IDayEndClosingDetails, IDayEndClosingStore } from "./interface";
import { axios_auth, defaultNepaliDate } from "@/global/config";
import { ReportPeriod } from "@/global/components/enums/enums";

const defaultData = {
  actualClosingCash: 0,
  cashDiscrepancy: 0,
  cashDiscrepancyReason: "",
  actualClosingBank: 0,
  bankDiscrepancy: 0,
  bankDiscrepancyReason: "",
  handledBy: "",
  remarks: "",
};
const defaultFilterData = {
  reportPeriod: ReportPeriod.THIS_MONTH,
  startDate: defaultNepaliDate.toString(),
    endDate: defaultNepaliDate.toString(),
};
export const useDayEndClosingStore = create<IDayEndClosingStore>(
  (set, get) => ({
    data: defaultData,
    setData: (data) => {
      set({ data });
    },
    clearData: () => {
      set({ data: defaultData });
    },

    dayEndClosingDetails: {} as IDayEndClosingDetails,
    dayEndClosingDetailsList: [],
    getToday: async () => {
      try {
        const res = await axios_auth.get("day-end/get-today");

        if (res?.data?.status === 200) {
          const serverData = res?.data?.data;

          set({
            dayEndClosingDetails: serverData,
            data: {
              ...get().data,
              actualClosingBank: serverData?.actualClosingBank,
              actualClosingCash: serverData?.actualClosingCash,
              cashDiscrepancy: serverData?.cashDiscrepancy,
              bankDiscrepancy: serverData?.bankDiscrepancy,
              cashDiscrepancyReason: serverData?.cashDiscrepancyReason,
              bankDiscrepancyReason: serverData?.bankDiscrepancyReason,
              handledBy: serverData?.handledBy,
              remarks: serverData?.remarks,
            },
          });
        }
      } catch (error: any) {
        console.log(error);
      }
    },

    // for pagination we neeed total length of day-end

    //for searching api

    entry: async () => {
      try {
        const res = await axios_auth.post("day-end/entry", get().data);

        if (res?.data?.status === 200) {
          set({ dayEndClosingDetails: res?.data?.data });
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
        const res = await axios_auth.patch(`day-end/search`, get().filter);

        if (res?.data?.status === 200) {
          set({
            dayEndClosingDetailsList: res?.data?.data,
          });
          return {
            message: res?.data?.message,
            severity: "success",
          };
        } else {
          set({
            dayEndClosingDetailsList: [],
          });
          return {
            message: "No dayEndClosingDetailsList Found",
            severity: "error",
          };
        }
      } catch (error: any) {
        set({
          dayEndClosingDetailsList: [],
        });
        if (error?.response?.data?.message) {
          return { message: error?.response?.data?.message, severity: "error" };
        }
        return { message: "something went wrong", severity: "error" };
      }
    },
    filter: {
      ...defaultFilterData,
    },
    setFilter: (filter) => {
      set(() => ({
        filter,
      }));
    },

    clearFilter: () => {
      set(() => ({
        filter: defaultFilterData,
      }));
    },


    // for changing filter
    currentTab: "cash",
    setCurrentTab: (value:string) => {
      set({
        currentTab: value
      })
    }
  })
);
