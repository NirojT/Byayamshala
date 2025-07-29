import { ImCross } from "react-icons/im";
import { useLocation } from "react-router-dom"
 
import { useAffilaterStore } from "./store";
import { useEffect } from "react";
import { useGlobalStore } from "@/global/store";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSuperAppUserStore } from "../store";

const ViewAffiliateDetails = () => {
    const { state } = useLocation();

    const { cardData, getAffilatedSubscription, affilatedSubs, getCardData, changeAffilatePaymentStatus } = useAffilaterStore();
    const { setToasterData } = useGlobalStore();
    const { deactivateUser } = useSuperAppUserStore();

    const handleStatusChange = async (subId: number) => {
        const res = await changeAffilatePaymentStatus(subId);
        setToasterData({
            message: res.message,
            severity: res.severity,
            open: true,
        })
    };

    const handleDeactivate = async () => {
        const res = await deactivateUser();
        setToasterData({
            message: res.message,
            severity: res.severity,
            open: true,
        });
    };

    useEffect(() => {
        getCardData(state.email);
        getAffilatedSubscription(state.email);
    }, []);

    console.log(affilatedSubs);


    return (
        <div
            className={`sm:${state.status === 'ACTIVE' ? 'border-green-500/50' : 'border-red-400/50'} 
          bg-black rounded-lg overflow-hidden hover:shadow-xl transition-all duration-200 mb-4 flex flex-col  m-4 h-full
          `}
        >



            <div className="flex items-center justify-end space-x-2 text-white float-end mb-10 ">
                <p className="text-[#E26300] underline text-right mb-2">{state.email}</p>
                <Switch onClick={handleDeactivate} id="deactivate" />
                <Label htmlFor="deactivate">Deactivate</Label>
            </div>


            <div className="mb-10 sm:flex hidden justify-between">
                <div className="">
                    <p className="text-white text-center underline">Role</p>
                    <p className="text-white font-medium">{state.role === 'ROLE_AFFILIATE' && 'AFFILIATE'}</p>
                </div>

                <div className="">
                    <p className="text-white text-center">Active Status</p>
                    <p className="text-white text-center font-medium">
                        {state.activeStatus ? (
                            <span className="bg-green-400 border border-gray-400 rounded-full h-4 w-4 inline-block"></span>
                        ) : (
                            <span className="bg-red-400 border border-gray-400 rounded-full h-4 w-4 inline-block"></span>
                        )}
                    </p>
                </div>

                <div className="">
                    <p className="text-white">Total Users</p>
                    <p className="text-white font-medium text-center">{cardData.noOfUsers}</p>
                </div>
                <div className="flex flex-col items-center gap-1 text-white">
                    <p className="text-gray-200 font-medium">Total Code Used</p>
                    {cardData.totalCodeUsed}
                </div>

                {/* <div>
                    <p className="text-white">Start Date</p>
                    <p className="text-white">{new Date(state.createdNepDate).toLocaleDateString()}</p>
                </div> */}

                <div>
                    <p className="text-white">Total Earnings</p>
                    <p className="text-white">{cardData.totalEarnings}</p>
                </div>
                <div>
                    <p className="text-white">Total Paid</p>
                    <p className="text-white">{cardData.totalPaid}</p>
                </div>
                <div>
                    <p className="text-white">Total UnPaid</p>
                    <p className="text-white">{cardData.totalUnPaid}</p>
                </div>

                {/* <div className="text-right">
                    <p className="text-white">End Date</p>
                    <p className="text-white">{state.activeStatus ? 'Present' : 'INACTIVE'}</p>
                </div> */}
            </div>

            <div
                key={state.id}
                className={`sm:block hidden ${state.activeStatus ? 'from-green-700 to-green-900' : 'from-red-700 to-red-900'} bg-black rounded-lg border border-zinc-400 overflow-hidden hover:shadow-xl transition-all duration-200`}
            >
                <div className="p-4 space-y-3 mt-4">
                    <table className="table-auto w-full border-collapse shadow-lg rounded-lg overflow-hidden">
                        <thead>
                            <tr className="text-white">
                                <th className="p-3">Plan </th>
                                <th className="p-3">Subscription Price</th>
                                <th className="p-3">Discounted Price</th>
                                <th className="p-3">AffilatePercent</th>
                                <th className="p-3">PaymentMode</th>
                                <th className="p-3">Start Date</th>
                                <th className="p-3">End Date</th>
                                <th className="p-3">TO_GIVE</th>
                                <th className="p-3">Used By</th>
                                <th className="p-3">Affilater Status</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {affilatedSubs.map((subs) => (
                                <tr key={subs.id} className="text-zinc-300 hover:text-white border-t transition-colors duration-200">
                                    <td className={`${subs.type === 'GOLD' && 'text-yellow-300'} ${subs?.type === 'PLATINUM' && 'text-gray-300'} ${subs?.type === 'LIFETIME' && 'text-green-600'}  p-3 text-center`}>{subs?.type}</td>
                                    <td className="p-3 text-center text-green-600">{subs?.originalPrice}</td>
                                    <td className="p-3 text-center text-red-600">{subs?.discountedPrice}</td>
                                    <td className="p-3 text-center text-red-600">{subs?.affilaterPercent}</td>
                                    <td className="p-3 text-center">{subs?.paymentMode}</td>
                                    <td className="p-3 text-center">{subs?.startDate}</td>
                                    <td className="p-3 text-center">{subs?.endDate}</td>
                                    <td className="p-3 text-center">{subs?.toGive}</td>
                                    <td className="p-3 text-center">{subs?.appUserName}</td>
                                    <td className="p-3 text-center">{subs?.affilaterPaymentStatus}</td>

                                    <td className="p-3 flex justify-center btn hover:cursor-pointer hover:text-red-600 hover:bg-black transition-all duration-200"


                                        onClick={() => handleStatusChange(subs.id)}
                                    >{<ImCross color="red" />}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default ViewAffiliateDetails