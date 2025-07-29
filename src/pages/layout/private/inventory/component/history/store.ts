/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axios_auth } from "../../../../../../global/config";
import {
  IAddorDeductData,
  IItemFilterData,
  IItemHistoryDetails,
  IItemHistoryListStore,
} from "./interface";

const defaultFilterData = {
  name: "",
  category: "",
  lowStock: "",
};
const defaultStockData = {
  itemId: 0,
  id: 0, // this is the id for history for update purpose
  quantity: 0,
  remarks: "",
  date: null,
};
export const useItemHistoryListStore = create<IItemHistoryListStore>(
  (set, get) => ({
    // for create
    itemsHistory: [],
    setItemsHistory: (data: IItemHistoryDetails) => {
      set(() => ({
        itemsHistory: [data, ...get().itemsHistory], // Prepend new item
      }));
    },
    updateItemsHistory: (data: IItemHistoryDetails) => {
      set(() => ({
        // itemsHistory: [data, ...get().itemsHistory], // Prepend new item
        //check if the data is already in the list if than update or add new
        itemsHistory: get().itemsHistory.map((item: IItemHistoryDetails) => {
          if (item.id === data.id) {
            return data;
          }
          return item;
        }),
      }));
    },

    isSearching: false,
    currentSearchData: null,
    getItemsHistory: async (itemId: number) => {
      try {
        const res = await axios_auth.get(
          `item/get-items-history/${itemId}?page=${get().page}&size=${
            get().rowsPerPage
          }`
        );

        set({
          itemsHistory: res?.data?.data?.content,
          totalLength: res?.data?.data?.totalElements,
        });
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
        const res = await axios_auth.post(
          `item/search/${get().page}/${get().rowsPerPage}`,
          data
        );

        if (res?.data?.status === 200) {
          set({
            itemsHistory: res?.data?.data?.content,
            totalLength: res?.data?.data?.totalElements,
          });
        }
        if (res?.data?.status === 400) {
          set({
            itemsHistory: res?.data?.data?.content,
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
        filters: { ...defaultFilterData },
      });
      set({ page: 0 });
      set({ rowsPerPage: 10 });
    },

    filters: { ...defaultFilterData },
    setFilters: (data: IItemFilterData) => {
      set(() => ({
        filters: data,
      }));
    },
    filteredData: [],

    setFilteredData: (data: IItemHistoryDetails[]) => {
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

    // for add or deduct
    data: { ...defaultStockData },
    setData: (data: IAddorDeductData) => {
      set(() => ({
        data: data,
      }));
    },
    clearData: () => {
      set(() => ({
        data: { ...defaultStockData },
      }));
    },
    stockAddorDeduct: async (task: string) => {
      try {
        const res = await axios_auth.post(
          `item/add-deduct-stock?task=${task}`,
          get().data
        );
        if (res?.data?.status === 200) {
          if (get().data.id !== 0 && get().data.itemId !== 0) {
            get().updateItemsHistory(res?.data?.data);
          } else {
            get().setItemsHistory(res?.data?.data);
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
    deleteAddOrDeduct: async (id: number, task: string) => {
      try {
        const res = await axios_auth.delete(
          `item/delete-add-deduct-stock/${id}?task=${task}`
        );
        if (res?.data?.status === 200) {
          set({
            itemsHistory: get().itemsHistory.filter(
              (item: IItemHistoryDetails) => {
                return item.id !== id;
              }
            ),
          });
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
  })
);
