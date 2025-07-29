import { PaymentMode } from "@/global/components/enums/enums";
import { ISalesData } from "./interface";
import { IResponse } from "@/global/interface";
import { IToasterData } from "@/global/components/toaster/interface";

export class SalesHelper {
  validateData = (data: ISalesData): string => {
    if (!data?.partyName) return "Party Name is required";
    if (!data?.paymentMode) return "Payment Mode is required";
    // if (!data?.totalAmt) return "Total Amount is required";
    if (data?.paymentMode === PaymentMode.PARTIAL_CREDIT && !data?.partialAmt)
      return "Partial Amount is required";
    if (data?.salesItemsReq?.length === 0)
      return "At least one sales item is required";
    if (
      data?.salesItemsReq?.some(
        (item) => !item.itemName || !item.quantity || !item.price
      )
    )
      return "All sales item fields are required";
    if (data?.salesItemsReq?.some((item) => item.quantity <= 0))
      return "Quantity should be greater than 0";
    if (data?.salesItemsReq?.some((item) => item.price <= 0))
      return "Price should be greater than 0";
    if (data?.salesItemsReq?.some((item) => item.discount < 0))
      return "Discount should be greater than or equal to 0";
    if (data?.salesItemsReq?.some((item) => item.discount > item.price))
      return "Discount should be less than or equal to price";
    if (
      data?.paymentMode === PaymentMode.PARTIAL_CREDIT &&
      data?.partialAmt > data?.totalAmt
    )
      return "Partial Amount should be less than or equal to Total Amount";
    return "";
  };

  saveSales = async (
    id: number | undefined,
    data: ISalesData,
    updateSales: (id: number, data: ISalesData) => Promise<IResponse>,
    createSales: (data: ISalesData) => Promise<IResponse>,
    clearData: () => void,
    setIsSubmitting: (val: boolean) => void,
    setToasterData: (data: IToasterData) => void
  ) => {
    const error = this.validateData(data);
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
      const res = id ? await updateSales(id, data) : await createSales(data);
      setToasterData({
        open: true,
        message: res.message,
        severity: res.severity,
      });
      if (res.severity === "success") {
        clearData();
      }
    } catch (e) {
      console.error(e);
      setToasterData({
        open: true,
        message: "An error occurred during operation",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  printSales = async (
    id: number,
    printSalesFn: (id: number) => Promise<IResponse>,
    setToasterData: (data: IToasterData) => void,
    setIsSubmitting: (val: boolean) => void,
    navigate: (path: string) => void,
    privateRoute: string
  ) => {
    setIsSubmitting(true);
    try {
      const res = await printSalesFn(id);

      setToasterData({
        open: true,
        message: res.message,
        severity: res.severity,
      });

      if (res.severity === "success") {
        setTimeout(() => {
          navigate(`/${privateRoute}/reports/sales`);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setToasterData({
        open: true,
        message: "An error occurred while printing",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
}
