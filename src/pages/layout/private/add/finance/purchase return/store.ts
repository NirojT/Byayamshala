/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axios_auth } from "../../../../../../global/config";
import { IPurchaseDetails } from "../../../reports/component/purchase/interface";
import { IAddPurchaseReturnStore, IPurchaseReturnData } from "./interface";

export const useAddPurchaseReturnFormStore = create<IAddPurchaseReturnStore>(
  (set, get) => ({
    billNo: "",
    setBillNo: (billNo: string) => {
      set({ billNo });
    },

    purchaseDetail: {} as IPurchaseDetails,
    clearPurchaseDetail: () => set({ purchaseDetail: {} as IPurchaseDetails }),
    getPurchaseByBillNo: async () => {
      try {
        const res = await axios_auth.get(
          `purchase/get-by-billNo?billNo=${get().billNo}`
        );

        if (res?.data?.status === 200) {
          set({ purchaseDetail: res?.data?.data });
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
    getPurchaseById: async (id: number) => {
      try {
        const res = await axios_auth.get(`purchase/get/${id}`);

        if (res?.data?.status === 200) {
          set({ purchaseDetail: res?.data?.data });
        }
      } catch (error: any) {
        console.log(error);
      }
    },

    data: [] as IPurchaseReturnData[],
    setDataList: (data: IPurchaseReturnData[]) => set({ data }), // Set form data
    setData: (data: IPurchaseReturnData) => {
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

    clearData: () => set({ data: [] as IPurchaseReturnData[] }), // Clear form data
    returnPurchase: async (purchaseId: number) => {
      try {
        const res = await axios_auth.put(
          `purchase/return/${purchaseId}`,
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
