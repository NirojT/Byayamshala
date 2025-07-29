import { axios_auth } from "@/global/config";
import { create } from "zustand";
import { IClientQueryStore } from "./interface";
import { QueryFrom } from "@/global/components/enums/enums";

const defaultData = {
  email: "",
  whatsapp: "",
  message: "",
  queryFrom: QueryFrom.OUTSIDER, // set the queryfrom attribute to outsider initially
};

export const useClientQueryStore = create<IClientQueryStore>((set, get) => ({
  data: defaultData,
  setData: (data) =>
    set((state) => ({
      data: { ...state.data, ...data },
    })),
  clearData: () => set({ data: defaultData }),

  clientQuerys: [],
  create: async () => {
    try {
      const res = await axios_auth.post("client-query/create", get().data);

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

  getClientQuerys: async () => {
    try {
      const res = await axios_auth.get(
        `client-query/get-all/${get().page}/${get().rowsPerPage}`
      );

      if (res?.data?.status === 200) {
        set({ clientQuerys: res?.data?.data?.content });
        set({ totalLength: res?.data?.data?.totalElements });
      }
    } catch (error: any) {
      console.log(error);
    }
  },

  queryFrom: QueryFrom.BOTH,
  setQueryFrom: (queryFrom) => {
    set(() => ({
      queryFrom,
    }));
  },

  loading: false,
  setLoading: (loading) => set({ loading }),
  sending: false,
  setSending: (sending) => set({ sending }),

  totalLength: 0,
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
  filteredData: [],
  setFilteredData: (filteredData) => {
    set(() => ({
      filteredData 
    }));
  },
}));
