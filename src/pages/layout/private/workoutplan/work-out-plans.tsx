import { useEffect, useState } from "react";
import {
  PlusCircle,
  Trash2,
  Dumbbell,
  ChevronDown,
  ChevronUp,
  Pencil,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWorkOutPlanStore } from "./store";
import { IWorkOutDetails } from "./interface";
import WorkOutDeleteModal from "./component/workout-delete-modal";
import Back from "@/global/components/back/back";

const WorkOutPlans = () => {
  const navigate = useNavigate();
  const {
    getWorkOuts,
    workOutPlans,
    openDelete,
    setOpenDelete,
    setDeleteId,
    delteId,
  } = useWorkOutPlanStore();

  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    getWorkOuts();
  }, [getWorkOuts]);

  const handleAddPlan = () => {
    navigate("/tenant/workoutplan/form");
  };

  const handleEdit = (plan: IWorkOutDetails) => {
    navigate(`/tenant/workoutplan/form`, { state: plan });
  };
  const handleDelete = async (planId: number) => {
    setOpenDelete(true);
    setDeleteId(planId);
  };

  const handleExpand = (planId: string | number) => {
    setExpanded((prev) => ({
      ...prev,
      [planId]: !prev[planId],
    }));
  };

  return (
    <div className="min-h-screen py-8 px-2 bg-gradient-to-br from-blue-50 via-indigo-50 to-pink-50 text-[#2E2E2E] font-poppins">
      <Back/>
      {/* Top Bar: Responsive */}
      <div className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="flex items-center gap-3 select-none bg-white rounded-xl shadow px-4 py-2 border border-blue-100 text-2xl sm:text-3xl font-bold w-full sm:w-auto justify-center sm:justify-start">
          <Dumbbell className="text-blue-600" size={28} />
          Workout Plans
        </h1>
        <button
          onClick={handleAddPlan}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold text-base shadow-lg hover:from-indigo-500 hover:to-blue-600 transition"
        >
          <PlusCircle size={20} /> Add Plan
        </button>
      </div>

      {/* List of Plans */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {workOutPlans?.length === 0 && (
          <div className="col-span-full text-gray-400 text-center py-20 text-lg">
            <span>No workout plans found.</span>
          </div>
        )}
        {workOutPlans?.map((plan) => {
          const isExpanded = expanded[plan?.id];
          const workouts = plan?.workOutTitleListRes || [];
          return (
            <div
              key={plan?.id}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 flex flex-col relative group transition hover:shadow-2xl hover:-translate-y-1"
              style={{ minHeight: 200 }}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-3 gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <Dumbbell className="text-blue-600 drop-shadow" size={20} />
                  <h2 className="font-bold text-lg text-[#1A1A1A] truncate max-w-[130px] sm:max-w-[170px]">
                    {plan?.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(plan)}
                    title="Edit Plan"
                    className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition shadow hover:shadow-md"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(plan?.id)}
                    title="Delete Plan"
                    className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition shadow hover:shadow-md"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Dumbbell banner */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex -space-x-4">
                  {workouts?.slice(0, 3).map((workout, idx) => (
                    <div
                      key={workout?.id || idx}
                      className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow bg-gray-100 flex items-center justify-center"
                      style={{
                        zIndex: workouts?.length - idx,
                      }}
                    >
                      {workout?.imageName ? (
                        <img
                          src={workout?.imageName}
                          alt={workout?.subTitle}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <Dumbbell className="text-gray-300" size={18} />
                      )}
                    </div>
                  ))}
                  {workouts?.length === 0 && (
                    <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow bg-gray-100 flex items-center justify-center">
                      <Dumbbell className="text-gray-200" size={18} />
                    </div>
                  )}
                </div>
              </div>

              {/* Expanded state */}
              {isExpanded && (
                <div className="rounded-lg bg-blue-50 border border-blue-100 shadow-inner mt-2 mb-4 px-2 py-2 max-h-44 overflow-auto transition-all animate-fadeIn">
                  <h3 className="text-blue-700 font-semibold text-xs mb-2 pl-1">
                    Workouts in this plan:
                  </h3>
                  {workouts?.length === 0 ? (
                    <div className="text-gray-400 text-xs pl-1">
                      No workouts added to this plan.
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {workouts?.map((workout, idx) => (
                        <li
                          key={workout?.id || idx}
                          className="flex items-center gap-2"
                        >
                          <div className="w-8 h-8 rounded-md overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
                            {workout?.imageName ? (
                              <img
                                src={workout?.imageName}
                                alt={workout?.subTitle}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <Dumbbell className="text-gray-300" size={15} />
                            )}
                          </div>
                          <span className="text-gray-800 text-xs font-medium truncate">
                            {workout?.subTitle}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Expand/Collapse button only if workouts > 0 */}
              {workouts?.length > 0 && (
                <div className="mt-auto flex justify-end">
                  <button
                    className="flex items-center gap-1 text-blue-600 hover:underline text-sm font-semibold transition"
                    onClick={() => handleExpand(plan?.id)}
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp size={14} /> Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown size={14} /> View More
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {openDelete && delteId && <WorkOutDeleteModal />}
    </div>
  );
};

export default WorkOutPlans;
