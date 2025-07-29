 
import { IPlansEditFormField,   } from "../interface";

 

export const usePlansEditFormFields = (): IPlansEditFormField[] => {

 
 
   return [
     { name: "planName", label: "Plan Name", type: "text", required: true },
     {
       name: "durationInDays",
       label: "Duration in Days",
       type: "number",
       required: true,
     },
     { name: "price", label: "Price", type: "number", required: true },
     {
       name: "facilities",
       label: "Included Facilities",
       type: "multiSelect",
       
       required: false,
      },
      
      { name: "discount", label: "Discount", type: "number", required: true },
     {
       name: "description",
       label: "Description",
       type: "textarea",
       required: false,
     },
   ];
  }
  