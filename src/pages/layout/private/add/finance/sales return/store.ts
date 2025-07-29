/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axios_auth } from "../../../../../../global/config";
import { ISalesDetails } from "../../../reports/component/sales/interface";
import { IAddSalesReturnStore, ISalesReturnData } from "./interface";

export const useAddSalesReturnFormStore = create<IAddSalesReturnStore>(
  (set, get) => ({
    billNo: "",
    setBillNo: (billNo: string) => {
      set({ billNo });
    },

    salesDetail: {} as ISalesDetails,
    clearSalesDetail: () => set({ salesDetail: {} as ISalesDetails }),
    getSalesByBillNo: async () => {
      try {
        const res = await axios_auth.get(
          `sales/get-by-billNo?billNo=${get().billNo}`
        );

        console.log(res);

        if (res?.data?.status === 200) {
          set({ salesDetail: res?.data?.data });
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
    getSalesById: async (id: number) => {
      try {
        const res = await axios_auth.get(`sales/get/${id}`);

        if (res?.data?.status === 200) {
          set({ salesDetail: res?.data?.data });
        }
      } catch (error: any) {
        console.log(error);
      }
    },

    data: [] as ISalesReturnData[],
    setDataList: (data: ISalesReturnData[]) => set({ data }), // Set form data
    setData: (data: ISalesReturnData) => {
      // avoid duplicate data
      const isExist = get().data.some(
        (item) => item.itemName === data.itemName
      );
      if (isExist) {
        set({
          data: get().data.map((item) =>
            item.itemName === data.itemName
              ? { ...item, returnedQty: data.returnedQty }
              : item
          ),
        });
      }
    },

    clearData: () => set({ data: [] as ISalesReturnData[] }), // Clear form data
    returnSales: async (salesId: number) => {
      try {
        const res = await axios_auth.put(
          `sales/return/${salesId}`,
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

    isSubmitting: false,
    setIsSubmitting: (status: boolean) => {
      set({ isSubmitting: status });
    },

    isSearching: false,
    setIsSearching: (status: boolean) => {
      set({ isSearching: status });
    },

    showSucesssMessage: false,
    setShowSuccessMessage: (status: boolean) => {
      set({ showSucesssMessage: status });
    },
  })
);
