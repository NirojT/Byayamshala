/* eslint-disable @typescript-eslint/no-explicit-any */
import { axios_auth } from "@/global/config";
import { create } from "zustand";
import { IItemUnitStore } from "./interface";

export const useItemUnitStore = create<IItemUnitStore>((set, get) => ({
  // for create
  itemUnits: [],
  filteredData: [],
  setFilteredData: (data: any) => set({ filteredData: data }),
  search: "",
  setSearch: (data: string) => set({ search: data }),
  getItemUnits: async () => {
    try {
      const res = await axios_auth.get("item-category-unit/get-all-unit");

      set({ itemUnits: res?.data?.data });
    } catch (error: any) {
      console.log(error);
    }
  },

  //for create and update

  unit: "",
  setUnit: (data: string) => set({ unit: data }),
  clearUnit: () => set({ unit: "" }),
  //for create
  createItemUnit: async () => {
    try {
      const res = await axios_auth.post(
        `item-category-unit/create-unit?unit=${get().unit}`
      );

      if (res?.data?.status === 200) {
        set({ itemUnits: [...get().itemUnits, res?.data?.data] });
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
  //for update
  updateItemUnit: async (id: number) => {
    try {
      const res = await axios_auth.put(
        `item-category-unit/update-unit/${id}?unit=${get().unit}`
      );
      if (res?.data?.status === 200) {
        const data = get().itemUnits.map((item: any) =>
          item?.id === id ? res?.data?.data : item
        );
        set({ itemUnits: data });
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

  //for delete
  deleteItemUnit: async (id: number) => {
    try {
      const res = await axios_auth.delete(
        `item-category-unit/delete-unit/${id}`
      );
      if (res?.data?.status === 200) {
        const data = get().itemUnits.filter((item: any) => item?.id !== id);
        set({ itemUnits: data });
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
}));
