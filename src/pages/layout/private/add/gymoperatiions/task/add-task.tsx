import { useEffect, useMemo, useState } from "react";
import { useGlobalStore } from "../../../../../../global/store";
import { useAddTaskFormStore } from "./store";
import "@zener/nepali-datepicker-react/index.css";
import { FiCheck, FiUserCheck, FiInfo, FiLoader } from "react-icons/fi";
import TaskHeaderForm from "./helper-components/task-header-form";
import Schedule from "./helper-components/schedule";
 
import Back from "@/global/components/back/back";
import { useListMemberStore } from "../../../list/gymoperatiions/members/store";
import Select from "react-select";
import { MemberSearchSelect } from "./helper-components/add-task-member-select";
import { zenSelectStyles } from "../../finance/components/zenstyles";
import { TaskHelper } from "./helper";
import { useListStaffStore } from "../../../list/gymoperatiions/staff/store";
import { StaffType } from "@/global/components/enums/enums";

const AddTask = () => {
  // stores
  const { setToasterData } = useGlobalStore();
  const { getStaffs, staffs } = useListStaffStore();
  const {
    data,
    setData,
    clearData,
    createTask,
    setSelectedMember,
    setSelectedStaff,
    selectedStaff,
    selectedMember,
    setIsSubmitting,
    isSubmitting,
    errors,
    clearErrors,
    setErrors,
  } = useAddTaskFormStore();
  const {
    searchByName,
    name,
    setName,
    members: searchMembers,
  } = useListMemberStore();

  // Local state for member search value
  const [memberSearchValue, setMemberSearchValue] = useState(name);

  // ... inside your AddTask
  const helper = useMemo(() => new TaskHelper(), []);
  const handleConfirm = async () => {
    await helper.saveTask(
      data,
      createTask,
      clearData,
   
      setIsSubmitting,
      setToasterData,
      setSelectedStaff,
      setSelectedMember,
      setName,
      setMemberSearchValue,
      setErrors,
      clearErrors
    );
  };

  useEffect(() => {
    getStaffs();
    // Remove getMembers(); -- don't use addtask store member fetching
    // Instead, rely on member search only
  }, [getStaffs]);

  useEffect(() => {
    if (!data?.memberId) return;

    const member = searchMembers?.find((m) => m.id === data?.memberId);
    if (!member || !member?.memberShips?.length) return;

    const startDate = member?.memberShips[0]?.membershipStartDate || "";
    const endDate = member?.memberShips[0]?.membershipEndDate || "";

    setData({
      ...data,
      startDate: startDate,
      endDate: endDate,
    });
  }, [data?.memberId, searchMembers]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 font-poppins bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto">
        <Back />
        {/* Header Card */}
        <TaskHeaderForm />

        {/* Main Form Card */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="p-8">
                <div className="space-y-8">
                  {/* Staff & Member Selection */}
                  <div className="space-y-6">
                    <div className="flex items-center mb-6">
                      <div className="h-px bg-gray-200 flex-grow"></div>
                      <h3 className="mx-4 text-lg text-[#2E2E2E] font-medium">
                        Participants
                      </h3>
                      <div className="h-px bg-gray-200 flex-grow"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Staff Selection */}
                      <div>
                        <label className="text-[#2E2E2E] font-medium mb-2 flex items-center">
                          Select Staff{" "}
                          <span className="text-[#E26300] ml-1">*</span>
                        </label>
                        <div className="relative mt-1">
                          {/* Still using react-select for staff */}
                          {/* If you want to replace for Staff as well, can use similar custom as MemberSearchSelect */}
                          <Select
                            styles={zenSelectStyles}
                            options={staffs?.filter((staff) => staff?.staffType ===  StaffType.TRAINER) || []}
                            className="w-full"
                            value={selectedStaff}
                            getOptionLabel={(staff) =>
                              `${staff?.fullName || "select staff"}`
                            }
                            getOptionValue={(staff) =>
                              staff?.id?.toString()
                            }
                            onChange={(selectedOption) => {
                              if (selectedOption) {
                                setSelectedStaff(selectedOption);
                                setData({
                                  ...data,
                                  staffId: selectedOption?.id,
                                });
                              }
                            }}
                            placeholder="Choose a staff..."
                            noOptionsMessage={() => "No staffs available"}
                          />
                          {selectedStaff?.fullName &&
                            errors.selectedStaffError && (
                              <p className="text-red-500 text-sm mt-1 animate-fadeIn">
                                {errors.selectedStaffError}
                              </p>
                            )}
                        </div>
                      </div>

                      {/* Member Selection (with search) */}
                      <div>
                        <label className="text-[#2E2E2E] font-medium mb-2 flex items-center">
                          Select Member{" "}
                          <span className="text-[#E26300] ml-1">*</span>
                        </label>
                        <div className="relative mt-1">
                          <MemberSearchSelect
                            members={searchMembers}
                            value={selectedMember}
                            onChange={(member) => {
                              setSelectedMember(member);
                              setData({
                                ...data,
                                memberId: member?.id,
                              });
                              setMemberSearchValue(member?.fullName);
                            }}
                            error={errors.selectedMemberError}
                            placeholder="Search and select member?..."
                            searchFunction={searchByName}
                            searchValue={memberSearchValue}
                            setSearchValue={(val) => {
                              setMemberSearchValue(val);
                              setName(val);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Schedule */}
                  <Schedule />

                  {/* Submit Button */}
                  <div className="pt-6 border-t border-gray-200">
                    <button
                      onClick={handleConfirm}
                      disabled={isSubmitting}
                      className={`w-full px-8 py-3 rounded-md bg-[#E26300] hover:bg-[#D25200] text-white font-medium shadow-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <FiLoader className="animate-spin h-5 w-5" />
                          Assigning...
                        </>
                      ) : (
                        <>
                          <FiCheck className="h-5 w-5" />
                          Assign Staff to Member
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview & Info Section */}
          <div className="lg:col-span-2">
            <div className="sticky top-6 space-y-6">
              {/* Assignment Preview */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <h3 className="text-[#2E2E2E] font-medium">
                    Assignment Preview
                  </h3>
                </div>

                <div className="p-6">
                  {selectedStaff && selectedMember ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-100 h-12 w-12 rounded-full flex items-center justify-center text-[#E26300] text-xl font-medium">
                          {selectedStaff?.fullName?.charAt(0).toUpperCase() ||
                            "T"}
                        </div>
                        <div>
                          <h4 className="text-[#2E2E2E] font-medium">
                            {selectedStaff?.fullName}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-gray-500 my-2">
                        <div className="h-px bg-gray-200 flex-grow"></div>
                        <span className="px-2">will train</span>
                        <div className="h-px bg-gray-200 flex-grow"></div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="bg-gray-100 h-12 w-12 rounded-full flex items-center justify-center text-[#1A1A1A] text-xl font-medium">
                          {selectedMember.fullName?.charAt(0)?.toUpperCase() ||
                            "M"}
                        </div>
                        <div>
                          <h4 className="text-[#2E2E2E] font-medium">
                            {selectedMember?.fullName as string}
                          </h4>
                          <p className="text-gray-500 text-sm">
                            {selectedMember?.phone as string}
                          </p>
                        </div>
                      </div>

                      {data?.startDate &&
                        data?.endDate &&
                        data?.sessionDuration && (
                          <div className="mt-6 bg-gray-50 rounded-md p-4 border border-gray-200">
                            <h5 className="text-[#2E2E2E] text-sm font-medium mb-3">
                              Schedule Details:
                            </h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-500">
                                  Start Date:
                                </span>
                                <span className="text-[#2E2E2E]">
                                  {data?.startDate}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">End Date:</span>
                                <span className="text-[#2E2E2E]">
                                  {data?.endDate}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">
                                  Session Duration:
                                </span>
                                <span className="text-[#2E2E2E]">
                                  {data?.sessionDuration} minutes
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                      {data?.notes && (
                        <div className="mt-4 text-sm">
                          <h5 className="text-[#2E2E2E] font-medium mb-1">
                            Notes:
                          </h5>
                          <p className="text-gray-600 italic bg-gray-50 p-3 rounded-md border-l-2 border-[#E26300]">
                            "{data?.notes}"
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="bg-gray-100 p-4 rounded-full mb-3">
                        <FiUserCheck className="h-8 w-8 text-[#1A1A1A] opacity-70" />
                      </div>
                      <p className="text-gray-500">
                        Select a staff and member to see the preview
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Tips Card */}
              <div className="bg-gray-50 border border-gray-200 rounded-md shadow-sm p-6">
                <h4 className="text-[#2E2E2E] font-medium mb-3 flex items-center gap-2">
                  <FiInfo className="h-5 w-5 text-[#1A1A1A]" />
                  Tips
                </h4>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="text-[#1A1A1A] mr-2">•</span>
                    <span>
                      Schedule consistent sessions to help members achieve their
                      fitness goals.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1A1A1A] mr-2">•</span>
                    <span>
                      Match staffs with clients based on specialization and
                      goals.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1A1A1A] mr-2">•</span>
                    <span>
                      Include clear notes about any specific requirements or
                      focus areas.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
