import StatCategory from '../component/stat-category'
import { TbBuilding } from 'react-icons/tb'
import StatCard from '../component/stat-card'
import { useBusinessStatsStore } from '../store'

const FacilitiesResourcesStat = () => {
    const { businessStats } = useBusinessStatsStore();
    return (
        <StatCategory
            title="Facilities & Resources"
            icon={<TbBuilding className="text-teal-600" size={24} />}
        >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard
                    title="Total Visitors"
                    value={businessStats?.totalVisitor}
                />
                <StatCard
                    title="Total Trainers"
                    value={businessStats?.totalTrainer}
                />
                <StatCard
                    title="Total Facilities"
                    value={businessStats?.totalFacility}
                />
                <StatCard
                    title="Total Plans"
                    value={businessStats?.totalPlan}
                />
            </div>
        </StatCategory>
    )
}

export default FacilitiesResourcesStat
