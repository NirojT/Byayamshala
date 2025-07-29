// 1. INTERFACES

import { IAuditDetails, IResponse } from "@/global/interface";

export interface IWorkOutTitleListData {
  subTitle: string;
  image: File | null;

  //only for update
  id: number;
  imageName: string;
}

export interface IWorkOutPlanData {
  title: string;
  workOutTitleListReqs: IWorkOutTitleListData[];
}
export interface IWorkOutDetails extends IAuditDetails {
  title: string;
  workOutTitleListRes: IWorkOutTitleList[];
}
export interface IWorkOutTitleList extends IAuditDetails {
  description: any;
  subTitle: string;
  imageName: string; // image of that workout
}
export interface IWorkOutPlanStore {
  data: IWorkOutPlanData;
  setData: (data: IWorkOutPlanData) => void;
  clearData: () => void;
  create: () => Promise<IResponse>;
  update: (id: number) => Promise<IResponse>;
  delete: (id: number) => Promise<IResponse>;
  constructFormData: () => FormData;

  workOutPlans: IWorkOutDetails[];
  getWorkOuts: () => Promise<void>;
  getPublicView: (businessName: string) => Promise<void>;

  openDelete: boolean;
  setOpenDelete: (openDelete: boolean) => void;
  delteId: number;
  setDeleteId: (id: number) => void; 
}
