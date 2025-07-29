import { PartyMoneyType, PartyType, PaymentMode, ReportPeriod } from "@/global/components/enums/enums";
import { IAuditDetails, IResponse } from "@/global/interface";
import { IPartyAccDetials } from "../interface";

export type IPartyAccTransactionStore = {
  partyAccTransaction: IPartyAccTransactionDetials[];
  setTransaction: (data: IPartyAccTransactionDetials) => void;
  updateTransaction: (data: IPartyAccTransactionDetials) => void;
  getPartyAccTransactions: (
    partyName: string,
    partyType: PartyType
  ) => Promise<void>;

  partyAccDetail: IPartyAccDetials;
  getSpecificPartyAccTransactions: (
    partyName: string,
    partyType: PartyType
  ) => Promise<void>;

  open: boolean;
  task: PartyMoneyType;
  handleReceive: () => void;
  handleGive: () => void;
  setOpen: (open: boolean) => void;
  setTask: (task: PartyMoneyType) => void;

  data: IGaveOrRecieveData;
  setData: (data: IGaveOrRecieveData) => void;
  clearData: () => void;
  partyGaveOrReceive: () => Promise<IResponse>;
  deletePartyGaveOrReceive: (id: number) => Promise<IResponse>;

  filterData: IPartyTransactionFilterData;
  setFilterData: (data: IPartyTransactionFilterData) => void;

  reminderOpen: boolean;
  setReminderOpen: (open: boolean) => void;
  reminded: boolean;
  setReminded: (reminded: boolean) => void;
  sendReminder: (partyName: string, message: string) => Promise<IResponse>;
};

export interface IPartyAccTransactionDetials extends IAuditDetails {
  partyName: string;
  partyType: string;

  partyMoneyType: PartyMoneyType;
  notes: string;
  balance: number;
  salesId: number;
  purchaseId: number;
}
export type IGaveOrRecieveData = {
  id: number; // this is the id for history for update purpose and delete purpose
  partyName: string;
  partyType: string;
  amt: number;
  notes: string;
  partyMoneyType: PartyMoneyType;
  paymentMode:PaymentMode
};
export interface IPartyTransactionFilterData {
 
  reportPeriod: ReportPeriod | null; // e.g., Today, This Week, This Month, Custom
  startDate: string;
  endDate: string;
}