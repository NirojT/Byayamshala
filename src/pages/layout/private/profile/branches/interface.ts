import { IAuditDetails, IResponse } from "@/global/interface";

export interface IBranchStore {
  data: IBranchData;
  setData: (data: IBranchData) => void;
  clear: () => void;

  //branches
  branches: IBranchDetails[];
  getBranches: () => void;

  //for create and update and deactivate
  create: () => Promise<IResponse>;
  update: (id: number) => Promise<IResponse>;
  deactivate: (id: number) => Promise<IResponse>;
  switchBranch: (id: number) => Promise<IResponse>;
  isSubmitting: boolean;
  setIsSubmitting: (status: boolean) => void;

  searchTerm: string;
  setSearchTerm: (searchedTerm: string) => void;

  animationData: IAnimationData;
  setAnimationData: (data: IAnimationData) => void;

  // for editing branch
  isEditingBranch: boolean;
  setIsEditingBranch: (status: boolean) => void;
}

export interface IAnimationData {
  isAnimating: boolean;
  branchId: null | number;
  branchName: string;
}

export interface IBranchData {
  id: number; //for edit
  name: string;
  location: string;
}
export interface IBranchDetails extends IAuditDetails {
  name: string;
  location: string;
  appUserId: number;
}
