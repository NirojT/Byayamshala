import { IToasterData } from "../../../../../../global/components/toaster/interface";
import { IResponse } from "../../../../../../global/interface";
import { ISavingCreateData } from "./interface";

export class SavingHelper {
  //        helper.createNewSavingAccount(data, createSavingAcc, setToasterData, setIsModalOpen, clearData);
  validateData(data: ISavingCreateData) {
  
    let error = "";
    if (!data?.accountName) error = "Account Name is required";
 

    if (data?.openingBalance < 1)  error = "Initial Balance must be greater than 0";
    
    return error;
  }
  createNewSavingAccount = (
    data: ISavingCreateData,
    createSavingAcc: (data: ISavingCreateData) => Promise<IResponse>,
    clearData: () => void,
    setToasterData: (data: IToasterData) => void,
    setIsModalOpen: (value?: boolean) => void,
    setLoading: (value?: boolean) => void,
    
  ) => {
    console.log("passed data is ", data);
    const errors = this.validateData(data);
    if (Object.keys(errors).length > 0) {
      setToasterData({ message: errors, severity: "error", open: true });

      return;
    }
    setLoading(true);
    createSavingAcc(data)
      .then((res) => {
        setToasterData({ message: res?.message, severity: res?.severity, open: true });
        if (res.severity === "success") {
          setIsModalOpen(false);
          clearData();
        }
      })
      .finally(() => setLoading(false));
  };
}
