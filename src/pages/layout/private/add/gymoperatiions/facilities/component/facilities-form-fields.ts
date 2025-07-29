import { IFacilitiesOption, IFacilitiesFormField } from "../interface";

export const FacilitiesFormFields: IFacilitiesFormField[] = [
  {
    name: "facilityName",
    label: "Included Facilities",
    type: "select", // Updated type
    required: true,
  },
  { name: "price", label: "Price", type: "number", required: true },

  {
    name: "remarks",
    label: "Remarks",
    type: "textarea",
    required: false,
  },
];

// Define facilities options
export const FacilitiesOptions: IFacilitiesOption[] = [
  { value: "Gym Access", label: "Gym Access" },

  { value: "Personal Training", label: "Personal Trainer" },
  { value: "Cardio Access", label: "Cardio Access" },
  { value: "Swimming Pool", label: "Swimming Pool" },
  { value: "Yoga Classes", label: "Yoga Classes" },
  { value: "Sauna", label: "Sauna" },
  { value: "Steam", label: "Steam" },
  { value: "Zumba", label: "Zumba" },
  { value: "Crossfit", label: "Crossfit" },
  { value: "Spa", label: "Spa" },
  { value: "Massage", label: "Massage" },
  { value: "Breakfast", label: "Breakfast" },
];
