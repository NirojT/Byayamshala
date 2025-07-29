import { IResponse } from "@/global/interface";
import { IToasterData } from "@/global/components/toaster/interface";
import { ITaskData, ITaskDataValidationErrors } from "./interface"; 
import { IMemberDetails } from "../../../list/gymoperatiions/members/interface";
import { IStaffDetails } from "../../../list/gymoperatiions/staff/interface";

export class TaskHelper {
  /**
   * Save a task, handling both creation and validation, and UI feedback.
   */
  saveTask = async (
    data: ITaskData,
    createTask: (data: ITaskData) => Promise<IResponse>,
    clearData: () => void, 
    setIsSubmitting: (val: boolean) => void,
    setToasterData: (data: IToasterData) => void,
    setSelectedStaff: (staff: IStaffDetails) => void,
    setSelectedMember: (member: IMemberDetails) => void,
    setName: (n: string) => void,
    setMemberSearchValue: (v: string) => void,
    setErrors: (err: ITaskDataValidationErrors) => void,
    clearErrors: () => void
  ) => {
    const validationErrors = this.validate(data);
    const hasErrors = Object.values(validationErrors).some((val) => val !== "");

    setErrors(validationErrors);

    if (hasErrors) {
      setToasterData({
        open: true,
        message: "Please fix the form errors before submitting.",
        severity: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await createTask(data);
      setToasterData({
        open: true,
        message: res.message,
        severity: res.severity,
      });

      if (res.severity === "success") {
        clearData();
         
        setSelectedStaff({} as IStaffDetails);
        setSelectedMember({} as IMemberDetails);
        setName("");
        setMemberSearchValue("");
      }
    } catch (error) {
      console.error(error);
      setToasterData({
        open: true,
        message: "An error occurred while assigning the task.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
      clearErrors();
    }
  };

  /**
   * Validate the form and return errors in the ITaskDataValidationErrors format.
   */
  validate = (data: any): ITaskDataValidationErrors => {
    const newErrors: ITaskDataValidationErrors = {
      selectedStaffError: "",
      selectedMemberError: "",
      startDate: "",
      endDate: "",
      sessionDuration: "",
      notes: "",
    };

    if (!data?.memberId || data?.memberId < 1) {
      newErrors.selectedMemberError = "The member was not found!";
    }

    if (!data?.staffId || data?.staffId < 1) {
      newErrors.selectedStaffError = "The staff was not found!";
    }

    if (!data?.startDate || data?.startDate === "") {
      newErrors.startDate = "Please select the start date.";
    }

    if (!data?.endDate || data?.endDate === "") {
      newErrors.endDate = "Please select the end date.";
    }

    if (!data?.sessionDuration || data?.sessionDuration === "") {
      newErrors.sessionDuration = "Please choose a session.";
    }

    return newErrors;
  };
}
