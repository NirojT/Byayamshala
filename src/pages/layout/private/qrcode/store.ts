/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
// import { IQRAccStore } from "./interface";
 
import { axios_auth } from "@/global/config";
import { IQrStore } from "./interface";
// const defaultScan={

//     fullName: "",
//     phone: "",
//     address: "",
//     profileImageName: "",

//     membershipStatus: MemberShipStatus.ACTIVE,
//   membershipEndDate: "",

//     partyMoneyType: PartyMoneyType.SETTLED ,
//     amount: 0
//   }

export const useQRStore = create<IQrStore>((set, get) => ({
  scanning: false,
  bulkSending: false,
  scanLoading: false,
  bulkStatus: "",
  scanResult: null,
  showBulkModal: false,

  setScanning: (scanning) => set({ scanning }),
  setBulkSending: (bulkSending) => set({ bulkSending }),
  setScanLoading: (scanLoading) => set({ scanLoading }),
  setBulkStatus: (bulkStatus) => set({ bulkStatus }),
  setScanResult: (scanResult) => set({ scanResult }),
  setShowBulkModal: (showBulkModal) => set({ showBulkModal }),
  clearScanResult: () => set({ scanResult: null }),

  qrScan: async (memberId: number) => {
    try {
      const res = await axios_auth.post(`attendance/qr-attendance/${memberId}`);

      if (res?.data?.status === 200) {
        const serverData = res?.data?.data;
        get().setScanResult(serverData);

        return { message: res?.data?.message, severity: "success" };
      }

      return { message: "Error scanning Qr Code", severity: "warning" };
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },
  sendQrCodes: async () => {
    try {
      const res = await axios_auth.post(`member/send-qr-codes`);

      if (res?.data?.status === 200) {
        return { message: res?.data?.message, severity: "success" };
      }

      return { message: "Error scanning Qr Code", severity: "warning" };
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },
}));
