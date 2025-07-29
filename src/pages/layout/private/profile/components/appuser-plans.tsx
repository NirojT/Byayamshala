import { useGlobalStore } from "@/global/store";
import { useUserPlansStore } from "../plans/store";
import { useProfileStore } from "../account-settings/store";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { MemberShipStatus } from "@/global/components/enums/enums";

const AppUserPlans = () => {
    const { appUser } = useGlobalStore();
    const { subscriptions, getUserSubscriptions } = useUserPlansStore();
    const { setOpenMyPlans } = useProfileStore();

    useEffect(() => {
        if (appUser?.id) {
            getUserSubscriptions(appUser?.id);
        }
    }, [getUserSubscriptions, appUser?.id]);

    return (
        <div className="w-[36rem] min-h-screen border bg-gray-50 text-[#2E2E2E] p-6 font-poppins">
            {/* Back Button */}
            <button
                onClick={() => setOpenMyPlans("")}
                className="flex items-center gap-1 text-[#E26300] hover:underline"
            >
                <ArrowLeft />
                <span>Go back</span>
            </button>

            {/* Table for bigger screens */}
            <div className="overflow-x-auto w-[44rem] hidden sm:block mt-6 bg-white shadow-md rounded-lg">
                <table className="table-auto  border-collapse">
                    <thead>
                        <tr className="bg-[#F5F5F5] text-left text-gray-700">
                            <th className="p-4 text-sm font-semibold border-b">SN</th>
                            <th className="p-4 text-sm font-semibold border-b">Plan Name</th>
                            <th className="p-4 text-sm font-semibold border-b">Start Date</th>
                            <th className="p-4 text-sm font-semibold border-b">End Date</th>
                            <th className="p-4 text-sm font-semibold border-b">Price</th>
                            <th className="p-4 text-sm font-semibold border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(subscriptions) && subscriptions.length > 0 ? (
                            subscriptions.map((data, index) => (
                                <tr
                                    key={data?.id ?? index}
                                    className="hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <td className="p-4 text-center text-sm border-b">
                                        {index + 1}
                                    </td>
                                    <td className="p-4 text-sm border-b">{data?.type}</td>
                                    <td className="p-4 text-sm border-b">{data?.startDate}</td>
                                    <td className="p-4 text-sm border-b">{data?.endDate}</td>
                                    <td className="p-4 text-sm border-b">
                                        Rs {data?.originalPrice}
                                    </td>
                                    <td className="p-4 text-sm border-b">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${data?.status === MemberShipStatus.ACTIVE
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {data?.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="p-6 text-center text-red-500 border-b"
                                >
                                    No subscriptions found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Cards for smaller screens */}
            <div className="mt-6 sm:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.isArray(subscriptions) && subscriptions.length > 0 ? (
                    subscriptions.map((data, index) => (
                        <div
                            key={data?.id ?? index}
                            className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all"
                        >
                            <div className="p-5">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-gray-800 text-lg">
                                        {data?.type}
                                    </h3>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${data?.status === MemberShipStatus.ACTIVE
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {data?.status}
                                    </span>
                                </div>

                                <div className="space-y-2 text-gray-600">
                                    <div className="flex justify-between">
                                        <span className="text-sm">Start Date:</span>
                                        <span className="text-sm font-medium">
                                            {data?.startDate}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">End Date:</span>
                                        <span className="text-sm font-medium">{data?.endDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Price:</span>
                                        <span className="text-sm font-medium">
                                            Rs {data?.originalPrice}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full rounded-lg shadow-md p-6 text-center text-red-500">
                        No subscriptions found.
                    </div>
                )}
            </div>
        </div>
    );
}

export default AppUserPlans
