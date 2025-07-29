/* eslint-disable @typescript-eslint/no-explicit-any */
import { PartyType, PaymentMode } from "@/global/components/enums/enums";
import { create } from "zustand";
import { axios_auth, axios_auth_form } from "../../../../../../global/config";
import { IAddPurchaseStore, IPurchaseData } from "./interface";
const defaultPurchaseItem = {
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
  partyName: "",
  // supplierName: "",
  // thirdPartyName: "",
  partyType:PartyType.SUPPLIER,
  purchaseItemsReq: [defaultPurchaseItem], // Ensure it's an array
  paymentMode: PaymentMode.CASH,
  totalAmt: 0,
  notes: "",
  image: null, // Initialize as null for file upload
  imageName: "", // Initialize as empty string for file name
};

export const useAddPurchaseFormStore = create<IAddPurchaseStore>((set,get) => ({
  supplierNames: [],
  memberNames: [],
  thirdPartyNames: [],
  items: [],
  data: { ...defaultData }, // Initialize an empty object to store form data
  setData: (data: IPurchaseData) => set({ data }), // Set form data
  clearData: () => set({ data: { ...defaultData } }), // Clear form data
  createPurchase: async (data: IPurchaseData) => {
    try {
      

      const res = await axios_auth_form.post(
        "purchase/create",
        get().constructFormData(data)
      );
      console.log(res);
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
  /*
  export type IPurchaseData = {
    partyType: PartyType;
    partialAmt: number;
    billNo: string;
    date: string;
    partyName: string;
    // supplierName: string;
    // thirdPartyName: string;
  
    purchaseItemsReq: IPurchaseItem[];
    paymentMode: PaymentMode;
    totalAmt: number;
    notes: string;
    image: null | File;
  };
  */

  constructFormData: (data: IPurchaseData) => {
    const formData = new FormData();
    // Append all fields to FormData
    formData.append("partyType", data.partyType);
    formData.append("partialAmt", data.partialAmt.toString());
    formData.append("billNo", data.billNo);
    formData.append("date", data.date);
    formData.append("partyName", data.partyName);
    // formData.append("supplierName", data.supplierName);
    // formData.append("thirdPartyName", data.thirdPartyName);

    // Append purchase items
   // Append purchase items
data.purchaseItemsReq.forEach((item, index) => {
  Object.entries(item).forEach(([key, value]) => {
    formData.append(`purchaseItemsReq[${index}].${key}`, value.toString());
  });
});

    formData.append("paymentMode", data.paymentMode);
    formData.append("totalAmt", data.totalAmt.toString());
    formData.append("notes", data.notes);

    // Append image if it exists
    if (data.image) {
      formData.append("image", data.image);
    }

    return formData;

  }
  ,
  //for those members who have membership and have personal trainning
  getNamesOfMemberAndItem: async () => {
    try {
      const res = await axios_auth.get(
        `whole-data/get-all-names-item-member-supplier`
      );
      console.log(res);

      if (res?.data?.status === 200) {
        const data = res?.data?.data;

        set({
          supplierNames: data?.supplierNames,
          memberNames: data?.memberNames,
          thirdPartyNames: data?.thirdPartyNames,
          items: data?.items,
        });
      }
      if (res?.data?.status === 400) {
        console.log("No data found");
        set({
          supplierNames: [],
          items: [],
          thirdPartyNames: [],
          memberNames: [],
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  },

  updatePurchase: async (id: number, data: IPurchaseData) => {
    try {
      const res = await axios_auth_form.put("purchase/update/" + id,  get().constructFormData(data));
  
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
  getPurchaseById: async (id: number) => {
    try {
      const res = await axios_auth.get(`purchase/get/${id}`);

      if (res?.data?.status === 200) {
        const data = res?.data?.data;
        //the key is purchaseItemsRes in the response and in the form it is purchaseItemsReq
        // so manually setting the key to purchaseItemsReq
        const serverData = res?.data?.data;
        set({
          data: {
            ...serverData,
            date: serverData?.createdNepDate,
            purchaseItemsReq: data?.purchaseItemsRes,
          },
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  },
  // for modal
  openDelete: false,
  setOpenDelete: (openDelete) => {
    set({
      openDelete,
    });
  },
}));
