import { TbCoin } from "react-icons/tb";
import StatCategory from "../component/stat-category";
import StatCard from "../component/stat-card";
import { useBusinessStatsStore } from "../store";
import { useNavigate } from "react-router-dom";
import { PrivateRoute } from "@/global/config";

const FinancialStatistics = () => {
  const { businessStats } = useBusinessStatsStore();
  const navigate = useNavigate();

  function handleNavigate(path: string) {
    navigate(`/${PrivateRoute}/${path}`);
  }

  return (
    <StatCategory
      title="Financial Statistics"
      icon={<TbCoin className="text-orange-600" size={24} />}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <StatCard
          onClick={() => handleNavigate("reports/purchase")}
          title="Purchase"
          value={businessStats?.purchase}
          isCurrency
        />
        <StatCard
          onClick={() => handleNavigate("reports/sales")}
          title="Sales"
          value={businessStats?.sales}
          isCurrency
        />
        <StatCard
          onClick={() => handleNavigate("reports/sales")}
          title="Membership Sales"
          value={businessStats?.totalMemberShip}
          isCurrency
        />
        <StatCard
          // onClick={() => handleNavigate("reports/sales")}
          title="Admission/Handling Fee"
          value={businessStats?.totalAdmissionFee}
          isCurrency
        />

        <StatCard
          onClick={() => handleNavigate("reports/sales")}
          title="Total Income"
          value={
            businessStats?.totalMemberShip +
            businessStats?.sales +
            businessStats?.totalAdmissionFee
          }
          isCurrency
        />
        <StatCard
          onClick={() => handleNavigate("reports/expenses")}
          title="Expenses"
          value={businessStats?.expenses}
          isCurrency
        />
        <StatCard
          title="Discount Allowed"
          value={businessStats?.totalDiscount}
          isCurrency
        />
        <StatCard
          title="Purchase Return"
          value={businessStats?.purchaseReturn}
          isCurrency
        />
        <StatCard
          title="Sales Return"
          value={businessStats?.salesReturn}
          isCurrency
        />
      </div>
    </StatCategory>
  );
};

export default FinancialStatistics;
