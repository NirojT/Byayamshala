import {
  MemberShipStatus,
  PartyMoneyType,
} from "@/global/components/enums/enums";
import { IResponse } from "@/global/interface";

export interface IQrResults {
  //for details
  fullName: string;
  phone: string;
  address: string;
  profileImageName: string;  

  // for viewing status

  membershipStatus: MemberShipStatus;
  membershipEndDate: string;

  // for credits or due
  partyMoneyType: PartyMoneyType;
  amount: number;
}

export type IQrStore = {
  scanning: boolean;
  bulkSending: boolean;
  scanLoading: boolean;
  bulkStatus: string;
  scanResult: IQrResults | null;
  showBulkModal: boolean;
  setScanning: (value: boolean) => void;
  setBulkSending: (value: boolean) => void;
  setScanLoading: (value: boolean) => void;
  setBulkStatus: (value: string) => void;
  setScanResult: (value: IQrResults) => void;
  setShowBulkModal: (value: boolean) => void;
  clearScanResult:()=>void
  qrScan: (id: number) => Promise<IResponse>;
  sendQrCodes: () => Promise<IResponse>;
};
