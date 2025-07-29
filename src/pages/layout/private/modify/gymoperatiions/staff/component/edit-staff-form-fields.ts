 
  
 
 import { ShiftType, StaffType } from "@/global/components/enums/enums";

import { IStaffEditFormField } from "../interface";
  

 export const StaffEditFormFields: IStaffEditFormField[] = [
   {
     name: "fullName",
     label: "Full Name",
     type: "text",
     required: true,
   },
   {
     name: "email",
     label: "Email",
     type: "email",
     required: false,
   },
   {
     name: "phone",
     label: "Phone",
     type: "tel",
     required: true,
   },
   {
     name: "address",
     label: "Address",
     type: "text",
     required: true,
   },
   {
     name: "staffType",
     label: "Staff Type",
     type: "select",
     options: Object.values(StaffType).map((staffType: StaffType) => ({
       value: staffType.toString(),
       label: staffType.toString(),
     })),
     required: true,
   },
   {
     name: "shiftType",
     label: "Shift Type",
     type: "select",
     options: Object.values(ShiftType).map((shiftType: ShiftType) => ({
       value: shiftType.toString(),
       label: shiftType.toString(),
     })),
     required: true,
   },

   {
     name: "remarks",
     label: "Remarks",
     type: "text",
     required: false,
   },
   {
     name: "cardNumber",
     label: "Door Card Number",
     type: "text",
     required: false,
   },
 ];
 
 
 