import { DeliveryType, MessageType, ReportPeriod, SendWhom } from "../../../../global/components/enums/enums";
import { IAuditDetails, IResponse } from "../../../../global/interface";
import { IMemberDetails } from "../list/gymoperatiions/members/interface";

export type IAddMessageStore = {
  data: IMessageData;
  setData: (data: IMessageData) => void;
  clearData: () => void;
  createMessage: (data: IMessageData) => Promise<IResponse>;

  members: IMemberDetails[];
  getMembers: () => void;

  messages: IMessageDetails[];
  // getMessages: () => void;

  edata: IMessageData;
  setEData: (data: IMessageData) => void;
  clearEData: () => void;
  updateMessage: (id: number, data: IMessageData) => Promise<IResponse>;
  cancelMessage: (id: number) => Promise<IResponse>;

    isModelOpen: boolean,
      setIsModelOpen: (isOpen:boolean) => void
  
        searchQuery: () => Promise<IResponse>;
        filterData: IMessageFilterData;
        setFilterData: (data: IMessageFilterData) => void;
};

export type IMessageData = {
  messageType: MessageType;
  content: string;

  deliveryMethod: DeliveryType;
  sendWhom: SendWhom;

  schedule: boolean;
  scheduleDate: string;
};
export interface IMessageDetails extends IAuditDetails {
  messageType: MessageType;
  content: string;
  status: string;

  deliveryMethod: DeliveryType;
  sendWhom: SendWhom;

  schedule: boolean;
  scheduleDate: string
};

export interface IMessageFilterData {
 
  reportPeriod: ReportPeriod | null; // e.g., Today, This Week, This Month, Custom
  startDate: string;
  endDate: string;
}
 
