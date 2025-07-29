/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import {
  axios_auth,
  axios_auth_form,
  base64ToUint8Array,
  defaultNepaliDate,
} from "../../../../../../global/config";
import { IAddMemberStore } from "./interface";
import {
  FileType,
  PaymentMode,
  ShiftType,
} from "@/global/components/enums/enums";

const defaultValidationAttemptData = {
  personal: false,
  membership: false,
  additional: false,
};
const defaultMemberData = {
  shiftType: ShiftType.EVENING,
  paymentMethod: PaymentMode.CASH,
  joiningDate: defaultNepaliDate.toString(),
  existingEndDate: defaultNepaliDate.toString(),
};

export const useAddMemberFormStore = create<IAddMemberStore>((set, get) => ({
  data: {
    //default values for the form fields
    ...defaultMemberData,
  }, // Initialize an empty object to store form data
  setData: (key, value) =>
    set((state) => ({
      data: {
        ...state.data,
        [key]: value, // Dynamically update the specific field in the form data
      },
    })),
  clearData: () => set({ data: defaultMemberData }),
  createMember: async (data: Record<string, string | number | boolean>) => {
    try {
      const res = await axios_auth.post(`member/create?printBill=${get().printBill}`, data);

      if(get().printBill && res?.data?.status === 200) {
        
          const byte = res?.data?.data;
        
                    // Decode Base64 to Uint8Array
                    const byteArray = base64ToUint8Array(byte);
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
  activeSection: "personal",
  setActiveSection: (section: string) => {
    set({ activeSection: section });
  },

  isModalOpen: false,
  isExistingMember: false,
  // setIsModalOpen: () => set({ isModalOpen: !get().isModalOpen }),
  // setIsExistingMember: () => set({ isExistingMember: !get().isExistingMember }),

  setIsModalOpen: (value?: boolean) =>
    set((state) => ({
      isModalOpen: value !== undefined ? value : !state.isModalOpen,
    })),

  setIsExistingMember: (value?: boolean) =>
    set((state) => ({
      isExistingMember: value !== undefined ? value : !state.isExistingMember,
    })),

  existingEndDate: 0,
  setExistingEndDate: (data: number) => set({ existingEndDate: data }),

  remainingDays: 0,

  // for vaidation
  errors: {}, // Store validation errors
  clearErrors: () => {
    set({ errors: {} });
  },
  validateForm: () => {
    const { data } = get();
    const errors: Record<string, string> = {};

    // Required field validations
    const requiredFields = [
      { key: "fullName", message: "Full name is required" },
      { key: "phone", message: "Phone number is required" },
      { key: "address", message: "Address is required" },
      { key: "paymentMethod", message: "Please select a payment method" },
      { key: "planId", message: "Please select a membership plan" },
      { key: "shiftType", message: "Please select a shift type" },
      // Add other required fields
    ];

    for (const field of requiredFields) {
      if (!data[field.key]) {
        errors[field.key] = field.message;
      }
    }

    // Email validation if provided
    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email as string)) {
      errors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (data.phone && !/^[0-9+\-\s()]{7,15}$/.test(data.phone as string)) {
      errors.phone = "Please enter a valid phone number";
    }

    // Set the errors in state
    set({ errors });

    // Return whether the form is valid
    return Object.keys(errors).length === 0;
  },

  validationAttempted: defaultValidationAttemptData,
  setValidationAttempted: (section: string, value: boolean) => {
    set((state: IAddMemberStore) => ({
      validationAttempted: { ...state.validationAttempted, [section]: value },
    }));
  },
  resetValidation: () =>
    set(() => ({
      validationAttempted: defaultValidationAttemptData,
    })),

  fileType: FileType.CSV,
  setFileType: (fileType: FileType) => {
    set({ fileType });
  },
  bulkAdd: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("csvFile", file); // the file input
      formData.append("fileType", get().fileType); // assuming you're sending enum as string (FileType.CSV)

      const res = await axios_auth_form.post("member/bulk-add", formData);

      return res?.data?.status === 200
        ? { message: res?.data?.message, severity: "success" }
        : { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "Something went wrong", severity: "error" };
    }
  },
  printBill: false,
  setPrintBill: (printBill) => {
    set({ printBill });
  },
}));

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { create } from "zustand";
// import { axios_auth } from "../../../../../../global/config";
// import { IAddMemberStore } from "./interface";

// export const useAddMemberFormStore = create<IAddMemberStore>((set, get) => ({
//   data: {}, // Initialize an empty object to store form data
//   errors: {}, // Store validation errors

//   setData: (key, value) =>
//     set((state) => ({
//       data: {
//         ...state.data,
//         [key]: value, // Dynamically update the specific field in the form data
//       },
//       // Clear the error for this field when it's updated
//       errors: {
//         ...state.errors,
//         [key]: undefined
//       }
//     })),

//   clearData: () => set({ data: {}, errors: {} }),

//   validateForm: () => {
//     const { data } = get();
//     const errors: Record<string, string> = {};

//     // Required field validations
//     const requiredFields = [
//       { key: 'fullName', message: 'Full name is required' },
//       { key: 'phone', message: 'Phone number is required' },
//       { key: 'address', message: 'Address is required' },
//       { key: 'paymentMethod', message: 'Please select a payment method' },
//       { key: 'planId', message: 'Please select a membership plan' },
//       { key: 'shiftType', message: 'Please select a shift type' },
//       // Add other required fields
//     ];

//     for (const field of requiredFields) {
//       if (!data[field.key]) {
//         errors[field.key] = field.message;
//       }
//     }

//     // Email validation if provided
//     if (data.email && !/^\S+@\S+\.\S+$/.test(data.email as string)) {
//       errors.email = 'Please enter a valid email address';
//     }

//     // Phone validation
//     if (data.phone && !/^[0-9+\-\s()]{7,15}$/.test(data.phone as string)) {
//       errors.phone = 'Please enter a valid phone number';
//     }

//     // Set the errors in state
//     set({ errors });

//     // Return whether the form is valid
//     return Object.keys(errors).length === 0;
//   },

//   createMember: async (data: Record<string, string | number | boolean>) => {
//     try {
//       // First validate the form
//       const isValid = get().validateForm();

//       if (!isValid) {
//         return { message: "Please fix the errors in the form", severity: "error" };
//       }

//       const res = await axios_auth.post("member/create", data);

//       return res?.data?.status === 200
//         ? { message: res?.data?.message, severity: "success" }
//         : { message: res?.data?.message, severity: "error" };
//     } catch (error: any) {
//       console.log(error);
//       if (error?.response?.data?.message) {
//         return { message: error?.response?.data?.message, severity: "error" };
//       }
//       return { message: "something went wrong", severity: "error" };
//     }
//   },

//   isModalOpen: false,
//   isExistingMember: false,

//   setIsModalOpen: (value?: boolean) =>
//     set((state) => ({
//       isModalOpen: value !== undefined ? value : !state.isModalOpen,
//     })),

//   setIsExistingMember: (value?: boolean) =>
//     set((state) => ({
//       isExistingMember: value !== undefined ? value : !state.isExistingMember,
//     })),

//   existingEndDate: 0,
//   setExistingEndDate: (data: number) => set({ existingEndDate: data }),

//   remainingDays: 0,
// }));
