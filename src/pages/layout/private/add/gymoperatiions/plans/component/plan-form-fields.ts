import { useEffect } from "react";
import { useListFacilitiesStore } from "../../../../list/gymoperatiions/facilities/store";
import { IPlanFormField } from "../interface";

export const usePlanFormFields = (): IPlanFormField[] => {
  const { facilities, getFacilities } = useListFacilitiesStore();

  useEffect(() => {
    getFacilities();
  }, []);

  return [
    { name: "planName", label: "Plan Name", type: "text", required: true },
    {
      name: "durationInDays",
      label: "Duration in Days",
      type: "number",
      required: true,
    },

    {
      name: "facilities",
      label: "Included Facilities",
      type: "multiSelect",
      options:
        facilities?.map((facility) => ({
          value: facility?.id, // Assuming each facility has a unique `id`
          label: facility?.facilityName + "_" + facility?.price, // Assuming `facility.name` is the display name
        })) || [],
      required: true,
    },
    { name: "price", label: "Price", type: "number", required: true },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: false,
    },
  ];
};
