/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import {  IPlansOperationStore, IRenewData } from "./interface";
import {
  axios_auth,
  base64ToUint8Array,
  defaultNepaliDate,
} from "../../../../global/config";
import {
  IMemberDetails,
  IMemberships,
} from "../list/gymoperatiions/members/interface";
import { IPlansDetails } from "../list/gymoperatiions/plans/interface";
import { PaymentMode } from "../../../../global/components/enums/enums";
import { IFacilitiesDetails } from "../list/gymoperatiions/facilities/interface";
import { useListMemberStore } from "../list/gymoperatiions/members/store";
 

const defaultAddPlanData = {
  plansId: 0,
 
  originalPrice: 0,
  discount: 0,
  memberId: 0,
  paymentMode: PaymentMode.CASH,
  startDate: defaultNepaliDate?.toString(),
  renewDate: defaultNepaliDate?.toString(),
  endDate: "",
  notes: "",
};
const defaultAddFacilitiesData = {
  facilityId: 0,
  originalPrice: 0,
  discount: 0,
  memberId: 0,
  paymentMode: PaymentMode.CASH,
  startDate: defaultNepaliDate?.toString(),
  renewDate: defaultNepaliDate?.toString(),
  endDate: "",
  description: "",
  basePrice: 0,
  days: 30,

  // memberId: 0,
  // memberShipId: 0,
  // notes: "",
  // paymentMode: PaymentMode.CASH,
  // newFacilities: [] as IFacilitiesDetails[],
};

export const usePlansOperationFormStore = create<IPlansOperationStore>((set, get) => ({
  data: { ...defaultAddPlanData }, // Initialize an empty object to store form data
  setData: (data: IRenewData) => set({ data }), // Set form data
  clearData: () => set({ data: { ...defaultAddPlanData } }), // Clear form data

  pdf: null,
  setPdf: (pdf: Blob | null) => set({ pdf: pdf }),
  addNewPlan: async () => {
    try {
      const res = await axios_auth.post(
        `plans/add-new?printBill=${get().printBill}&notify=${get().notify}`,
        get().data
      );
      if (res?.data?.status === 200) {
        const serverData = res.data.data;

        if (get().printBill) {
          useListMemberStore
            .getState()
            .addMembshipToList(serverData?.memberShip);

          // Decode Base64 to Uint8Array
          const byteArray = base64ToUint8Array(serverData?.invoicePdf);
          const pdfBlob = new Blob([byteArray], { type: "application/pdf" });

          set({
            pdf: pdfBlob,
            printBill: false,
            notify: false,
          });
        } else {
          useListMemberStore.getState().addMembshipToList(serverData);
          set({
            pdf: null,
            printBill: false,
            notify: false,
          });
        }
      } else {
        set({
          pdf: null,
          printBill: false,
          notify: false,
        });
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

  memberShip: [] as IMemberships[],
  plan: {} as IPlansDetails,
  facility: {} as IFacilitiesDetails,
  setMemberShip: (memberShip: IMemberships[]) => set({ memberShip }),
  setPlan: (plan: IPlansDetails) => set({ plan }),
  setFacility: (facility: IFacilitiesDetails) => set({ facility }),
  clearMemberShip: () => set({ memberShip: [] as IMemberships[] }),
  clearPlan: () => set({ plan: {} as IPlansDetails }),
  clearFacility: () => set({ facility: {} as IFacilitiesDetails }),

  searchedMember: {} as IMemberDetails,
  setSearchedMember: (searchedMember: IMemberDetails) =>
    set({ searchedMember }),
  clearSearchedMember: () => set({ searchedMember: {} as IMemberDetails }),

  /*
  ..

  for just renew
  ..
  ..
  ..

  */
  renew: async () => {
    try {
      const res = await axios_auth.post("plans/renew", get().data);
      if (res?.data?.status === 200) {
        const serverData = res.data.data;
        useListMemberStore.getState().addMembshipToList(serverData?.memberShip);
        // Decode Base64 to Uint8Array
        const byteArray = base64ToUint8Array(serverData?.invoicePdf);
        const pdfBlob = new Blob([byteArray], { type: "application/pdf" });

        set({
          pdf: pdfBlob,
        });
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
  /*
  ..

  for just adding facilities
  ..
  ..
  ..

  */

  facilitiesData: { ...defaultAddFacilitiesData },
  setFacilitiesData: (data: any) => set({ facilitiesData: data }),
  clearFacilitiesData: () =>
    set({ facilitiesData: { ...defaultAddFacilitiesData } }),
  addNewFacility: async () => {
    try {
      const res = await axios_auth.post(`plans/add-facilities-to-member`, get().facilitiesData);
      if (res?.data?.status === 200) {
        const serverData = res.data.data;

         useListMemberStore.getState().addMemberFacilityInList(serverData);
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

  // for modal plan
  openRenewPlanModal: false,
  setOpenRenewPlanModal: (status: boolean) => {
    set({
      openRenewPlanModal: status,
    });
  },

  // for modal facility
  openRenewFacilityModal: false,
  setOpenRenewFacilityModal: (status: boolean) => {
    set({
      openRenewFacilityModal: status,
    });
  },

  // for confirming the renewal of plan || adding new plan
  confirmAction: false,
  setConfirmAction: (status: boolean) => {
    set({
      confirmAction: status,
    });
  },
  printBill: false,
  setPrintBill: (printBill) => {
    set({ printBill });
  },
  notify: false,
  setNotify: (notify) => {
    set({ notify });
  },
}));
