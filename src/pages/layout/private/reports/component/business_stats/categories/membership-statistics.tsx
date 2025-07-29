import { useEffect, useState } from 'react'
import { TbUsers } from 'react-icons/tb'
import StatCard from '../component/stat-card'
import StatCategory from '../component/stat-category'
import { useBusinessStatsStore } from '../store'

const MembershipStatistics = () => {
    const { businessStats } = useBusinessStatsStore();
    const [memberPercentages, setMemberPercentages] = useState({
        active: 0,
        inactive: 0,
        deactivated: 0,
        deleted: 0
    });

    // Calculate percentages for visualization
    useEffect(() => {
        if (businessStats?.totalMember > 0) {
            setMemberPercentages({
                active: Math.round((businessStats?.activeMember / businessStats?.totalMember) * 100),
                inactive: Math.round((businessStats?.inActiveMember / businessStats?.totalMember) * 100),
                deactivated: Math.round((businessStats?.deactivatedMember / businessStats?.totalMember) * 100),
                deleted: Math.round((businessStats?.deletedMember / businessStats?.totalMember) * 100)
            });
        }
    }, [businessStats]);

    return (
        <StatCategory
            title="Membership Statistics"
            icon={<TbUsers className="text-[#E26300]" size={24} />}
        >
            {/* Summary Card */}
            <div className="mb-6 bg-gradient-to-r from-orange-50 to-purple-50 rounded-xl p-4 shadow-sm border border-gray-100">
                <h3 className="text-gray-700 font-medium mb-3 flex items-center">
                    <TbUsers className="mr-2" /> Membership Overview
                </h3>
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    {/* Total Members Counter */}
                    <div className="text-center mb-4 sm:mb-0">
                        <div className="text-4xl font-bold text-[#E26300]">
                            {businessStats?.totalMember?.toLocaleString() || 0}
                        </div>
                        <div className="text-gray-500 text-sm mt-1">Total Members</div>
                    </div>

                    {/* Status Distribution Bar */}
                    <div className="w-full sm:w-2/3 space-y-3">
                        <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden flex">
                            <div className="bg-green-500 h-full" style={{ width: `${memberPercentages.active}%` }}></div>
                            <div className="bg-yellow-500 h-full" style={{ width: `${memberPercentages.inactive}%` }}></div>
                            <div className="bg-orange-500 h-full" style={{ width: `${memberPercentages.deactivated}%` }}></div>
                            <div className="bg-red-500 h-full" style={{ width: `${memberPercentages.deleted}%` }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-600">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                                <span>Active</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                                <span>Inactive</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-orange-500 rounded-full mr-1"></div>
                                <span>Deactivated</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                                <span>Deleted</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Active Members"
                    value={businessStats?.activeMember}
                    color="bg-green-50"
                    textColor="text-green-600"
                />
                <StatCard
                    title="Inactive Members"
                    value={businessStats?.inActiveMember}
                    color="bg-yellow-50"
                    textColor="text-yellow-600"
                />
                <StatCard
                    title="Deactivated Members"
                    value={businessStats?.deactivatedMember}
                    color="bg-orange-50"
                    textColor="text-orange-600"
                />
                <StatCard
                    title="Deleted Members"
                    value={businessStats?.deletedMember}
                    color="bg-red-50"
                    textColor="text-red-600"
                />
            </div>
        </StatCategory>
    )
}

export default MembershipStatistics