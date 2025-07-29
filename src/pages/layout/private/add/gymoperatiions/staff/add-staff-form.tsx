import Back from "@/global/components/back/back";
import React, { useState } from "react";
import {
  FiLoader,
  FiSave,
  FiUser
} from "react-icons/fi";
import { useGlobalStore } from "../../../../../../global/store";
import { StaffFormFields } from "./component/staff-form-fields";
import StaffFormHeader from "./component/staff-form-header";
import AddStaffHelpCard from "./section/add-staff-help-card";
import PersonalFormSection from "./section/personal-form-section";
import { useAddStaffFormStore } from "./store";
import { useNavigate } from "react-router-dom";

const AddStaffForm = () => {
  //hookes
  const navigate=useNavigate();
  const {
    data,
    clearData,
    createStaff,
    activeSection,
    setActiveSection,
    setValidationAttempted,
    resetValidation,
  } = useAddStaffFormStore();
  const { setToasterData } = useGlobalStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Group fields by category for better organization
  const personalInfoFields = StaffFormFields.filter((field) =>
    ["fullName", "email", "phone", "address", "emergencyContact"].includes(
      field.name
    )
  );

  

  const moveToNextSection = () => {
    if (activeSection === "personal") {
      // Mark personal section as validation attempted
      setValidationAttempted("personal", true);
      const personalValidation = validatePersonalSection();
      // Check if we need to redirect to a specific section with errors
      if (!personalValidation.isValid) {
        setToasterData({
          message: "Please fill all required personal information",
          severity: "error",
          open: true,
        });

        setActiveSection("personal");

        // Focusing on the first invalid field
        setTimeout(() => {
          document
            .getElementById(personalValidation.firstInvalidField)
            ?.focus();
        }, 100);

        return;
      }

      // If valid, proceed to professional section
      setActiveSection("professional");
    }
  };

  // Adding custom validation to each form part
  const validatePersonalSection = () => {
    // initially set to true assuming the form is valid
    let isValid = true;
    // the variable for finding the first invalid field
    let firstInvalidField = "";

    // Validating all required personal fields
    personalInfoFields.forEach((field) => {
      if (
        field?.required &&
        (!data[field?.name] || (data[field?.name] as string).trim() === "")
      ) {
        // set the isValid to false
        isValid = false;

        // check if a field before the current field was set to the variable
        // else set to current field
        if (!firstInvalidField) {
          firstInvalidField = field.name;
        }
      }

      //  add more custom validation to the phone number form field
      // the regex is checking whether a given string is not a valid 10-digit number, after removing all non-digit characters.
      if (
        field?.name === "phone" &&
        data[field?.name] &&
        !/^\d{10}$/.test((data[field.name] as string).replace(/\D/g, ""))
      ) {
        isValid = false;

        if (!firstInvalidField) {
          firstInvalidField = field?.name;
        }
      }

      // add custom validation to the email form field
      if (
        field?.name === "email" &&
        data[field?.name] &&
        !/^\S+@\S+\.\S+$/.test(data[field.name] as string)
      ) {
        isValid = false;

        if (!firstInvalidField) {
          firstInvalidField = field?.name;
        }
      }
    }); // end of loop

    return { isValid, firstInvalidField };
  };

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    moveToNextSection();

   

    setIsSubmitting(true);

    try {
      const res = await createStaff(data as Record<string, string>);

      setToasterData({
        open: true,
        message: res?.message,
        severity: res?.severity,
      });

      if (res?.severity === "success") {
        clearData();
        // resetting the true state of validation in the store for personal and professional section
        resetValidation();
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
    } finally {
    setActiveSection("personal")
      setIsSubmitting(false);
     
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 font-poppins bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <Back />
        <StaffFormHeader />

        {/* Form Container */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {/* Form Tabs Navigation */}
          <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveSection("personal")}
              className={`flex items-center px-6 py-4 focus:outline-none transition-colors duration-200 whitespace-nowrap ${
                activeSection === "personal"
                  ? "text-[#E26300] border-b-2 border-[#E26300]"
                  : "text-[#2E2E2E] hover:text-[#1A1A1A] hover:bg-gray-50"
              }`}
            >
              <FiUser className="h-5 w-5 mr-2" />
              Personal Information
            </button>
          
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-10">
            {/* Personal Information Fields */}
            <PersonalFormSection />

           

            {/* Form Navigation and Submit */}
            <div
              className={`${
                activeSection === "personal"
                  ? "float-end mb-4"
                  : "mt-10 pt-6 border-t"
              } border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4`}
            >
        

              {/* only show the add trainer option when the user gets to professional section */}
               
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-3 sm:w-auto px-8 py-3 rounded-md bg-[#E26300] hover:bg-[#D25200] text-white font-medium shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <FiLoader className="animate-spin h-5 w-5" />
                      Adding Staff...
                    </>
                  ) : (
                    <>
                      <FiSave className="h-5 w-5" />
                      Add Staff
                    </>
                  )}
                </button>
            
            </div>
          </form>
        </div>

        {/* Help Tips Card */}
        <AddStaffHelpCard />
      </div>
    </div>
  );
};

export default AddStaffForm;
