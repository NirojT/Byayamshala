import { useEffect, useState } from "react";
import { useGlobalStore } from "../../../../../../../global/store";
import { useListMemberStore } from "../../../../list/gymoperatiions/members/store";
import { useListPlansStore } from "../../../../list/gymoperatiions/plans/store";
import { usePlansOperationFormStore } from "../../../store";

import { ImCross } from "react-icons/im";
import { PaymentMode } from "../../../../../../../global/components/enums/enums";
import { useRenewPlanStore } from "./renew-plan-store";

const RenewPlan = () => {
  // stores
  const { isOpen, setIsOpen } = useRenewPlanStore();
  const { setToasterData } = useGlobalStore();
  const { getPlans } = useListPlansStore();
  const { members, memberShips } = useListMemberStore();
  const { data, setData, clearData, renew, searchedMember } =
    usePlansOperationFormStore();

  const handleConfirm = async () => {
    // validate

    if (!data.memberId) {
      setToasterData({
        open: true,
        message: "Please select a member",
        severity: "error",
      });
      return;
    }
    if (!data.paymentMode) {
      setToasterData({
        open: true,
        message: "Please select a Payment Mode",
        severity: "error",
      });
      return;
    }
    const res = await renew( );
    setToasterData({
      open: true,
      message: res.message,
      severity: res.severity,
    });
    if (res.severity === "success") {
      clearData();
    }
  };

  // State to track which plan's details are visible
  const [expandedPlanIndex, setExpandedPlanIndex] = useState<number | null>(
    null
  );

  const togglePlanDetails = (index: number) => {
    setExpandedPlanIndex(expandedPlanIndex === index ? null : index);
  };

  useEffect(() => {
    getPlans();
  }, [getPlans]);
  useEffect(() => {
    if (members) {
      setData({ ...data, memberId: searchedMember?.id });
    }
  }, [searchedMember]);

  return (
    <div>
      {/* for large screens */}
      {Object.keys(searchedMember).length > 0 ? (
        <div className="flex-col items-center justify-center mx-auto sm:p-6 rounded-lg shadow-lg text-white sm:border-none sm:border sm:border-gray-600">
          <div className="items-center w-full justify-between mb-5 mt-5 sm:flex hidden ">
            <h3 className="text-xl font-semibold text-gray-300 border-b border-gray-800 ">
              Plan History
            </h3>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                className="capitalize flex float-end  underline text-orange-500 hover:text-white hover:scale-110 transition-all duration-200"
              >
                {isOpen ? <ImCross /> : "Renew Plan"}
              </button>
            </div>
          </div>

          {/* it means member is there */}
          {searchedMember?.fullName && (
            <>
              {isOpen && (
                <div className="text-white w-96 ml-auto mr-auto">
                  <div className="text-center text-gray-300">
                    Full Name:{" "}
                    <span className="text-orange-500">
                      {searchedMember?.fullName}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mt-4 mb-2">
                      Payment Mode *
                    </label>
                    <select
                      className="p-3 bg-black text-gray-300 block w-full rounded-md focus:outline-none border border-gray-600 shadow-sm focus:border-[#E26003] focus:ring-[#E26003]"
                      onChange={(e) =>
                        setData({
                          ...data,
                          paymentMode: e?.target
                            .value as unknown as PaymentMode,
                        })
                      }
                    >
                      <option value="CASH">Cash</option>
                      <option value="ONLINE">ONLINE</option>
                      <option value="CHEQUE">CHEQUE</option>
                      <option value="CARD">Card</option>
                    </select>
                  </div>

                  {/* Assign Button */}
                  <button
                    onClick={handleConfirm}
                    className="w-96 mt-6 bg-[#E26003] text-white py-2 px-4 rounded-md focus:outline-none focus:ring-1 border border-gray-600 focus:border-[#E26003] focus:ring-[#E26003] "
                  >
                    Renew plans
                  </button>
                </div>
              )}

              <div>
                <div className="mt-10 text-center flex flex-col ">
                  <div className="items-baseline justify-center grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {memberShips?.map((plan, index) => (
                      <div
                        key={plan.id}
                        className={`${
                          plan.memberShipStatus === "ACTIVE"
                            ? "from-green-700 to-green-900"
                            : "from-red-700 to-red-900"
                        } bg-black rounded-lg border border-zinc-400 overflow-hidden hover:shadow-xl transition-all duration-200`}
                      >
                        {/* Card Header */}
                        <div className="relative">
                          <div
                            className={`${
                              plan.memberShipStatus === "ACTIVE"
                                ? "bg-green-700"
                                : "bg-red-800"
                            } p-4 flex flex-col items-center justify-between`}
                          >
                            <h4 className="font-medium text-lg text-white capitalize">
                              {plan.planName}
                            </h4>
                            <div className="mt-1">
                              <span
                                className={`text-xs px-2 py-0.5 rounded ${
                                  plan.memberShipStatus === "ACTIVE"
                                    ? "bg-[#153615] text-white"
                                    : "bg-[#020101] text-white"
                                }`}
                              >
                                {plan.memberShipStatus}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-4 space-y-3">
                          <div className="flex justify-between">
                            <div className="text-sm">
                              <p className="text-gray-400">Duration</p>
                              <p className="text-white font-medium">
                                {plan.durationInDays} days
                              </p>
                            </div>
                            <div className="text-sm text-right">
                              <p className="text-gray-400">Price</p>
                              <p className="text-green-300 font-medium">
                                रु {plan.price}
                              </p>
                            </div>
                            <div className="text-sm text-right flex flex-col items-center gap-1">
                              <p className="text-gray-400 font-medium">
                                Status
                              </p>
                              <div
                                className={`h-3 w-3 rounded-full ${
                                  plan.memberShipStatus === "ACTIVE"
                                    ? "bg-green-500"
                                    : "bg-red-600"
                                }`}
                              ></div>
                            </div>
                          </div>

                          <div className="h-[1px] bg-gray-800 w-full my-2"></div>

                          <div className="flex justify-between text-sm">
                            <div>
                              <p className="text-gray-400">Start Date</p>
                              <p className="text-white">
                                {new Date(
                                  plan.membershipStartDate
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-gray-400">End Date</p>
                              <p className="text-white">
                                {new Date(
                                  plan.membershipEndDate
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Card Footer with View Details */}
                        <div
                          onClick={() => togglePlanDetails(index)}
                          className="p-3 bg-[#111] border-t border-gray-800 text-center cursor-pointer hover:bg-[#1a1a1a] transition-colors duration-200"
                        >
                          <div className="flex items-center justify-center text-sm text-gray-300 gap-1">
                            <span>View Facilities</span>
                            {expandedPlanIndex === index ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="text-[#E26003]"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="text-[#E26003]"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                />
                              </svg>
                            )}
                          </div>
                        </div>

                        {/* Expanded Facilities Details */}
                        {expandedPlanIndex === index && (
                          <div className="bg-black p-4 border-t border-gray-800 animate-fadeIn">
                            <h5 className="font-medium text-white mb-2 text-sm flex items-center">
                              <span className="w-1 h-4 bg-[#E26003] mr-2 rounded-full"></span>
                              {""}
                              Included Facilities
                            </h5>
                            <div className="grid grid-cols-1 gap-2 mt-2">
                              {plan?.facilities.length > 0 ? (
                                plan.facilities.map((facility) => (
                                  <div
                                    key={facility.id}
                                    className="flex justify-between items-center bg-[#111] p-2 rounded border border-gray-800 text-sm"
                                  >
                                    <span className="text-white">
                                      {facility.facilityName}
                                    </span>
                                    <span className="text-green-300">
                                      रु {facility.price}
                                    </span>
                                  </div>
                                ))
                              ) : (
                                <p className="text-gray-500 text-sm italic">
                                  No facilities included
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="text-white text-center">
          Search a member to renew a plan
        </div>
      )}
    </div>
  );
};

export default RenewPlan;

{
  /* for smaller screens */
}
//   <div className="mt-10 text-center sm:hidden flex flex-col gap-4">
//   <div className="w-full">
//       <button
//           onClick={() => {
//               setIsOpen(!isOpen);
//           }}
//           className="capitalize flex float-end text-xl underline text-orange-500 hover:text-white hover:scale-110"
//       >
//           {isOpen ? <ImCross /> : "Renew Plan"}
//       </button>
//   </div>

//   {
//       searchedMember?.fullName && (
//           <>

//               {isOpen &&
//                   (
//                       <div className="text-white w-96 ml-auto mr-auto">
//                           <div className="text-center text-gray-300">Full Name:  <span className="text-orange-500">{searchedMember?.fullName}</span></div>
//                           <div>
//                               <label className="block text-sm font-medium text-white mt-4 mb-2">
//                                   Payment Mode *
//                               </label>
//                               <select
//                                   className="p-3 bg-black text-gray-300 block w-full rounded-md focus:outline-none border border-gray-600 shadow-sm focus:border-[#E26003] focus:ring-[#E26003]"
//                                   onChange={(e) =>
//                                       setData({
//                                           ...data,
//                                           PaymentMode: e?.target.value as unknown as PaymentMode,
//                                       })
//                                   }
//                               >
//                                   <option value="CASH">Cash</option>
//                                   <option value="ONLINE">ONLINE</option>
//                                   <option value="CHEQUE">CHEQUE</option>
//                                   <option value="CARD">Card</option>
//                               </select>
//                           </div>

//                           {/* Assign Button */}
//                           <button
//                               onClick={handleConfirm}
//                               className="w-96 mt-6 bg-[#E26003] text-white py-2 px-4 rounded-md focus:outline-none focus:ring-1 border border-gray-600 focus:border-[#E26003] focus:ring-[#E26003] "
//                           >
//                               Renew plans
//                           </button>
//                       </div>
//                   )}

//               <div className="items-baseline justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {searchedMember.memberShips.map((plan, index) => (
//                       <div
//                           key={plan.id}
//                           className={`${plan.memberShipStatus === 'ACTIVE' ? 'hover:border-green-500 hover:border-2' : 'hover:border-red-400 hover:border-2'} bg-black rounded-lg border border-zinc-400 overflow-hidden hover:shadow-xl transition-all duration-200`}
//                       >
//                           {/* Card Header */}
//                           <div className="relative">
//                               <div className={`${plan.memberShipStatus === 'ACTIVE' ? 'bg-[#2ccc2c]' : 'bg-[#da2c2c]'} p-4 flex flex-col items-center justify-between`}>
//                                   <h4 className="font-medium text-lg text-white capitalize">{plan.planName}</h4>
//                                   <div className="mt-1">
//                                       <span className={`text-xs px-2 py-0.5 rounded ${plan.memberShipStatus === 'ACTIVE' ? 'bg-[#153615] text-white' : 'bg-[#020101] text-white'}`}>
//                                           {plan.memberShipStatus}
//                                       </span>
//                                   </div>
//                               </div>
//                           </div>

//                           {/* Card Body */}
//                           <div className="p-4 space-y-3">
//                               <div className="flex justify-between">
//                                   <div className="text-sm">
//                                       <p className="text-gray-400">Duration</p>
//                                       <p className="text-white font-medium">{plan.durationInDays} days</p>
//                                   </div>
//                                   <div className="text-sm text-right">
//                                       <p className="text-gray-400">Price</p>
//                                       <p className="text-green-300 font-medium">रु {plan.price}</p>
//                                   </div>
//                                   <div className="text-sm text-right flex flex-col items-center gap-1">
//                                       <p className="text-gray-400 font-medium">Status</p>
//                                       <div className={`h-3 w-3 rounded-full ${plan.memberShipStatus === 'ACTIVE' ? 'bg-green-500' : 'bg-red-600'}`}></div>
//                                   </div>
//                               </div>

//                               <div className="h-[1px] bg-gray-800 w-full my-2"></div>

//                               <div className="flex justify-between text-sm">
//                                   <div>
//                                       <p className="text-gray-400">Start Date</p>
//                                       <p className="text-white">{new Date(plan.membershipStartDate).toLocaleDateString()}</p>
//                                   </div>
//                                   <div className="text-right">
//                                       <p className="text-gray-400">End Date</p>
//                                       <p className="text-white">{new Date(plan.membershipEndDate).toLocaleDateString()}</p>
//                                   </div>
//                               </div>
//                           </div>

//                           {/* Card Footer with View Details */}
//                           <div
//                               onClick={() => togglePlanDetails(index)}
//                               className="p-3 bg-[#111] border-t border-gray-800 text-center cursor-pointer hover:bg-[#1a1a1a] transition-colors duration-200"
//                           >
//                               <div className="flex items-center justify-center text-sm text-gray-300 gap-1">
//                                   <span>View Facilities</span>
//                                   {expandedPlanIndex === index ? (
//                                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-[#E26003]" viewBox="0 0 16 16">
//                                           <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
//                                       </svg>
//                                   ) : (
//                                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-[#E26003]" viewBox="0 0 16 16">
//                                           <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
//                                       </svg>
//                                   )}
//                               </div>
//                           </div>

//                           {/* Expanded Facilities Details */}
//                           {expandedPlanIndex === index && (
//                               <div className="bg-black p-4 border-t border-gray-800 animate-fadeIn">
//                                   <h5 className="font-medium text-white mb-2 text-sm flex items-center">
//                                       <span className="w-1 h-4 bg-[#E26003] mr-2 rounded-full"></span>{""}
//                                       Included Facilities
//                                   </h5>
//                                   <div className="grid grid-cols-1 gap-2 mt-2">
//                                       {plan?.facilities.length > 0 ? (
//                                           plan.facilities.map((facility) => (
//                                               <div key={facility.id} className="flex justify-between items-center bg-[#111] p-2 rounded border border-gray-800 text-sm">
//                                                   <span className="text-white">{facility.facilityName}</span>
//                                                   <span className="text-green-300">रु {facility.price}</span>
//                                               </div>
//                                           ))
//                                       ) : (
//                                           <p className="text-gray-500 text-sm italic">No facilities included</p>
//                                       )}
//                                   </div>
//                               </div>
//                           )}
//                       </div>
//                   ))}
//               </div>
//           </>
//       )
//   }

// </div>
