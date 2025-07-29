/* eslint-disable @typescript-eslint/no-explicit-any */
import { PartyType, PaymentMode } from "@/global/components/enums/enums";
import { create } from "zustand";
import {
  axios_auth,
  base64ToUint8Array,
} from "../../../../../../global/config";
import { IAddSalesStore, ISalesData, ISalesItem } from "./interface";
const defaultSalesItem = {
  itemName: "",
  quantity: 0,
  returnedQty: 0,
  discount: 0,
  price: 0,
  originalPrice: 0,
};

const defaultData = {
  partialAmt: 0,
  billNo: "",
  date: "",
  salesItemsReq: [defaultSalesItem], // Ensure it's an array
  paymentMode: PaymentMode.CASH,
  totalAmt: 0,
  notes: "",
  partyType: PartyType.MEMBER,
  partyName: "",

  // supplierName: "", // if it is supplier
  // memberName: "", // if it is member
  // thirdPartyName: "", // if it is third party
};

export const useAddSalesFormStore = create<IAddSalesStore>((set, get) => ({
  data: { ...defaultData }, // Initialize an empty object to store form data
  setData: (data: ISalesData) => set({ data }), // Set form data
  clearData: () => set({ data: { ...defaultData } }), // Clear form data

  pdf: null,
  setPdf: (pdf: Blob | null) => set({ pdf: pdf }),

  createSales: async (data: ISalesData) => {
    try {
      const res = await axios_auth.post(
        `sales/create?printBill=${get().printBill}`,
        data
      );

      if (res.data?.status === 200) {
        const serverData = res.data.data;
        if (get().printBill) {
          // Decode Base64 to Uint8Array
          const byteArray = base64ToUint8Array(serverData?.invoicePdf);
          const pdfBlob = new Blob([byteArray], { type: "application/pdf" });

          set({
            pdf: pdfBlob,
            printBill: false,
          });
        } else {
          set({
            pdf: null,
            printBill: false,
          });
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
  updateSales: async (id: number, data: ISalesData) => {
    try {
      const res = await axios_auth.put("sales/update/" + id, data);

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
  getSalesById: async (id: number) => {
    try {
      const res = await axios_auth.get(`sales/get/${id}`);

      if (res?.data?.status === 200) {
        const data = res?.data?.data;
        //the key is salesItemsRes in the response and in the form it is salesItemsReq
        // so manually setting the key to salesItemsReq
      const serverData = res?.data?.data;
      set({
        data: {
          ...serverData,
          date: serverData?.createdNepDate,
          salesItemsReq: data?.salesItemsRes,
        },
      });
      }
    } catch (error: any) {
      console.log(error);
    }
  },

  items: [],

  getNamesOfItem: async () => {
    try {
      const res = await axios_auth.get(`whole-data/get-all-item`);
      console.log(res);

      if (res?.data?.status === 200) {
        const data = res?.data?.data;

        set({
          items: data,
        });
      }
      if (res?.data?.status === 400) {
        console.log("No data found");
        set({
          items: [],
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  },
  quickSales: async (data:  ISalesItem[],paymentMode:PaymentMode) => {
    try {
      const res = await axios_auth.post(
        `sales/quick?paymentMode=${paymentMode}`,
        data
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
  addAdditionalDetails: false,
  setAddAdditioalDetails: (curr: boolean) => {
    set({ addAdditionalDetails: curr });
  },
  openDelete: false,
  setOpenDelete: (openDelete) => {
    set({ openDelete });
  },
  printBill: false,
  setPrintBill: (printBill) => {
    set({ printBill });
  },
}));
