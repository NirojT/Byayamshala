/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReportPeriod } from "@/global/components/enums/enums";
import { create } from "zustand";
import { axios_auth, defaultNepaliDate } from "../../../../../../global/config";
import { IListMembershipStore } from "./interface";
import { IGenericFilterData } from "@/global/interface";
import { IMemberships } from "../../../list/gymoperatiions/members/interface";
import { useListMemberStore } from "../../../list/gymoperatiions/members/store";
const defaultFilterData = {
  reportPeriod: ReportPeriod.TODAY,
  startDate: defaultNepaliDate.toString(),
  endDate: defaultNepaliDate.toString(),
  name: "",
};

export const useListMembershipStore = create<IListMembershipStore>(
  (set, get) => ({
    memberShips: [], // Initialize an empty object to store  data

    setMemberShips: (memberShips: IMemberships[]) => {
      set(() => ({
        memberShips,
      }));
    },
    getMembershipById: async (id: number) => {
      try {
        const res = await axios_auth.get("membership/get/" + id);

        if (res?.data?.status === 200) {
          set({ memberShips: [res.data.data] });
        } else {
          set({ memberShips: [] });
        }
      } catch (error: any) {
        console.log(error);
      }
    },

    deleteMembership: async (id: number) => {
      try {
        const res = await axios_auth.delete("membership/delete/" + id);

        if (res?.data?.status === 200) {
          const { removeMembershipFromList } = useListMemberStore.getState();
          removeMembershipFromList(id);
        }
        return res?.data?.status === 200
          ? { message: res?.data?.message, severity: "success" }
          : { message: res?.data?.message, severity: "error" };
      } catch (error: any) {
        console.log(error);
        if (error?.response?.data?.message) {
          return { message: error?.response?.data?.message, severity: "error" };
        }
        return { message: "something went wrong", severity: "error" };
      }
    },
    deleteMemberFacility: async (id: number) => {
      try {
        const res = await axios_auth.delete(
          "membership/delete/facilities/" + id
        );

        if (res?.data?.status === 200) {
          const { removeMemberFacilityFromList } =
            useListMemberStore.getState();
          removeMemberFacilityFromList(id);
        }
        return res?.data?.status === 200
          ? { message: res?.data?.message, severity: "success" }
          : { message: res?.data?.message, severity: "error" };
      } catch (error: any) {
        console.log(error);
        if (error?.response?.data?.message) {
          return { message: error?.response?.data?.message, severity: "error" };
        }
        return { message: "something went wrong", severity: "error" };
      }
    },
    // // prinMembership,printFormat,setPrintFormat

    // printFormat: PrintFormat.POS,
    // setPrintFormat: (printFormat: PrintFormat) => {
    //   set(() => ({
    //     printFormat,
    //   }));
    // },
    // printMembership: async (id: number) => {
    //   try {
    //     const res = await axios_auth.post(
    //       `membership/print/${id}?printFormat=${get().printFormat}`
    //     );

    //      if (res.data?.status === 200) {
    //        const serverData = res.data.data;

    //        // Decode Base64 to Uint8Array
    //        const byteArray = base64ToUint8Array(serverData);
    //        const pdfBlob = new Blob([byteArray], { type: "application/pdf" });

    //        const pdfUrl = URL.createObjectURL(pdfBlob);

    //        // Open the PDF in a new tab for printing
    //        const printWindow = window.open(pdfUrl, "_blank");
    //        if (printWindow) {
    //          printWindow.onload = () => {
    //            printWindow.print();
    //          };
    //        }

    //      }
    //     return res?.data?.status === 200
    //       ? { message: res?.data?.message, severity: "success" }
    //       : { message: res?.data?.message, severity: "error" };
    //   } catch (error: any) {
    //     console.log(error);
    //     if (error?.response?.data?.message) {
    //       return { message: error?.response?.data?.message, severity: "error" };
    //     }
    //     return { message: "something went wrong", severity: "error" };
    //   }
    // },
    //for searching api
    searchQuery: async () => {
      try {
        const res = await axios_auth.patch(
          `membership/search`,
          get().filterData
        );

        if (res?.data?.status === 200) {
          set({
            memberShips: res?.data?.data,
          });
          return {
            message: res?.data?.message,
            severity: "success",
          };
        } else {
          set({
            memberShips: [],
          });
          return {
            message: "No Sales Found",
            severity: "error",
          };
        }
      } catch (error: any) {
        set({
          memberShips: [],
        });
        if (error?.response?.data?.message) {
          return { message: error?.response?.data?.message, severity: "error" };
        }
        return { message: "something went wrong", severity: "error" };
      }
    },
    filterData: {
      ...defaultFilterData,
    },
    setFilterData: (data: IGenericFilterData) => {
      set(() => ({
        filterData: data,
      }));
    },
    totalAmt: 0,
    setTotalAmt: (totalAmt: number) => {
      set(() => ({
        totalAmt,
      }));
    },
    addedAmt: 0,
    setAddedAmt: (addedAmt: number) => {
      set(() => ({
        addedAmt,
      }));
    },

    discount: 0,
    setDiscount: (discount) => {
      set(() => ({
        discount,
      }));
    },

    openDelete: false,
    setOpenDelete: (openDelete) => {
      set({ openDelete });
    },
    data: null,
    setData: (data) => {
      set({ data });
    },
    inDepthReport: false,
    setInDepthReport: (inDepthReport) => {
      set({ inDepthReport });
    },
  })
);
