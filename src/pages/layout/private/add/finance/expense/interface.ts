import { ExpenseType, PaymentMode } from "@/global/components/enums/enums";
import { IResponse } from "../../../../../../global/interface"; 

 

 
 

export type IAddExpenseStore = {
  data: IExpenseData;
  setData: (data: IExpenseData) => void;
  clearData: () => void;
  createExpense: (data: IExpenseData) => Promise<IResponse>;
  updateExpense: (id: number, data: IExpenseData) => Promise<IResponse>;
  getExpenseById: (id: number) => Promise<void>;

  // for submitting state
  isSubmitting: boolean;
  setIsSubmitting: (status: boolean) => void;

  // for preview state
  showPreview: boolean;
  setShowPreview: (status: boolean) => void;

  openDelete: boolean;
  setOpenDelete: (openDelete: boolean) => void;
};


export type IExpenseData = {
 expenseType:ExpenseType
  paymentMode: PaymentMode;
  date:string,
  totalAmt: number;
  notes: string;
};

 

 