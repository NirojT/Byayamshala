import { AdjustmentType } from "@/global/components/enums/enums";
import { axios_auth, axios_auth_form, defaultNepaliDate } from "@/global/config";
import { create } from "zustand";
import { ISalaryAdjustmentDetails, IStaffProfileStore } from "./interface";

const defaultSalary = {
   staffId: 0,
  baseSalary: 0,
  effectiveFrom: defaultNepaliDate.toString(),
  effectiveTo: defaultNepaliDate.add(12, "month").toString(),
};
const defaultAdjustment = {
     staffId: 0,
     type: AdjustmentType.ADVANCE,
     amount: 0,
     reason: "",
     adjustmentDate: defaultNepaliDate.toString(),
};

 
const defaultPayroll = {
  staffId: 0,
 
  processedDate: defaultNepaliDate.toString(),
  baseSalary: 0,
  totalAdjustments: 0,
  netPay: 0,
  futurePay: 0,
  adjustments: [],
};
 
export const useStaffProfileStore = create<IStaffProfileStore>((set, get) => ({
  salaries: [],
  adjustments: [],
  payrolls: [],
  loading: false,

  fetchAll: async (staffId) => {
    set({ loading: true });
    try {
      const [sal, adj, pay] = await Promise.all([
        axios_auth.get(`/staff/salary/get-all/${staffId}`),
        axios_auth.get(`/staff/adjustment/get-all/${staffId}`),
        axios_auth.get(`/staff/payroll/get-all/${staffId}`),
      ]);
      set({
        salaries: sal?.data?.data || [],
        adjustments: adj?.data?.data || [],
        payrolls: pay?.data?.data || [],
      });
    } finally {
      set({ loading: false });
    }
  },

  addSalary: async () => {
    const res = await axios_auth.post("/staff/salary/create",   get().salaryData
 );
    if (res?.data?.status === 200) {
      set((state) => ({ salaries: [res.data.data, ...state.salaries] }));
    }
  },

  addAdjustment: async () => {
    const res = await axios_auth.post("/staff/adjustment/create", 
    get().adjustmentData,
    );
    if (res?.data?.status === 200) {
      set((state) => ({ adjustments: [res.data.data, ...state.adjustments] }));
    }
  },

  addPayroll: async () => {
    const res = await axios_auth.post("/staff/payroll/create", get().payrollData
);
    if (res?.data?.status === 200) {
      set((state) => ({ payrolls: [res.data.data, ...state.payrolls] }));
    }
  },

     uploadProfileImage: async (file: File, staffId: number) => {
      try {
        const formData = new FormData();
        formData.append("imageFile", file);
        const response = await axios_auth_form.post(
          `/staff/upload-profile/${staffId}`,
          formData
        );
  
        if (response?.data?.status === 200) {
          // const serverData = response?.data?.data;
  
          // set({ staffs: serverData }); // Update the staff's image in the store
          // set({
          //   staffs: get().staffs.map((staff) =>
          //     staff.id === staffId ? { ...serverData } : staff
          //   ),
          // }); // Update the staff's image in the staffs list
          // Optionally: refresh profile or show a message
          return { message: response?.data?.message, severity: "success" };
        } else {
          return { message: "Failed to upload image", severity: "error" };
        }
      } catch (error: any) {
        console.log(error);
        if (error?.response?.data?.message) {
          return { message: error?.response?.data?.message, severity: "error" };
        }
        return { message: "Something went wrong", severity: "error" };
      }
    },

    //datas
    salaryData: defaultSalary,
    setSalaryData:(salaryData) => set({ salaryData }),
    clearSalaryData: () => set({ salaryData: defaultSalary }),
    adjustmentData: defaultAdjustment,
    setAdjustmentData: (adjustmentData) => set({ adjustmentData }),
    clearAdjustmentData: () => set({ adjustmentData: defaultAdjustment }),
    payrollData: defaultPayroll,
    setPayrollData: (payrollData) => set({ payrollData }),
    clearPayrollData: () => set({ payrollData: defaultPayroll }),

//get latest salary data
   getLatestSalary:async(staffId:number)=>{
       try {
      const res= await axios_auth.get(`/staff/salary/get-latest/${staffId}`);

          if (res?.data?.status === 200) {
            set({ salaryData: res.data.data });
          }  
       }
        catch (error) {
          console.error("Error fetching salary data:", error);
         
        }

    },
   prepareForPayroll:async(staffId:number)=>{
       try {
      const res= await axios_auth.get(`/staff/payroll/prepare/${staffId}`);

          if (res?.data?.status === 200) {
            set({ payrollData:{...get().payrollData,...res.data.data}});
          }  
       }
        catch (error) {
          console.error("Error fetching salary data:", error);
         
        }

    },

    getSalarys:async(staffId:number)=>{
       try {
      const res= await axios_auth.get(`/staff/salary/get-all/${staffId}/${get().page1}/${get().rowsPerPage1}`);

          if (res?.data?.status === 200) {
         
              set({ salaries: res?.data?.data?.content });
        set({ totalLength1: res?.data?.data?.totalElements });
          }  
       }
        catch (error) {
          console.error("Error fetching salary data:", error);
         
        }

    },
    getAdjustments:async(staffId:number)=>{
       try {
      const res= await axios_auth.get(`/staff/adjustment/get-all/${staffId}/${get().page2}/${get().rowsPerPage2}`);

          if (res?.data?.status === 200) {
           set({ adjustments: res?.data?.data?.content });
        set({ totalLength2: res?.data?.data?.totalElements });
          }  
       }
        catch (error) {
          console.error("Error fetching salary data:", error);
         
        }

    },
    getPayrolls:async(staffId:number)=>{
       try {
      const res= await axios_auth.get(`/staff/payroll/get-all/${staffId}/${get().page3}/${get().rowsPerPage3}`);

          if (res?.data?.status === 200) {
                set({ payrolls: res?.data?.data?.content });
        set({ totalLength2: res?.data?.data?.totalElements });
          }  
       }
        catch (error) {
          console.error("Error fetching salary data:", error);
         
        }

    },

    //********************* */ delete   **************************

    deleteSalary: async (salaryId: number) => {
      try {
        const res = await axios_auth.delete(`/staff/salary/delete/${salaryId}`);
  
        if (res?.data?.status === 200) {
          
          set({
            salaries: get().salaries.filter((s) => s.id !== salaryId),
          })
          return { message: res?.data?.message, severity: "success" };
        } else {
          return { message: "Failed to delete salary", severity: "error" };
        }
      } catch (error: any) {
        console.log(error);
        if (error?.response?.data?.message) {
          return { message: error?.response?.data?.message, severity: "error" };
        }
        return { message: "Something went wrong", severity: "error" };
      }
    },
    deleteSalaryAdjustment: async (id: number) => {
      try {
        const res = await axios_auth.delete(`/staff/adjustment/delete/${id}`);
  
        if (res?.data?.status === 200) {
          
          set({
            adjustments: get().adjustments.filter((s) => s.id !== id),
          })
          return { message: res?.data?.message, severity: "success" };
        } else {
          return { message: "Failed to delete salary", severity: "error" };
        }
      } catch (error: any) {
        console.log(error);
        if (error?.response?.data?.message) {
          return { message: error?.response?.data?.message, severity: "error" };
        }
        return { message: "Something went wrong", severity: "error" };
      }
    },
    deletePayroll: async (id: number) => {
      try {
        const res = await axios_auth.delete(`/staff/payroll/delete/${id}`);
  
        if (res?.data?.status === 200) {
          
          set({
            payrolls: get().payrolls.filter((s) => s.id !== id),
          })
          return { message: res?.data?.message, severity: "success" };
        } else {
          return { message: "Failed to delete salary", severity: "error" };
        }
      } catch (error: any) {
        console.log(error);
        if (error?.response?.data?.message) {
          return { message: error?.response?.data?.message, severity: "error" };
        }
        return { message: "Something went wrong", severity: "error" };
      }
    },



    //for pagination one
      page1: 0,

  setPage1: (data: number) => {
    set(() => ({
      page1: data,
    }));
  },

  rowsPerPage1: 10,

  setRowsPerPage1: (data: number) => {
    set(() => ({
      rowsPerPage1: data,
    }));
  },
totalLength1: 0,

// for pagination two
  page2: 0,

setPage2: (data: number) => {
  set(() => ({
    page2: data,
  }));
},

rowsPerPage2: 10,

setRowsPerPage2: (data: number) => {
  set(() => ({
    rowsPerPage2: data,
  }));
},
totalLength2: 0,

// for pagination three
  page3: 0,

setPage3: (data: number) => {
  set(() => ({
    page3: data,
  }));
},

rowsPerPage3: 10,

setRowsPerPage3: (data: number) => {
  set(() => ({
    rowsPerPage3: data,
  }));
},
totalLength3: 0,


salaryAdjFilterdata: [],
setSalaryAdjFilterdata: (data: ISalaryAdjustmentDetails[]) => {
  set(() => ({
    salaryAdjFilterdata: data,
  }));
}

    
}));