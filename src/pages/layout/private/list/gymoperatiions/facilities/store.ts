/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axios_auth } from "../../../../../../global/config";
import {
  IFacilitiesDetails,
  IFacilitiesFilterData,
  IListFacilitiesStore,
} from "./interface";

export const useListFacilitiesStore = create<IListFacilitiesStore>(
  (set, get) => ({
    // getSelectedOption: (data:IFacilitiesDetails) => void,
    // setSelectedOption: () => void,

    isSearching: false,
    currentSearchData: null,

    facilities: [], // Initialize an empty object to store  data
    addFacilitiesToList: (data: IFacilitiesDetails) => {
      set((state) => ({
        facilities: [...state.facilities, data], // Add the new facility to the list in the store
      }));
    },
    //for filtering
    filteredData: [],
    selectedFacility: [],
    setSelectedFacility: (selectedFacility) => {
      set(() => ({
        selectedFacility,
      }));
    },
    getFacilities: async () => {
      try {
        const res = await axios_auth.get(
          `facilities/get-all/${get().page}/${get().rowsPerPage}`
        );

        if (res?.data?.status === 200) {
          set({ facilities: res?.data?.data?.content });
          set({ totalLength: res?.data?.data?.totalElements });
        }
        if (res?.data?.status === 400) {
          console.log("No data found");
          set({ facilities: [] });
        }
      } catch (error: any) {
        console.log(error);
      }
    },

    // for pagination we neeed total length of Facilities
    totalLength: 0,

    //for searching api
    searchQuery: async (data: IFacilitiesFilterData) => {
      set({ isSearching: true, currentSearchData: data }); // Store search state
      try {
        const res = await axios_auth.get(
          `facilities/search/${get().page}/${get().rowsPerPage}?name=${
            data?.name
          }`
        );

        if (res?.data?.status === 200) {
          set({
            facilities: res?.data?.data?.content,
            totalLength: res?.data?.data?.totalElements,
          });
        }
        if (res?.data?.status === 400) {
          set({
            facilities: res?.data?.data?.content,
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
      set({ rowsPerPage: 100 });
      await get().getFacilities();
    },

    filters: {
      name: "",
    },
    setFilters: (data: IFacilitiesFilterData) => {
      set(() => ({
        filters: data,
      }));
    },

    setFilteredData: (data: IFacilitiesDetails[]) => {
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

    rowsPerPage: 100,

    setRowsPerPage: (data: number) => {
      set(() => ({
        rowsPerPage: data,
      }));
    },
  })
);
