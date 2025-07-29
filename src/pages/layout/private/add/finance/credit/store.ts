/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { IAddCreditStore, ICreditData } from "./interface";
import { axios_auth } from "../../../../../../global/config";
import { PartyType, PartyMoneyType } from "@/global/components/enums/enums";

const defaultData = {
  partyType: PartyType.MEMBER,
  partyMoneyType: PartyMoneyType.TO_RECEIVE,
  amount: 0,
  notes: "",

  partyName: "", // if it is supplier
};

export const useAddCreditFormStore = create<IAddCreditStore>((set, get) => ({
  supplierNames: [],
  items: [],
  data: { ...defaultData }, // Initialize an empty object to store form data
  setData: (data: ICreditData) => set({ data }), // Set form data
  clearData: () => set({ data: { ...defaultData } }), // Clear form data
  createCredit: async (data: ICreditData) => {
    try {
      const res = await axios_auth.post("party/credit", data);

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
  updateCredit: async (id: number, data: ICreditData) => {
    try {
      const res = await axios_auth.put(`party/update/${id}`, data);

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
  getPartyAccById: async (id: number) => {
    try {
      const res = await axios_auth.get(`party/get/${id}`);
      if (res?.data?.status === 200) {
        const data = res?.data?.data;
        get().setData({ ...data, amount: data?.balance });
      }
    } catch (error: any) {
      console.log(error);
    }
  },
  deletePartyCredit: async (id: number) => {
    try {
      const res = await axios_auth.delete(`party/delete-credit/${id}`);
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

  // for modal
  openDelete: false,
  setOpenDelete: (openDelete) => {
    set({
      openDelete
    });
  },

   
}));
