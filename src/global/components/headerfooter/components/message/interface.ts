import { QueryFrom } from "@/global/components/enums/enums";
import { IResponse } from "@/global/interface";

export interface IClientQueryStore {
  data: IClientQueryData;
  setData: (data: IClientQueryData) => void;
  clearData: () => void;

  clientQuerys: IClientQueryDetails[];
  create: () => Promise<IResponse>;
  getClientQuerys: () => Promise<void>;

  filteredData: IClientQueryDetails[]
  setFilteredData: (data: IClientQueryDetails[]) => void;
  queryFrom: QueryFrom ;
  setQueryFrom: (data: QueryFrom ) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  sending: boolean;
  setSending: (sending: boolean) => void;
  totalLength: number;
  page: number;
  setPage: (data: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (data: number) => void;
}

export type IClientQueryData = {
  email: string;
  whatsapp: string;
  message: string;
   // add the query from to differentiate between the client user and the general user
   queryFrom: QueryFrom;
};
export type IClientQueryDetails = {
  id: number;
  email: string;
  whatsapp: string;
  message: string;
  createdDate: string;
  queryFrom: QueryFrom;
 
};
