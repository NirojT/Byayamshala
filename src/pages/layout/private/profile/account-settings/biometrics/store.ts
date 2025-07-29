import { create } from "zustand";
import { IBiometricsStore, IBiometricsData } from "./interface";
import { axios_auth } from "@/global/config";

const defaultData: IBiometricsData = {
  deviceName: "",
  deviceSN: "",
  deviceModel: "",
  deviceType: "",
  brand: "",
  locationDescription: "",
};

export const useBiometricsStore = create<IBiometricsStore>((set, get) => ({
  data: defaultData,
  setData: (data) => set({ data }),
  clearData: () => set({ data: defaultData }),

  create: async () => {
    try {
      const res = await axios_auth.post(
        `biometric-devices/register`,
        get().data
      );
      if (res?.data?.status >= 200 && res?.data?.status < 300) {
        const serverData = res?.data?.data;
        set({ biometrics: [serverData, ...get().biometrics] });
        return { message: res?.data?.message, severity: "success" };
      }
      return { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong " + error, severity: "error" };
    }
  },

  update: async (id: number) => {
    try {
      const res = await axios_auth.put(
        `biometric-devices/update/${id}`,
        get().data
      );
      if (res?.data?.status >= 200 && res?.data?.status < 300) {
        const serverData = res?.data?.data;
        set({
          biometrics: get().biometrics.map((item) =>
            item.id === id ? serverData : item
          ),
        });
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

  delete: async (id: number) => {
    try {
      const res = await axios_auth.delete(`biometric-devices/delete/${id}`);
      if (res?.data?.status >= 200 && res?.data?.status < 300) {
        set({
          biometrics: get().biometrics.filter((item) => item.id !== id),
        });
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

  biometrics: [],
  getBiometrics: async () => {
    try {
      const res = await axios_auth.get(`biometric-devices/all`);
      if (res?.data?.status === 200) {
        set({ biometrics: res?.data?.data });
      } else {
        set({ biometrics: [] });
      }
    } catch (error: any) {
      set({ biometrics: [] });
      console.log(error);
    }
  },

  //unlock door
  doorUnlock: async (deviceSN: string) => {
    try {
      const res = await axios_auth.post(
        `biometric-devices/unlock-door/${deviceSN}`
      );
      if (res?.data?.status >= 200 && res?.data?.status < 300) {
        return { message: res?.data?.message, severity: "success" };
      }
      return { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong " + error, severity: "error" };
    }
  },
  //a llow access to door according to shift or expired
  doorAccessLogic: async (
    id: number,
    allowAutoDoorLock: boolean,
    blockShiftAccess: boolean
  ) => {
    try {
      const res = await axios_auth.patch(
        `biometric-devices/door-logic/${id}/${allowAutoDoorLock}/${blockShiftAccess}`
      );
      if (res?.data?.status >= 200 && res?.data?.status < 300) {
        const serverData = res?.data?.data;
        set({
          biometrics: get().biometrics.map((item) =>
            item.id === id ? serverData : item
          ),
        });
        return { message: res?.data?.message, severity: "success" };
      }
      return { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong " + error, severity: "error" };
    }
  },
  commands: [],
  getBiometricsCommnads: async (deviceSN: string) => {
    try {
      const res = await axios_auth.get(
        `biometric-devices/commands/${deviceSN}/${get().page}/${
          get().rowsPerPage
        }` // Use page and rowsPerPage from the store
      );
      if (res?.data?.status === 200) {
        set({ commands: res?.data?.data?.content });
        set({ totalLength: res?.data?.data?.totalElements });
      } else {
        set({ commands: [] });
      }
    } catch (error: any) {
      set({ commands: [] });
      console.log(error);
    }
    try {
      const res = await axios_auth.get(
        `biometric-devices/commands/${deviceSN}/${get().page}/${
          get().rowsPerPage
        }` // Use page and rowsPerPage from the store
      );
      if (res?.data?.status === 200) {
        set({ commands: res?.data?.data?.content });
        set({ totalLength: res?.data?.data?.totalElements });
      } else {
        set({ commands: [] });
      }
    } catch (error: any) {
      set({ commands: [] });
      console.log(error);
    }
  },
  getUsersCommnads: async (deviceSN: string) => {
    
      const res = await axios_auth.get( `biometric-devices/findCommands/${deviceSN}`)

        console.log(res)

  },
  openDelete: false,
  setOpenDelete: (openDelete) => set({ openDelete }),
  deleteId: 0,
  setDeleteId: (id) => set({ deleteId: id }),

  totalLength: 0,
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
}));
