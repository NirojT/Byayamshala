/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axios_auth } from "../../../../../../global/config";
import { IListSupplierStore, ISupplierDetails, ISupplierFilterData } from "./interface";

export const useListSupplierStore = create<IListSupplierStore>((set, get) => ({
  isSearching: false,
  currentSearchData: null,

  supplier: [], // Initialize an empty object to store  data
  //for filtering
  filteredData: [],

  getSupplier: async () => {
    try {
      const res = await axios_auth.get(
        `supplier/get-all/${get().page}/${get().rowsPerPage}`
      );

      if (res?.data?.status === 200) {
        set({ supplier: res?.data?.data?.content });
        set({ totalLength: res?.data?.data?.totalElements });
      }
      if (res?.data?.status === 400) {
        console.log("No data found");
        set({ supplier: [] });
      }
    } catch (error: any) {
      console.log(error);
    }
  },

  // for pagination we neeed total length of supplier
  totalLength: 0,

  //for searching api
  searchQuery: async (data: ISupplierFilterData) => {
    set({ isSearching: true, currentSearchData: data }); // Store search state
    try {
     const res = await axios_auth.get(
       `supplier/search/${get().page}/${get().rowsPerPage}?name=${data?.name}`
     );


      if (res?.data?.status === 200) {
        set({
          supplier: res?.data?.data?.content,
          totalLength: res?.data?.data?.totalElements,
        });
      }
      if (res?.data?.status === 400) {
        set({
          supplier: res?.data?.data?.content,
          totalLength: res?.data?.data?.totalElements,
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  },

  resetSearch: async () => {
    set({ isSearching: false, currentSearchData: null });
    set({
      filters: {
        name: "",
      },
    });
    set({ page: 0 });
    set({ rowsPerPage: 10 });
    await get().getSupplier();
  },

  filters: {
    name: "",
  },
  setFilters: (data: ISupplierFilterData) => {
    set(() => ({
      filters: data,
    }));
  },

  setFilteredData: (data: ISupplierDetails[]) => {
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
