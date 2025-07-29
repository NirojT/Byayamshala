import { 
  AppUserPlanType,
  MemberShipStatus,
} from "@/global/components/enums/enums";
import { IResponse, IRoleDetails } from "@/global/interface";

export interface IAuthStore {
  data: IAuthData;
  setData: (data: IAuthData) => void;
  clearData: () => void;
  login: () => Promise<IResponse>;
  register: () => Promise<IResponse>;
  getProfile: () => Promise<IResponse>;
  verifyRegisterOtp: () => Promise<IResponse>;
  reGenerateOtp: () => Promise<IResponse>;
  checkAuth: () => Promise<IAuthRes | null>;
  isAuthChecked: boolean;
  logout: () => Promise<IResponse>;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  isRegisterOtp: boolean;
  setIsRegisterOtp: (isRegisterOtp: boolean) => void;
  otp: string;
  setOtp: (otp: string) => void;
  clearOtp: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  authLoading: boolean;
  setAuthLoading: (authLoading: boolean) => void;
  isSuperAdmin: boolean;
  setIsSuperAdmin: (isSuperAdmin: boolean) => void;
  superAuthLoading: boolean;
  setSuperAuthLoading: (superAuthLoading: boolean) => void;

  isAffilateUser: boolean;
  setIsAffilateUser: (isAffilateUser: boolean) => void;
  affilateAuthLoading: boolean;
  setAffilateAuthLoading: (affilateAuthLoading: boolean) => void;

  qr: any;
  getQr: () => Promise<void>;

  // for logout
  isLoggingOut: boolean;
  setIsLoggingOut: (state: boolean) => void;

  
  openInfo: boolean;
  setOpenInfo: (state: boolean) => void;
  infoMsg: string;
  setInfoMsg: (msg: string) => void;
}

export type IAuthData = {
  email: string;
  password: string;
  confirmPassword: string;
};
export type IAuthRes = {
  id: number;
  email: string;
  isNew: boolean;
  roles: IRoleDetails[];
  status: MemberShipStatus;
  planType:AppUserPlanType
  currentBranch: string;
};
