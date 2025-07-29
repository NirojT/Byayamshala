/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axios_auth } from "../../../../../../global/config";
import { useListSavingStore } from "../../../list/finance/saving/store";
import {
  IAddSavingStore,
  ISavingAddData,
  ISavingCreateData,
} from "./interface";
import { PaymentMode } from "@/global/components/enums/enums";
//for creating new saving account
const defaultCreateData = {
  accountName: "",
  openingBalance: 0,
};
//for adding amount to saving account
const defaultAddAmtData = {
  id: 0,
  amt: 0,
  remarks: "",
  paymentMode: PaymentMode.CASH,
};
 
export const useAddSavingAcc = create<IAddSavingStore>((set, get) => ({
  data: { ...defaultCreateData }, // Initialize an empty object to store form data
  setData: (data: ISavingCreateData) =>
    set(() => ({
      data: {
        ...get().data,
        ...data,
      },
    })),
  clearData: () => {
    set({ data: { ...defaultCreateData } });
  },
  createSavingAcc: async (data: ISavingCreateData) => {
    try {
      const res = await axios_auth.post("saving/create", data);
      const setSavings = useListSavingStore.getState().setSavings;
      if (res?.data?.status === 200) {
        setSavings(res?.data?.data);
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
  // for adding amount to saving account
  addData: { ...defaultAddAmtData }, // Initialize an empty object to store form data
  setAddData: (data: ISavingAddData) =>
    set(() => ({
      addData: {
        ...get().data,
        ...data,
      },
    })),
  clearAddData: () => {
    set({ addData: { ...defaultAddAmtData } });
  },
  addSavingAmt: async (task: string) => {
    try {
      const res = await axios_auth.post(`saving/${task}-amt`, get().addData);
      const setSavingsArchives =
        useListSavingStore.getState().setSavingsArchives;
      if (res?.data?.status === 200) {
        setSavingsArchives(res?.data?.data);
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
  //for editing amount to saving account
  editData: { ...defaultAddAmtData }, // Initialize an empty object to store form data
  setEditData: (data: ISavingAddData) =>
    set(() => ({
      editData: {
        ...get().editData,
        ...data,
      },
    })),
  clearEditData: () => {
    set({ editData: { ...defaultAddAmtData } });
  },
  editSavingAmt: async () => {
    try {
      const res = await axios_auth.put(
        `saving/update-archive`,
        get().editData
      );
      const setSavingsArchives =
        useListSavingStore.getState().setSavingsArchives;
      if (res?.data?.status === 200) {
        setSavingsArchives(res?.data?.data);
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

  isModalOpen: false,

  setIsModalOpen: (value?: boolean) =>
    set((state) => ({
      isModalOpen: value !== undefined ? value : !state.isModalOpen,
    })),
  loading: false,

  setLoading: (value?: boolean) =>
    set((state) => ({
      loading: value !== undefined ? value : !state.loading,
    })),
}));
