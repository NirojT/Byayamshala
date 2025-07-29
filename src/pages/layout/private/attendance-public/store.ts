import { create } from "zustand";
import { IAttendancePublicStore, IBusinessPublicInfo } from "./interface";
import { axios_no_auth } from "@/global/config";

import { IQrResults } from "../qrcode/interface";

export const useAttendancePublicStore = create<IAttendancePublicStore>(
  (set, get) => ({
    phone: "",
    setPhone: (phone: string) => set({ phone }),
    clearPhone: () => set({ phone: "" }),

    chekInsRes: {} as IQrResults,
    publicCheckIns: async () => {
      try {
        const res = await axios_no_auth.post(
          `attendance/public/checkins?phone=${get().phone}&appUserId=${
            get().businessPublicInfo?.appUserId
          }&branchId=${get().businessPublicInfo?.branchId}`
        );

        if (res?.data?.status >= 200 && res?.data?.status < 300) {
          const serverData = res?.data?.data;
          set({ chekInsRes: serverData });
          return { message: res?.data?.message, severity: "success" };
        }
        return { message: res?.data?.message, severity: "error" };
      } catch (error: any) {
        if (error?.response?.data?.message) {
          return { message: error?.response?.data?.message, severity: "error" };
        }
        return { message: "something went wrong " + error, severity: "error" };
      }
    },

    businessPublicInfo: {} as IBusinessPublicInfo,

    getBusinessInfoPublic: async (businessName: string) => {
      try {
        const res = await axios_no_auth.get(
          `attendance/public/view/${businessName}`
        );

        if (res?.data?.status === 200) {
          set({ businessPublicInfo: res?.data?.data });
        }
      } catch (error: any) {
        console.log(error);
      }
    },
  })
);
