import { IResponse } from "@/global/interface";
import { IToasterData } from "@/global/components/toaster/interface"; 
import { IPurchaseDetails } from "../../../reports/component/purchase/interface";

export class PurchaseReturnHelper {
  searchPurchaseByBillNo = async (
    billNo: string,
    getPurchaseByBillNo: () => Promise<IResponse>,
    setIsSearching: (val: boolean) => void,
    setToasterData: (data: IToasterData) => void
  ) => {
    if (!billNo) {
      setToasterData({
        open: true,
        message: "Please enter bill number",
        severity: "error",
      });
      return;
    }

    setIsSearching(true);
    try {
      const res = await getPurchaseByBillNo();
      if (res) {
        setToasterData({
          open: true,
          message: res.message,
          severity: res.severity,
        });
      }
    } catch (error) {
      console.error(error);
      setToasterData({
        open: true,
        message: "An error occurred while searching",
        severity: "error",
      });
    } finally {
      setIsSearching(false);
    }
  };

  returnPurchaseById = async (
    purchaseDetail: IPurchaseDetails | null,
    returnPurchase: (id: number) => Promise<IResponse>,
    setIsSubmitting: (val: boolean) => void,
    setToasterData: (data: IToasterData) => void,
    setShowSuccessMessage: (val: boolean) => void,
    clearData: () => void
  ) => {
    if (!purchaseDetail) {
      setToasterData({
        open: true,
        message: "Please select a purchase record to return",
        severity: "error",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await returnPurchase(purchaseDetail?.id);

      setToasterData({
        open: true,
        message: res.message,
        severity: res.severity,
      });

      if (res.severity === "success") {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          clearData();
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setToasterData({
        open: true,
        message: "An error occurred during the return process",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
}
