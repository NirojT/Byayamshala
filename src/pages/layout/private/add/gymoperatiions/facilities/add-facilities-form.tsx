import Back from "@/global/components/back/back";
import React, { useEffect, useState } from "react";
import {
  FiInfo,
  FiLoader,
  FiPackage,
  FiPlus,
  FiRefreshCw,
  FiUsers,
} from "react-icons/fi";
import CreatableSelect from "react-select/creatable";
import { useGlobalStore } from "../../../../../../global/store";
import { useListFacilitiesStore } from "../../../list/gymoperatiions/facilities/store";
import {
  FacilitiesFormFields,
  FacilitiesOptions as InitialFacilitiesOptions,
} from "./component/facilities-form-fields";
import { IFacilitiesOption } from "./interface";
import { useAddFacilitiesFormStore } from "./store";

const AddFacilitiesForm = () => {
  /*
  we are including backend added facilities in the options of the select field
  */
  const { getFacilities, facilities } = useListFacilitiesStore();

  const [facilitiesOptions, setFacilitiesOptions] = useState(
    InitialFacilitiesOptions
  ); // Local state for options

  const {
    data,
    setData,
    clearData,
    createFacilities,
    isSubmitting,
    setIsSubmitting,
    showPreview,
    setShowPreview,
    validationAttempted,
    setIsValiationAttempted,
  } = useAddFacilitiesFormStore();
  const { setToasterData } = useGlobalStore();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setData(name, value);

    // Show preview when user starts filling the form
    if (value && !showPreview) {
      setShowPreview(true);
    }
  };

  const handleCreate = (inputValue: string) => {
    const newOption = { value: inputValue, label: inputValue };
    setFacilitiesOptions((prevOptions) => [...prevOptions, newOption]); // Add new option to state
    setData("facilityName", inputValue); // Set the new facility name in the form data
    setShowPreview(true);
  };

  const validateForm = () => {
    let isValid = true;
    let firstInvalidField = "";

    FacilitiesFormFields.forEach((field) => {
      // check if any required field has no value and if the text value is empty
      if (
        (field?.required && !data[field?.name]) ||
        (data[field.type] === "text" &&
          (data[field?.name] as string).trim() === "")
      ) {
        isValid = false;

        // check if the any previous value to firstInvalidField was set
        // if not then only set the value
        if (firstInvalidField === "") {
          firstInvalidField = field?.name;
        }
      }
    });

    return { isValid, firstInvalidField };
  };

  // handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsValiationAttempted(true);
    const validationErrors = validateForm();

    // focus on the input fields which have not been filled or invalid
    if (!validationErrors?.isValid) {
      setToasterData({
        message: "Please fill all the details correctly",
        severity: "error",
        open: true,
      });

      setTimeout(() => {
        document.getElementById(validationErrors?.firstInvalidField)?.focus();
      }, 100);

      return;
    }

    setIsSubmitting(true);

    try {
      const res = await createFacilities(data as Record<string, string>);

      setToasterData({
        open: true,
        message: res?.message,
        severity: res?.severity,
      });

      if (res?.severity === "success") {
        clearData();
        setShowPreview(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setIsValiationAttempted(false);
    }
  };

  const formHasRequiredFields = () => {
    return FacilitiesFormFields.filter((field) => field.required).every(
      (field) => data[field.name] && String(data[field.name]).trim() !== ""
    );
  };

  useEffect(() => {
    getFacilities(); // Fetch backend facilities
  }, []);

  useEffect(() => {
    if (facilities && facilities.length > 0) {
      // Convert backend facilities to IFacilitiesOption format
      const backendOptions: IFacilitiesOption[] = facilities?.map((f) => ({
        value: f?.facilityName,
        label: f?.facilityName,
      }));

      // Filter default options that are not already in backend
      const filteredDefaults = InitialFacilitiesOptions.filter(
        (defaultOption) =>
          !backendOptions.some(
            (backendOption) => backendOption?.value === defaultOption?.value
          )
      );

      // Combine with backend options first
      const combinedOptions = [...backendOptions, ...filteredDefaults];

      setFacilitiesOptions(combinedOptions);
    }
  }, [facilities]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 bg-[#FAFAFA] font-poppins">
      <Back />
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <div className="relative px-8 py-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-100 rounded-md">
                <FiPackage className="h-5 w-5 text-[#1A1A1A]" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-[#2E2E2E] mb-2">
                  Add New Facility
                </h2>
                <p className="text-gray-600">
                  Create a new facility for your gym. Fields marked with{" "}
                  <span className="text-[#E26300]">*</span> are required. eg:
                  weight lifting pre month Rs 1500
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 ">
            {/* Main Form Card */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <form onSubmit={handleSubmit} className="p-8">
                <div className="space-y-6">
                  {FacilitiesFormFields?.map((field) => (
                    <div key={field.name} className="flex flex-col">
                      <label
                        htmlFor={field.name}
                        className="text-[#2E2E2E] font-medium mb-2 flex items-center"
                      >
                        {field.label}
                        {field.required && (
                          <span className="text-[#E26300] ml-1">*</span>
                        )}
                      </label>

                      {field.type === "textarea" ? (
                        <div className="relative">
                          <textarea
                            id={field.name}
                            name={field.name}
                            value={(data[field.name] as string) || ""}
                            onChange={handleChange}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            className={`bg-white p-4 text-[#2E2E2E] block w-full rounded-md border focus:outline-none shadow-sm
                            focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] resize-none transition-all duration-200
                              ${
                                validationAttempted &&
                                field?.required &&
                                !data[field.name]
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            rows={4}
                          />
                        </div>
                      ) : field.type === "select" ? (
                        <div className="relative">
                          <CreatableSelect
                            id={field.name}
                            options={facilitiesOptions}
                            defaultValue={facilitiesOptions.find(
                              (f) => f.value === "Personal Trainer"
                            )}
                            value={
                              facilitiesOptions.find(
                                (option) => option.value === data[field.name]
                              ) || null
                            }
                            onChange={(newValue: IFacilitiesOption | null) => {
                              setData(field.name, newValue?.value || "");
                              if (newValue) setShowPreview(true);
                            }}
                            onCreateOption={handleCreate}
                            placeholder="Select or create a facility type..."
                            className={`react-select-container ${
                              validationAttempted &&
                              field?.required &&
                              !data[field.name]
                                ? "border-red-500"
                                : ""
                            }`}
                            classNamePrefix="select"
                            styles={{
                              control: (base, state) => ({
                                ...base,
                                backgroundColor: "#FFFFFF",
                                borderColor: state.isFocused
                                  ? "#1A1A1A"
                                  : validationAttempted &&
                                    field?.required &&
                                    !data[field.name]
                                  ? "#EF4444"
                                  : "#D1D5DB",
                                boxShadow: state.isFocused
                                  ? "0 0 0 1px #1A1A1A"
                                  : "none",
                                minHeight: "45px",
                                borderRadius: "0.375rem",
                                color: "#2E2E2E",
                                "&:hover": {
                                  borderColor: "#1A1A1A",
                                },
                              }),
                              input: (base) => ({
                                ...base,
                                color: "#2E2E2E",
                                padding: "2px",
                                margin: 0,
                              }),
                              placeholder: (base) => ({
                                ...base,
                                color: "#9CA3AF",
                              }),
                              singleValue: (base) => ({
                                ...base,
                                color: "#2E2E2E",
                              }),
                              option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isFocused
                                  ? "#F3F4F6"
                                  : state.isSelected
                                  ? "#E5E7EB"
                                  : "#FFFFFF",
                                color: "#2E2E2E",
                                cursor: "pointer",
                                padding: "0.75rem 1rem",
                                ":active": {
                                  backgroundColor: "#E5E7EB",
                                },
                              }),
                              menu: (base) => ({
                                ...base,
                                backgroundColor: "#FFFFFF",
                                color: "#2E2E2E",
                                zIndex: 10,
                                borderRadius: "0.375rem",
                                overflow: "hidden",
                                boxShadow:
                                  "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                              }),
                              noOptionsMessage: (base) => ({
                                ...base,
                                color: "#6B7280",
                                padding: "0.75rem 1rem",
                              }),
                            }}
                          />
                          <p className="text-gray-500 text-sm mt-2 italic">
                            Type to create a new facility or select from
                            existing options
                          </p>
                        </div>
                      ) : field.name === "price" ? (
                        <div className="relative">
                          <span className="absolute left-4 top-4 text-[#1A1A1A] opacity-70">
                            रु
                          </span>
                          <input
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            value={(data[field.name] as string) || ""}
                            onChange={handleChange}
                            placeholder="Enter facility price"
                            className={`bg-white pl-10 pr-3 py-3 w-full border rounded-md text-[#2E2E2E] shadow-sm
                            focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none transition-all duration-200
                              ${
                                validationAttempted &&
                                field?.required &&
                                !data[field.name]
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                            NPR
                          </div>
                        </div>
                      ) : (
                        <div className="relative">
                          {field.name === "capacityLimit" && (
                            <span className="absolute left-4 top-4 text-[#1A1A1A] opacity-70">
                              <FiUsers className="h-5 w-5" />
                            </span>
                          )}
                          <input
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            value={(data[field.name] as string) || ""}
                            onChange={handleChange}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            className={`bg-white ${
                              field.name === "capacityLimit" ? "pl-10" : ""
                            } pr-3 py-3 w-full border rounded-md text-[#2E2E2E] shadow-sm focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none transition-all duration-200
                              ${
                                validationAttempted &&
                                field?.required &&
                                !data[field.name]
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                          />
                          {field.name === "capacityLimit" && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                              people
                            </div>
                          )}
                        </div>
                      )}

                      {validationAttempted &&
                        field?.required &&
                        !data[field?.name] && (
                          <p className="mt-1 text-sm text-red-500 animate-fadeIn">
                            {field.label} is required.
                          </p>
                        )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      clearData();
                      setShowPreview(false);
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-md border border-gray-300 text-[#2E2E2E] hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <FiRefreshCw className="h-5 w-5" />
                    Clear Form
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full sm:w-auto px-8 py-3 rounded-md bg-[#E26300] hover:bg-[#D25200] text-white font-medium shadow-sm 
                      transition-all duration-200 flex items-center justify-center gap-2 ${
                        isSubmitting || !formHasRequiredFields()
                          ? "opacity-70 cursor-not-allowed"
                          : ""
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        <FiLoader className="animate-spin h-5 w-5" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <FiPlus className="h-5 w-5" />
                        Add Facility
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Help Card */}
            <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-md shadow-sm flex items-start gap-4">
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <FiInfo className="h-5 w-5 text-[#1A1A1A]" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-[#2E2E2E] mb-2">
                  Tips for Adding Facilities
                </h4>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="text-[#1A1A1A] mr-2">•</span>
                    <span>
                      Create descriptive facility names that clearly communicate
                      what members can expect.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1A1A1A] mr-2">•</span>
                    <span>
                      Set appropriate capacity limits to maintain quality
                      experience for all members.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1A1A1A] mr-2">•</span>
                    <span>
                      Provide detailed descriptions of each facility to help
                      members understand its benefits.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Preview Card (Column 2) */}
          <div className="lg:col-span-2">
            {showPreview && data?.facilityName && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden sticky top-4">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-[#2E2E2E]">
                    Facility Preview
                  </h3>
                  <p className="text-gray-500 text-sm">
                    This is how your facility will appear
                  </p>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <h4 className="text-xl font-medium text-[#2E2E2E]">
                      {data?.facilityName as string}
                    </h4>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <span className="flex items-center">
                        रु NPR {(data?.price as string) || "0.00"}
                      </span>
                      {data?.capacityLimit && (
                        <span className="flex items-center ml-4">
                          <FiUsers className="mr-1" />
                          {data?.capacityLimit as string} people capacity
                        </span>
                      )}
                    </div>
                  </div>

                  {data?.description && (
                    <div className="mt-2">
                      <h5 className="text-[#2E2E2E] font-medium mb-1">
                        Description:
                      </h5>
                      <p className="text-gray-600 text-sm">
                        {data?.description as string}
                      </p>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="bg-[#E26300] text-white text-sm inline-flex items-center px-3 py-1 rounded-md">
                      <span className="capitalize">
                        {data?.facilityName as string}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFacilitiesForm;
