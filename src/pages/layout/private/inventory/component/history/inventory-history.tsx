import Back from "@/global/components/back/back";
import InventoryDetails from "./component/inventory-details";
import InventoryHistoryList from "./component/inventory-history-list";

const InventoryHistory = () => {
  return (
    <div className="">
      <div className="ml-4 mt-2">
        <Back />
      </div>

      <InventoryDetails />
      <InventoryHistoryList />
    </div>
  );
};

export default InventoryHistory;
