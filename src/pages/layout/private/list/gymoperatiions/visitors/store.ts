import { axios_auth, defaultNepaliDate } from "@/global/config";
import { create } from "zustand";
import { IVisitorFilterData, IVistorListStore } from "./interface";
import { ReportPeriod } from "@/global/components/enums/enums";
const defaultFilterData = {
  name: "",
  reportPeriod: ReportPeriod.THIS_MONTH,
  startDate: defaultNepaliDate.toString(),
    endDate: defaultNepaliDate.toString(),
};
export const useVisitorsListStore = create<IVistorListStore>((set, get) => ({
  //   getVisitors : async ()  => {
  //     try{
  //         const res = await axios_auth.get(`visitor/get-all/${get().page}/${get().rowsPerPage}`);

  //         if (res?.data?.status === 200) {
  //             set({ visitors: res?.data?.data?.content });
  //             set({ totalLength: res?.data?.data?.totalElements });
  //           }
  //           if (res?.data?.status === 400) {
  //             console.log("No data found");
  //             set({ visitors: [] });
  //           }
  //     } catch (error: any) {
  //         console.log(error);

  //     }
  // },
  // searchVisitors : async (name:string)  => {
  //     try{
  //         const res = await axios_auth.get(`visitor/search?name=${name}`);

  //         if (res?.data?.status === 200) {
  //           const data=res?.data?.data
  //             set({ visitors: data });
  //             set({ totalLength: data?.length });

  //           }
  //           if (res?.data?.status === 400) {
  //             console.log("No data found");
  //             set({ visitors: [] });
  //           }
  //     } catch (error: any) {
  //         console.log(error);

  //     }
  // },
  // totalLength:0,
  // isSearching:false,

  // page: 0,

  // setPage: (data: number) => {
  //   set(() => ({
  //     page: data,
  //   }));
  // },

  // rowsPerPage: 10,

  // setRowsPerPage: (data: number) => {
  //   set(() => ({
  //     rowsPerPage: data,
  //   }));
  // },
  visitors: [],
  isModelOpen: false,
  setIsModelOpen: (isOpen: boolean) => {
    set({ isModelOpen: isOpen });
  },

  //for searching api
  searchQuery: async () => {
    try {
      const res = await axios_auth.patch(`visitor/search`, get().filterData);

      if (res?.data?.status === 200) {
        set({
          visitors: res?.data?.data,
        });
        set({
          totalLength: get().visitors.length,
        });
        return {
          message: res?.data?.message,
          severity: "success",
        };
      } else {
        set({
          visitors: [],
        });
        return {
          message: "No Visitor Found",
          severity: "error",
        };
      }
    } catch (error: any) {
      set({
        visitors: [],
      });
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },
  filterData: {
    ...defaultFilterData,
  },
  setFilterData: (data: IVisitorFilterData) => {
    set(() => ({
      filterData: data,
    }));
  },
  totalLength: 0,
  isSearching: false,

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
  openDelete: false,
  setOpenDelete: (openDelete) => {
    set({ openDelete });
  },
  visitorId: 0,
  setVisitorId: (visitorId) => {
    set({ visitorId });
  },
  delete: async (id: number) => {
    try {
      const res = await axios_auth.delete("visitor/delete/" + id);

      if (res?.data?.status >= 200 && res?.data?.status < 300) {
        set({
          visitors: get().visitors.filter((visitor) => visitor.id !== id),
        })
        return { message: res?.data?.message, severity: "success" };
      }
      return { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },
}));