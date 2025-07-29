import { IResponse } from "@/global/interface";
import { IExpenseData } from "./interface";
import { IToasterData } from "@/global/components/toaster/interface";

export class ExpenseHelper {
  saveExpense = async (
    id: number,
    data: IExpenseData,
    updateExpense: (id: number, data: IExpenseData) => Promise<IResponse>,
    createExpense: (data: IExpenseData) => Promise<IResponse>,
    clearData: () => void,
    setShowPreview: (val: boolean) => void,
    setIsSubmitting: (val: boolean) => void,
    setToasterData: (data: IToasterData) => void
  ) => {
    const error = this.validate(data);
    if (error) {
      setToasterData({
        open: true,
        message: error,
        severity: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let res;
      if (id && id !== 0) {
        res = await updateExpense(id, data);
      } else {
        res = await createExpense(data);
      }

      setToasterData({
        open: true,
        message: res.message,
        severity: res.severity,
      });

      if (res.severity === "success") {
        clearData();
        setShowPreview(false);
      }
    } catch (error) {
      console.error(error);
      setToasterData({
        open: true,
        message: "An error occurred during operation",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  validate = (data: IExpenseData): string => {
    if (!data?.expenseType) return "Expense Type is required";
    if (!data?.totalAmt) return "Total Amount is required";
    if (!data?.paymentMode) return "Payment Mode is required";
    return "";
  };
}
