import { create } from "zustand";
import { IMenuData, IMenuStore } from "./interface";
import { axios_auth } from "@/global/config";
import { MenuType } from "@/global/components/enums/enums";

const defaultStockItem = {
  name: "",
  itemId: 0,
  quantity: 0,
};
const defaultData = {
  id: 0,

  name: "",

  price: 0,

  menuType: MenuType.EATABLE,
  stockItems: [defaultStockItem],
};

export const useMenuStore = create<IMenuStore>((set, get) => ({
  data: defaultData, // Initialize an empty object to store form data
  setData: (data) => set({ data }), // Set form data
  clearData: () => set({ data: defaultData }), // Clear form data
  saveMenu: async (data: IMenuData) => {
    try {
      const res = await axios_auth.post("menus/createOrUpdate", data);

      if (res?.data?.status === 200) {
        const serverData = res?.data?.data;
        if (get().data?.id > 0) {
          // than update the data in list of menus
          const menus = get().menus.map((menu) => {
            if (menu.id === serverData.id) {
              return { ...menu, ...serverData };
            }
            return menu;
          });
          set({ menus });
        } else {
          // than add the data in list of menus
          set({ menus: [serverData, ...get().menus] });
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

  menus: [],
  disabledMenus: [],
  getMenus: async () => {
    try {
      const res = await axios_auth.get(`menus/get-all-enabled`);

      if (res?.data?.status === 200) {
        set({ menus: res?.data?.data });
      }
      if (res?.data?.status === 400) {
        console.log("No data found");
        set({ menus: [] });
      }
    } catch (error: any) {
      console.log(error);
    }
  },
  getDisabledMenus: async () => {
    try {
      const res = await axios_auth.get(`menus/get-all-disabled`);

      if (res?.data?.status === 200) {
        set({ disabledMenus: res?.data?.data });
      }
      if (res?.data?.status === 400) {
        console.log("No data found");
        set({ disabledMenus: [] });
      }
    } catch (error: any) {
      console.log(error);
    }
  },

  changeStatus: async (id: number) => {
    try {
      const res = await axios_auth.patch("menus/change-status/" + id);

      if (res?.data?.status === 200) {
        set({
          menus: get().menus?.filter((menu) => menu.id !== id),
          disabledMenus: get().disabledMenus?.filter((menu) => menu.id !== id),
        });
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

  open: false,
  toggleOpen: () => {
    set({ open: !get().open });
  },
}));
