import { create } from "zustand";
import { IMenuDetails } from "../menus/interface";

import { axios_auth } from "@/global/config";
import { MultiValue } from "react-select";
import { ITableSelects, ITakeOrderStore } from "./interface";

export const useTakeOrderStore = create<ITakeOrderStore>((set, get) => ({
  selectedMenus: [],
  selectedTables: [],

  addSelectedMenu: (menu: IMenuDetails) => {
    const menus = get().selectedMenus;
    const existingMenu = menus.find((m) => m.id === menu?.id);

    if (existingMenu) {
      // Increase quantity if already present
      set(() => ({
        selectedMenus: menus.map((m) =>
          m.id === menu?.id ? { ...m, quantity: m.quantity + 1 } : m
        ),
      }));
    } else {
      // Add new menu if not present
      set(() => ({
        selectedMenus: [...menus, { ...menu, quantity: 1 }],
      }));
    }
  },

  replaceSelectedMenu: (menus: IMenuDetails[]) => {
    set(() => ({
      selectedMenus: menus,
    }));
  },

  removeSelectedMenu: (menuId: number) => {
    set((state) => ({
      selectedMenus: state.selectedMenus.filter((menu) => menu?.id !== menuId),
    }));
  },

  clearSelectedMenus: () => {
    set(() => ({
      selectedMenus: [],
    }));
  },

  increaseMenuQuantity: (menuId: number) => {
    const menu = get().selectedMenus.find((m) => m.id === menuId);
    if (menu) {
      console.log(menu?.quantity);
      set((state) => ({
        selectedMenus: state.selectedMenus.map((m) =>
          m.id === menuId ? { ...m, quantity: m.quantity + 1 } : m
        ),
      }));
    }
  },
  decreaseMenuQuantity: (menuId: number) => {
    const menu = get().selectedMenus.find((m) => m.id === menuId);
    if (menu && menu?.quantity > 1) {
      set((state) => ({
        selectedMenus: state.selectedMenus.map((m) =>
          m.id === menuId ? { ...m, quantity: m.quantity - 1 } : m
        ),
      }));
    } else {
      set((state) => ({
        selectedMenus: state.selectedMenus.filter(
          (menu) => menu?.id !== menuId
        ),
      }));
    }
  },

  //for tables
  // ✅ Corrected Table Methods
  addSelectedTable: (tables: MultiValue<ITableSelects>) => {
    const currentTables = get().selectedTables;

    const newTables = Array.isArray(tables) ? tables : [tables];
    const uniqueTables = newTables.filter(
      (t) => !currentTables.some((ct) => ct.id === t.id)
    );

    if (uniqueTables.length > 0) {
      set(() => ({
        selectedTables: [...currentTables, ...uniqueTables],
      }));
    }
  },

  replaceSelectedTable: (selectedTables) => {
    set(() => ({
      selectedTables: selectedTables,
    }));
  },

  removeSelectedTable: (tableId) => {
    set((state) => ({
      selectedTables: state.selectedTables.filter((t) => t.id !== tableId),
    }));
  },

  clearSelectedTables: () => {
    set(() => ({
      selectedTables: [],
    }));
  },

  remarks: "",
  setRemarks: (remarks) => {
    set(() => ({
      remarks: remarks,
    }));
  },

  //take order *************************************

  placeOrder: async () => {
    // /*
    // *   private    double totalPrice;
    // *  private    String remarks;
    // *  private     List<OrderItemReq> orderItemReq;
    // *  private      List<OrderTableReq> orderTableReq;
    // *  /

    try {
      const res = await axios_auth.post(
        "orders/create",
        JSON.stringify(get().constructPayload())
      );

      // if (res?.data?.status === 200) {
      // }

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

  constructPayload: () => {
    const { selectedMenus, selectedTables, remarks } = get();
    const orderItemReq = selectedMenus.map((menu) => ({
      menuId: menu?.id,
      quantity: menu?.quantity,
    }));

    const orderTableReq = selectedTables.map((table) => ({
      tableId: table.id,
    }));

    const totalPrice = selectedMenus?.reduce(
      (acc, menu) => acc + menu?.price * menu?.quantity,
      0
    );

    return {
      orderItemReq,
      orderTableReq,
      remarks,
      totalPrice,
    };
  },
  //update order *************************************

  updateOrder: async (id: number) => {
    try {
      const res = await axios_auth.put(
        "orders/update/" + id,
        JSON.stringify(get().constructPayload())
      );

      // if (res?.data?.status === 200) {
      // }

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
  //********* for dashboard  *************************************

  dashboardData: {
    pendingOrders: 0,
    occupiedTables: 0,

    enabledMenus: 0,
  },
  getDashBoard: async () => {
    try {
      const res = await axios_auth.get("orders/get-cafe-dashboard");

      if (res?.data?.status === 200) {
        const serverData = res?.data?.data;
        set({
          dashboardData: {
            
            ...serverData,
          },
        });
      }

       
    } catch (error: any) {
      console.log(error);
      
  }
  }
  ,
}));
