import { TaskStatus } from "@/global/components/enums/enums";
import { axios_auth } from "@/global/config";
import { create } from "zustand";
import {
  IEquipmentData,
  IEquipmentStore,
  IMaintainanceTaskData,
  IMaintainanceTaskDetails,
} from "./interface";

const defaultEquipmentTask: IMaintainanceTaskData = {
  id: 0,
  equipmentId: 0,
  taskDate: "",
  description: "",
  status: TaskStatus.PENDING, // Default status
};
const defaultEquipment: IEquipmentData = {
  name: "",
  quantity: 0,
  rate: 0,
  description: "",
};

export const useEquipmentStore = create<IEquipmentStore>((set, get) => ({
  equipmentData: defaultEquipment,
  setEquipmentData: (equipmentData) => set({ equipmentData }),
  clearEquipmentData: () => set({ equipmentData: defaultEquipment }),

  equipmentId: 0,
  setEquipmentId: (equipmentId: number) => set({ equipmentId }),
  equipments: [],
  // Add Equipment
  create: async () => {
  try {
    const res = await axios_auth.post(
      `equipment/create?id=${get().equipmentId}`,
      get().equipmentData
    );

    if (res.data?.status === 200) {
      const serverData = res.data.data;

      if (get().equipmentId === 0) {
        set({ equipments: [serverData, ...get().equipments] });
      } else {
        set({
          equipments: get().equipments.map((eq) =>
            eq.id === get().equipmentId ? serverData : eq
          ),
        });
      }

      get().clearEquipmentData();
    }

    return res?.data?.status === 200
      ? { message: res?.data?.message, severity: "success" }
      : { message: res?.data?.message, severity: "error" };
  } catch (error: any) {
    return {
      message: error?.response?.data?.message || "something went wrong",
      severity: "error",
    };
  }
},

  getEquipments: async () => {
    try {
      const res = await axios_auth.get("equipment/get-all");
      if (res?.data?.status === 200) {
        set({ equipments: res?.data?.data });
      }
    } catch (error: any) {
      console.log(error);
    }
  },
  deleteEquipment: async (id: number) => {
    try {
      const res = await axios_auth.delete("equipment/delete/" + id);
      if (res?.data?.status === 200) {
        set({
          equipments: get().equipments.filter((eq) => eq.id !== id),
        });
        return { message: res?.data?.message, severity: "success" };
      }
      return { message: "deletion failed", severity: "error" };
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },

  // --- TASKS ---
  data: { ...defaultEquipmentTask },
  setData: (data: IMaintainanceTaskData) => set({ data }),
  clearData: () => set({ data: { ...defaultEquipmentTask } }),

  tasks: [],
  setTasks: (tasks: IMaintainanceTaskDetails[]) => set({ tasks }),

  createTask: async (data: IMaintainanceTaskData) => {
    try {
      const res = await axios_auth.post("equipment/maintainance/create", data);
      if (res?.data?.status === 200) {
        set({
          tasks: [res?.data?.data, ...get().tasks],
          data: { ...defaultEquipmentTask },
        });
      }
      return res?.data?.status === 200
        ? { message: res?.data?.message, severity: "success" }
        : { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },

  getTasks: async () => {
    try {
      const res = await axios_auth.get(
        `equipment/maintainance/get-all/${get().page}/${get().rowsPerPage}`
      );

      if (res?.data?.status === 200) {
        set({ tasks: res?.data?.data?.content });
        set({ totalLength: res?.data?.data?.totalElements });
      } else {
        console.log("No data found");
        set({ tasks: [] });
      }
    } catch (error: any) {
      console.log(error);
      set({ tasks: [] });
    }
  },

  changeTaskStatus: async (taskId: number, status: TaskStatus) => {
    try {
      const res = await axios_auth.patch(
        `equipment/maintainance/change-status/${taskId}?status=${status}`
      );
      if (res?.data?.status === 200) {
        // Optionally, update the status in state.tasks:
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId ? { ...t, status } : t
          ),
        }));
      }
      return res?.data?.status === 200
        ? { message: res?.data?.message, severity: "success" }
        : { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },
  deleteTask: async (taskId: number) => {
    try {
      const res = await axios_auth.delete(
        `equipment/maintainance/delete/${taskId}`
      );
      if (res?.data?.status === 200) {
        // Optionally, remove the task from state.tasks:
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== taskId),
        }));
      }
      return res?.data?.status === 200
        ? { message: res?.data?.message, severity: "success" }
        : { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },
  // for pagination we neeed total length of members
  totalLength: 0,
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
}));
