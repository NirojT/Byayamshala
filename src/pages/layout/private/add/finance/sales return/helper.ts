import { IResponse } from "@/global/interface";
import { IToasterData } from "@/global/components/toaster/interface";
import { ISalesDetails } from "../../../reports/component/sales/interface";
 
export class SalesReturnHelper {
  searchSalesByBillNo = async (
    billNo: string,
    getSalesByBillNo: () => Promise<IResponse>,
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
      const res = await getSalesByBillNo();
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

  returnSalesById = async (
    salesDetail: ISalesDetails | null,
    returnSales: (id: number) => Promise<IResponse>,
    setIsSubmitting: (val: boolean) => void,
    setToasterData: (data: IToasterData) => void,
    setShowSuccessMessage: (val: boolean) => void,
    clearData: () => void
  ) => {
    if (!salesDetail) {
      setToasterData({
        open: true,
        message: "Please select a sales record to return",
        severity: "error",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await returnSales(salesDetail?.id);

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
