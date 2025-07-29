import { useEffect, useState } from "react";
import Select from "react-select";
import { useGlobalStore } from "../../../../../../../global/store";
import { useListPlansStore } from "../../../../list/gymoperatiions/plans/store";
import { usePlansOperationFormStore } from "../../../store";

import { ImCross } from "react-icons/im";
import {
    MemberShipStaus,
    PaymentMode,
} from "../../../../../../../global/components/enums/enums";
import customStyles from "../../../../components/custom-select-styles";
import { useToggleAddPlanStore } from "./add-new-plan-store";

const AddNewPlans = () => {
  // stores
  const { setToasterData } = useGlobalStore();
  const { getPlans, plans } = useListPlansStore();
  const { isOpen, setIsOpen } = useToggleAddPlanStore();

  const { data, setData, clearData, addNewPlan, setPlan, searchedMember } =
    usePlansOperationFormStore();

  const handleConfirm = async () => {
    if (searchedMember?.id === 0) {
      setToasterData({
        open: true,
        message: "Please select a member",
        severity: "error",
      });
      return;
    }
    // validate
    if (!data.plansId) {
      setToasterData({
        open: true,
        message: "Please select a plan",
        severity: "error",
      });
      return;
    }
    //setting the member id to data
    setData({ ...data, memberId: searchedMember?.id });

    if (data.memberId === 0) {
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
    const res = await addNewPlan();
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
  const [expandedPlanIndex, setExpandedPlanIndex] = useState<number | null>(null);

  const togglePlanDetails = (index: number) => {
    setExpandedPlanIndex(expandedPlanIndex === index ? null : index);
  };

  useEffect(() => {
    getPlans();
  }, [getPlans]);
  // useEffect(() => {
  //   console.log("ola")
  //   if (searchedMember) {
  //     console.log("object")
  //     setData({ ...data, memberId: searchedMember?.id });
  //   }
  // }, [searchedMember]);

  useEffect(() => {
    // dont use the end date of  canceled membership
    if (
      searchedMember?.memberShips?.length > 0 &&
      searchedMember?.memberShips[0]?.memberShipStatus !==
      MemberShipStaus.CANCELED
    ) {
      const latestMemberShip = searchedMember?.memberShips[0];
      const formattedDate = latestMemberShip?.membershipEndDate
        ? latestMemberShip.membershipEndDate.split(" ")[0] // Extract only the date part
        : "";
      setData({ ...data, startDate: formattedDate });
    }
  }, [searchedMember]);


  // change the state to toggle between table and card for big screens
  const [viewMode, setViewMode] = useState(true);

  return (
    <>
      {viewMode ?
        <div>
          {Object.keys(searchedMember).length > 0 && (
            <div>
              <div className="flex flex-col items-center justify-center mx-auto sm:p-6 rounded-lg shadow-lg text-white sm:border-none sm:border sm:border-gray-600">
                <div className="w-full">
                  <button
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                    className="capitalize flex float-end text-xl underline text-orange-500 hover:text-white hover:scale-110 transition-all duration-200"
                  >
                    {isOpen ? <ImCross /> : "New Plan"}
                  </button>
                </div>

                {/* Member Information and Add Plan Form */}
                {searchedMember?.fullName ? (
                  <>
                    {isOpen && (
                      <div className="text-white w-full max-w-md bg-gray-900 p-5 rounded-lg border border-gray-700 shadow-lg mb-6">
                        <div className="mb-4 pb-3 border-b border-gray-700">
                          <div className="text-center">
                            <span className="text-gray-400">Member:</span>{" "}
                            <span className="text-orange-500 font-medium text-lg">
                              {searchedMember?.fullName}
                            </span>
                          </div>
                        </div>

                        {/* Plans Selection */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-white mb-2">
                            Select plans *
                          </label>
                          <Select
                            styles={customStyles}
                            options={plans}
                            getOptionLabel={(plan) =>
                              `${plan?.planName} - ${plan?.facilities
                                ?.map((f) => f?.facilityName)
                                .join(", ")}`
                            }
                            getOptionValue={(plan) => plan?.id?.toString()}
                            onChange={(selectedOption) => {
                              if (selectedOption) {
                                setData({ ...data, plansId: selectedOption?.id });
                                setPlan(selectedOption); // Store the selected plan
                              }
                            }}
                          />
                        </div>

                        {/* Payment Mode */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-white mb-2">
                            Payment Mode *
                          </label>
                          <select
                            className="p-3 bg-gray-800 text-gray-300 block w-full rounded-md focus:outline-none border border-gray-700 shadow-sm focus:border-[#E26003] focus:ring-[#E26003]"
                            onChange={(e) =>
                              setData({
                                ...data,
                                paymentMode: e?.target
                                  .value as unknown as PaymentMode,
                              })
                            }
                          >
                            <option value="CASH">Cash</option>
                            <option value="ONLINE">Online</option>
                            <option value="CHEQUE">Cheque</option>
                            <option value="CARD">Card</option>
                          </select>
                        </div>

                        {/* Start Date */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-white mb-2">
                            Start Date *
                          </label>
                          <input
                            type="date"
                            className="p-3 bg-gray-800 text-gray-300 block w-full rounded-md focus:outline-none border border-gray-700 shadow-sm focus:border-[#E26003] focus:ring-[#E26003]"
                            value={data?.startDate}
                            onChange={(e) =>
                              setData({ ...data, startDate: e.target.value })
                            }
                          />
                        </div>

                        {/* Assign Button */}
                        <button
                          onClick={handleConfirm}
                          className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white py-3 px-4 rounded-md focus:outline-none transition-colors duration-200 font-medium"
                        >
                          Add Plan
                        </button>
                      </div>
                    )}

                    {/* Plan History - Card-based layout replacing table */}
                    <div className="w-full">
                      <div className="items-center w-full justify-between mb-5 mt-5 sm:flex hidden ">
                        <h3 className="text-xl font-semibold text-gray-300 border-b border-gray-800 ">
                          Plan History
                        </h3>
                        <button onClick={() => { setViewMode(!viewMode) }}
                          className="text-[#E26003] underline">
                          View As Table
                        </button>
                      </div>

                      {searchedMember?.memberShips?.length > 0 ? (
                        // <div className="sm:items-start flex flex-col flex-wrap items-center sm:flex-row gap-4 justify-center ">
                        <div className="items-baseline justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {searchedMember.memberShips.map((plan, index) => (
                            <div
                              key={plan.id}
                              className={`${plan.memberShipStatus === 'ACTIVE' ? 'hover:border-green-500 hover:border-2' : 'hover:border-red-400 hover:border-2'} bg-black rounded-lg border border-zinc-400 overflow-hidden hover:shadow-xl transition-all duration-200`}
                            >
                              {/* Card Header */}
                              <div className="relative">
                                <div className={`${plan.memberShipStatus === 'ACTIVE' ? 'bg-[#2ccc2c]' : 'bg-[#da2c2c]'} p-4 flex flex-col items-center justify-between`}>
                                  <h4 className="font-medium text-lg text-white capitalize">{plan.planName}</h4>
                                  <div className="mt-1">
                                    <span className={`text-xs px-2 py-0.5 rounded ${plan.memberShipStatus === 'ACTIVE' ? 'bg-[#153615] text-white' : 'bg-[#020101] text-white'}`}>
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
                                    <p className="text-white font-medium">{plan.durationInDays} days</p>
                                  </div>
                                  <div className="text-sm text-right">
                                    <p className="text-gray-400">Price</p>
                                    <p className="text-green-300 font-medium">रु {plan.price}</p>
                                  </div>
                                  <div className="text-sm text-right flex flex-col items-center gap-1">
                                    <p className="text-gray-400 font-medium">Status</p>
                                    <div className={`h-3 w-3 rounded-full ${plan.memberShipStatus === 'ACTIVE' ? 'bg-green-500' : 'bg-red-600'}`}></div>
                                  </div>
                                </div>

                                <div className="h-[1px] bg-gray-800 w-full my-2"></div>

                                <div className="flex justify-between text-sm">
                                  <div>
                                    <p className="text-gray-400">Start Date</p>
                                    <p className="text-white">{new Date(plan.membershipStartDate).toLocaleDateString()}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-gray-400">End Date</p>
                                    <p className="text-white">{new Date(plan.membershipEndDate).toLocaleDateString()}</p>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-[#E26003]" viewBox="0 0 16 16">
                                      <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
                                    </svg>
                                  ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-[#E26003]" viewBox="0 0 16 16">
                                      <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                  )}
                                </div>
                              </div>

                              {/* Expanded Facilities Details */}
                              {expandedPlanIndex === index && (
                                <div className="bg-black p-4 border-t border-gray-800 animate-fadeIn">
                                  <h5 className="font-medium text-white mb-2 text-sm flex items-center">
                                    <span className="w-1 h-4 bg-[#E26003] mr-2 rounded-full"></span>{""}
                                    Included Facilities
                                  </h5>
                                  <div className="grid grid-cols-1 gap-2 mt-2">
                                    {plan?.facilities.length > 0 ? (
                                      plan.facilities.map((facility) => (
                                        <div key={facility.id} className="flex justify-between items-center bg-[#111] p-2 rounded border border-gray-800 text-sm">
                                          <span className="text-white">{facility.facilityName}</span>
                                          <span className="text-green-300">रु {facility.price}</span>
                                        </div>
                                      ))
                                    ) : (
                                      <p className="text-gray-500 text-sm italic">No facilities included</p>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center p-8 bg-black rounded-lg border border-gray-800">
                          <p className="text-gray-400">No membership plans found</p>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className=""></div>
                )}
              </div>
            </div>
          )}
        </div>


        :


        <div>
          <div className="flex flex-col items-center justify-center mx-auto sm:p-6 rounded-lg shadow-lg text-white sm:border-none sm:border sm:border-gray-600">
            <div className="w-full">
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                className="capitalize flex float-end text-xl underline text-orange-500 hover:text-white hover:scale-110"
              >
                {isOpen ? <ImCross /> : "New Plan"}
              </button>
            </div>

            {/* it means member is there */}
            {searchedMember?.fullName ? (
              <>
                {isOpen && (
                  <div className="text-white">
                    <div className="">
                      <div className="text-center text-gray-300">
                        Full Name:{" "}
                        <span className="text-orange-500">
                          {searchedMember?.fullName}
                        </span>
                      </div>
                    </div>
                    {/* Plans Selection */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Select plans *
                      </label>
                      <Select
                        styles={customStyles}
                        options={plans}
                        getOptionLabel={(plan) =>
                          `${plan?.planName} - ${plan?.facilities
                            ?.map((f) => f?.facilityName)
                            .join(", ")}`
                        }
                        getOptionValue={(plan) => plan?.id?.toString()}
                        onChange={(selectedOption) => {
                          if (selectedOption) {
                            setData({ ...data, plansId: selectedOption?.id });
                            setPlan(selectedOption); // Store the selected plan
                          }
                        }}
                      />
                    </div>
                    {/* payment mode */}
                    <div>
                      <label className="block text-sm font-medium text-white mt-2 mb-2">
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
                    <div>
                      <label className="block text-sm font-medium text-white mt-2 mb-2">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        className="p-3 bg-black text-gray-300 block w-full rounded-md focus:outline-none border border-gray-600 shadow-sm focus:border-[#E26003] focus:ring-[#E26003]"
                        value={data?.startDate}
                        onChange={(e) =>
                          setData({ ...data, startDate: e.target.value })
                        }
                      />
                    </div>
                    {/* Assign Button */}
                    <button
                      onClick={handleConfirm}
                      className="w-96 mt-6 bg-[#E26003] text-white py-2 px-4 rounded-md focus:outline-none focus:ring-1 border border-gray-600 focus:border-[#E26003] focus:ring-[#E26003] "
                    >
                      Add plans
                    </button>
                  </div>
                )}

                {/* Plan History */}
                <div className="mt-10 text-center sm:hidden flex flex-col ">
                  <div className="items-baseline justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchedMember.memberShips.map((plan, index) => (
                      <div
                        key={plan.id}
                        className={`${plan.memberShipStatus === 'ACTIVE' ? 'hover:border-green-500 hover:border-2' : 'hover:border-red-400 hover:border-2'} bg-black rounded-lg border border-zinc-400 overflow-hidden hover:shadow-xl transition-all duration-200`}
                      >
                        {/* Card Header */}
                        <div className="relative">
                          <div className={`${plan.memberShipStatus === 'ACTIVE' ? 'bg-[#2ccc2c]' : 'bg-[#da2c2c]'} p-4 flex flex-col items-center justify-between`}>
                            <h4 className="font-medium text-lg text-white capitalize">{plan.planName}</h4>
                            <div className="mt-1">
                              <span className={`text-xs px-2 py-0.5 rounded ${plan.memberShipStatus === 'ACTIVE' ? 'bg-[#153615] text-white' : 'bg-[#020101] text-white'}`}>
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
                              <p className="text-white font-medium">{plan.durationInDays} days</p>
                            </div>
                            <div className="text-sm text-right">
                              <p className="text-gray-400">Price</p>
                              <p className="text-green-300 font-medium">रु {plan.price}</p>
                            </div>
                            <div className="text-sm text-right flex flex-col items-center gap-1">
                              <p className="text-gray-400 font-medium">Status</p>
                              <div className={`h-3 w-3 rounded-full ${plan.memberShipStatus === 'ACTIVE' ? 'bg-green-500' : 'bg-red-600'}`}></div>
                            </div>
                          </div>

                          <div className="h-[1px] bg-gray-800 w-full my-2"></div>

                          <div className="flex justify-between text-sm">
                            <div>
                              <p className="text-gray-400">Start Date</p>
                              <p className="text-white">{new Date(plan.membershipStartDate).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-gray-400">End Date</p>
                              <p className="text-white">{new Date(plan.membershipEndDate).toLocaleDateString()}</p>
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
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-[#E26003]" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-[#E26003]" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                              </svg>
                            )}
                          </div>
                        </div>

                        {/* Expanded Facilities Details */}
                        {expandedPlanIndex === index && (
                          <div className="bg-black p-4 border-t border-gray-800 animate-fadeIn">
                            <h5 className="font-medium text-white mb-2 text-sm flex items-center">
                              <span className="w-1 h-4 bg-[#E26003] mr-2 rounded-full"></span>{""}
                              Included Facilities
                            </h5>
                            <div className="grid grid-cols-1 gap-2 mt-2">
                              {plan?.facilities.length > 0 ? (
                                plan.facilities.map((facility) => (
                                  <div key={facility.id} className="flex justify-between items-center bg-[#111] p-2 rounded border border-gray-800 text-sm">
                                    <span className="text-white">{facility.facilityName}</span>
                                    <span className="text-green-300">रु {facility.price}</span>
                                  </div>
                                ))
                              ) : (
                                <p className="text-gray-500 text-sm italic">No facilities included</p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* table starts here */}
                {/* Plan History table view for large screens */}
                <div className="overflow-x-auto sm:block hidden w-full border border-gray-600 rounded-lg shadow-md mt-10 p-1">
                  {/* Table starts here */}
                  <div className="flex items-center w-full justify-between mb-5 mt-5">
                    <h3 className="text-xl font-semibold text-gray-300 border-b border-gray-800">
                      Plan History
                    </h3>
                    <button onClick={() => { setViewMode(!viewMode) }}
                      className="text-[#E26003] underline">
                      {viewMode ? 'View as Table' : 'View as Card'}
                    </button>
                  </div>
                  <table className="table-auto w-full border-collapse shadow-lg rounded-lg overflow-hidden">
                    <thead>
                      <tr className=" text-white text-left">
                        <th className="p-3 text-sm font-semibold">SN</th>
                        <th className="p-3 text-sm font-semibold">Plan Name</th>
                        <th className="p-3 text-sm font-semibold">Start Date</th>
                        <th className="p-3 text-sm font-semibold">End Date</th>
                        <th className="p-3 text-sm font-semibold">Duration</th>
                        <th className="p-3 text-sm font-semibold">Price</th>
                        <th className="p-3 text-sm font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-white text-left">
                      {searchedMember?.memberShips.length > 0 &&
                        searchedMember.memberShips.map((data, index: number) => (
                          <tr
                            key={data?.id ?? index}
                            className=" text-white hover:text-black hover:bg-gray-300 border-t transition-colors duration-200"
                          >
                            <td className="p-3  text-sm">{index + 1}</td>
                            <td className="p-3 text-sm">{data?.planName}</td>                           <td className="p-3 text-sm">                             {data?.membershipStartDate}
                            </td>
                            <td className="p-3 text-sm">
                              {data?.membershipEndDate}
                            </td>
                            <td className="p-3 text-sm">
                              {data?.durationInDays} days
                            </td>
                            <td className="p-3 text-sm">{data?.price}</td>
                            <td className="p-3 text-sm">
                              <div
                                className={`${data.memberShipStatus == MemberShipStaus.ACTIVE
                                  ? "h-6 w-6 rounded-full bg-green-500"
                                  : "h-6 w-6 rounded-full bg-red-500"
                                  }`}
                              ></div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="flex justify-center w-full mt-2">                   {/* pagination section starts here */}
                    {/* <TablePagination
                           rowsPerPageOptions={[10, 25, 100]}
                           component="div"
                           count={totalLength ?? 0}
                           rowsPerPage={rowsPerPage}
                           page={page}
                           onPageChange={handleChangePage}
                           onRowsPerPageChange={handleChangeRowsPerPage}
                         /> */}
                  </div>
                  {/* pagination ends here */}
                </div>
              </>
            ) : (
              <div className=""></div>
            )}
          </div>

        </div >
      }

    </>
  );
};

export default AddNewPlans;
