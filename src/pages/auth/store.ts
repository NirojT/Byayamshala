import { axios_auth, axios_no_auth } from "@/global/config";
import { useGlobalStore } from "@/global/store";
import { create } from "zustand";
import { IAuthRes, IAuthStore } from "./interface";

const defaultData = {
  email: "",

  password: "",
  confirmPassword: "",
};
export const useAuthStore = create<IAuthStore>((set, get) => ({
  data: defaultData,
  setData: (data) =>
    set((state) => ({
      data: { ...state.data, ...data },
    })),
  clearData: () => set({ data: defaultData }),

  register: async () => {
    try {
      const res = await axios_no_auth.post("appUser/create", get().data);

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
  login: async () => {
    try {
      const res = await axios_auth.post("auth/login", get().data);

      if (res?.data?.status >= 200 && res?.data?.status < 300) {
        const data = res?.data?.data;
        const appUser = useGlobalStore.getState().appUser;
        useGlobalStore.getState().setAppUser({
          ...appUser,
          email: data?.email,
          roles: data?.roles,
          subscriptionStatus: data?.status,
          isNew: data?.isNew,
          currentBranch: data?.currentBranch,
          planType: data?.planType,
        });
      }

      return res?.data?.status >= 200 && res?.data?.status < 300
        ? { message: res?.data?.message, severity: "success" }
        : { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
         const err:string= error?.response?.data?.message;

         if(err?.includes("subscription")){

           set({
             openInfo: true,
             infoMsg:err,
           });
         }
        return { message:err, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },
  getProfile: async () => {
    try {
      const res = await axios_auth.get("auth/me");

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
  verifyRegisterOtp: async () => {
    try {
      const res = await axios_no_auth.post(
        `appUser/register-otp-verify?otp=${get().otp}`
      );

      return res?.data?.status >= 200 && res?.data?.status < 300
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
  reGenerateOtp: async () => {
    try {
      const res = await axios_no_auth.post(
        `appUser/re-generate-otp?email=${get().data?.email}`
      );

      return res?.data?.status >= 200 && res?.data?.status < 300
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
  isAuthChecked: false,

  checkAuth: async () => {
    try {
      const res = await axios_auth.get(`auth/check-auth`);

      if (res?.data?.status >= 200 && res?.data?.status < 300) {
        const authRes: IAuthRes = res?.data?.data;

        const appUser = useGlobalStore.getState().appUser;
        useGlobalStore.getState().setAppUser({
          ...appUser,
          id: authRes?.id,
          email: authRes?.email,
          roles: authRes?.roles,
          subscriptionStatus: authRes?.status,
          isNew: authRes?.isNew,
          currentBranch: authRes?.currentBranch,
          planType: authRes?.planType,
        });

        set({ isAuthChecked: true }); // ✅ set flag after successful check
        return authRes;
      }

      set({ isAuthChecked: true }); // ✅ still set flag if not authenticated
      return null;
    } catch (error: any) {
      console.log(error);
      set({ isAuthChecked: true }); // ✅ also set flag on error
      return null;
    }
  },

  logout: async () => {
    try {
      const res = await axios_auth.post(`auth/logout`);

      if (res?.data?.status >= 200 && res?.data?.status < 300) {
        useGlobalStore.getState().clearAppUser();
      }

      return res?.data?.status >= 200 && res?.data?.status < 300
        ? { message: res?.data?.message, severity: "success" }
        : { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }

    window.location.href = "/";
  },
  qr: null,
  getQr: async () => {
    try {
      const res = await axios_auth.get(`wapi/whatsapp/get-qr/60443`);

      if (res?.data) {
        set({ qr: res?.data });
        console.log(res);
      }
    } catch (error: any) {
      console.log(error);
    }
  },
  isLogin: true,
  setIsLogin: (isLogin) => set({ isLogin }),
  isRegisterOtp: false,
  setIsRegisterOtp: (isRegisterOtp) => set({ isRegisterOtp }),
  otp: "",
  setOtp: (otp) => set({ otp }),
  clearOtp: () => set({ otp: "" }),
  loading: false,
  setLoading: (loading) => set({ loading }),

  //for app user or admin
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  authLoading: false,
  setAuthLoading: (authLoading) => set({ authLoading }),

  //for super admin
  isSuperAdmin: false,
  setIsSuperAdmin: (isSuperAdmin) => set({ isSuperAdmin }),
  superAuthLoading: false,
  setSuperAuthLoading: (superAuthLoading) => set({ superAuthLoading }),

  // for affilate user
  isAffilateUser: false,
  setIsAffilateUser: (isAffilateUser) => set({ isAffilateUser }),
  affilateAuthLoading: false,
  setAffilateAuthLoading: (affilateAuthLoading) => set({ affilateAuthLoading }),

  // for logout
  isLoggingOut: false,
  setIsLoggingOut: (state: boolean) => {
    set({
      isLoggingOut: state,
    });
  },
  openInfo: false,
  setOpenInfo: (openInfo) => {
    set({
      openInfo,
    });
  },
  infoMsg: "",
  setInfoMsg: (infoMsg) => {
    set({
      infoMsg,
    });
  },
}));
