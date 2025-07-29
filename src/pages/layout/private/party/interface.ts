 
import { PartyMoneyType, PartyType } from "@/global/components/enums/enums"; 
import { IAuditDetails } from "@/global/interface";

export type IPartyAccStore = {
  isSearching: boolean;
  partyAccounts: IPartyAccDetials[];
  getPartyAccounts: () => Promise<void>;
  filteredData: IPartyAccDetials[];
  setFilteredData: (data: IPartyAccDetials[]) => void;
  search: string;
  setSearch: (data: string) => void;
  partyMoneyType: string;
  setPartyMoneyType: (data: string) => void;

  
};

export interface IPartyAccDetials extends IAuditDetails {
  partyName: string;
  partyType: PartyType;
  balance: number;
  partyMoneyType: PartyMoneyType;
}


export interface IPartyAccFilterData {
  fullName: string;
  partyMoneyMode: string;
}
