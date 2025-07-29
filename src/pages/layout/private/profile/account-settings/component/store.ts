import { create } from "zustand";
import { IBusinessData, IBusinessDetailsStore } from "./interface";
import { axios_auth, axios_auth_form } from "@/global/config";

const defaultData = {
  id: 0,
  businessName: "",
  businessAddress: "",
  businessPhone: "",
  panNo: "",
  appUserId: 0, // this will be set when the user is logged in
  cafeName: "",
  image: null,
  imageName: "",
  businessPartnerPhones: "",
  businessPartnerPhonesList: [],
};
export const useBusinessDetailsStore = create<IBusinessDetailsStore>(
  (set, get) => ({
    data: defaultData,

    setData: (newBusinessDetails: IBusinessData) => {
      set({
        data: { ...get().data, ...newBusinessDetails },
      });
    },

    clearData: () => {
      set({ data: defaultData });
    },

    getBusinessDetails: async () => {
      try {
        const res = await axios_auth.get("auth/me");

        if (res.status >= 200 && res.status <= 300) {
          const data = res?.data?.data?.businessDetails;
          if (data) {
            get().setData(data);
          }
        }
      } catch (error: any) {
        console.log(error.message);
      }
    },

    createBusinessDetails: async () => {
      try {
        // request to update the business details
        const res = await axios_auth_form.put(
          `appUser/create-business-details`,
          get().data
        );

        if (res?.status >= 200 && res?.status < 300) {
          return { message: res?.data?.message, severity: "success" };
        }
        return {
          message: "Update failed. Please Try again later.",
          severity: "error",
        };
      } catch (error: any) {
        if (error?.response?.data?.message) {
          return { message: error?.response?.data?.message, severity: "error" };
        }
        return { message: "something went wrong", severity: "error" };
      }
    },

    updateBusinessDetails: async () => {
      try {
        // request to update the business details
        const res = await axios_auth_form.put(
          `appUser/update-business-details/${get().data?.id}`,
          get().data
        );
        console.log(res);

        if (res?.status >= 200 && res?.status < 300) {
          return { message: res?.data?.message, severity: "success" };
        }
        return {
          message: "Update failed. Please Try again later.",
          severity: "error",
        };
      } catch (error: any) {
        if (error?.response?.data?.message) {
          return { message: error?.response?.data?.message, severity: "error" };
        }
        return { message: "something went wrong", severity: "error" };
      }
    },
    qrCode: "",
    generateQrCode: async (businessName: string) => {
      try {
        const res = await axios_auth.get(
          `/appUser/generate-qr/${businessName}`,
          {
            responseType: "arraybuffer", // <--- This is key!
          }
        );

        // Create a Blob for image/png
        const qrBlob = new Blob([res.data], { type: "image/png" });

        // Create an Object URL for the Blob (can use in <img src=...>)
        const qrUrl = URL.createObjectURL(qrBlob);

        set({
          qrCode: qrUrl, // Save this URL in your state
        });
      } catch (error) {
        console.log(error);
      }
    },
  })
);
