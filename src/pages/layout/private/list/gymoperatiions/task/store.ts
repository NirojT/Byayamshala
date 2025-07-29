/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axios_auth } from "../../../../../../global/config";
import { IListTaskStore } from "./interface";
import { TaskStatus } from "@/global/components/enums/enums";

export const useListTaskStore = create<IListTaskStore>((set, get) => ({
  tasks: [], // Initialize an empty object to store  data

  getTask: async () => {
    try {
      const res = await axios_auth.get(
        `task/get-all/${get().page}/${get().rowsPerPage}`
      );

      if (res?.data?.status === 200) {
        set({ tasks: res?.data?.data?.content });
        set({ totalLength: res?.data?.data?.totalElements });
      }
      if (res?.data?.status === 400) {
        console.log("No data found");
        set({ tasks: [] });
      }
    } catch (error: any) {
      console.log(error);
    }
  },

  // for pagination we neeed total length of Task
  totalLength: 0,

  //for searching api

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

  openModal: false,
  setOpenModal: (openModal) => {
    set({ openModal });
  },
  delete: async (id: number) => {
    try {
      const res = await axios_auth.delete("task/delete/" + id);

      if (res?.data?.status >= 200 && res?.data?.status < 300) {
        set({ tasks: get().tasks.filter((task) => task.id !== id) });
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
  taskStatus: TaskStatus.IN_PROGRESS,
  setTaskStatus: (taskStatus) => {
    set({ taskStatus });
  },
  changeStatus: async (id: number) => {
    try {
      const res = await axios_auth.patch(
        `task/change-status/${id}?taskStatus=${get().taskStatus}`
      );

      if (res?.data?.status >= 200 && res?.data?.status < 300) {
        const serverData = res?.data?.data;
        set({
          tasks: get().tasks.map((task) => {
            if (task.id === id) {
              return { ...task, ...serverData };
            }
            return task;
          }),
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

  selectedTask: null,
  setSelectedTask: (task) => set({ selectedTask: task }),
}));
