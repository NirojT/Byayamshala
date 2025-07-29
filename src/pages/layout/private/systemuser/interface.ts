import { SystemUserSession, SystemUserType } from "@/global/components/enums/enums";
import { IAuditDetails, IGenericFilterData, IResponse } from "@/global/interface";

 

// System User Response Interface
export interface ISystemUserDetails {
  id: number;
  userName: string;
  access: string[];
  systemUserType: SystemUserType;
   
  activeStatus: boolean;
  createdDate: string;
  createdNepDate: string;
  lastModifiedDate: string;
}
export interface ISystemUserLogs extends IAuditDetails {
  userName: string;

  systemUserSession: SystemUserSession;
}

// System User Request Interface
export interface ISystemUserData {
   
  userName: string;
  password: string;
  access: string[];
  systemUserType: SystemUserType;
}

// Store Interface
export interface ISystemUserStore {
  data: ISystemUserData;
  setData: (data: ISystemUserData) => void;
  clearData: () => void;
  createSystemUser: (data: ISystemUserData) => Promise<IResponse>;
  updateSystemUser: (id: number, data: ISystemUserData) => Promise<IResponse>;
  getSystemUserById: (id: number) => Promise<void>;
  getSystemUsers: () => Promise<void>;
  deleteSystemUser: (id: number) => Promise<IResponse>;
  changeStatus: (id: number, activeStatus: boolean) => Promise<IResponse>;
  changeType: (
    id: number,
    systemUserType: SystemUserType
  ) => Promise<IResponse>;
  loginSystemUser: (userName: string, password: string) => Promise<IResponse>;
  getSytemProfile: () => Promise<IResponse>;
  logoutSystemUser: () => Promise<IResponse>;
  systemUsers: ISystemUserDetails[];

  logs: ISystemUserLogs[];
  searchLogs: () => Promise<void>;
  filters: IGenericFilterData;
  setFilters: (filters: IGenericFilterData) => void;

  isSubmitting: boolean;
  setIsSubmitting: (status: boolean) => void;
  showPreview: boolean;
  setShowPreview: (status: boolean) => void;
  openDelete: boolean;
  setOpenDelete: (openDelete: boolean) => void;

  currentSystemUser: ISystemUserDetails | null;
  setCurrentSystemUser: (user: ISystemUserDetails | null) => void;
}
 