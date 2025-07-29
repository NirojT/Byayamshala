import { useState } from "react";
import { useStaffProfileStore } from "../store";
import AddAdjustmentForm from "./form/add-adjustment-form";
import { IStaffDetails } from "../../../interface";

const AdjustmentSection = ({ staff }: { staff: IStaffDetails }) => {
  const adjustments = useStaffProfileStore((s) => s.adjustments);
  const loading = useStaffProfileStore((s) => s.loading);

  const [showAdd, setShowAdd] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Salary Adjustments</h2>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => setShowAdd(true)}
        >
          Add Adjustment
        </button>
      </div>
      {showAdd && <AddAdjustmentForm staff={staff} setShowAdd={setShowAdd} />}
      <div className="overflow-x-auto mt-2">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Reason</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {adjustments.map((adj) => (
                <tr key={adj.id}>
                  <td>{adj.type}</td>
                  <td>{adj.amount}</td>
                  <td>{adj.reason || "-"}</td>
                  <td>{adj.adjustmentDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default AdjustmentSection;
