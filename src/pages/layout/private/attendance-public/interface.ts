// 1. INTERFACES

import { IResponse } from "@/global/interface";
import { IQrResults } from "../qrcode/interface";

export interface IBusinessPublicInfo {
  appUserId: number;
  branchId: number;

  businessName: string;
  businessAddress: string;
  businessPhone: string;

  imageName: string;
}

export interface IAttendancePublicStore {
  businessPublicInfo: IBusinessPublicInfo;
  getBusinessInfoPublic: (businessName: string) => Promise<void>;
  publicCheckIns: () => Promise<IResponse>;
  chekInsRes: IQrResults;
  phone: string;
  setPhone: (phone: string) => void;
  clearPhone: () => void;
}
