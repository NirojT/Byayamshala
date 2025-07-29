import { ISupplierData } from "./interface";
import { IResponse } from "@/global/interface";
import { IToasterData } from "@/global/components/toaster/interface";

export class SupplierHelper {
  saveSupplier = async (
    data: ISupplierData,
    createSupplier: (data: ISupplierData) => Promise<IResponse>,
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
      const res = await createSupplier(data);

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

  validate = (data: ISupplierData): string => {
    if (!data?.name) return "Name is required";
    if (!data?.address) return "Address is required";
    if (!data?.phoneNo) return "Phone number is required";
    return "";
  };
}
