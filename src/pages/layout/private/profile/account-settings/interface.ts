import { IResponse } from "@/global/interface";

export interface IAccountTab {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export interface IProfileStore {
  openMyPlans: string;
  setOpenMyPlans: (toOpen: string) => void;
  openBusinessDetails: string;
  setOpenBusinessDetails: (toOpen: string) => void;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<IResponse>;

  resetBranch: () => Promise<IResponse>;

  // states for confirming the reset of the current branch
  openConfirmReset: boolean;
  setOpenConfirmReset: (status: boolean) => void;

  // states fo reconfirming the reset of the current branch
  openReConfirmReset: boolean;
  setOpenReConfirmReset: (status: boolean) => void;
}
