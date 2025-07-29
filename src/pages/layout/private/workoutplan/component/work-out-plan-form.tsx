import React, { useEffect } from "react";
import {
  Dumbbell,
  ClipboardList,
  Image as ImageIcon,
  X,
  Pencil,
} from "lucide-react";

import { useGlobalStore } from "@/global/store";
import { useWorkOutPlanStore } from "../store";
import { IWorkOutDetails, IWorkOutTitleListData } from "../interface";
import { useLocation, useNavigate } from "react-router-dom";

const WorkOutPlanForm = () => {
  // hooks
  const location = useLocation();
  const navigate = useNavigate();
  const editData: IWorkOutDetails = location.state;

  // Zustand store actions
  const { data, setData, clearData, create, update } = useWorkOutPlanStore();
  const { setToasterData } = useGlobalStore();

  // Set edit data into the store if present (only on mount or when editData changes)
  useEffect(() => {
    if (editData) {
      // For edit: if the payload's workout list uses a different key, map it to workOutTitleListReqs
      const reqs = editData?.workOutTitleListRes?.map((item) => ({
        id: item?.id,
        imageName: item?.imageName,
        subTitle: item?.subTitle,
        image: null, // Image is not included in the edit payload
      })) as IWorkOutTitleListData[];
      setData({
        title: editData?.title,
        workOutTitleListReqs: reqs,
      });
    }
    // If not edit, ensure form is clear
    else {
      clearData();
    }
    // eslint-disable-next-line
  }, [editData]);

  // Validate form
  function validate(): { title?: string; workouts?: string } {
    const errors: { title?: string; workouts?: string } = {};
    if (!data?.title.trim()) errors.title = "Title is required";
    if (
      !Array.isArray(data?.workOutTitleListReqs) ||
      data?.workOutTitleListReqs.length === 0 ||
      data?.workOutTitleListReqs.some(
        (w) => !w.subTitle.trim() || (!w.image && !editData)
      )
      // In edit mode, allow image to be null (existing images are preserved unless changed)
    ) {
      errors.workouts =
        "Each workout must have a subtitle and image. At least one workout is required.";
    }
    return errors;
  }

  // Update a workout entry in Zustand store directly
  function handleWorkoutChange(
    idx: number,
    field: keyof IWorkOutTitleListData,
    value: string | File | null
  ) {
    const updated = [...data.workOutTitleListReqs];
    updated[idx] = { ...updated[idx], [field]: value };
    setData({ ...data, workOutTitleListReqs: updated });
  }

  // Add a new empty workout to Zustand store's list
  function addWorkout() {
    setData({
      ...data,
      workOutTitleListReqs: [
        ...data.workOutTitleListReqs,
        { subTitle: "", image: null, id: 0, imageName: "" },
      ],
    });
  }

  // Remove a workout by index
  function removeWorkout(idx: number) {
    if (data?.workOutTitleListReqs.length <= 1) return; // Always keep at least one
    setData({
      ...data,
      workOutTitleListReqs: data?.workOutTitleListReqs.filter(
        (_, i) => i !== idx
      ),
    });
  }

  // Handle form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setToasterData({
        message: errors.title || errors.workouts || "Please fix form errors",
        severity: "error",
        open: true,
      });
      return;
    }
    let res;

    if (editData) {
      res = await update(editData?.id);
    } else {
      res = await create();
    }

    console.log(res);
    setToasterData({
      message: res.message,
      severity: res.severity,
      open: true,
    });
    // Optionally reset form on success
    if (res.severity === "success") {
      clearData();
      navigate(-1); // Go back to list after create/update
    }
  }

  return (
    <div className="min-h-screen py-10 px-4 bg-[#FAFAFA] text-[#2E2E2E] font-poppins">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden font-poppins">
          <div className="p-5 text-center">
            <h1 className="text-xl font-semibold text-[#1A1A1A] mb-2 flex items-center justify-center">
              <Dumbbell className="mr-2 text-blue-600" size={20} />
              {editData ? (
                <>
                  Update Workout Plan
                  <Pencil className="ml-2 text-indigo-500" size={18} />
                </>
              ) : (
                "Create Workout Plan"
              )}
            </h1>
            <p className="text-[#2E2E2E] text-sm">
              Input plan title and add workouts (subtitle &amp; image)
            </p>
          </div>
          <div className="h-0.5 bg-blue-600/20 w-full"></div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-7"
              autoComplete="off"
            >
              {/* Plan Title */}
              <div className="flex flex-col">
                <label className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center">
                  <ClipboardList size={18} className="text-blue-600" />
                  <span className="ml-2">Plan Title</span>
                  <span className="text-blue-600 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={data?.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-blue-600 transition-colors"
                  placeholder="Enter plan title (e.g. Summer Shred 2025)"
                  required
                />
              </div>

              {/* Workouts Section */}
              <div>
                <label className="text-[#1A1A1A] text-sm font-medium mb-4 flex items-center">
                  <Dumbbell size={18} className="text-blue-600" />
                  <span className="ml-2">Workouts</span>
                  <span className="text-blue-600 ml-1">*</span>
                </label>
                <div className="space-y-6">
                  {data?.workOutTitleListReqs.map((workout, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col md:flex-row items-center gap-4 p-4 bg-[#F4F8FB] rounded-lg border border-gray-200 shadow-inner transition group"
                    >
                      {/* Subtitle Field */}
                      <div className="flex-1 w-full">
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-lg bg-white text-[#2E2E2E] placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-blue-200 border-b-2 border-b-gray-200 focus:border-b-blue-600 transition"
                          placeholder={`Workout Subtitle #${
                            idx + 1
                          } (e.g. Push Ups)`}
                          value={workout.subTitle}
                          onChange={(e) =>
                            handleWorkoutChange(idx, "subTitle", e.target.value)
                          }
                          required
                        />
                      </div>
                      {/* Image Upload */}
                      <div className="flex flex-col items-center gap-2">
                        <label className="cursor-pointer flex flex-col items-center">
                          <span className="text-gray-600 text-xs mb-1 flex items-center">
                            <ImageIcon size={16} className="mr-1" />

                            {workout?.image ? "Change Image" : "Upload Image"}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleWorkoutChange(
                                idx,
                                "image",
                                e.target.files?.[0] ?? null
                              )
                            }
                          />
                          <div className="w-16 h-16 bg-white border border-gray-200 rounded-xl flex items-center justify-center overflow-hidden transition group-hover:scale-105">
                            {workout?.imageName ? (
                              <>
                                <div className="w-16 h-16 bg-white border border-gray-200 rounded-xl flex items-center justify-center overflow-hidden transition group-hover:scale-105">
                                  <img
                                    src={workout?.imageName}
                                    alt={`Preview ${idx}`}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                              </>
                            ) : (
                              <>
                                {workout.image ? (
                                  <img
                                    src={URL.createObjectURL(workout.image)}
                                    alt={`Preview ${idx}`}
                                    className="object-cover w-full h-full"
                                  />
                                ) : (
                                  <span className="text-gray-400 text-3xl">
                                    +
                                  </span>
                                )}
                              </>
                            )}
                          </div>
                        </label>
                      </div>
                      {/* Remove workout button */}
                      <button
                        type="button"
                        className={`ml-2 px-3 py-2 rounded-lg flex items-center bg-[#f44336]/10 text-[#f44336] border border-[#f44336]/20 hover:bg-[#f44336]/20 transition ${
                          data?.workOutTitleListReqs.length === 1
                            ? "opacity-30 cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() => removeWorkout(idx)}
                        disabled={data?.workOutTitleListReqs.length === 1}
                        tabIndex={-1}
                        title="Remove workout"
                      >
                        <X size={16} className="mr-1" />
                        Remove
                      </button>
                    </div>
                  ))}
                  {/* Add workout button */}
                  <button
                    type="button"
                    className="w-full py-2 mt-2 rounded-lg  bg-[#E26300] text-white hover:bg-orange-400 font-bold text-md shadow   transition"
                    onClick={addWorkout}
                  >
                    + Add Workout
                  </button>
                </div>
              </div>

              {/* Form actions */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={clearData}
                  className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#FAFAFA] text-[#2E2E2E] border border-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#E26300] text-white hover:bg-orange-400 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>{editData ? "Update Plan" : "Create Plan"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkOutPlanForm;
