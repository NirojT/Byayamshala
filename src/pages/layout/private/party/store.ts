/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand"; 
import { IPartyAccStore } from "./interface";
import { axios_auth } from "@/global/config";

export const usePartyStore = create<IPartyAccStore>((set) => ({
  partyAccounts: [],
  isSearching: false,
  getPartyAccounts: async () => {
    try {
      const res = await axios_auth.get(`party/get-party-acc`);

      if (res.status === 200) {
        set({ partyAccounts: res?.data?.data });
      }
    } catch (error: any) {
      console.log(error);
    }
  },

  //for searching api
  filteredData: [],
  setFilteredData: (data) => {
    set({ filteredData: data });
  },
  search: "",
  setSearch: (data: string) => {
    set({ search: data });
  },
  partyMoneyType: "",
  setPartyMoneyType: (data: string) => {
    set({ partyMoneyType: data });
  },
}));
