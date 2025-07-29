/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axios_auth, defaultNepaliDate } from "../../../../global/config";
import { IAddMessageStore, IMessageData, IMessageFilterData } from "./interface";
import {
  DeliveryType,
  MessageType,
  ReportPeriod,
  SendWhom,
} from "../../../../global/components/enums/enums";
const defaultData = {
  messageType: MessageType.HOLIDAY,
  content: "",

  deliveryMethod: DeliveryType.WHATSAPP,
  sendWhom: SendWhom.MEMBER,

  schedule: false,
  // scheduleDate: new Date().toISOString().slice(0, 16), // Ensures correct local datetime format
  scheduleDate: defaultNepaliDate.toString()
};
const defaultFilterData = {
  reportPeriod: ReportPeriod.THIS_MONTH,
  startDate: defaultNepaliDate.toString(),
  endDate: defaultNepaliDate.toString(),
};
export const useAddMessageStore = create<IAddMessageStore>((set,get) => ({
  members: [],
  messages: [],
  data: { ...defaultData }, // Initialize an empty object to store form data
  setData: (data: IMessageData) => set({ data }), // Set form data
  clearData: () => set({ data: { ...defaultData } }), // Clear form data
  createMessage: async (data: IMessageData) => {
    try {
      const res = await axios_auth.post("message/create", data);
      console.log(res);
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

  //for those members who have membership and have personal trainning
  getMembers: async () => {
    try {
      const res = await axios_auth.get(`member/get-members-for-pt`);

      if (res?.data?.status === 200) {
        set({ members: res?.data?.data });
      }
      if (res?.data?.status === 400) {
        console.log("No data found");
        set({ members: [] });
      }
    } catch (error: any) {
      console.log(error);
    }
  },
  //
  // getMessages: async () => {
  //   try {
  //     const res = await axios_auth.get(`message/get-all/0/20`);

  //     if (res?.data?.status === 200) {
  //       set({
  //         messages: res?.data?.data?.content,
  //         // totalLength: res?.data?.data?.totalElements,
  //       });
  //     }
  //     if (res?.data?.status === 400) {
  //       set({
  //         messages: res?.data?.data?.content,
  //         // totalLength: res?.data?.data?.totalElements,
  //       });
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // },

  edata: { ...defaultData }, // Initialize an empty object to store form data
  setEData: (edata: IMessageData) => set({ edata }), // Set form data
  clearEData: () => set({ edata: { ...defaultData } }), // Clear form data

  updateMessage: async (id: number, data: IMessageData) => {
    try {
      const res = await axios_auth.put("message/update/" + id, data);
      if (res?.data?.status === 200) {
        const data = res?.data?.data;
        // now update the message in the list

        set((state) => ({
          messages: state.messages.map((message) =>
            message.id === id ? { ...message, status: data.status } : message
          ),
        }));

        return { message: res?.data?.message, severity: "success" };
      } else {
        return { message: "failed to cancel", severity: "error" };
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },
  cancelMessage: async (id: number) => {
    try {
      const res = await axios_auth.patch("message/cancel/" + id);
      if (res?.data?.status === 200) {
        const data = res?.data?.data;
        // now update the message in the list

        set((state) => ({
          messages: state.messages.map((message) =>
            message.id === id ? { ...message, status: data.status } : message
          ),
        }));

        return { message: "canceled successfully", severity: "success" };
      } else {
        return { message: "failed to cancel", severity: "error" };
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },





//search message
 isModelOpen: false,
  setIsModelOpen: (isOpen: boolean) => {
    set({ isModelOpen: isOpen });
  },

  //for searching api
  searchQuery: async () => {
    try {
      const res = await axios_auth.patch(`message/search`, get().filterData);

      if (res?.data?.status === 200) {
        set({
          messages: res?.data?.data,
        });
        return {
          message: res?.data?.message,
          severity: "success",
        };
      } else {
        set({
          messages: [],
        });
        return {
          message: "No Message Found",
          severity: "error",
        };
      }
    } catch (error: any) {
      set({
        messages: [],
      });
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },
  filterData: {
    ...defaultFilterData,
  },
  setFilterData: (data: IMessageFilterData) => {
    set(() => ({
      filterData: data,
    }));
  },







}));
