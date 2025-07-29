/* eslint-disable @typescript-eslint/no-explicit-any */
import { axios_auth } from "@/global/config";
import { create } from "zustand";
import { IItemCategoryStore } from "./interface";
  
 
 
export const useItemCategoryStore = create<IItemCategoryStore>((set, get) => ({
  // for create
  itemCategorys: [],
  filteredData: [],
  setFilteredData: (data: any) => set({ filteredData: data }),
  search: "",
  setSearch: (data: string) => set({ search: data }),
  getItemCategorys: async () => {
    try {
      const res = await axios_auth.get(
        "item-category-unit/get-all-category"
      );

      set({ itemCategorys: res?.data?.data });
    } catch (error: any) {
      console.log(error);
    }
  },






//for create and update


  category: "",
  setCategory: (data: string) => set({ category: data }),
  clearCategory: () => set({ category: "" }),
  //for create
  createItemCategory: async ( ) => {
    try {
      const res = await axios_auth.post(
        `item-category-unit/create-category?category=${get().category}`
      );

        if(res?.data?.status === 200){
           set({ itemCategorys: [...get().itemCategorys, res?.data?.data] });
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
  updateItemCategory: async ( id: number) => {
    try {
      const res = await axios_auth.put(
        `item-category-unit/update-category/${id}?category=${get().category}`
      );
 if(res?.data?.status === 200){
      const data = get().itemCategorys.map((item: any) =>
        item?.id === id ? res?.data?.data : item
      );
      set({ itemCategorys: data });
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
  deleteItemCategory: async (id: number) => {
    try {
      const res = await axios_auth.delete(
        `item-category-unit/delete-category/${id}`
      );
      if(res?.data?.status === 200){
      const data = get().itemCategorys.filter(
        (item: any) => item?.id !== id
      );
      set({ itemCategorys: data });
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
