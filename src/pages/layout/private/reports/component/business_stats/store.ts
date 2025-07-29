/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReportPeriod } from "@/global/components/enums/enums";
import { saveAs } from "file-saver";
import { create } from "zustand";
import { axios_auth, defaultNepaliDate } from "../../../../../../global/config";
import {
  IBusinessStatsDetails,
  IBusinessStatsFilterData,
  IBusinessStatsStore,
} from "./interface";
const defaultData = {
  purchase: 0,
  sales: 0,
  expenses: 0,
  purchaseReturn: 0,
  salesReturn: 0,
  accountPayable: 0,
  accountReceivable: 0,
  closingStock: 0,
  noOfStock: 0,
};
const defaultFilterData = {
  reportPeriod: ReportPeriod.TODAY,
   startDate: defaultNepaliDate.toString(),
     endDate: defaultNepaliDate.toString(),
};
 
export const useBusinessStatsStore = create<IBusinessStatsStore>((set, get) => ({
  businessStats: { ...defaultData } as IBusinessStatsDetails, // Initialize an empty object to store  data

  getBusinessStats: async () => {
    try {
      const res = await axios_auth.post(
        `businessStats/get-overall`,
        get().filterData
      );

      if (res?.data?.status === 200) {
        set({ businessStats: res?.data?.data });
      }
      if (res?.data?.status === 400) {
        console.log("No data found");
        set({ businessStats: { ...defaultData } as IBusinessStatsDetails });
      }
    } catch (error: any) {
      console.log(error);
    }
  },

  /*
    for filters or range
    */
  filterData: {
    ...defaultFilterData,
  },
  setFilterData: (data: IBusinessStatsFilterData) => {
    set(() => ({
      filterData: data,
    }));
  },
  filters: {
    ...defaultFilterData,
  },
  setFilters: (filters: IBusinessStatsFilterData) => {
    set(() => ({
      filters 
    }));
  },

  pdf: null,
  setPdf: (pdf: Blob | null) => set({ pdf: pdf }),
  //for generating pdf api
  generatePdf: async () => {
    try {
      const res = await axios_auth.post(
        `reports/generate-pdf`,
        get().filterData,
        { responseType: "blob" }
      );

      if (res?.status === 200) {
        const blob = new Blob([res.data], {
          type: "application/pdf",
        });
        const pdfUrl = URL.createObjectURL(blob);

        set({
          pdf: pdfUrl as string, // 🟢 Now you're storing the object URL
        });
        // Open the PDF in a new tab for printing
        const printWindow = window.open(pdfUrl, "_blank");
        if (printWindow) {
          printWindow.onload = () => {
            printWindow.print();
          };
        }

        return {
          message: "generated succesfully",
          severity: "success",
        };
      }

      return { message: "failed to generate", severity: "error" };
    } catch (error: any) {
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },
  //
  // generate the excel file it is zipped and contains many .xlsx files
  //
  //
  generateExcel: async () => {
    try {
      const res = await axios_auth.post(
        `reports/generate-excel`,
        get().filterData,
        { responseType: "blob" }
      );

      if (res?.status === 200) {
        saveAs(
          res.data,
          ` ${get().filterData.reportPeriod}${(Math.random() * Math.random())
            .toString()
            .slice(0, 5)}.zip`
        );

        return {
          message: "generated succesfully",
          severity: "success",
        };
      }

      return { message: "failed to generate", severity: "error" };
    } catch (error: any) {
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },
  transactions: [],
  getTransaction: async () => {
    try {
      const res = await axios_auth.patch(
        `transaction/get-all`,
        get().filters
      );

      if (res?.status === 200) {
        set({
          transactions: res?.data?.data,
        });
        return;
      }
      set({
        transactions: [],
      });
    } catch (error: any) {
      console.log(error);
    }
  },

  // for setting the current tab
  currentTab: "financial",
  setCurrentTab: (tab: string) => {
    set({
      currentTab: tab,
    });
  },
}));
