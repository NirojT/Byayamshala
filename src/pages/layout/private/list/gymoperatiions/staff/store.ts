/* eslint-disable @typescript-eslint/no-explicit-any */
import { BulkTask } from "@/global/components/enums/enums";
import { create } from "zustand";
import { axios_auth } from "../../../../../../global/config";
import {
  IListStaffStore,
  IStaffDetails,
  IStaffFilterData,
} from "./interface";

export const useListStaffStore = create<IListStaffStore>((set, get) => ({
  isSearching: false,
  currentSearchData: null,
  staffs: [], // Initialize an empty object to store  data
  //for filtering
  filteredData: [],
  getStaffs: async () => {
    try {
      const res = await axios_auth.get(
        `staff/get-all/${get().page}/${get().rowsPerPage}`
      );

      if (res?.data?.status === 200) {
        set({ staffs: res?.data?.data?.content });
        set({ totalLength: res?.data?.data?.totalElements });
      }
      if (res?.data?.status === 400) {
        console.log("No data found");
        set({ staffs: [] });
      }
    } catch (error: any) {
      console.log(error);
    }
  },

  // for pagination we neeed total length of staffs
  totalLength: 0,

  //for searching api
  searchQuery: async (data: IStaffFilterData) => {
    set({ isSearching: true, currentSearchData: data }); // Store search state
    try {
      const res = await axios_auth.patch(
        `staff/search`,
        data
      );

      if (res?.data?.status === 200) {
        set({
          staffs: res?.data?.data 
          
        });
      }
      if (res?.data?.status === 400) {
        set({
          staffs: [],
         
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
      const staffIds = get()
        .filteredData?.filter((item) => item?.isSelected)
        ?.map((item) => item?.id);

      const res = await axios_auth.post(
        `staff/bulk-action?bulkTask=${get().bulkTask}`,
        staffIds
      );

      if (res?.data?.status === 200) {
        if (get().bulkTask !== BulkTask.WHATSAPP_SAVED) {
          set({
            // filteredData: get().filteredData.filter(
            //   (item: IStaffDetails) => !staffIds?.includes(item?.id)
            // ),
            staffs: get().staffs.filter(
              (item: IStaffDetails) => !staffIds?.includes(item?.id)
            ),
          });
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


 

  resetSearch: async () => {
    set({ isSearching: false, currentSearchData: null });
    set({
      filters: {
        fullName: "",
        shift: "",
      },
    });
    set({ page: 0 });
    set({ rowsPerPage: 10 });
    await get().getStaffs();
  },

  filters: {
    fullName: "",
    shift: "",
  },
  setFilters: (data: IStaffFilterData) => {
    set(() => ({
      filters: data,
    }));
  },

  setFilteredData: (data: IStaffDetails[]) => {
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

  rowsPerPage: 20,

  setRowsPerPage: (data: number) => {
    set(() => ({
      rowsPerPage: data,
    }));
  },
  //for toggering
  toggleSelectStaff: (id: number) => {
    set((state) => ({
      filteredData: state.filteredData.map((staff) =>
        staff.id === id
          ? { ...staff, isSelected: !staff.isSelected }
          : staff
      ),
    }));
  },

  toggleSelectAll: () => {
    set((state) => ({
      filteredData: state.filteredData.map((staff) => ({
        ...staff,
        isSelected: !staff.isSelected,
      })),
    }));
  },
}));
