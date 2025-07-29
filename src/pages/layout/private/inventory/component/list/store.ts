/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axios_auth } from "../../../../../../global/config";
import { IItemDetails, IItemFilterData, IItemListStore } from "./interface";

// const defaultFilterData = {
//   name: "",
//   category: "",
//   stock:"",
// };
export const useItemListStore = create<IItemListStore>((set, get) => ({
  // for create
  items: [],
  setItem: (data: IItemDetails) => {
    set(() => ({
      items: [...get().items, data],
    }));
  },
  setItems: (data: IItemDetails[]) => {
    set(() => ({
      items: data,
    }));
  },
  isSearching: false,
  currentSearchData: null,
  getItems: async () => {
    try {
      const res = await axios_auth.get(
        `item/get-all?page=${get().page}&size=${get().rowsPerPage}`
      );

      set({
        items: res?.data?.data?.content,
        totalLength: res?.data?.data?.totalElements,
      });
    } catch (error: any) {
      console.log(error);
    }
  },
  getItemsbyId: async (id: number) => {
    try {
      const res = await axios_auth.get("item/get/" + id);

      set({ items: res?.data?.data });
    } catch (error: any) {
      console.log(error);
    }
  },

  // for pagination we neeed total length of Item
  totalLength: 0,

  //for searching api
  searchQuery: async (data: IItemFilterData) => {
    set({ isSearching: true, currentSearchData: data }); // Store search state
    try {
      const res = await axios_auth.patch(
        `item/search`,
        data
      );

      if (res?.data?.status === 200) {
        set({
          items: res?.data?.data ,
       
        });
      }
      if (res?.data?.status === 400) {
        set({
          items: res?.data?.data,
          
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  },

  resetSearch: async () => {
    set({ isSearching: false, currentSearchData: null });
    set({
      filters: { name: "", category: "", stock: "" },
    });
    set({ page: 0 });
    set({ rowsPerPage: 10 });
    await get().getItems();
  },

  filters: { name: "", category: "", stock: "" },
  setFilters: (data: IItemFilterData) => {
    set(() => ({
      filters: data,
    }));
  },
  filteredData: [],

  setFilteredData: (data: IItemDetails[]) => {
    set(() => ({
      filteredData: data,
    }));
  },

  page: 0,

  setPage: (data: number) => {
    set(() => ({
      page: data,
    }));
  },

  rowsPerPage: 10,

  setRowsPerPage: (data: number) => {
    set(() => ({
      rowsPerPage: data,
    }));
  },
}));
