import { useEffect, useState } from "react";
import { useListMemberStore } from "../../../../list/gymoperatiions/members/store";
import { useGlobalStore } from "../../../../../../../global/store";
import { useListPlansStore } from "../../../../list/gymoperatiions/plans/store";
import { usePlansOperationFormStore } from "../../../store";

import { RiArrowDropDownLine } from "react-icons/ri";
import { PaymentMode } from "../../../../../../../global/components/enums/enums";
import { useRenewPlanStore } from "./renew-plan-store";
import { ImCross } from "react-icons/im";

const RenewPlans = () => {
  // stores
  const { setToasterData } = useGlobalStore();
  const { getPlans,  } = useListPlansStore();
  const { isOpen, setIsOpen } = useRenewPlanStore();
  const { members } = useListMemberStore();
  const {
    data,
    setData,
    clearData,
    renew,
    
    searchedMember,
  } = usePlansOperationFormStore();

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
    const res = await renew();
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

  // change the state to toggle between table and card
  // the default value is table
  const [viewMode] = useState(false);

  return (
    <>
      {viewMode ?
        <div> {Object.keys(searchedMember).length > 0 && (
          <div className="flex flex-col items-center justify-center mx-auto sm:p-6 rounded-lg shadow-lg text-white sm:border-none sm:border sm:border-gray-600">
            <div className="w-full">
              <button onClick={() => { setIsOpen(!isOpen) }} className="capitalize flex float-end text-xl underline text-orange-500 hover:text-white hover:scale-110 transition-all duration-200">
                {isOpen ? <ImCross /> : 'Renew Plan'}
              </button>
            </div>

            {/* it means member is there */}
            {searchedMember?.fullName ? (
              <div className="text-white w-full">
                {/* payment mode */}
                {isOpen && (
                  <div className="text-white w-full max-w-md mx-auto bg-black p-5 rounded-lg border border-gray-800 shadow-lg mb-6">
                    <div className="mb-4 pb-2 border-b border-gray-800">
                      <div className="text-center">
                        <span className="text-gray-400">Member:</span>{" "}
                        <span className="text-orange-500 font-medium text-lg">{searchedMember?.fullName}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mt-2 mb-2">
                        Payment Mode *
                      </label>
                      <select
                        className="p-3 bg-black text-gray-300 block w-full rounded-md focus:outline-none border border-gray-600 shadow-sm focus:border-[#E26003] focus:ring-[#E26003]"
                        onChange={(e) =>
                          setData({
                            ...data,
                            paymentMode: e?.target.value as unknown as PaymentMode,
                          })
                        }
                      >
                        <option value="CASH">Cash</option>
                        <option value="ONLINE">Online</option>
                        <option value="CHEQUE">Cheque</option>
                        <option value="CARD">Card</option>
                      </select>
                    </div>

                    {/* Assign Button */}
                    <button
                      onClick={handleConfirm}
                      className="w-full mt-6 bg-gradient-to-r from-[#E26003] to-[#e67e34] hover:from-[#c25403] hover:to-[#d16c29] text-white py-3 px-4 rounded-md focus:outline-none focus:ring-1 border border-gray-600 focus:border-[#E26003] focus:ring-[#E26003] transition-colors duration-200 font-medium"
                    >
                      Renew Plan
                    </button>
                  </div>
                )}

                {/* Plan History - Card-based layout for both mobile and desktop */}
                <div className="w-full">
                  <h3 className="text-xl font-semibold text-gray-300 mb-5 border-b border-gray-800 pb-2">
                    Plan History
                  </h3>

                  {searchedMember?.memberShips?.length > 0 ? (
                    <div className="items-baseline justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* <div className=""> */}
                      {searchedMember.memberShips.map((sub, index) => (
                        <div
                          key={sub.id}
                          className="bg-black rounded-lg border border-gray-800 overflow-hidden hover:shadow-xl transition-all duration-200"
                        >
                          {/* Card Header */}
                          <div className="relative">
                            <div className={`${sub.memberShipStatus === 'ACTIVE' ? 'bg-[#26b026]' : 'bg-[#b72121]'} p-4 flex flex-col items-center justify-between`}>
                              <h4 className="font-medium text-lg text-white capitalize">{sub.planName}</h4>
                              <div className="mt-1">
                                <span className={`text-xs px-2 py-0.5 rounded ${sub.memberShipStatus === 'ACTIVE' ? 'bg-[#153615] text-white' : 'bg-[#000000] text-white'}`}>
                                  {sub.memberShipStatus}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Card Body */}
                          <div className="p-4 space-y-3">
                            <div className="flex justify-between">
                              <div className="text-sm">
                                <p className="text-gray-400">Duration</p>
                                <p className="text-white font-medium">{sub.durationInDays} days</p>
                              </div>
                              <div className="text-sm text-right">
                                <p className="text-gray-400">Price</p>
                                <p className="text-green-400 font-medium">Rs {sub.price}</p>
                              </div>
                              <div className="text-sm text-right flex flex-col items-center gap-1">
                                <p className="text-gray-400 font-medium">Status</p>
                                <div className={`h-3 w-3 rounded-full ${sub.memberShipStatus === 'ACTIVE' ? 'bg-green-500' : 'bg-red-600'}`}></div>
                              </div>
                            </div>

                            <div className="h-[1px] bg-gray-800 w-full my-2"></div>

                            <div className="flex justify-between text-sm">
                              <div>
                                <p className="text-gray-400">Start Date</p>
                                <p className="text-white">{new Date(sub.membershipStartDate).toLocaleDateString()}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-gray-400">End Date</p>
                                <p className="text-white">{new Date(sub.membershipEndDate).toLocaleDateString()}</p>
                              </div>
                            </div>
                          </div>

                          {/* Card Footer with View Details */}
                          <div
                            onClick={() => togglePlanDetails(index)}
                            className="p-3 bg-[#111] border-t border-gray-800 text-center cursor-pointer hover:bg-[#1a1a1a] transition-colors duration-200"
                          >
                            <div className="flex items-center justify-center text-sm text-gray-300 gap-1">
                              <span>View Details</span>
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

                          {/* Expanded Details */}
                          {expandedPlanIndex === index && (
                            <div className="bg-black p-4 border-t border-gray-800 animate-fadeIn">
                              <div className="space-y-3">
                                <div className="grid grid-cols-1 gap-2">
                                  <p className="text-gray-300">
                                    <span className="font-semibold text-white">Plan Name:</span>{" "}
                                    {sub?.planName}
                                  </p>
                                  <p className="text-gray-300">
                                    <span className="font-semibold text-white">Price:</span>{" "}
                                    <span className="text-green-400">Rs {sub?.price}</span>
                                  </p>
                                  <p className="text-gray-300">
                                    <span className="font-semibold text-white">Duration:</span>{" "}
                                    {sub?.durationInDays} days
                                  </p>
                                </div>

                                {sub?.description && (
                                  <div>
                                    <p className="text-gray-300 mt-2">
                                      <span className="font-semibold text-white">Description:</span>{" "}
                                      {sub?.description}
                                    </p>
                                  </div>
                                )}

                                <div className="mt-2">
                                  <h4 className="font-medium text-white mb-2 text-sm flex items-center">
                                    <span className="w-1 h-4 bg-[#E26003] mr-2 rounded-full"></span>{""}
                                    Facilities
                                  </h4>
                                  <div className="grid grid-cols-1 gap-2 mt-2">
                                    {sub?.facilities.length > 0 ? (
                                      sub.facilities.map((facility) => (
                                        <div key={facility.id} className="flex justify-between items-center bg-[#111] p-2 rounded border border-gray-800 text-sm">
                                          <span className="text-white">{facility.facilityName}</span>
                                          <span className="text-green-400">Rs {facility.price}</span>
                                        </div>
                                      ))
                                    ) : (
                                      <p className="text-gray-500 text-sm italic">No facilities included</p>
                                    )}
                                  </div>
                                </div>
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
              </div>
            ) : (
              <div className="text-center text-orange-500"></div>
            )}
          </div>
        )}</div>
        :


        <div>
          <div className="flex flex-col items-center justify-center mx-auto sm:p-6 rounded-lg shadow-lg text-white sm:border-none sm:border sm:border-gray-600">
            <div className="w-full">
              <button onClick={() => { setIsOpen(!isOpen) }} className="capitalize flex float-end text-xl underline text-orange-500 hover:text-white hover:scale-110">
                {isOpen ? <ImCross /> : 'Renew Plan'}
              </button>
            </div>

            {/* it means member is there */}
            {searchedMember?.fullName ? (
              <div className="text-white w-full">
                {/* payment mode */}
                {isOpen &&
                  (
                    <div className="text-white w-96 ml-auto mr-auto">
                      <div className="text-center text-gray-300">Full Name:  <span className="text-orange-500">{searchedMember?.fullName}</span></div>
                      <div>
                        <label className="block text-sm font-medium text-white mt-4 mb-2">
                          Payment Mode *
                        </label>
                        <select
                          className="p-3 bg-black text-gray-300 block w-full rounded-md focus:outline-none border border-gray-600 shadow-sm focus:border-[#E26003] focus:ring-[#E26003]"
                          onChange={(e) =>
                            setData({
                              ...data,
                              paymentMode: e?.target.value as unknown as PaymentMode,
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

                {/* Plan History */}
                <div className="mt-10 text-center sm:hidden flex flex-col ">
                  <h3 className="text-xl font-semibold text-gray-300">
                    Plan History
                  </h3>
                  <div className="mt-4 space-y-4 flex flex-col items-center justify-center w-">
                    {searchedMember?.memberShips
                      ?.map((sub, index) => (
                        <div
                          key={index}
                          className="bg-black border sm:p-4 p-2 rounded-lg shadow-md "
                        >
                          <div className="flex justify-between items-center gap-8">
                            <p className="text-white flex flex-col">
                              Plan:{" "}
                              <span className="font-medium text-orange-500">
                                {sub?.planName}({sub?.memberShipStatus})
                              </span>
                            </p>
                            <RiArrowDropDownLine
                              size={30}
                              className="hover:cursor-pointer hover:shadow-lg "
                              onClick={() => togglePlanDetails(index)}
                            />
                            <p className="text-white flex flex-col">
                              Duration:{" "}
                              <span className="font-medium text-orange-500">
                                {new Date(
                                  sub?.membershipStartDate
                                ).toLocaleDateString()}{" "}
                                -{" "}
                                {new Date(
                                  sub?.membershipEndDate
                                ).toLocaleDateString()}
                              </span>
                            </p>
                          </div>

                          {expandedPlanIndex === index && (
                            <div className="mt-4 bg-black p-4 rounded-lg  text-start shadow">
                              <p className="text-gray-300">
                                <span className="font-semibold">Plan Name:</span>{" "}
                                {sub?.planName}
                              </p>
                              <p className="text-gray-300">
                                <span className="font-semibold">Duration:</span>{" "}
                                {sub?.durationInDays} days
                              </p>
                              <p className="text-gray-300">
                                <span className="font-semibold">Price:</span> Rs{" "}
                                {sub?.price}
                              </p>
                              <p className="text-gray-300">
                                <span className="font-semibold">Description:</span>{" "}
                                {sub?.description}
                              </p>

                              <div className="flex">
                                <h4 className="font-semibold text-gray-300">
                                  Facilities:
                                </h4>
                                <ul className="list-disc pl-5 text-gray-200">
                                  {sub?.facilities.map((facility) => (
                                    <li key={facility.id}>
                                      <span className="font-medium">
                                        {facility.facilityName}
                                      </span>{" "}
                                      - Rs {facility.price}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>

                {/* Plan History table view for large screens */}
                <p className="text-xl mt-5 mb-5 sm:block hidden">Plan History</p>
                <div className="overflow-x-auto sm:block hidden w-full border border-gray-600 rounded-lg shadow-md">
                  {/* Table starts here */}
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
                      {searchedMember?.memberShips.length > 0 && (
                        searchedMember.memberShips.map((data, index: number) => (
                          <tr
                            key={data?.id ?? index}
                            className=" text-white hover:text-black hover:bg-gray-300 border-t transition-colors duration-200"
                          >
                            <td className="p-3  text-sm">{index + 1}</td>
                            <td className="p-3 text-sm">{data?.planName}</td>

                            <td className="p-3 text-sm">{data?.membershipStartDate}</td>
                            <td className="p-3 text-sm">
                              {data?.membershipEndDate}
                            </td>
                            <td className="p-3 text-sm">{data?.durationInDays} days</td>
                            <td className="p-3 text-sm">{data?.price}</td>
                            <td className="p-3 text-sm">
                              <div className={`${data.memberShipStatus == 'ACTIVE' ? 'h-6 w-6 rounded-full bg-green-500' : 'h-6 w-6 rounded-full bg-red-500'}`}>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>

                  <div className="flex justify-center w-full mt-2">
                    {/* pagination section starts here */}
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
              </div>
            ) : (
              <div className="text-center text-orange-500"></div>
            )
            }
          </div >
        </div>
      }

    </>
  );
};

export default RenewPlans;
