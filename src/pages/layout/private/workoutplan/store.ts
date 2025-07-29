import { create } from "zustand";
import { IWorkOutPlanStore } from "./interface";
import { axios_auth, axios_auth_form, axios_no_auth } from "@/global/config";

// Define the default for a single workout title
const defaultWorkOutTitleData = {
  id: 0, //for update
  imageName: "",

  subTitle: "",
  image: null,
};

// Define the default for the whole plan, initializing with one empty workout entry
const defaultData = {
  title: "",
  workOutTitleListReqs: [defaultWorkOutTitleData],
};

export const useWorkOutPlanStore = create<IWorkOutPlanStore>((set, get) => ({
  data: defaultData,
  setData: (data) => {
    set({ data });
  },
  clearData: () => {
    set({ data: defaultData });
  },
  create: async () => {
    try {
      const res = await axios_auth_form.post(
        `workout/create`,
        get().constructFormData()
      );

      if (res?.data?.status >= 200 && res?.data?.status < 300) {
        const serverData = res?.data?.data;
        set({ workOutPlans: [serverData, ...get().workOutPlans] });
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
  constructFormData: () => {
    const formData = new FormData();
    formData.append("title", get().data.title);
    get().data.workOutTitleListReqs.forEach((item, idx) => {
      formData.append(`workOutTitleListReqs[${idx}].subTitle`, item.subTitle);
      formData.append(`workOutTitleListReqs[${idx}].id`, item.id?.toString());
      if (item.image)
        formData.append(`workOutTitleListReqs[${idx}].image`, item.image);
    });
    return formData;
  },
  update: async (id: number) => {
    try {
      const res = await axios_auth_form.put(
        `workout/update/${id}`,
        get().constructFormData()
      );

      if (res?.data?.status >= 200 && res?.data?.status < 300) {
        const serverData = res?.data?.data;
        set({
          workOutPlans: get().workOutPlans.map((item) =>
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
  workOutPlans: [],
  getWorkOuts: async () => {
    try {
      const res = await axios_auth.get(`workout/get-all`);

      if (res?.data?.status === 200) {
        set({ workOutPlans: res?.data?.data });
      } else {
        set({ workOutPlans: [] });
      }
    } catch (error: any) {
      console.log(error);
    }
  },

  delete: async (id: number) => {
    try {
      const res = await axios_auth.delete("workout/delete/" + id);

      if (res?.data?.status >= 200 && res?.data?.status < 300) {
        set({
          workOutPlans: get().workOutPlans.filter((item) => item.id !== id),
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

  getPublicView: async (businessName: string) => {
    try {
      const res = await axios_no_auth.get(
        `workout/public-view/${businessName}`
      );

      if (res?.data?.status === 200) {
        set({ workOutPlans: res?.data?.data });
      } else {
        set({ workOutPlans: [] });
      }
    } catch (error: any) {
      console.log(error);
    }
  },
  openDelete: false,
  setOpenDelete: (openDelete) => {
    set({ openDelete });
  },
  delteId: 0,
  setDeleteId: (id) => set({ delteId: id }),
}));
