import { IResponse } from "@/global/interface";
import { ISuperSubscriptionDetails } from "../interface";

 

export type IAffilaterStore = {
  cardData: IAffilaterCardData;

  affilatedSubs: ISuperSubscriptionDetails[];
  getCardData: (email: string) => void;
  getAffilatedSubscription: (email: string) => void;
  changeAffilatePaymentStatus: (subId: number) => Promise<IResponse>;

  totalLength: number;
  page: number;
  setPage: (data: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (data: number) => void;

  currentSearchData: IAffilaterCardData | null,
  isSearching: boolean,
  resetSearch: () => void
};
export type IAffilaterCardData = {
 
  noOfUsers: number;
  totalCodeUsed: number;
  totalEarnings: number;
  totalPaid: number;
  totalUnPaid: number;

};
 