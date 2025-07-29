import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSuperAppUserStore } from "../store";
import {
  AppUserPlanType,
  MemberShipStaus,
} from "@/global/components/enums/enums";
import { useGlobalStore } from "@/global/store";
import { useSuperPlansStore } from "../../plans/store";

const SuperAppUserSubscriptionModal: React.FC = () => {
  const {
    superSubscriptions,
    getSuperAppUserSubscription,
    openSubscription,
    setOpenSubscription,
    cancelSubscription,
    activateSubscription,
    addSubscription,
 
  } = useSuperAppUserStore();

  const { setToasterData } = useGlobalStore();

  const { superPlans } = useSuperPlansStore();

  const handleCancel = async (subId: number) => {
    const res = await cancelSubscription(subId);

    setToasterData({
      message: res.message,
      severity: res.severity,
      open: true,
    });
  };
  const handleActivate = async (subId: number) => {
    const res = await activateSubscription(subId);

    setToasterData({
      message: res.message,
      severity: res.severity,
      open: true,
    });
  };

  const [planType, setPlanType] = useState<AppUserPlanType>(
    AppUserPlanType.FREE_TRIAL
  );
  const [startDate, setStartDate] = useState<string>("");
  const [add, setAdd] = useState<boolean>(false);
  const handleAdd = async () => {
    if (!startDate || !planType) {
      setToasterData({
        message: "Please fill all fields",
        severity: "error",
        open: true,
      }); // Add toaster message
      return;
    }
    const res = await addSubscription(planType, startDate);

    setToasterData({
      message: res.message,
      severity: res.severity,
      open: true,
    });
  };

  useEffect(() => {
    getSuperAppUserSubscription();
  }, [getSuperAppUserSubscription]);

  return (
    <Dialog
      open={openSubscription}
      onClose={() => setOpenSubscription(false)}
      maxWidth="xl" // Adjust size: "sm", "md", "lg", "xl", or "false" for full width
      fullWidth // Ensures it takes the full available width
    >
      <div className="p-2 w-full  bg-white rounded-lg shadow-lg">
        <DialogTitle className="text-xl font-semibold text-gray-800 text-center">
          App User Subscriptions
        </DialogTitle>

        {/* add form start*/}
        <div className="" onClick={() => setAdd(!add)}>
          Add Subscription
        </div>

        {add && (
          <>
            <TextField
              type="date"
              fullWidth
              label="start Date"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              margin="dense"
            />

            <TextField
              select
              fullWidth
              type="number"
              label="Plan Type"
              name="planType"
              value={planType}
              onChange={(e) => setPlanType(e.target.value as AppUserPlanType)}
              margin="dense"
            >
              {superPlans?.map((plan) => (
                <MenuItem key={plan?.id} value={plan?.type}>
                  {plan?.type}
                </MenuItem>
              ))}
            </TextField>
            <button onClick={handleAdd}>Add</button>
          </>
        )}

        {/* add form end*/}

        <DialogContent className="mt-2">
          {/* Table Display for Large Screens */}
          <div className="overflow-x-auto hidden sm:block bg-gray-900 text-white py-4 rounded-lg shadow-md">
            <table className="table-auto w-full border-collapse border border-gray-700 shadow-lg rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-800 text-left text-gray-300">
                  <th className="p-3 text-sm font-semibold">SN</th>
                  <th className="p-3 text-sm font-semibold">Plan Name</th>
                  <th className="p-3 text-sm font-semibold">Start Date</th>
                  <th className="p-3 text-sm font-semibold">End Date</th>
                  <th className="p-3 text-sm font-semibold">Price</th>
                  <th className="p-3 text-sm font-semibold">Status</th>
                  <th className="p-3 text-sm font-semibold text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(superSubscriptions) &&
                superSubscriptions.length > 0 ? (
                  superSubscriptions.map((data, index: number) => (
                    <tr
                      key={data?.id ?? index}
                      className="hover:bg-gray-700 border-t border-gray-600 transition-colors duration-200"
                    >
                      <td className="p-3 text-center text-sm">{index + 1}</td>
                      <td className="p-3 text-sm">{data?.type}</td>
                      <td className="p-3 text-sm">{data?.startDate}</td>
                      <td className="p-3 text-sm">{data?.endDate}</td>
                      <td className="p-3 text-sm">Rs {data?.originalPrice}</td>
                      <td className="p-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-md text-xs font-semibold ${
                            data?.status === MemberShipStaus.ACTIVE
                              ? "bg-green-600 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {data?.status}
                        </span>
                      </td>

                      <td className="p-3 text-center gap-2 flex">
                        <button
                          className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition"
                          onClick={() => handleCancel(data?.id)}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition"
                          onClick={() => handleActivate(data?.id)}
                        >
                          Activate
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="p-6 text-center text-red-500">
                      No subscriptions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile View: Card Layout */}
          <div className="sm:hidden flex flex-col gap-4 mt-4">
            {Array.isArray(superSubscriptions) &&
            superSubscriptions.length > 0 ? (
              superSubscriptions.map((data, index) => (
                <div
                  key={data?.id ?? index}
                  className="p-4 bg-gray-900 text-white rounded-lg shadow-md"
                >
                  <p className="text-sm font-semibold">Plan: {data?.type}</p>
                  <p className="text-xs">Start: {data?.startDate}</p>
                  <p className="text-xs">End: {data?.endDate}</p>
                  <p className="text-xs">Price: ${data?.originalPrice}</p>
                  <p className="text-xs">
                    Status:{" "}
                    <span
                      className={`font-semibold ${
                        data?.isActive ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {data?.isActive ? "Active" : "Inactive"}
                    </span>
                  </p>
                  <p className="text-xs">
                    Canceled: {data?.isCanceled ? "Yes" : "No"}
                  </p>
                  <button className="mt-2 w-full text-xs bg-red-600 hover:bg-red-700 text-white py-1 rounded-md">
                    Cancel Subscription
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-red-500">
                No subscriptions found.
              </p>
            )}
          </div>
        </DialogContent>

        <DialogActions className="p-4 flex justify-end">
          <button
            className="bg-gray-200 px-5 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
            onClick={() => setOpenSubscription(false)}
          >
            Close
          </button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default SuperAppUserSubscriptionModal;
