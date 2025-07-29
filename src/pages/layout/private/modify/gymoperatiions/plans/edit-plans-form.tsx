import Back from "@/global/components/back/back";
import {
    Calendar,
    CheckSquare,
    ClipboardList,
    Dumbbell,
    FileText,
    Tag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import { useGlobalStore } from "../../../../../../global/store";
import { useListFacilitiesStore } from "../../../list/gymoperatiions/facilities/store";
import { IPlansDetails } from "../../../list/gymoperatiions/plans/interface";
import { usePlansEditFormFields } from "./component/edit-plans-form-fields";
import { IPlansFacilitiesOption } from "./interface";
import { useEditPlansFormStore } from "./store";

const EditPlansForm = () => {
  // hooks
  const { state } = useLocation();
  const plans: IPlansDetails = { ...state };
  const navigate = useNavigate();

  // stores
  const { data, setData, updatePlans } = useEditPlansFormStore();
  const { setToasterData } = useGlobalStore();
  const { facilities, getFacilities } = useListFacilitiesStore();

  // useEffect
  const [selectedFacilities, setSelectedFacilitites] = useState<
    IPlansFacilitiesOption[]
  >([]);

  // this is option from db
  const plansFacilitiesOptions: IPlansFacilitiesOption[] =
    facilities?.map((facility) => ({
      value: facility?.id,
      label: facility?.facilityName,
    })) || [];

  // dynamic input fields
  const fields = usePlansEditFormFields();

  // --- Price & Discount Calculation ---
  // Calculate sum of facilities for the duration
  const facilitiesFullSum = selectedFacilities.reduce((sum, facility) => {
    const facilityData = facilities?.find(
      (f) => f.id === Number(facility.value)
    );
    const pricePerMonth = facilityData?.price || 0;
    const durationInMonths = Number(data.durationInDays || 30) / 30;
    return sum + pricePerMonth * durationInMonths;
  }, 0);
  const planPrice = Number(data.price) || 0;
  const calculatedDiscount =
    facilitiesFullSum > planPrice ? facilitiesFullSum - planPrice : 0;

  // handlers
  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setData(name, value);

    // If user edits price, update discount as well
    if (name === "price" || name === "durationInDays") {
      // For price: update discount (discount = facilitiesFullSum - price)
      // For duration: will be handled by useEffect below (recompute both price and discount)
      const newPlanPrice = name === "price" ? Number(value) : planPrice;
      const discount =
        facilitiesFullSum > newPlanPrice ? facilitiesFullSum - newPlanPrice : 0;
      setData("discount", discount);
    }
  };

  // When facilities or duration changes, update price and discount
  useEffect(() => {
    // Update price to facilities sum (unless user changed it), always update discount
    setData("price", facilitiesFullSum.toFixed(2));
    const discount =
      facilitiesFullSum > planPrice ? facilitiesFullSum - planPrice : 0;
    setData("discount", discount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFacilities, data.durationInDays, facilities]);

  // If user manually edits price, recalculate discount
  useEffect(() => {
    const discount =
      facilitiesFullSum > planPrice ? facilitiesFullSum - planPrice : 0;
    setData("discount", discount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.price]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Convert facilities to a list of numeric IDs
      const facilitiesIds: number[] = selectedFacilities?.map((i) => i.value);

      const res = await updatePlans(
        {
          ...(data as Record<string, string | number | number[] | boolean>),
          facilities: facilitiesIds,
          discount: data?.discount as string, // ensure discount is sent
        },
        plans?.id
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

  const handleMultiSelectChange = (
    selectedOptions: MultiValue<IPlansFacilitiesOption>
  ) => {
    setSelectedFacilitites([...selectedOptions]);
    setData(
      "facilities",
      selectedOptions.map((option) => option.value)
    );
    // price & discount recalculate handled by useEffect
  };

  // helper to determine which icon to use for each field
  const getFieldIcon = (fieldName: string) => {
    switch (fieldName) {
      case "planName":
        return <Tag size={18} className="text-[#E26300]" />;
      case "price":
      case "amount":
      case "cost":
        return <div className="text-[#E26300]">रु</div>;
      case "duration":
      case "durationInDays":
      case "period":
        return <Calendar size={18} className="text-[#E26300]" />;
      case "facilities":
        return <Dumbbell size={18} className="text-[#E26300]" />;
      case "description":
      case "notes":
        return <FileText size={18} className="text-[#E26300]" />;
      case "isActive":
      case "active":
      case "status":
        return <CheckSquare size={18} className="text-[#E26300]" />;
      default:
        return <ClipboardList size={18} className="text-[#E26300]" />;
    }
  };

  useEffect(() => {
    if (plans) {
      Object.keys(plans).forEach((key) => {
        setData(key, (plans as Record<string, any>)[key]);
      });

      // Ensure Facilities is mapped correctly
      if (Array.isArray(plans?.facilities)) {
        setSelectedFacilitites(
          plans?.facilities?.map((spec) => ({
            value: spec?.id,
            label: spec?.facilityName,
          }))
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getFacilities();
  }, []);

  return (
    <div className="min-h-screen py-10 px-4 bg-[#FAFAFA] text-[#2E2E2E] font-poppins">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden font-poppins">
          <div className="p-5 text-center">
            <Back />
            <h1 className="text-xl font-semibold text-[#1A1A1A] mb-2 flex items-center justify-center">
              <ClipboardList className="mr-2 text-[#E26300]" size={20} />
              Edit Membership Plan
            </h1>
            <p className="text-[#2E2E2E] text-sm">
              Update plan details and associated facilities
            </p>
          </div>
          <div className="h-0.5 bg-[#E26300]/20 w-full"></div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {/* Dynamically Render Form Fields */}
              {fields?.map((field) => (
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
                    ) : field.type === "multiSelect" ? (
                      <CreatableSelect
                        isMulti
                        id={field.name}
                        options={plansFacilitiesOptions}
                        value={selectedFacilities}
                        onChange={handleMultiSelectChange}
                        placeholder="Select or create facilities..."
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
                          multiValue: (base) => ({
                            ...base,
                            backgroundColor: "#E2630020",
                            borderRadius: "4px",
                          }),
                          multiValueLabel: (base) => ({
                            ...base,
                            color: "#E26300",
                            fontSize: "0.875rem",
                          }),
                          multiValueRemove: (base) => ({
                            ...base,
                            color: "#E26300",
                            "&:hover": {
                              backgroundColor: "#E26300",
                              color: "white",
                            },
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
                        readOnly={field.name === "discount"}
                      />
                    )}
                  </div>
                  {field.name === "discount" && (
                    <span className="text-xs text-green-700 mt-1">
                      Calculated as (Facilities Total - Plan Price)
                    </span>
                  )}
                </div>
              ))}

              {/* Facilities summary with discount */}
              {selectedFacilities.length > 0 && (
                <div className="col-span-1 md:col-span-2">
                  <div className="rounded bg-gray-50 border border-gray-200 p-3 mt-1 mb-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedFacilities.map((facility) => (
                        <span
                          key={facility.value}
                          className="bg-gray-100 border border-gray-200 px-2 py-0.5 rounded text-xs text-[#2E2E2E]"
                        >
                          {facility.label}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-1 text-xs">
                      {selectedFacilities?.map((facility) => {
                        const facilityData = facilities?.find(
                          (f) => f.id === Number(facility.value)
                        );
                        const pricePerMonth = facilityData?.price || 0;
                        const durationInMonths =
                          Number(data.durationInDays || 30) / 30;
                        const totalPrice = pricePerMonth * durationInMonths;

                        return (
                          <div
                            key={facility.value}
                            className="flex justify-between items-center border-b border-gray-100 pb-1"
                          >
                            <div className="text-[#2E2E2E]">
                              {facility.label}
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-400 mr-1">
                                NPR {pricePerMonth.toFixed(2)} ×{" "}
                                {durationInMonths.toFixed(1)}mo
                              </span>
                              <span className="text-[#2E2E2E] font-medium">
                                NPR {totalPrice.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                      <div className="flex justify-between items-center pt-1 font-medium">
                        <div className="text-[#2E2E2E]">Facilities Total</div>
                        <div className="text-[#2E2E2E] text-base">
                          NPR {facilitiesFullSum.toFixed(2)}
                        </div>
                      </div>
                      <div className="flex justify-between items-center font-medium">
                        <div className="text-[#2E2E2E]">Plan Price</div>
                        <div className="text-[#E26300] text-base">
                          NPR {planPrice.toFixed(2)}
                        </div>
                      </div>
                      {calculatedDiscount > 0 && (
                        <div className="flex justify-between items-center font-medium">
                          <div className="text-green-700">Discount</div>
                          <div className="text-green-700">
                            - NPR {calculatedDiscount.toFixed(2)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="col-span-1 md:col-span-2 mt-3 pt-6 flex justify-end flex-end gap-5">
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
                  <span>Update Plan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPlansForm;
