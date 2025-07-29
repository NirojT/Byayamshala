import { useGlobalStore } from "@/global/store";
import { useVisitorStore } from "./store";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit3,
  FiUserPlus,
  FiRefreshCw,
  FiLoader,
  FiInfo,
} from "react-icons/fi";
import { useState } from "react";
import { IValidationErrors } from "./interface";
import Back from "@/global/components/back/back"; // <-- import GmailField
import { GmailField } from "@/global/components/email/GmailField";

const AddVisitorForm = () => {
  const {
    data,
    setData,
    clearData,
    addVisitor,
    errors,
    clearErrors,
    setErrors,
  } = useVisitorStore();
  const { setToasterData } = useGlobalStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate form before submission
    const validationErrors = validateForm();
    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== ""
    );

    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);
    const res = await addVisitor();

    setIsSubmitting(false);

    if (res) {
      setToasterData({
        message: res?.message,
        severity: res?.severity,
        open: true,
      });
    }

    if (res.severity === "success") {
      clearData();
      navigate(-1);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  // form validaton
  function validateForm(): IValidationErrors {
    const newErrors: IValidationErrors = {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      notes: "",
    };

    // Validate fullName
    if (!data.fullName || data.fullName.trim() === "") {
      newErrors.fullName = "Full name is required";
    } else if (data.fullName.length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    // Validate phone
    if (!data.phone || data.phone.trim() === "") {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(data.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Validate address
    if (!data.address || data.address.trim() === "") {
      newErrors.address = "Address is required";
    } else if (data.address.length < 5) {
      newErrors.address = "Address must be at least 5 characters";
    }

    setErrors(newErrors);
    return newErrors;
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 font-poppins bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <div className="relative px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <Back />

              <div className="flex items-center">
                <span className="bg-gray-100 text-[#1A1A1A] px-3 py-1 rounded-md text-sm border border-gray-200">
                  Visitor Registration
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-100 rounded-md">
                <FiUserPlus className="h-5 w-5 text-[#1A1A1A]" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-[#2E2E2E] mb-1">
                  Add New Visitor
                </h2>
                <p className="text-gray-600">
                  Register a new visitor to your gym. Fields marked with{" "}
                  <span className="text-[#E26300]">*</span> are required.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="flex flex-col">
                <label
                  htmlFor="fullName"
                  className="text-[#2E2E2E] font-medium mb-2 flex items-center"
                >
                  Full Name
                  <span className="text-[#E26300] ml-1">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[#1A1A1A] opacity-70">
                    <FiUser />
                  </span>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={data?.fullName || ""}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className={`bg-white pl-10 pr-3 py-3 w-full border rounded-md text-[#2E2E2E] shadow-sm focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none transition-all duration-200
                      ${
                        errors.fullName ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1 animate-fadeIn">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-[#2E2E2E] font-medium mb-2"
                >
                  Email
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[#1A1A1A] opacity-70">
                    <FiMail />
                  </span>
                  <div className="w-full">
                    <GmailField
                      value={data?.email || ""}
                      onChange={(val) => setData({ ...data, email: val })}
                      placeholder="Enter email"
                      error={
                        errors.email ? "Please enter a valid email address" : undefined
                      }
                      className={`bg-white pl-10 pr-3 py-3 w-full border rounded-md text-[#2E2E2E] shadow-sm focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none transition-all duration-200
                        ${
                          errors.email 
                            ? "border-red-500"
                            : "border-gray-300"
                        }
                        
                        `}
                    />
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label
                  htmlFor="phone"
                  className="text-[#2E2E2E] font-medium mb-2 flex items-center"
                >
                  Phone Number
                  <span className="text-[#E26300] ml-1">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[#1A1A1A] opacity-70">
                    <FiPhone />
                  </span>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={data?.phone || ""}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className={`bg-white pl-10 pr-3 py-3 w-full border rounded-md text-[#2E2E2E] shadow-sm focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none transition-all duration-200
                      ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 animate-fadeIn">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="flex flex-col">
                <label
                  htmlFor="address"
                  className="text-[#2E2E2E] font-medium mb-2 flex items-center"
                >
                  Address
                  <span className="text-[#E26300] ml-1">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[#1A1A1A] opacity-70">
                    <FiMapPin />
                  </span>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={data?.address || ""}
                    onChange={handleChange}
                    placeholder="Enter address"
                    className={`bg-white pl-10 pr-3 py-3 w-full border rounded-md text-[#2E2E2E] shadow-sm focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none transition-all duration-200
                      ${errors.address ? "border-red-500" : "border-gray-300"}`}
                  />
                </div>
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1 animate-fadeIn">
                    {errors.address}
                  </p>
                )}
              </div>

              {/* Notes */}
              <div className="flex flex-col md:col-span-2">
                <label
                  htmlFor="notes"
                  className="text-[#2E2E2E] font-medium mb-2"
                >
                  Notes
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-[#1A1A1A] opacity-70">
                    <FiEdit3 />
                  </span>
                  <textarea
                    id="notes"
                    name="notes"
                    value={data?.notes || ""}
                    onChange={handleChange}
                    placeholder="Add any additional notes about the visitor"
                    className="bg-white pl-10 pr-3 py-3 w-full border border-gray-300 rounded-md text-[#2E2E2E] shadow-sm focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none transition-all duration-200"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Submission Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    clearData();
                    clearErrors();
                    setErrors({});
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-md border border-gray-300 text-[#2E2E2E] hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <FiRefreshCw className="h-5 w-5" />
                  Clear Form
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 rounded-md bg-[#E26300] hover:bg-[#D25200] text-white font-medium shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <FiLoader className="animate-spin h-5 w-5" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <FiUserPlus className="h-5 w-5" />
                      Add Visitor
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Help Card */}
        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-md shadow-sm flex items-start gap-4">
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <FiInfo className="h-5 w-5 text-[#1A1A1A]" />
          </div>
          <div>
            <h4 className="text-lg font-medium text-[#2E2E2E] mb-1">
              What Happens Next?
            </h4>
            <p className="text-gray-600 text-sm">
              After adding a visitor, they'll be registered in the system. You
              can later convert them to a member if they decide to join your
              gym. Visitors' details are saved for future reference and
              follow-ups.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVisitorForm;
