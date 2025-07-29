/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { 
  axios_auth,
  base64ToUint8Array,
  defaultNepaliDate, 
} from "../../../../../../global/config";
import { IListSalesStore, ISalesFilterData } from "./interface"; 
import { PrintFormat, ReportPeriod } from "@/global/components/enums/enums";
const defaultFilterData = {
    billNo: "",
    reportPeriod: ReportPeriod.TODAY ,
    startDate: defaultNepaliDate.toString(),
    endDate: defaultNepaliDate.toString(),
}

export const useListSalesStore = create<IListSalesStore>((set, get) => ({
  sales: [], // Initialize an empty object to store  data

  getSalesById: async (id: number) => {
    try {
      const res = await axios_auth.get("sales/get/" + id);

      if (res?.data?.status === 200) {
        set({ sales: [res.data.data] });
      } else {
        set({ sales: [] });
      }
    } catch (error: any) {
      console.log(error);
    }
  },

  // for pagination we neeed total length of sales

  //for searching api

  deleteSales: async (id: number) => {
    try {
      const res = await axios_auth.delete("sales/delete/" + id);

      if (res?.data?.status === 200) {
        set({ sales: get().sales.filter((item) => item.id !== id) });
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
  // printSales,printFormat,setPrintFormat

  printFormat: PrintFormat.POS,
  setPrintFormat: (printFormat: PrintFormat) => {
    set(() => ({
      printFormat,
    }));
  },
  printSales: async (id: number) => {
    try {
      const res = await axios_auth.post(
        `sales/print/${id}?printFormat=${get().printFormat}`
      );

      if (res.data?.status === 200) {
        const serverData = res.data.data;

        // Decode Base64 to Uint8Array
        const byteArray = base64ToUint8Array(serverData);
        const pdfBlob = new Blob([byteArray], { type: "application/pdf" });

        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Open the PDF in a new tab for printing
        const printWindow = window.open(pdfUrl, "_blank");
        if (printWindow) {
          printWindow.onload = () => {
            printWindow.print();
          };
        }
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
      const res = await axios_auth.patch(`sales/search`, get().filterData);

      if (res?.data?.status === 200) {
        set({
          sales: res?.data?.data,
        });
        return {
          message: res?.data?.message,
          severity: "success",
        };
      } else {
        set({
          sales: [],
        });
        return {
          message: "No Sales Found",
          severity: "error",
        };
      }
    } catch (error: any) {
      set({
        sales: [],
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
  setFilterData: (data: ISalesFilterData) => {
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
  discount: 0,
  setDiscount: (discount) => {
    set(() => ({
      discount,
    }));
  },
  inDepthReport: false,
  setInDepthReport: (inDepthReport) => {
    set({ inDepthReport });
  },
}));
