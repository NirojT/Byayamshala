import Back from "@/global/components/back/back";
import { zenSelectStyles } from "@/global/components/desing/design";
import React, { useEffect, useState } from "react";
import {
  FiCalendar,
  FiInfo,
  FiList,
  FiLoader,
  FiPackage,
  FiPlusCircle,
  FiRefreshCw,
} from "react-icons/fi";
import Select, { MultiValue } from "react-select";
import { useGlobalStore } from "../../../../../../global/store";
import { useListFacilitiesStore } from "../../../list/gymoperatiions/facilities/store";
import { usePlanFormFields } from "./component/plan-form-fields";
import { IPlanFacilityOption } from "./interface";
import { useAddPlansFormStore } from "./store";

const AddPlansForm = () => {
  const {
    data,
    setData,
    clearData,
    createPlan,
    setSelectedDuration,
    isSubmitting,
    setIsSubmitting,
    validationAttempted,
    setIsValiationAttempted,
  } = useAddPlansFormStore();
  const { facilities } = useListFacilitiesStore();
  const { setToasterData } = useGlobalStore();
  const fields = usePlanFormFields();
  const [selectedFacilities, setSelectedFacilities] = useState<
    IPlanFacilityOption[]
  >([]);

  useEffect(() => {
    if (!data?.durationInDays) {
      setData("durationInDays", "30");
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setData(name, value);

    if (name === "durationInDays") {
      setSelectedDuration(value);
      calculatePrice(selectedFacilities, Number(value));
    }
    // If price is changed (manual discount), recalculate discount UI but don't change facilities sum
  };

  const calculatePrice = (
    selectedFacilities: IPlanFacilityOption[],
    duration: number = Number(data?.durationInDays) || 30
  ) => {
    const facilityPriceMap = facilities?.reduce((map, facility) => {
      if (facility && facility?.id !== undefined) {
        map[facility?.id] = facility?.price;
      }
      return map;
    }, {} as Record<number, number>);

    const referenceMonths = duration / 30;
    const totalPrice = selectedFacilities.reduce((sum, selectedFacility) => {
      const price = facilityPriceMap[Number(selectedFacility.value)] || 0;
      return sum + price * referenceMonths;
    }, 0);

    setData("price", totalPrice.toFixed(2));
  };

  const handleFacilitiesChange = (
    newValue: MultiValue<IPlanFacilityOption>
  ) => {
    const typedValue = newValue as IPlanFacilityOption[];
    setData("facilities", typedValue);
    setSelectedFacilities(typedValue);
    calculatePrice(typedValue, Number(data?.durationInDays));
  };

  const valiateForm = () => {
    let isValid = true;
    let firstInvalidField = "";

    fields.forEach((field) => {
      if (
        (field?.required && !data[field?.name]) ||
        (data[field.type] === "text" &&
          (data[field?.name] as string).trim() === "")
      ) {
        isValid = false;
        if (firstInvalidField === "") {
          firstInvalidField = field?.name;
        }
      }
    });

    return { isValid, firstInvalidField };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsValiationAttempted(true);
    const validationErrors = valiateForm();

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
      const facilitiesIds = (data?.facilities as IPlanFacilityOption[])?.map(
        (opt) => Number(opt.value)
      );

      const res = await createPlan({
        ...data,
        discount: discount?.toString(),
        facilities: facilitiesIds,
      });

      setToasterData({
        open: true,
        message: res?.message,
        severity: res?.severity,
      });

      if (res?.severity === "success") {
        clearData();
        setSelectedFacilities([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setIsValiationAttempted(false);
    }
  };

  // Fields
  const planNameField = fields.find((f) => f.name === "planName");
  const durationField = fields.find((f) => f.name === "durationInDays");
  const priceField = fields.find((f) => f.name === "price");
  const facilitiesField = fields.find((f) => f.name === "facilities");
  const descriptionField = fields.find((f) => f.name === "description");

  // Discount calculation
  const facilitiesFullSum = selectedFacilities.reduce((sum, facility) => {
    const facilityData = facilities?.find(
      (f) => f.id === Number(facility?.value)
    );
    const pricePerMonth = facilityData?.price || 0;
    const durationInMonths = Number(data?.durationInDays || 30) / 30;
    return sum + pricePerMonth * durationInMonths;
  }, 0);

  const planPrice = Number(data?.price) || 0;
  const discount =
    facilitiesFullSum > planPrice ? facilitiesFullSum - planPrice : 0;

  return (
    <div className="min-h-screen py-8 px-2 sm:px-4 font-poppins bg-[#FAFAFA]">
      <Back />
      <div className="max-w-[70rem] mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="flex items-center space-x-3 px-4 py-3">
            <span className="p-2 bg-gray-100 rounded-md">
              <FiPackage className="h-5 w-5 text-[#1A1A1A]" />
            </span>
            <span>
              <h2 className="text-lg font-medium text-[#2E2E2E]">
                Create Membership Plan
              </h2>
              <p className="text-gray-500 text-xs">
                Fields with <span className="text-[#E26300]">*</span> are
                required. <br />
                Life Time naming convention is used for plans that do not
                expire.
                <p className="text-[#2E2E2E] font-medium">LifeTime Plan</p>.
              </p>
            </span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden p-2">
          <form onSubmit={handleSubmit} className="p-4 space-y-6">
            {/* Plan Name & Duration in one row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {planNameField && (
                <div className="flex flex-col">
                  <label
                    htmlFor={planNameField.name}
                    className="text-[#2E2E2E] font-medium mb-1 flex items-center text-sm"
                  >
                    {planNameField.label}
                    {planNameField.required && (
                      <span className="text-[#E26300] ml-1">*</span>
                    )}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-[#1A1A1A] opacity-70">
                      <FiList />
                    </span>
                    <input
                      onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
                      type={planNameField.type}
                      id={planNameField.name}
                      name={planNameField.name}
                      value={(data[planNameField.name] as string) || ""}
                      onChange={handleChange}
                      placeholder={`Enter ${planNameField.label.toLowerCase()}`}
                      className={`bg-white pl-9 pr-2 py-2 w-full border rounded text-[#2E2E2E] text-sm focus:ring-[#1A1A1A] focus:border-[#1A1A1A] outline-none transition-all duration-200 ${
                        validationAttempted &&
                        planNameField.required &&
                        !data[planNameField.name]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                  </div>
                  {validationAttempted &&
                    planNameField.required &&
                    !data[planNameField.name] && (
                      <p className="mt-1 text-xs text-red-500 animate-fadeIn">
                        {planNameField.label} is required.
                      </p>
                    )}
                </div>
              )}
              {durationField && (
                <div className="flex flex-col">
                  <label
                    htmlFor={durationField.name}
                    className="text-[#2E2E2E] font-medium mb-1 flex items-center text-sm"
                  >
                    {durationField.label}
                    {durationField.required && (
                      <span className="text-[#E26300] ml-1">*</span>
                    )}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-[#1A1A1A] opacity-70">
                      <FiCalendar />
                    </span>
                    <input
                      onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
                      type={durationField.type}
                      id={durationField.name}
                      name={durationField.name}
                      value={(data[durationField.name] as string) || ""}
                      onChange={handleChange}
                      placeholder={`Enter ${durationField.label.toLowerCase()}`}
                      className={`bg-white pl-9 pr-2 py-2 w-full border rounded text-[#2E2E2E] text-sm focus:ring-[#1A1A1A] focus:border-[#1A1A1A] outline-none transition-all duration-200 ${
                        validationAttempted &&
                        durationField.required &&
                        !data[durationField.name]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">
                      days
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["30", "60", "90", "180", "365"].map((duration) => (
                      <button
                        type="button"
                        key={duration}
                        onClick={() => {
                          setData("durationInDays", duration);
                          setSelectedDuration(duration);
                          calculatePrice(selectedFacilities, Number(duration));
                        }}
                        className={`px-2 py-1 rounded text-xs ${
                          data?.durationInDays === duration
                            ? "bg-[#E26300] text-white"
                            : "bg-gray-100 text-[#2E2E2E] hover:bg-gray-200"
                        }`}
                      >
                        {duration === "30"
                          ? "1 Month"
                          : duration === "60"
                          ? "2 Months"
                          : duration === "90"
                          ? "3 Months"
                          : duration === "180"
                          ? "6 Months"
                          : duration === "365"
                          ? "1 Year"
                          : `${duration} Days`}
                      </button>
                    ))}
                  </div>
                  {validationAttempted &&
                    durationField.required &&
                    !data[durationField.name] && (
                      <p className="mt-1 text-xs text-red-500 animate-fadeIn">
                        {durationField.label} is required.
                      </p>
                    )}
                </div>
              )}
            </div>

            {/* Facilities & Price in one row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {facilitiesField && (
                <div className="flex flex-col">
                  <label
                    htmlFor={facilitiesField.name}
                    className="text-[#2E2E2E] font-medium mb-1 flex items-center text-sm"
                  >
                    {facilitiesField.label}
                    {facilitiesField.required && (
                      <span className="text-[#E26300] ml-1">*</span>
                    )}
                  </label>
                  <Select
                    isMulti
                    id={facilitiesField.name}
                    options={facilitiesField.options as IPlanFacilityOption[]}
                    value={selectedFacilities}
                    onChange={handleFacilitiesChange}
                    placeholder="Select facilities..."
                    styles={zenSelectStyles}
                    classNamePrefix="select"
                  />
                  {validationAttempted &&
                    facilitiesField.required &&
                    !data[facilitiesField.name] && (
                      <p className="mt-1 text-xs text-red-500 animate-fadeIn">
                        {facilitiesField.label} is required.
                      </p>
                    )}
                </div>
              )}
              {priceField && (
                <div className="flex flex-col">
                  <label
                    htmlFor={priceField.name}
                    className="text-[#2E2E2E] font-medium mb-1 flex items-center text-sm"
                  >
                    {priceField.label}
                    {priceField.required && (
                      <span className="text-[#E26300] ml-1">*</span>
                    )}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-[#1A1A1A] opacity-70">
                      रु
                    </span>
                    <input
                      onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
                      type={priceField.type}
                      id={priceField.name}
                      name={priceField.name}
                      value={(data[priceField.name] as string) || ""}
                      onChange={handleChange}
                      className="bg-white pl-9 pr-2 py-2 w-full border rounded text-[#2E2E2E] text-sm border-gray-300"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">
                      NPR
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 mt-1">
                    You can offer a package price lower than the sum of
                    facilities to give a discount?.
                  </span>
                </div>
              )}
            </div>

            {/* Facilities summary with discount */}
            {selectedFacilities.length > 0 && (
              <div className="rounded bg-gray-50 border border-gray-200 p-3 mt-1 mb-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedFacilities.map((facility) => (
                    <span
                      key={facility?.value}
                      className="bg-gray-100 border border-gray-200 px-2 py-0.5 rounded text-xs text-[#2E2E2E]"
                    >
                      {facility?.label}
                    </span>
                  ))}
                </div>
                <div className="space-y-1 text-xs">
                  {selectedFacilities.map((facility) => {
                    const facilityData = facilities?.find(
                      (f) => f.id === Number(facility?.value)
                    );
                    const pricePerMonth = facilityData?.price || 0;
                    const durationInMonths =
                      Number(data?.durationInDays || 30) / 30;
                    const totalPrice = pricePerMonth * durationInMonths;

                    return (
                      <div
                        key={facility?.value}
                        className="flex justify-between items-center border-b border-gray-100 pb-1"
                      >
                        <div className="text-[#2E2E2E]">{facility?.label}</div>
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
                      NPR {facilitiesFullSum?.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center font-medium">
                    <div className="text-[#2E2E2E]">Plan Price</div>
                    <div className="text-[#E26300] text-base">
                      NPR {planPrice.toFixed(2)}
                    </div>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between items-center font-medium">
                      <div className="text-green-700">Discount</div>
                      <div className="text-green-700">
                        - NPR {discount?.toFixed(2)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Description field */}
            {descriptionField && (
              <div>
                <label
                  htmlFor={descriptionField.name}
                  className="text-[#2E2E2E] font-medium mb-1 flex items-center text-sm"
                >
                  {descriptionField.label}
                  {descriptionField.required && (
                    <span className="text-[#E26300] ml-1">*</span>
                  )}
                </label>
                <textarea
                  id={descriptionField.name}
                  name={descriptionField.name}
                  value={(data[descriptionField.name] as string) || ""}
                  onChange={handleChange}
                  placeholder="Describe benefits and features..."
                  className="bg-white pl-3 pr-2 py-2 w-full border border-gray-300 rounded text-[#2E2E2E] text-sm shadow-sm focus:ring-[#1A1A1A] focus:border-[#1A1A1A] outline-none transition-all duration-200"
                  rows={3}
                  required={descriptionField.required}
                />
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  clearData();
                  setSelectedFacilities([]);
                  setSelectedDuration("30");
                }}
                className="flex-1 px-2 py-2 rounded border border-gray-300 text-[#2E2E2E] hover:bg-gray-50 text-xs flex items-center justify-center gap-1"
              >
                <FiRefreshCw className="h-4 w-4" />
                Clear
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 px-2 py-2 rounded bg-[#E26300] hover:bg-[#D25200] text-white font-medium shadow-sm text-xs flex items-center justify-center gap-1 ${
                  isSubmitting || selectedFacilities.length === 0
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <FiLoader className="animate-spin h-4 w-4" />
                    Creating...
                  </>
                ) : (
                  <>
                    <FiPlusCircle className="h-4 w-4" />
                    Create Plan
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Preview - optional */}
        {data?.planName && selectedFacilities.length > 0 && (
          <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden animate-fadeIn">
            <div className="bg-gray-50 p-3 border-b border-gray-200">
              <h3 className="text-base font-medium text-[#2E2E2E]">
                Plan Preview
              </h3>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-[#2E2E2E]">
                  {data?.planName as string}
                </span>
                <span className="bg-[#E26300] text-white px-3 py-1 rounded font-medium text-sm">
                  NPR {(data?.price as string) || "0.00"}
                </span>
              </div>
              <div className="flex items-center text-gray-600 text-xs">
                <FiCalendar className="mr-1" />
                <span>
                  {data?.durationInDays === "30"
                    ? "1 Month"
                    : data?.durationInDays === "60"
                    ? "2 Months"
                    : data?.durationInDays === "90"
                    ? "3 Months"
                    : data?.durationInDays === "180"
                    ? "6 Months"
                    : data?.durationInDays === "365"
                    ? "1 Year"
                    : `${data?.durationInDays} Days`}
                </span>
              </div>
              <div>
                <h5 className="text-[#2E2E2E] font-medium text-xs mb-1">
                  Included Facilities:
                </h5>
                <div className="flex flex-wrap gap-1 mb-1">
                  {selectedFacilities?.map((facility) => (
                    <span
                      key={facility?.value}
                      className="bg-gray-100 border border-gray-200 px-2 py-0.5 rounded text-xs text-[#2E2E2E]"
                    >
                      {facility?.label}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-1 font-medium text-xs">
                  <div className="text-[#2E2E2E]">Total</div>
                  <div className="text-[#E26300]">
                    NPR {(data?.price as string) || "0.00"}
                  </div>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center pt-1 font-medium text-xs">
                    <div className="text-green-700">Discount</div>
                    <div className="text-green-700">
                      - NPR {discount?.toFixed(2)}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <h5 className="text-[#2E2E2E] font-medium text-xs mb-1">
                  Description:
                </h5>
                <p className="text-gray-600 text-xs">
                  {(data?.description as string) || "No description provided"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Help Card */}
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded shadow-sm flex items-start gap-2">
          <div className="bg-white p-2 rounded border border-gray-200">
            <FiInfo className="h-4 w-4 text-[#1A1A1A]" />
          </div>
          <div>
            <h4 className="text-base font-medium text-[#2E2E2E] mb-1">Tips</h4>
            <ul className="text-gray-600 text-xs space-y-1">
              <li>
                • Select facilities that complement each other for better value.
              </li>
              <li>• Provide clear descriptions for each plan.</li>
              <li>
                • Pricing is auto-calculated based on selected facilities &
                duration.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlansForm;
