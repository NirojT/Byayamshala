/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axios_auth } from "../../../../../../global/config";
import { IListPlansStore, IPlansDetails, IPlansFilterData } from "./interface";
import { BulkTask } from "@/global/components/enums/enums";

export const useListPlansStore = create<IListPlansStore>((set, get) => ({
  isSearching: false,
  currentSearchData: null,

  plans: [], // Initialize an empty object to store  data
  //for filtering
  filteredData: [],

  getPlans: async () => {
    try {
      const res = await axios_auth.get(
        `plans/get-all/${get().page}/${get().rowsPerPage}`
      );

      if (res?.data?.status === 200) {
        set({ plans: res?.data?.data?.content });
        set({ totalLength: res?.data?.data?.totalElements });
      }
      if (res?.data?.status === 400) {
        console.log("No data found");
        set({ plans: [] });
      }
    } catch (error: any) {
      console.log(error);
    }
  },

  // for pagination we neeed total length of plans

  //for searching api
  searchQuery: async (data: IPlansFilterData) => {
    set({ isSearching: true, currentSearchData: data }); // Store search state
    try {
      const res = await axios_auth.get(
        `plans/search/${get().page}/${get().rowsPerPage}?name=${data?.name}`
      );

      if (res?.data?.status === 200) {
        set({
          plans: res?.data?.data?.content,
          totalLength: res?.data?.data?.totalElements,
        });
      }
      if (res?.data?.status === 400) {
        set({
          plans: res?.data?.data?.content,
          totalLength: res?.data?.data?.totalElements,
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  },
  bulkTask: null,
  setBulkTask: (data: BulkTask | null) => set({ bulkTask: data }),
  openModal: false,
  setOpenModal: (data: boolean) => set({ openModal: data }),

  bulkAction: async () => {
    try {
      const plansIds = get()
        .filteredData?.filter((item) => item?.isSelected)
        ?.map((item) => item?.id);

      const res = await axios_auth.post(
        `plans/bulk-action?bulkTask=${get().bulkTask}`,
        plansIds
      );

      if (res?.data?.status === 200) {
        set({
          // filteredData: get().filteredData.filter(
          //   (item: IPlansDetails) => !plansIds?.includes(item?.id)
          // ),
          plans: get().plans.filter(
            (item: IPlansDetails) => !plansIds?.includes(item?.id)
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

  resetSearch: async () => {
    set({ isSearching: false, currentSearchData: null });
    set({
      filters: {
        name: "",
      },
    });
    set({ page: 0 });
    set({ rowsPerPage: 50 });
    await get().getPlans();
  },

  filters: {
    name: "",
  },
  setFilters: (data: IPlansFilterData) => {
    set(() => ({
      filters: data,
    }));
  },

  setFilteredData: (data: IPlansDetails[]) => {
    set(() => ({
      filteredData: data,
    }));
  },
  totalLength: 0,
  page: 0,

  setPage: (data: number) => {
    set(() => ({
      page: data,
    }));
  },

  rowsPerPage: 50,

  setRowsPerPage: (data: number) => {
    set(() => ({
      rowsPerPage: data,
    }));
  },
  //for toggering
  toggleSelectPlans: (id: number) => {
    set((state) => ({
      filteredData: state.filteredData.map((plans) =>
        plans.id === id
          ? { ...plans, isSelected: !plans.isSelected }
          : plans
      ),
    }));
  },

  toggleSelectAll: () => {
    set((state) => ({
      filteredData: state.filteredData.map((plans) => ({
        ...plans,
        isSelected: !plans.isSelected,
      })),
    }));
  },
}));
