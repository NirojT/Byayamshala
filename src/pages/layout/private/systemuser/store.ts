import { create } from "zustand";
import { axios_auth, defaultNepaliDate } from "@/global/config";
import { ISystemUserData, ISystemUserStore } from "./interface";
import { ReportPeriod, SystemUserType } from "@/global/components/enums/enums";
import { IGenericFilterData } from "@/global/interface";

const defaultData: ISystemUserData = {
  userName: "",
  password: "",
  access: [],
  systemUserType: SystemUserType.STAFF,
};

const defaultFilterData = {
  name: "",
  reportPeriod: ReportPeriod.TODAY,
  startDate: defaultNepaliDate.toString(),
  endDate: defaultNepaliDate.toString(),
};

export const useSystemUserStore = create<ISystemUserStore>((set, get) => ({
  data: { ...defaultData },
  systemUsers: [],
  currentSystemUser: null,

  setData: (data) => set({ data }),
  clearData: () => set({ data: { ...defaultData } }),

  setCurrentSystemUser: (user) => set({ currentSystemUser: user }),

  createSystemUser: async (data) => {
    try {
      const res = await axios_auth.post("system-user/create", data);
      return res?.data?.status === 200
        ? { message: res?.data?.message, severity: "success" }
        : { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      return {
        message: error?.response?.data?.message || "Something went wrong",
        severity: "error",
      };
    }
  },

  updateSystemUser: async (id, data) => {
    try {
      const res = await axios_auth.put(`system-user/update/${id}`, data);
      return res?.data?.status === 200
        ? { message: res?.data?.message, severity: "success" }
        : { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      return {
        message: error?.response?.data?.message || "Something went wrong",
        severity: "error",
      };
    }
  },

  getSystemUserById: async (id) => {
    try {
      const res = await axios_auth.get(`system-user/get/${id}`);
      if (res?.data?.status === 200) {
        set({ data: res?.data?.data });
      }
    } catch (error: any) {
      // handle as needed
    }
  },

  getSystemUsers: async () => {
    try {
      const res = await axios_auth.get(`system-user/get-system-users`);
      if (res?.data?.status === 200) {
        set({
          systemUsers: res?.data?.data,
        });
      }
    } catch (error: any) {
      console.log(error);
      // handle as needed
    }
  },

  deleteSystemUser: async (id) => {
    try {
      const res = await axios_auth.delete(`system-user/delete/${id}`);
      if (res?.data?.status === 200) {
        set({
          systemUsers: get().systemUsers.filter((user) => user.id !== id),
        });
      }
      return res?.data?.status === 200
        ? { message: res?.data?.message, severity: "success" }
        : { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      return {
        message: error?.response?.data?.message || "Something went wrong",
        severity: "error",
      };
    }
  },

  changeStatus: async (id, activeStatus) => {
    try {
      const res = await axios_auth.patch(
        `system-user/change-status/${id}?activeStatus=${activeStatus}`
      );
      return res?.data?.status === 200
        ? { message: res?.data?.message, severity: "success" }
        : { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      return {
        message: error?.response?.data?.message || "Something went wrong",
        severity: "error",
      };
    }
  },

  changeType: async (id, systemUserType) => {
    try {
      const res = await axios_auth.patch(
        `system-user/change-type/${id}?systemUserType=${systemUserType}`
      );
      return res?.data?.status === 200
        ? { message: res?.data?.message, severity: "success" }
        : { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      return {
        message: error?.response?.data?.message || "Something went wrong",
        severity: "error",
      };
    }
  },

  loginSystemUser: async (userName: string, password: string) => {
    try {
      const res = await axios_auth.post("system-user/login", {
        userName,
        password,
      });

      if (res?.data?.status === 200) {
        // Store current system user
        set({ currentSystemUser: res?.data?.data });

        return {
          message: res?.data?.message,
          severity: "success",
          data: res?.data?.data,
        };
      } else {
        return {
          message: res?.data?.message || "Login failed",
          severity: "error",
        };
      }
    } catch (error: any) {
      return {
        message:
          error?.response?.data?.message ||
          "Login failed. Please check your credentials.",
        severity: "error",
      };
    }
  },
  getSytemProfile: async () => {
    try {
      const res = await axios_auth.get("auth/check-system");

      if (res?.data?.status === 200) {
        set({ currentSystemUser: res?.data?.data });
      } else {
        set({ currentSystemUser: null });
      }

      return res?.data?.status === 200
        ? { message: res?.data?.message, severity: "success" }
        : { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      set({ currentSystemUser: null });
      console.log(error);
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },

  logoutSystemUser: async () => {
    try {
      const res = await axios_auth.post(`auth/logout-system-user`);

      if (res?.data?.status >= 200 && res?.data?.status < 300) {
        set({ currentSystemUser: null });
      }

      return res?.data?.status >= 200 && res?.data?.status < 300
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

  //for logs********************
  logs: [],
  searchLogs: async () => {
    try {
      const res = await axios_auth.post(`system-user/logs`, get().filters);

      if (res?.data?.status === 200) {
        set({ logs: res?.data?.data });
        return;
      }
      set({ logs: [] });
    } catch (error: any) {
      console.log(error);
    }
  },

  filters: {
    ...defaultFilterData,
  },
  setFilters: (data: IGenericFilterData) => {
    set(() => ({
      filters: data,
    }));
  },

  isSubmitting: false,
  setIsSubmitting: (status) => set({ isSubmitting: status }),
  showPreview: false,
  setShowPreview: (status) => set({ showPreview: status }),
  openDelete: false,
  setOpenDelete: (openDelete) => set({ openDelete }),
}));
