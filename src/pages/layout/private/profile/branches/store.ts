import { create } from "zustand";
import { IAnimationData, IBranchData, IBranchStore } from "./interface";
import { axios_auth } from "@/global/config";
import { useGlobalStore } from "@/global/store";

const defaultData = {
  name: "",
  location: "",
  id: 0,
};

const animationDefaultData = {
  isAnimating: false,
  branchId: null,
  branchName: "",
};

export const useBranchStore = create<IBranchStore>((set, get) => ({
  data: { ...defaultData },
  setData: (data: IBranchData) => {
    set({ data });
  },
  clear: () => {
    set({ data: { ...defaultData } });
  },

  branches: [],

  getBranches: async () => {
    try {
      const res = await axios_auth.get("branch/get-all");

      if (res.status >= 200 && res.status <= 300) {
        const data = res?.data?.data;

        set({ branches: data });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  },

  //for create and update and deactivate
  create: async () => {
    try {
      const res = await axios_auth.post(
        `branch/create?name=${get().data.name}&location=${get().data.location}`
      );
      if (res?.data?.status === 200) {
        const data = res?.data?.data;
        set({ branches: [...get().branches, data] });
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
  update: async (id: number) => {
    try {
      const res = await axios_auth.put(
        `branch/update/${id}?name=${get().data.name}&location=${
          get().data.location
        }`
      );

      if (res?.data?.status === 200) {
        const data = res?.data?.data;
        set({
          branches: get().branches.map((item) =>
            item.id === id ? data : item
          ),
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
  deactivate: async (id: number) => {
    try {
      const res = await axios_auth.put("branch/deactive/" + id);

      if (res?.data?.status === 200) {
        const data = res?.data?.data;
        set({
          branches: get().branches.map((item) =>
            item.id === id ? data : item
          ),
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
  switchBranch: async (id: number) => {
    try {
      const res = await axios_auth.post("auth/branch-switch/" + id);

      if (res?.data?.status >= 200 && res?.data?.status < 300) {
        const data = res?.data?.data;
        const appUser = useGlobalStore.getState().appUser;
        useGlobalStore.getState().setAppUser({
          ...appUser,
          email: data?.email,
          roles: data?.roles,
          subscriptionStatus: data?.status,
          isNew: data?.isNew,
          currentBranch: data?.currentBranch,
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

  isSubmitting: false,
  setIsSubmitting: (status: boolean) => {
    set({ isSubmitting: status });
  },

  searchTerm: "",
  setSearchTerm: (searchedTerm: string) => {
    set({
      searchTerm: searchedTerm,
    });
  },

  animationData: animationDefaultData,
  setAnimationData: (data: IAnimationData) => {
    set((state: IBranchStore) => ({
      animationData: { ...state.animationData, ...data },
    }));
  },

  // for editing
  isEditingBranch: false,
  setIsEditingBranch: (status: boolean) => {
    set({
      isEditingBranch: status,
    });
  },
}));
