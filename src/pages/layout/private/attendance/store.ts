/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReportPeriod, ShiftType } from "@/global/components/enums/enums";
import { create } from "zustand";
import { axios_auth, defaultNepaliDate } from "../../../../global/config";
import {
  IAddAttendanceStore,
  IAttendanceData,
  IAttendanceDetails,
} from "./interface";
import { IGenericFilterData } from "@/global/interface";

const defaultFilterData = {
  name: "",
  reportPeriod: ReportPeriod.THIS_MONTH,
  startDate: defaultNepaliDate.toString(),
  endDate: defaultNepaliDate.toString(),
};

export const useAddAttendanceFormStore = create<IAddAttendanceStore>((set, get) => ({
  data: [],
  setData: (data) => set({ data }),
  details: [],
  memberAttendances: [],
  staffAttendances: [],
  setDetails: (details: IAttendanceDetails[]) => set({ details }),

  // this will select unselect the member
  toggleAttendance: (id: number) => {
    set((state) => ({
      details: state.details?.map((entry) =>
        entry?.member?.id === id
          ? { ...entry, isPresent: !entry.isPresent }
          : entry
      ),
    }));
  },
  toggelAllAttendance: () => {
    set((state) => ({
      details: state.details?.map((entry) => ({
        ...entry,
        isPresent: !entry.isPresent,
      })),
      selectAll: !state.selectAll,
    }));
  },

  saveAttendance: async (data: IAttendanceData[]) => {
    try {
      const res = await axios_auth.post(
        `attendance/add?date=${get().date}&userType=${get().attendenceFor}`,
        data
      );
      const isValid = res?.data?.status === 200;

      if (isValid) {
        const data = res?.data?.data;
        set({
          details: get().details?.map((attendance) => {
            if (data?.id === attendance?.id) {
              return data;
            }
            return attendance;
          }),
        });
      }

      return isValid
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
  getAttendanceOfToday: async () => {
    try {
      const res = await axios_auth.get(
        `attendance/get-today?userType=${get().attendenceFor}`
      );

      if (res?.data?.status === 200) {
        set({ details: res?.data?.data });
        return;
      }
      set({ details: [] });
    } catch (error: any) {
      console.log(error);
    }
  },
  addNewAttendance: async () => {
    try {
      const res = await axios_auth.post(`attendance/create?date=${get().date}&userType=${get().attendenceFor}`);

      if (res?.data?.status === 200) {
        set({ details: res?.data?.data });
        return { message: res?.data?.message, severity: "success" };
      }
      set({ details: [] });
      return { message: res?.data?.message, severity: "success" };
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },
  searchAttendance: async () => {
    try {
      const res = await axios_auth.get(
        `attendance/search?date=${get().date}&search=${get().search}&shift=${
          get().shift   }&userType=${get().attendenceFor}`
      );

      if (res?.data?.status === 200) {
        set({ details: res?.data?.data });
        return;
      }
      set({ details: [] });
    } catch (error: any) {
      console.log(error);
    }
  },

  searchByMember: async (memberId: number) => {
    try {
      const res = await axios_auth.post(
        `attendance/search-by-member/${memberId}`,
        get().filters
      );

      if (res?.data?.status === 200) {
        set({ memberAttendances: res?.data?.data });
        return;
      }
      set({ memberAttendances: [] });
    } catch (error: any) {
      console.log(error);
    }
  },
  searchByStaff: async (staffId: number) => {
    try {
      const res = await axios_auth.post(
        `attendance/search-by-staff/${staffId}`,
        get().filters
      );

      if (res?.data?.status === 200) {
        set({ staffAttendances: res?.data?.data });
        return;
      }
      set({ staffAttendances: [] });
    } catch (error: any) {
      console.log(error);
    }
  },

  shift: ShiftType.ALL,
  setShift: (shift) => set({ shift }),

  search: "",
  setSearch: (search) => set({ search }),

  date: defaultNepaliDate?.toString(),
  setDate: (date) => set({ date }),

  selectAll: false,
  setSelectAll: (selectAll) => set({ selectAll }),

  filters: {
    ...defaultFilterData,
  },
  setFilters: (data: IGenericFilterData) => {
    set(() => ({
      filters: data,
    }));
  },

  showDialog: false,
  setShowDialog: (value: boolean) => {
    set({
      showDialog: value,
    });
  },
  attendenceFor: "member",
  setAttendenceFor: (attendenceFor) => set({ attendenceFor }),
}));
