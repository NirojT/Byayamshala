import { PaymentMode } from "@/global/components/enums/enums";
import { IToasterData } from "@/global/components/toaster/interface";
import { IResponse } from "@/global/interface";
import { NavigateFunction } from "react-router-dom";
import { IPurchaseData } from "./interface";

export class PurchaseHelper {
  savePurchase = async (
    id: number | undefined,
    data: IPurchaseData,
    updatePurchase: (id: number, data: IPurchaseData) => Promise<IResponse>,
    createPurchase: (data: IPurchaseData) => Promise<IResponse>,
    clearData: () => void,
    setIsSubmitting: (val: boolean) => void,
    setToasterData: (data: IToasterData) => void,
  navigate: NavigateFunction
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
      let res: IResponse;
      if (id) {
        res = await updatePurchase(id, data);
      } else {
        res = await createPurchase(data);
      }

      setToasterData({
        open: true,
        message: res.message,
        severity: res.severity,
      });

      if (res.severity === "success") {
        clearData();
        id && navigate(-1)
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

  validate = (data: IPurchaseData): string => {
    if (!data?.partyName) return "Party Name is required";
    if (!data?.paymentMode) return "Payment Mode is required";
    if (!data?.totalAmt) return "Total Amount is required";
    if (data?.paymentMode === PaymentMode.PARTIAL_CREDIT && !data.partialAmt)
      return "Partial Amount is required";
    if (data?.purchaseItemsReq?.length === 0)
      return "At least one purchase item is required";
    if (
      data?.purchaseItemsReq?.some(
        (item) => !item.itemName || !item.quantity || !item.price
      )
    )
      return "All purchase item fields are required";

    if (data?.purchaseItemsReq?.some((item) => item.quantity <= 0))
      return "Quantity should be greater than 0";
    if (data?.purchaseItemsReq?.some((item) => item.price <= 0))
      return "Price should be greater than 0";
    if (data?.purchaseItemsReq?.some((item) => item.discount < 0))
      return "Discount should be greater than or equal to 0";
    if (data?.purchaseItemsReq?.some((item) => item.discount > item.price))
      return "Discount should be less than or equal to price";
    if (
      data?.paymentMode === PaymentMode.PARTIAL_CREDIT &&
      data?.partialAmt > data?.totalAmt
    )
      return "Partial Amount should be less than or equal to Total Amount";

    return "";
  };
}
