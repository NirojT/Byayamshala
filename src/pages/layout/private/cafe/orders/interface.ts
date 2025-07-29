import { MenuType, OrderStatus, PaymentMode } from "@/global/components/enums/enums";
import { IAuditDetails, IGenericFilterData, IResponse } from "@/global/interface";

export interface IOrderDetails extends IAuditDetails {
  //  double price,
  //         String remarks,
  //         OrderStatus orderStatus,
  //         List<OrderItemsRes> orderItems  ,

  //         String tableNames,
  price: number;
  remarks: string;
  orderStatus: OrderStatus;
  orderItems: OrderItemDetails[];
  tableNames: string;
}

export interface OrderItemDetails {
  id: number;
  name: string;
  price: number;
  quantity: number;
  menuType: MenuType;
}

export interface IOrderTableStore {
  orderDetails: IOrderDetails[];

  getAllOrders: () => Promise<boolean>;

  totalLength: number;
  page: number;
  setPage: (data: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (data: number) => void;

  setOrderDetails: (data: IOrderDetails) => void;
  updateOrderDetails: (data: IOrderDetails) => void;

  //payment
  data: IPaymentData;
  setData: (data: IPaymentData) => void;
  clearData: () => void;
  makePayment: () => Promise<IResponse>;
  deleteOrders: (id: number) => Promise<IResponse>;
  printOrder: (id: number) => Promise<IResponse>;

  filter: IGenericFilterData;
  setFilter: (data: IGenericFilterData) => void;

  searchQuery: () => Promise<IResponse>;

  // for filtering with status
  filterStatus: OrderStatus;
  setFilterStatus: (value: OrderStatus) => void;
  totalAmt: number;
  setTotalAmt: (value: number) => void;
}

export interface IPaymentData {
orderId: number;
paymentMode: PaymentMode;
}
export interface IDeleteProps {
  data: IOrderDetails;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // deleteDrink;
  // getDrinks;
}
