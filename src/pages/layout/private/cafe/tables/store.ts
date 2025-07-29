import { create } from "zustand";
import { ITableData, ITableStore } from "./interface";
import { axios_auth } from "@/global/config";

const defaultData = {
  id: 0,
  tableNo: "",
  capacity: 0,
};

export const useTableStore = create<ITableStore>((set,get) => ({
  data: defaultData, // Initialize an empty object to store form data
  setData: (data) => set({ data }), // Set form data
  clearData: () => set({ data: defaultData }), // Clear form data
  saveTable: async (data: ITableData) => {
    try {
      const res = await axios_auth.post("tables/createOrUpdate", data);

if(res?.data?.status === 200) {
  const serverData = res?.data?.data;
  if(get().data?.id > 0){
    // than update the data in list of tables
    const tables = get().tables.map((table) => {
      if (table.id === serverData.id) {
        return { ...table, ...serverData };
      }
      return table;
    });
    set({ tables });
  }
  else {
    // than add the data in list of tables
    set({ tables: [serverData, ...get().tables] });
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
  
  isSubmitting: false,
  setIsSubmitting: (status: boolean) => {
    set({ isSubmitting: status });
  },

  tables: [],
  getTables: async () => {
    try {
      const res = await axios_auth.get(`tables/get-all`);

      if (res?.data?.status === 200) {
        set({ tables: res?.data?.data });
      }
      if (res?.data?.status === 400) {
        console.log("No data found");
        set({ tables: [] });
      }
    } catch (error: any) {
      console.log(error);
    }
  },

  open: false,
  toggleOpen: ( ) => {
    set({ open: !get().open });
  }
}));
