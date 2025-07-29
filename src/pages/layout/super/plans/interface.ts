import { AppUserPlanType } from "@/global/components/enums/enums";
import { IResponse } from "@/global/interface";

export type ISuperPlansStore = {
  data: ISuperPlansData;
  setData: (data: ISuperPlansData) => void; //
  clearData: () => void; //
  getSuperPlans: () => void;
  superPlans: ISuperPlansDetails[];
  createSuperPlan: () => Promise<IResponse>;
  updateSuperPlan: (id: number) => Promise<IResponse>;

  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
  setId: (id: number) => void;
};
export type ISuperPlansData = {
  type: AppUserPlanType; // TRIAL, GOLD, PLATINUM, LIFETIME

  durationInDays: number; // 14 days for Trial, 365 for Gold, etc.

  price: number; // 0,
  features: string; // Feat
};
export type ISuperPlansDetails = {
  id: number;
  type: AppUserPlanType; // TRIAL, GOLD, PLATINUM, LIFETIME

  durationInDays: number; // 14 days for Trial, 365 for Gold, etc.

  price: number; // 0,
  features: string[]; // Feat
};
// Define type for react-select options
export type IFeatureOption = {
  label: string;
  value: string;
};