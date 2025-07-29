/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PartyMoneyType,
  PartyType,
  PaymentMode,
  ReportPeriod,
} from "@/global/components/enums/enums";
import { axios_auth, defaultNepaliDate } from "@/global/config";
import { create } from "zustand";
import {
  IGaveOrRecieveData,
  IPartyAccTransactionDetials,
  IPartyAccTransactionStore,
  IPartyTransactionFilterData,
} from "./interface";
import { IPartyAccDetials } from "../interface";

const defaultGaveOrRecieve = {
  id: 0, // this is the id for history for update purpose
  partyName: "",
  partyType: "",
  amt: 0,
  notes: "",
  partyMoneyType: PartyMoneyType.YOU_RECEIVED,
  paymentMode: PaymentMode.CASH,
  // to add
  // date,
  // paymentmode -> cash, bank
};

const defaultFilterData = {
  reportPeriod: ReportPeriod.THIS_MONTH,
  startDate: defaultNepaliDate.toString(),
  endDate: defaultNepaliDate.toString(),
};
export const usePartyAccTransactionStore = create<IPartyAccTransactionStore>(
  (set, get) => ({
    partyAccTransaction: [],
    setTransaction: (data: IPartyAccTransactionDetials) => {
      set(() => ({
        partyAccTransaction: [data, ...get().partyAccTransaction], // Prepend new item
      }));
    },
    updateTransaction: (data: IPartyAccTransactionDetials) => {
      set(() => ({
        //check if the data is already in the list if than update or add new
        partyAccTransaction: get().partyAccTransaction.map(
          (item: IPartyAccTransactionDetials) => {
            if (item.id === data.id) {
              return data;
            }
            return item;
          }
        ),
      }));
    },

    getPartyAccTransactions: async (
      partyName: string,
      partyType: PartyType
    ) => {
      try {
        const res = await axios_auth.post(
          `party/get-party-acc-transaction?partyName=${partyName}&partyType=${partyType}`,
          get().filterData
        );

        if (res.status === 200) {
          set({ partyAccTransaction: res?.data?.data });
        }
      } catch (error: any) {
        console.log(error);
      }
    },

    partyAccDetail: {} as IPartyAccDetials,
    getSpecificPartyAccTransactions: async (
      partyName: string,
      partyType: PartyType
    ) => {
      try {
        const res = await axios_auth.get(
          `party/get-specific-party-acc/${partyName}/${partyType}`
        );

        if (res.status === 200) {
          set({ partyAccDetail: res?.data?.data });
        }
      } catch (error: any) {
        console.log(error);
      }
    },
    open: false,
    task: PartyMoneyType.YOU_RECEIVED,
    handleReceive: () => {
      set({
        open: true,
        task: PartyMoneyType.YOU_RECEIVED,
        data: { ...defaultGaveOrRecieve },
      });
    },
    handleGive: () => {
      set({
        open: true,
        task: PartyMoneyType.YOU_GAVE,
        data: { ...defaultGaveOrRecieve },
      });
    },
    setOpen: (open: boolean) => {
      set({ open });
    },
    setTask: (task: PartyMoneyType) => {
      set({ task });
    },

    // for gave or receive
    data: { ...defaultGaveOrRecieve },
    setData: (data: IGaveOrRecieveData) => {
      set(() => ({
        data: data,
      }));
    },
    clearData: () => {
      set(() => ({
        data: { ...defaultGaveOrRecieve },
      }));
    },
    partyGaveOrReceive: async () => {
      try {
        const res = await axios_auth.post(
          `party/add-gave-or-receive-task`,
          get().data
        );
        if (res?.data?.status === 200) {
          if (get().data.id !== 0) {
            get().updateTransaction(res?.data?.data);
          } else {
            get().setTransaction(res?.data?.data);
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
    deletePartyGaveOrReceive: async (id: number) => {
      try {
        const res = await axios_auth.delete(
          `party/delete-add-gave-or-receive-task/${id}`
        );
        if (res?.data?.status === 200) {
          set({
            partyAccTransaction: get().partyAccTransaction.filter(
              (item: IPartyAccTransactionDetials) => item.id !== id
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

    filterData: {
      ...defaultFilterData,
    },
    setFilterData: (data: IPartyTransactionFilterData) => {
      set(() => ({
        filterData: data,
      }));
    },

    reminderOpen: false,
    setReminderOpen: (reminderOpen) => {
      set({ reminderOpen: reminderOpen });
    },
    reminded: false,
    setReminded: (reminded) => {
      set({ reminded: reminded });
    },
    sendReminder: async (partyName: string, message: string) => {
      try {
        const res = await axios_auth.post(
          `party/credit/remind?partyName=${partyName}&message=${message}`
        );
        if (res?.data?.status === 200) {
          set({ reminded: true });
        } else {
          set({ reminded: true });
        }

        return res?.data?.status === 200
          ? { message: res?.data?.message, severity: "success" }
          : { message: res?.data?.message, severity: "error" };
      } catch (error: any) {
        console.log(error);
        if (error?.response?.data?.message) {
          set({ reminded: true });
          return { message: error?.response?.data?.message, severity: "error" };
        }
        return { message: "something went wrong", severity: "error" };
      }
    },
  })
);
