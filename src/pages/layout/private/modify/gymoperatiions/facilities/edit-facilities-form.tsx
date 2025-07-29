import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { useGlobalStore } from "../../../../../../global/store";
import { useEditFacilitiesFormStore } from "./store";
import {
  EditFacilitiesFormFields,
  FacilitiesOptions as initialData,
} from "./component/edit-facilities-form-fields";
import { useLocation, useNavigate } from "react-router-dom";
import { IFacilitiesDetails } from "../../../list/gymoperatiions/facilities/interface";
import { IFacilitiesEditOption } from "./interface";
import { Dumbbell, FileText, Tag, CheckSquare } from "lucide-react";
import Back from "@/global/components/back/back";

const EditFacilitiesForm = () => {
  // hooks
  const { state } = useLocation();
  const navigate = useNavigate();
  const facilitiy: IFacilitiesDetails = { ...state };
  const [FacilitiesOptions, setFacilitiesOptions] = useState(initialData);
  const fields = EditFacilitiesFormFields();

  // stores
  const { data, setData, updateFacilities } = useEditFacilitiesFormStore();
  const { setToasterData } = useGlobalStore();

  // handlers
  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleUpdate = (inputValue: string) => {
    const newOption = { value: inputValue, label: inputValue };
    setFacilitiesOptions((prevOptions) => [...prevOptions, newOption]);
    setData("facilityName", inputValue); // Set the new facility name in the form data
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await updateFacilities(
        data as Record<string, string>,
        facilitiy?.id
      );

      navigate(-1);

      setToasterData({
        open: true,
        message: res?.message,
        severity: res?.severity,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  // helper to determine which icon to use for each field
  const getFieldIcon = (fieldName: string) => {
    switch (fieldName) {
      case "facilityName":
        return <Dumbbell size={18} className="text-[#E26300]" />;
      case "description":
        return <FileText size={18} className="text-[#E26300]" />;
      case "isActive":
        return <CheckSquare size={18} className="text-[#E26300]" />;
      default:
        return <Tag size={18} className="text-[#E26300]" />;
    }
  };

  useEffect(() => {
    if (facilitiy) {
      Object.keys(facilitiy).forEach((key) => {
        setData(key, (facilitiy as Record<string, any>)[key]);
      });
    }
  }, []);

  return (
    <div className="min-h-screen py-10 px-4 bg-[#FAFAFA] text-[#2E2E2E] font-poppins">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden font-poppins">
          <div className="p-5 text-center">
            <Back />
            <h1 className="text-xl font-semibold text-[#1A1A1A] mb-2 flex items-center justify-center">
              <Dumbbell className="mr-2 text-[#E26300]" size={20} />
              Edit Facility
            </h1>
            <p className="text-[#2E2E2E] text-sm">
              Update facility information and details
            </p>
          </div>
          {/* Subtle orange accent line at bottom */}
          <div className="h-0.5 bg-[#E26300]/20 w-full"></div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Dynamically Render Form Fields */}
              {Array.isArray(fields) &&
                fields?.length > 0 &&
                fields?.map((field) => (
                  <div key={field.name} className="flex flex-col">
                    <label
                      htmlFor={field.name}
                      className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center"
                    >
                      {getFieldIcon(field.name)}
                      <span className="ml-2">{field.label}</span>
                      {field.required && (
                        <span className="text-[#E26300] ml-1">*</span>
                      )}
                    </label>

                    <div className="relative">
                      {field.type === "textarea" ? (
                        <textarea
                          id={field.name}
                          name={field.name}
                          value={(data[field.name] as string) || ""}
                          onChange={handleChange}
                          className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors"
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          rows={4}
                          required={field.required}
                        />
                      ) : field.type === "select" ? (
                        <CreatableSelect
                          id={field.name}
                          options={FacilitiesOptions}
                          value={
                            FacilitiesOptions.find(
                              (option) => option.value === data[field.name]
                            ) || null
                          }
                          onChange={(
                            newValue: IFacilitiesEditOption | null
                          ) => {
                            setData(field.name, newValue?.value || "");
                          }}
                          onCreateOption={handleUpdate}
                          placeholder={`Select or create ${field.label.toLowerCase()}`}
                          styles={{
                            control: (base, state) => ({
                              ...base,
                              borderRadius: "0",
                              borderTop: "none",
                              borderLeft: "none",
                              borderRight: "none",
                              borderBottom: `2px solid ${
                                state.isFocused ? "#E26300" : "#d1d5db"
                              }`,
                              boxShadow: "none",
                              padding: "2px 0",
                              backgroundColor: "transparent",
                              "&:hover": {
                                borderColor: "#E26300",
                              },
                            }),
                            placeholder: (base) => ({
                              ...base,
                              color: "#6b7280",
                            }),
                            option: (base, state) => ({
                              ...base,
                              backgroundColor: state.isSelected
                                ? "#E26300"
                                : state.isFocused
                                ? "#E2630020"
                                : "white",
                              color: state.isSelected ? "white" : "#2E2E2E",
                              "&:hover": {
                                backgroundColor: state.isSelected
                                  ? "#E26300"
                                  : "#E2630010",
                              },
                            }),
                            singleValue: (base) => ({
                              ...base,
                              color: "#2E2E2E",
                            }),
                            clearIndicator: (base) => ({
                              ...base,
                              color: "#6b7280",
                              "&:hover": {
                                color: "#E26300",
                              },
                            }),
                            dropdownIndicator: (base) => ({
                              ...base,
                              color: "#6b7280",
                              "&:hover": {
                                color: "#E26300",
                              },
                            }),
                            menu: (base) => ({
                              ...base,
                              boxShadow:
                                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                              borderRadius: "0.5rem",
                              zIndex: 10,
                            }),
                          }}
                        />
                      ) : (
                        <input
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          value={(data[field.name] as string) || ""}
                          onChange={handleChange}
                          className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors"
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          required={field.required}
                        />
                      )}
                    </div>
                  </div>
                ))}

              <div className="mt-8 pt-6 flex justify-end gap-5">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#FAFAFA] text-[#2E2E2E] border transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#E26300] text-white hover:bg-[#D25200] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>Update Facility</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFacilitiesForm;
