import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material"; 
import { useGlobalStore } from "@/global/store";
import { useSuperPlansStore } from "../store";
import { AppUserPlanType } from "@/global/components/enums/enums";
import { IFeatureOption } from "../interface";
import { MultiValue } from "react-select";
import { IFacilitiesOption } from "@/pages/layout/private/add/gymoperatiions/facilities/interface";
  const FacilitiesOptions: IFacilitiesOption[] = [
  { value: "Member Management", label: "Member Management" },
  { value: "WhatsApp Integration", label: "WhatsApp Integration" },
  { value: "Advance Analytics", label: "Advance Analytics" },
  { value: "Finance", label: "Finance" },
  { value: "Inventory Management", label: "Inventory Management" },
  { value: "Cafe Management", label: "Cafe Management" },
];
const SuperPlanFormModal: React.FC = () => {
 
  const {
    data,
    setData,
    clearData,
    createSuperPlan,
    updateSuperPlan,
    setOpen,
    open,
    id,
  } = useSuperPlansStore();

  const { setToasterData } = useGlobalStore();

  // State for storing features as an array
  const [features, setFeatures] = useState<IFeatureOption[]>([]);

  // Convert comma-separated string into an array when data changes
  useEffect(() => {
    if (data.features) {
      const featureArray = data.features.split(",").map((feat) => ({
        label: feat.trim(),
        value: feat.trim(),
      }));
      setFeatures(featureArray);
    }
  }, [data.features]);

  // Handle input changes for text fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Handle multi-select features change
  const handleFeaturesChange = (
    selectedOptions: MultiValue<IFeatureOption>
  ) => {
    const featureArray = selectedOptions?.map((option) => option.value) || [];
    setFeatures([...selectedOptions]); // Convert MultiValue to an array
    setData({ ...data, features: featureArray.join(",") });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let res;
    if (id) {
      res = await updateSuperPlan(id);
    } else {
      res = await createSuperPlan();
    }

    setToasterData({
      message: res.message,
      severity: res.severity,
      open: true,
    });

    if (res.severity === "success") {
      clearData();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className="p-6 w-full max-w-lg bg-white rounded-lg shadow-lg">
        <DialogTitle className="text-xl font-semibold text-center text-gray-800">
          📦{id ? "Update" : "Add"} Plans
        </DialogTitle>

        <DialogContent className="flex flex-col gap-4 mt-2">
          <TextField
            select
            fullWidth
            label="Plan Type"
            name="type"
            value={data.type}
            onChange={handleChange}
            margin="dense"
          >
            {Object.values(AppUserPlanType)?.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            type="number"
            label="Duration (days)"
            name="durationInDays"
            value={data.durationInDays}
            onChange={handleChange}
            margin="dense"
          />

          <TextField
            fullWidth
            type="number"
            label="Price"
            name="price"
            value={data?.price || ""}
            onChange={handleChange}
            margin="dense"
          />

          {/* React-Select MultiSelect Creatable for Features */}
          <CreatableSelect
            isMulti
            options={FacilitiesOptions}
            value={features}
            onChange={handleFeaturesChange}
            placeholder="Add features..."
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </DialogContent>

        <DialogActions className="p-4 flex justify-between">
          <button
            className="bg-gray-200 px-5 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default SuperPlanFormModal;
