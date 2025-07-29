/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axios_auth } from "../../../../../../global/config";
import {
  IAddTaskStore,
  ITaskData,
  ITaskDataValidationErrors,
} from "./interface"; 
import { IMemberDetails } from "../../../list/gymoperatiions/members/interface";
import { IStaffDetails } from "../../../list/gymoperatiions/staff/interface";

const defaultData = {
  staffId: 0,
  memberId: 0,
  startDate: "",
  endDate: "",
  sessionDuration: "",
  notes: "",
};

const defaultErrorData = {
  selectedStaffError: "",
  selectedMemberError: "",
  startDate: "",
  endDate: "",
  sessionDuration: "",
  notes: "",
};

export const useAddTaskFormStore = create<IAddTaskStore>((set) => ({
  members: [],
  data: { ...defaultData }, // Initialize an empty object to store form data
  setData: (data: ITaskData) => set({ data }), // Set form data
  clearData: () => set({ data: { ...defaultData } }), // Clear form data
  createTask: async (data: ITaskData) => {
    try {
      const res = await axios_auth.post("task/create", data);
      console.log(res);
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

  //for those members who have membership and have personal trainning
  getMembers: async () => {
    try {
      const res = await axios_auth.get(`member/get-members-for-pt`);
      console.log(res);

      if (res?.data?.status === 200) {
        set({ members: res?.data?.data });
      }
      if (res?.data?.status === 400) {
        console.log("No data found");
        set({ members: [] });
      }
    } catch (error: any) {
      console.log(error);
    }
  },

  selectedStaff: {} as IStaffDetails,
  setSelectedStaff: (staff: IStaffDetails | null) => {
    set({ selectedStaff: staff });
  },

  selectedMember: {} as IMemberDetails,
  setSelectedMember: (memerName: IMemberDetails | null) => {
    set({ selectedMember: memerName });
  },

  // for duration
  // selectedDuration: "30",
  // setSelectedDuration: (newDuration: string) => {
  //   set({ selectedDuration: newDuration });
  // },

  isSubmitting: false,
  setIsSubmitting: (status: boolean) => {
    set({ isSubmitting: status });
  },

  // for attempt of validation
  validationAttempted: false,
  setIsValiationAttempted: (status: boolean) =>
    set({ validationAttempted: status }),

  // validation errors
  errors: defaultErrorData,
  setErrors: (data: ITaskDataValidationErrors) => {
    set((state) => ({
      errors: { ...state.errors, ...data },
    }));
  },
  clearErrors: () => {
    set({ errors: defaultErrorData });
  },
}));
