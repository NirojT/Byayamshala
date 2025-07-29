import StatCategory from "../component/stat-category";
import { TbReport } from "react-icons/tb";
import StatCard from "../component/stat-card";
import { useBusinessStatsStore } from "../store";
import { useNavigate } from "react-router-dom";
import { PrivateRoute } from "@/global/config"; 
import { PartyMoneyType } from "@/global/components/enums/enums";
import { usePartyStore } from "@/pages/layout/private/party/store";

const AccountStatistics = () => {
  const { businessStats } = useBusinessStatsStore();
  const { setSearch } = usePartyStore();
  const navigate = useNavigate();

  function handleNavigate(search: PartyMoneyType) {
    setSearch(search);
    navigate(`/${PrivateRoute}/party`);
  }

  return (
    <StatCategory
      title="Accounts Receivable & Payable"
      icon={<TbReport className="text-green-600" size={24} />}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        <StatCard
          onClick={() => handleNavigate(PartyMoneyType.TO_GIVE)}
          title="Account Payable"
          value={businessStats?.accountPayable}
          isCurrency
        />
        <StatCard
          onClick={() => handleNavigate(PartyMoneyType.TO_RECEIVE)}
          title="Account Receivable"
          value={businessStats?.accountReceivable}
          isCurrency
        />
      </div>
    </StatCategory>
  );
};

export default AccountStatistics;
