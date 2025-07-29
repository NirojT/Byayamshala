import { useGlobalStore } from "@/global/store";
import { useState } from "react";
import { FiEdit2, FiPlus, FiRefreshCw } from "react-icons/fi";
import { useBranchStore } from "./store";

const BranchForm = () => {
  const { setToasterData } = useGlobalStore();
  const { data, setData, clear, create, update, setIsEditingBranch } =
    useBranchStore();
  const [isSubmitting] = useState(false);

  const handleBranch = async () => {
    if (!data?.name) {
      setToasterData({
        open: true,
        message: "Please add branch name",
        severity: "error",
      });
      return;
    }
    let res;
    if (data?.id > 0) {
      res = await update(data?.id);
    } else {
      res = await create();
    }

    if (res?.severity === "success") {
      clear();
    }
    setToasterData({
      open: true,
      message: res?.message,
      severity: res?.severity,
    });

    setIsEditingBranch(false);
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label
          htmlFor="branchName"
          className="block text-sm font-medium  dark:text-gray-300"
        >
          Branch Name
        </label>
        <input
          type="text"
          id="branchName"
          placeholder="Enter branch name"
          value={data?.name || ""}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="mt-1 block w-full px-3 py-2 text-black border border-gray-300   focus:outline-none rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
        />
      </div>
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium dark:text-gray-300"
        >
          Location
        </label>
        <input
          type="text"
          id="location"
          placeholder="Enter location"
          value={data?.location || ""}
          onChange={(e) => setData({ ...data, location: e.target.value })}
          className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 focus:outline-none rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
        />
      </div>
      <div className="sm:col-span-2 flex justify-end">
        <button
          onClick={handleBranch}
          disabled={isSubmitting}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors border-none focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            data?.id > 0
              ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
              : "bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-500"
          } ${isSubmitting ? "cursor-not-allowed opacity-70" : ""}`}
        >
          {isSubmitting ? (
            <FiRefreshCw className="animate-spin" />
          ) : data?.id > 0 ? (
            <>
              <FiEdit2 /> Update Branch
            </>
          ) : (
            <>
              <FiPlus /> Add Branch
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BranchForm;
