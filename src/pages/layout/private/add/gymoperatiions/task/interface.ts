import { IResponse } from "../../../../../../global/interface";
import { IMemberDetails } from "../../../list/gymoperatiions/members/interface";
import { IStaffDetails } from "../../../list/gymoperatiions/staff/interface";
 

export type IAddTaskStore = {
  data: ITaskData;
  setData: (data: ITaskData) => void;
  clearData: () => void;
  createTask: (data: ITaskData) => Promise<IResponse>;

  isSubmitting: boolean;
  setIsSubmitting: (status: boolean) => void;

  validationAttempted: boolean;
  setIsValiationAttempted: (status: boolean) => void;

  // State for managing staff selection
  selectedStaff: IStaffDetails | null; // Or undefined
  setSelectedStaff: (staff: IStaffDetails | null) => void;

  // State for managing member selection
  selectedMember: IMemberDetails | null; // Or undefined
  setSelectedMember: (member: IMemberDetails | null) => void;

  members: IMemberDetails[];
  getMembers: () => void;

  errors: ITaskDataValidationErrors;
  clearErrors: () => void;
  setErrors: (data: ITaskDataValidationErrors) => void;
};

export type ITaskDataValidationErrors = {
  selectedStaffError?: string;
  selectedMemberError?: string;
  startDate?: string;
  endDate?: string;
  sessionDuration?: string;
  notes?: string;
};

export type ITaskData = {
  staffId: number; // Allow null initially or when cleared
  memberId: number; // Allow null initially or when cleared
  startDate: string;
  endDate: string;
  sessionDuration: string;
  notes: string;
};
