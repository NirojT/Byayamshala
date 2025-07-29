/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReportPeriod } from "@/global/components/enums/enums";
import { create } from "zustand";
import { axios_auth, defaultNepaliDate } from "../../../../../../global/config";
import { IListMemberFacilityStore } from "./interface";
import { IGenericFilterData } from "@/global/interface";
import { IMemberFacilitiesDetails } from "../../../list/gymoperatiions/members/interface";
import { useListMemberStore } from "../../../list/gymoperatiions/members/store";
const defaultFilterData = {
  reportPeriod: ReportPeriod.TODAY,
  startDate: defaultNepaliDate.toString(),
  endDate: defaultNepaliDate.toString(),
  name: "",
};

export const useListMemberFacilityStore = create<IListMemberFacilityStore>((set, get) => ({
  memberFacilities: [], // Initialize an empty object to store  data

  setMemberShips: (memberFacilities: IMemberFacilitiesDetails[]) => {
    set(() => ({
      memberFacilities,
    }));
  },
  getMemberFacilityById: async (id: number) => {
    try {
      const res = await axios_auth.get("membership/get/facilities/" + id);

      if (res?.data?.status === 200) {
        set({ memberFacilities: [res.data.data] });
      } else {
        set({ memberFacilities: [] });
      }
    } catch (error: any) {
      console.log(error);
    }
  },

  deleteMemberFacility: async (id: number) => {
    try {
      const res = await axios_auth.delete("membership/delete/facilities/" + id);

      if (res?.data?.status === 200) {
        const { removeMemberFacilityFromList } = useListMemberStore.getState();
        removeMemberFacilityFromList(id);
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
  searchQuery: async () => {
    try {
      const res = await axios_auth.patch(`membership/search/facilities`, get().filterData);

      if (res?.data?.status === 200) {
        set({
          memberFacilities: res?.data?.data,
        });
        return {
          message: res?.data?.message,
          severity: "success",
        };
      } else {
        set({
          memberFacilities: [],
        });
        return {
          message: "No Sales Found",
          severity: "error",
        };
      }
    } catch (error: any) {
      set({
        memberFacilities: [],
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
  setFilterData: (data: IGenericFilterData) => {
    set(() => ({
      filterData: data,
    }));
  },
  totalAmt: 0,
  setTotalAmt: (totalAmt: number) => {
    set(() => ({
      totalAmt,
    }));
  },
  addedAmt: 0,
  setAddedAmt: (addedAmt: number) => {
    set(() => ({
      addedAmt,
    }));
  },

  discount: 0,
  setDiscount: (discount) => {
    set(() => ({
      discount,
    }));
  },

  openDelete: false,
  setOpenDelete: (openDelete) => {
    set({ openDelete });
  },
  data: null,
  setData: (data) => {
    set({ data });
  },
  inDepthReport: false,
  setInDepthReport: (inDepthReport) => {
    set({ inDepthReport });
  },
}));
