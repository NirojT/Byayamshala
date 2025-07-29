import { IResponse } from "@/global/interface";

export interface IBusinessDetailsStore {
  // action for business details
  data: IBusinessData;
  setData: (newBusinessDetails: IBusinessData) => void;
  clearData: () => void;
  // actions to get the business details of a user
  getBusinessDetails: () => void;
  // action to create the business deatails
  createBusinessDetails: () => Promise<IResponse>;
  // action to update the business details
  updateBusinessDetails: () => Promise<IResponse>;

  qrCode: string; // qr code for the business
  generateQrCode :   (businessName: string) => Promise<void>;
  
}

export type IBusinessData = {
  id: number; // business id
  businessName: string;

  businessAddress: string;
  businessPhone: string;
  panNo: string;
  appUserId: number; // app user id

  cafeName: string; //gym may have differnet cafe name
  image: File | null;
  imageName: string; // logo of image
  businessPartnerPhones: string; //  comma separated phone numbers of business partners
  businessPartnerPhonesList:string[]; // list of phone numbers of business partners
};

export interface IBusinessDetails {
  id: number;
  businessName: string;

  businessAddress: string;
  businessPhone: string;
  panNo: string;

  cafeName: string; //gym may have differnet cafe name
  imageName: string; // logo of image
}
