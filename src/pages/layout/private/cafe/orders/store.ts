/* eslint-disable no-unsafe-optional-chaining */
import { create } from "zustand";
 
import { OrderStatus, PaymentMode, ReportPeriod } from "@/global/components/enums/enums";
import { axios_auth, base64ToUint8Array, defaultNepaliDate } from "@/global/config";
import { IOrderDetails, IOrderTableStore } from "./interface";

const defaultPaymentData={
  orderId: 0,
  paymentMode: PaymentMode.CASH,

}

const defaultFilterData = {
  reportPeriod: ReportPeriod.TODAY,
  startDate: defaultNepaliDate.toString(),
  endDate: defaultNepaliDate.toString(),
};

export const useOrderTableStore = create<IOrderTableStore>((set, get) => ({
  orderDetails: [],
  
  totalLength: 1,


  //for adding new order to list by checking if the order is already present
  
  setOrderDetails: (data: IOrderDetails) => {
    set(() => ({
      orderDetails: [
        // eslint-disable-next-line no-unsafe-optional-chaining
        ...get().orderDetails?.filter((item) => item.id !== data.id), // Remove existing item with same id
        data, // Add the new/updated item
      ],
    }));
  },
//for updating order details by replacing the old one

  updateOrderDetails: (data: IOrderDetails) => {
    set(() => ({
      orderDetails: [
        // eslint-disable-next-line no-unsafe-optional-chaining
        ...get().orderDetails?.filter((item) => item.id !== data.id), // Exclude old order
        data, // Add the new order
      ],
    }));
  },
//for updating order item copies status   by replacing the old one
 


  
  //set empty
  setOrderDetailsEmpty: () => {
    set(() => ({
      orderDetails: [],
    }));
  },
  

  getAllOrders: async () => {
    try {
      const response = await axios_auth.get(
        `orders/get-all/${get().page}/${get().rowsPerPage}`
      );
      const data=response.data.data 

      set(() => ({
        orderDetails: data?.content,
        totalLength: data?.totalElements
        
      }));

      return true;
    } catch (error:any) {
      return false;
    }
  },
 
  deleteOrders: async (id: number) => {
    try {
      const res = await axios_auth.delete(`orders/delete/${id}`);
       if (res?.data?.status === 200) {
      
        set({
          orderDetails:  get().orderDetails?.filter((item) => item.id !== id) 
         
        })
      }

      return res?.data?.status === 200
        ? { message: res?.data?.message, severity: "success" }
        : { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },
  page: 0,

  setPage: (data: number) => {
    set(() => ({
      page: data,
    }));
  },

  rowsPerPage: 10,

  setRowsPerPage: (data: number) => {
    set(() => ({
      rowsPerPage: data,
    }));
  },
 
 

  searchOrder: async (search: string) => {
    try {
      const res = await axios_auth.get(
        `orders/search?search=${search}`
      );

      set(() => ({
        orderDetails: res.data.data,

      
      }));
      return true;
    } catch (error) {
      console.log(error);
    }
    return false;
  },



//*********************** */ payments **********************

 data:defaultPaymentData,
 setData: (data ) => {
    set(() => ({
      data: {
        ...get().data,
        ...data,
      },
    }));
  },
  clearData: () =>{ set({
    data:defaultPaymentData
  })},

  makePayment: async ( ) => {
  
 
    try {
      const res = await axios_auth.post(
        "orders/make-payment",
       get().data,
      );

      if (res?.data?.status === 200) {
        const serverData = res?.data?.data;
        set({
          orderDetails: [
            ...get().orderDetails?.filter((item) => item.id !== serverData.id), // Remove existing item with same id
            serverData, // Add the new/updated item
          ],
          data: defaultPaymentData,
        })
        get().clearData();
      }

      return res?.data?.status === 200
        ? { message: res?.data?.message, severity: "success" }
        : { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },

  printOrder: async (id: number) => {
     try {
       const res = await axios_auth.post(
         `orders/print/${id}`,
       );
 
        if (res.data?.status === 200) {
          const serverData = res.data.data;
   
 
          // Decode Base64 to Uint8Array
          const byteArray = base64ToUint8Array(serverData);
          const pdfBlob = new Blob([byteArray], { type: "application/pdf" });
 
 
          const pdfUrl = URL.createObjectURL(pdfBlob);
 
          // Open the PDF in a new tab for printing
          const printWindow = window.open(pdfUrl, "_blank");
          if (printWindow) {
            printWindow.onload = () => {
              printWindow.print();
            };
          }
 
        
 
         
        }
       return res?.data?.status === 200
         ? { message: res?.data?.message, severity: "success" }
         : { message: res?.data?.message, severity: "error" };
     } catch (error: any) {
       console.log(error);
       if (error?.response?.data?.message) {
         return { message: error?.response?.data?.message, severity: "error" };
       }
       return { message: "something went wrong", severity: "error" };
     }
   },


       //for searching api
       searchQuery: async () => {
         try {
           const res = await axios_auth.patch(`orders/search`, get().filter);
   
           if (res?.data?.status === 200) {
             set({
               orderDetails: res?.data?.data,
             });
             return {
               message: res?.data?.message,
               severity: "success",
             };
           } else {
             set({
               orderDetails: [],
             });
             return {
               message: "No orderDetails Found",
               severity: "error",
             };
           }
         } catch (error: any) {
           set({
             orderDetails: [],
           });
           if (error?.response?.data?.message) {
             return { message: error?.response?.data?.message, severity: "error" };
           }
           return { message: "something went wrong", severity: "error" };
         }
       },
       filter: {
         ...defaultFilterData,
       },
       setFilter: (filter) => {
         set(() => ({
           filter,
         }));
       },

       // for filtering with status
       filterStatus: OrderStatus.ALL,
       setFilterStatus: (value:OrderStatus) => {
        set({
          filterStatus: value
        })
       },
       totalAmt: 0,
       setTotalAmt: (totalAmt: number) => {
         set(() => ({
           totalAmt: totalAmt,
         }));
       },
}));
