import { ICreditData } from "./interface";
import { IResponse } from "@/global/interface";
import { IToasterData } from "@/global/components/toaster/interface";

export class CreditHelper {
  saveCredit = async (
    creditId: number | undefined,
    data: ICreditData,
    updateCredit: (id: number, data: ICreditData) => Promise<IResponse>,
    createCredit: (data: ICreditData) => Promise<IResponse>,
    clearData: () => void,
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
      if (creditId) {
        res = await updateCredit(creditId, data);
      } else {
        res = await createCredit(data);
      }

      setToasterData({
        open: true,
        message: res.message,
        severity: res.severity,
      });

      if (res.severity === "success") {
        clearData();
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

  validate = (data: ICreditData): string => {
    if (!data?.partyType) return "Credit Type is required";
    if (!data?.partyMoneyType) return "Party Money Type is required";
    if (!data?.amount) return "Amount is required";

    return "";
  };
}
