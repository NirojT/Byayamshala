import { defaultNepaliDate, PrivateRoute } from "@/global/config";
import { useGlobalStore } from "@/global/store";
import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import "@zener/nepali-datepicker-react/index.css";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IVisitorDetails } from "../../../list/gymoperatiions/visitors/interface";
import { useMemberFormFields } from "./component/member-form-fields";
import MemberFormModal from "./component/member-form-modal";
import { useAddMemberFormStore } from "./store";
import FormHeader from "./sections/form_components/form-header";
import FormTabNavigation from "./sections/form_components/form-tabs-nav";
import PersonalInfo from "./sections/personal-info";
import Membership from "./sections/membership";
import { Download } from "lucide-react";
import Back from "@/global/components/back/back";
import { AddMemberFormHelper } from "./helper";

const AddMemberForm = () => {
  //hooks
  const { setToasterData, scrollPosition } = useGlobalStore();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  const visitor: IVisitorDetails = state?.visitor;

  const {
    activeSection,
    setActiveSection,
    data,
    setData,
    clearData,
    setIsModalOpen,
    isModalOpen,
    isExistingMember,
    setIsExistingMember,
    resetValidation,
    setValidationAttempted,
  } = useAddMemberFormStore();

  const fields = useMemberFormFields(isExistingMember);

  // Group fields by category for better organization
  const personalFields = fields.filter(
    (field) =>
      ["fullName", "email", "phone", "address", "emergencyContact"].includes(
        field.name
      ) && !field.hidden
  );

  const membershipFields = fields.filter(
    (field) =>
      [
        "planId",
        "shiftType",
        "joiningDate",
        "paymentMethod",
        "cardNumber",
        "remarks",
      ].includes(field.name) && !field.hidden
  );

  const handleDateChange = (e: NepaliDate | null, name: string) => {
    setData(name, (e as NepaliDate)?.toString());
  };

  //helper class

  const formHelper = useMemo(() => new AddMemberFormHelper(), []);

  const validatePersonalSection = () =>
    formHelper.validateSection(personalFields, data);

  const validateMembershipSection = () =>
    formHelper.validateSection(membershipFields, data);

  const moveToNextSection = () => {
    formHelper.handleSectionTransition(
      activeSection,
      validatePersonalSection,
      validateMembershipSection,
      setToasterData,
      setActiveSection,
      setValidationAttempted,
      setIsModalOpen
    );
  };

  useEffect(() => {
    if (visitor) {
      setData("fullName", visitor?.fullName);
      setData("phone", visitor?.phone);
      setData("address", visitor?.address);
      if (visitor?.email) {
        setData("email", visitor?.email);
      }
    }
  }, [visitor]);

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 px-4 sm:px-6 font-poppins text-[#2E2E2E]">
      {/* Progress Bar */}
      <div className="mb-6 bg-gray-200 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-[#1A1A1A] h-full transition-all duration-300 ease-out"
          style={{
            width:
              activeSection === "personal"
                ? "33.3%"
                : activeSection === "membership"
                ? "100%"
                : "100%",
          }}
        ></div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* form header */}
        <FormHeader visitor={visitor} />

        <div className="flex items-center justify-between">
          <Back />
          <button
            onClick={() => navigate(`/${PrivateRoute}/bulk-import-members`)}
            className="text-[#1A1A1A] border p-2 rounded-lg cursor-pointer text-lg font-medium mb-4 flex items-center gap-2 hover:underline hover:text-[#E26300]"
          >
            <Download />
            Bulk Import
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Form Tabs Navigation */}
          <FormTabNavigation />

          {/* Form Content */}
          <div className="p-6 sm:p-10">
            {/* Membership Type Selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between bg-[#FAFAFA] rounded-lg p-4 border border-gray-200">
                <div className="flex items-center">
                  <div
                    className={`w-12 h-10 rounded-full flex items-center justify-center ${
                      isExistingMember
                        ? "bg-gray-100 text-[#1A1A1A]"
                        : "bg-gray-100 text-[#E26300]"
                    }`}
                  >
                    {isExistingMember ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-[#2E2E2E] font-medium">
                      Membership Type
                    </h3>
                    <p className="text-sm text-gray-500">
                      {isExistingMember
                        ? "Renew or update an existing member's details"
                        : "Register a completely new member"}
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isExistingMember}
                    onChange={() => setIsExistingMember(!isExistingMember)}
                    className="sr-only peer"
                  />
                  <div
                    className="relative w-11 md:w-12 h-6 bg-gray-300 rounded-full peer 
                      peer-focus:ring-1 peer-focus:ring-[#1A1A1A]
                      peer-checked:bg-[#1A1A1A]
                      after:content-[''] 
                      after:absolute 
                      after:top-[2px] 
                      after:left-[2px] 
                      after:bg-white 
                      after:border-gray-300 
                      after:border 
                      after:rounded-full 
                      after:h-5 
                      after:w-5 
                      after:transition-all
                      peer-checked:after:translate-x-full
                      peer-checked:after:border-white"
                  ></div>
                  <span className="ms-3 text-sm font-medium text-[#2E2E2E]">
                    {isExistingMember ? "Existing Member" : "New Member"}
                  </span>
                </label>
              </div>

              {/* Existing Member Date Picker */}
              {isExistingMember && (
                <div className="mt-4 p-5 bg-gray-50 border border-gray-200 rounded-lg animate-fadeIn">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <label className="block text-[#2E2E2E] font-medium mb-2">
                        Current End Date
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </span>
                        <NepaliDatePicker
                          value={defaultNepaliDate}
                          placeholder="Select end date"
                          onChange={(e) =>
                            handleDateChange(e, "existingEndDate")
                          }
                          className="w-full pl-10 pr-3 py-3 bg-white text-[#2E2E2E] border border-gray-300 rounded-md focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A]"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-100 p-4 rounded-md border border-gray-200">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-[#1A1A1A] mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-[#2E2E2E] text-sm">
                            This will calculate remaining days from the existing
                            membership
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* personal details fields */}
            <PersonalInfo />

            {/* Membership Fields */}
            <Membership />

            {/* Form Navigation and Submit */}
            <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex gap-2">
                {activeSection !== "personal" && (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSection(
                        activeSection === "membership"
                          ? "personal"
                          : "membership"
                      )
                    }
                    className="px-6 py-2 rounded-md border border-gray-300 text-[#2E2E2E] hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] flex items-center gap-2 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Previous
                  </button>
                )}

                {activeSection !== "membership" && (
                  <button
                    type="button"
                    onClick={moveToNextSection}
                    className="px-6 py-2 rounded-md border border-[#1A1A1A] bg-white text-[#2E2E2E] hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] flex items-center gap-2 transition-colors"
                  >
                    Next
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )}
              </div>

              <div className="flex gap-5">
                <button
                  onClick={() => {
                    clearData();
                    resetValidation();
                  }}
                  className="w-full sm:w-auto px-8 py-3 rounded-md border border-gray-300 bg-white text-[#2E2E2E] font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] transition-all duration-200 flex items-center justify-center gap-2"
                  type="button"
                >
                  Clear
                </button>

                <button
                  onClick={() => {
                    moveToNextSection();
                  }}
                  className="w-full sm:w-auto px-8 py-3 rounded-md bg-[#E26300] text-white font-medium shadow-sm hover:bg-[#D25200] focus:outline-none focus:ring-1 focus:ring-[#E26300] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {visitor ? "Transform to Member" : "Review Membership"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Help Card */}
        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg flex items-start gap-4">
          <div className="bg-[#FAFAFA] p-3 rounded-md border border-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#1A1A1A]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-lg font-medium text-[#2E2E2E] mb-1">
              Need Help?
            </h4>
            <p className="text-gray-600 text-sm">
              All fields marked with an asterisk (*) are mandatory. If you're
              converting a visitor to a member, some fields will be pre-filled
              with their information. For any assistance, please contact the
              admin.
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && <MemberFormModal />}
    </div>
  );
};

export default AddMemberForm;
