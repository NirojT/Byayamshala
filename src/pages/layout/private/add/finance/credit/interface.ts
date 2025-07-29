import { PartyType, PartyMoneyType } from "@/global/components/enums/enums";
import { IResponse } from "../../../../../../global/interface";

export type IAddCreditStore = {
  data: ICreditData;
  setData: (data: ICreditData) => void;
  clearData: () => void;
  createCredit: (data: ICreditData) => Promise<IResponse>;
  updateCredit: (id: number, data: ICreditData) => Promise<IResponse>;
  getPartyAccById: (id: number) => Promise<void>;
  deletePartyCredit: (id: number) => Promise<IResponse>;

  openDelete: boolean;
  setOpenDelete: (open: boolean) => void;
};

export type ICreditData = {
  partyType: PartyType;
  partyMoneyType: PartyMoneyType;

  amount: number;
  notes: string;

  partyName: string; // if it is supplier
  // supplierName: string; // if it is supplier
  // memberName: string; // if it is member
  // thirdPartyName: string; // if it is third party
};
