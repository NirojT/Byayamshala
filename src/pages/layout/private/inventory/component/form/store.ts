/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axios_auth } from "../../../../../../global/config";
import { useItemListStore } from "../list/store";
import { IAddItemStore, IItemData } from "./interface";

const defaultData = {
  name: "",
  category: "", // THIS CATEGORY IS A DYNAMIC
  primaryUnit: "", // THIS PRIMARY UNIT IS A DYNAMIC
  sp: 0, // SELLING PRICE
  cp: 0, // COST PRICE
  openingStock: 0,
  lowStockAlert: 0,
  code: "",
  location: "",
  remarks: "",

  //for update
  stockQuantity: 0,
  id: 0,
  createdDate: "",
  createdNepDate: "",
  lastModifiedDate: "",

  localTimeZone: "",
  activeStatus: false,
  deleted: false,
  addedBy: "",

  // EXTRA DETAILS
};

export const useItemFormStore = create<IAddItemStore>((set, get) => ({
  // for create
  createData: { ...defaultData },
  setCreateData: (data: IItemData) =>
    set((state) => ({
      createData: { ...state.createData, ...data },
    })),
  clearCreateData: () => set({ createData: { ...defaultData } }),

  createItem: async () => {
    try {
      const res = await axios_auth.post("item/create", get().createData);
      if (res?.data?.status === 200) {
        useItemListStore.getState().setItem(res?.data?.data);
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

  // for update
  updateData: { ...defaultData },
  setUpdateData: (data: IItemData) =>
    set((state) => ({
      updateData: { ...state.updateData, ...data },
    })),
  clearUpdateData: () => set({ updateData: { ...defaultData } }),

  updateItem: async (id: number) => {
    try {
      const res = await axios_auth.put("item/update/" + id, get().updateData);
      if (res?.data?.status === 200) {
        const updatedItem = useItemListStore
          .getState()
          .items?.filter((item) => {
            if (item.id === id) {
              item = res?.data?.data;
            } else {
              return item;
            }
          });
        useItemListStore.getState().setItems(updatedItem);
        set({ updateData: { ...res?.data?.data } });
        return { message: res?.data?.message, severity: "success" };
      }
      return { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },
  getItem: async (id: number) => {
    try {
      const res = await axios_auth.get("item/get/" + id);
      if (res?.data?.status === 200) {
        set({ updateData: res?.data?.data });
      }
    } catch (error: any) {
      console.log(error);
    }
  },

  // for additional items
  addAdditonalItems: false,
  setAddAdditionalItems: (status: boolean) => {
    set({ addAdditonalItems: status });
  },

  openDelete: false,
  setOpenDelete: (openDelete) => {
    set({ openDelete });
  },
  delete: async (id: number) => {
    try {
      const res = await axios_auth.delete("item/delete/" + id);

      if (res?.data?.status >= 200 && res?.data?.status < 300) {
        
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
}));
