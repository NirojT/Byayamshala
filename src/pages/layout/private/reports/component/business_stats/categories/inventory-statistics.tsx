import StatCategory from '../component/stat-category'
import { TbPackage } from 'react-icons/tb'
import StatCard from '../component/stat-card'
import { useBusinessStatsStore } from '../store'

const InventoryStatistics = () => {
    const { businessStats } = useBusinessStatsStore();
    return (
        <StatCategory
            title="Inventory Statistics"
            icon={<TbPackage className="text-orange-500" size={24} />}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard
                    title="Closing Stock Value"
                    value={businessStats?.closingStock}
                    isCurrency
                />
                <StatCard
                    title="Number of Stock Items"
                    value={businessStats?.noOfStock}
                />
            </div>
        </StatCategory>
    )
}

export default InventoryStatistics
