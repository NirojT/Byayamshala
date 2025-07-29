import { IResponse } from "@/global/interface";

export interface ISuperConfigStore {
  data: ISuperConfigData;
  setData: (data: ISuperConfigData) => void;

  create: () => Promise<IResponse>;
  update: () => Promise<IResponse>;
  getSuperConfigs: () => Promise<void>;
}

export type ISuperConfigData = {
  id: number;
  aboutCompany: string;
  email: string;
  phoneNumber: string;
};
 