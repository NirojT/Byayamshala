import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import SuperPlanFormModal from "./component/super-plan-form-modal";
import { ISuperPlansDetails } from "./interface";
import { useSuperPlansStore } from "./store";
import { useIsDesktop } from "@/global/desktop-checker";

const SuperPlans: React.FC = () => {
  const {
    getSuperPlans,
    superPlans,
    setOpen,
    open,
    setId,
    setData,
    data,
    clearData,
  } = useSuperPlansStore();

  const handleAdd = () => {
    setId(0); //force 0
    setOpen(true);
    clearData();
  };
  const handleEdit = (plan: ISuperPlansDetails) => {
    setId(plan?.id); //set id
    setOpen(true);

    const features = plan.features?.join(", ");

    setData({
      ...data,
      type: plan.type,
      durationInDays: plan.durationInDays,
      price: plan.price,
      features: features,
    });
  };
  const isDesktop = useIsDesktop(640); // 640px matches Tailwind 'sm'
  useEffect(() => {
    getSuperPlans();
  }, [getSuperPlans]);

  //  function to handle toggle of plans data

  return (
    <div className="min-h-screen">
      <Box sx={{ padding: 2 }}>
        <Typography
          variant="h6"
          className="text-white capitalize relative"
          gutterBottom
        >
          Plans List
        </Typography>
        <div
          className="text-white capitalize w-full flex justify-end"
          onClick={() => handleAdd()}
        >
          Add
        </div>
        {/* Table for desktop */}

        {isDesktop ? (
          <div className=" border border-gray-200 rounded-lg shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-slate-200 text-gray-800 sticky top-0 z-20">
                  {/* bg-gradient-to-r from-slate-700 to-slate-600 */}
                  <tr className=" text-white text-left">
                    <th className="p-3 text-sm font-semibold">SN</th>
                    <th className="p-3 text-sm font-semibold">plan type</th>
                    <th className="p-3 text-sm font-semibold">
                      durationInDays
                    </th>
                    <th className="p-3 text-sm font-semibold">price</th>
                    <th className="p-3 text-sm font-semibold">features</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(superPlans) && superPlans?.length > 0 ? (
                    superPlans.map((data, index: number) => (
                      <tr
                        onClick={() => handleEdit(data)}
                        key={data?.id ?? index}
                        className="hover:bg-gray-100 hover:text-black  border-t transition-colors duration-200"
                      >
                        <td className="p-3 text-center text-sm">{index + 1}</td>
                        <td className="p-3 text-sm">{data?.type}</td>
                        <td className="p-3 text-sm">{data?.durationInDays}</td>
                        <td className="p-3 text-sm">{data?.price}</td>
                        <td className="p-3 text-sm">
                          {data?.features?.join(", ")}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="flex justify-center items-center text-center">
                      <td colSpan={2} className="p-6  text-red-500 font-">
                        No plans are added
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* pagination ends here */}
            </div>
          </div>
        ) : (
          <div className=" flex flex-col gap-4 mt-4">
            {/* Mobile card view */}
            {Array.isArray(superPlans) && superPlans.length > 0 ? (
              superPlans.map((plan, idx) => (
                <div
                  key={plan.id ?? idx}
                  className="bg-white rounded-lg shadow p-4 flex flex-col"
                  onClick={() => handleEdit(plan)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[#E26300] text-base capitalize">
                      {plan.type}
                    </span>
                    <span className="text-xs text-gray-400">#{idx + 1}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <div className="flex-1">
                      <span className="block text-gray-500">Duration</span>
                      <span className="font-medium">
                        {plan.durationInDays} days
                      </span>
                    </div>
                    <div className="flex-1">
                      <span className="block text-gray-500">Price</span>
                      <span className="font-medium">Rs. {plan.price}</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="block text-gray-500">Features</span>
                    <span className="block font-medium">
                      {plan.features?.join(", ")}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-6 text-red-500 bg-white rounded-lg shadow">
                No plans are added
              </div>
            )}
          </div>
        )}
      </Box>
      {open && <SuperPlanFormModal />}
    </div>
  );
};

export default SuperPlans;
