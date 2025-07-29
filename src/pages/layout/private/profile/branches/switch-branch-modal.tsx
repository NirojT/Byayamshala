import { useGlobalStore } from "@/global/store";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { FiEdit2, FiMapPin, FiRefreshCw, FiX } from "react-icons/fi";
import BranchForm from "./branch-form";
import { IBranchDetails } from "./interface";
import { useBranchStore } from "./store";
import { RotateCw } from "lucide-react";
import ShadtoolTip from "./components/edit-tooltip";
import BranchSwitchAnimation from "./components/branch-switch-animation";

// Helper for nice color badge
const getBranchBadge = (isCurrent: boolean) =>
  isCurrent
    ? "inline-block px-2 py-1 rounded bg-gradient-to-r from-blue-400 to-indigo-400 text-xs text-white font-semibold shadow-sm ml-2"
    : "";

const SwitchBranchModal = ({ onClose }: { onClose: () => void }) => {
  const {
    branches,
    getBranches,
    setData,
    switchBranch,
    isSubmitting,
    setIsSubmitting,
    searchTerm,
    setSearchTerm,
    animationData,
    setAnimationData,
    isEditingBranch,
    setIsEditingBranch,
  } = useBranchStore();

  const { setToasterData, appUser } = useGlobalStore();

  const filteredBranches = branches?.filter(
    (branch) =>
      branch?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      branch?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleEdit = (branch: IBranchDetails) => {
    setIsEditingBranch(!isEditingBranch);
    setData({
      id: branch?.id,
      name: branch?.name,
      location: branch?.location,
    });
  };

  const handleSwitch = async (id: number) => {
    setIsSubmitting(true);

    // Find the branch name for animation display
    const branch = branches.find((b) => b.id === id);

    // Start animation before making API call
    setAnimationData({
      isAnimating: true,
      branchId: id,
      branchName: branch?.name || "",
    });
  };

  // This will be called when the animation completes
  const handleAnimationComplete = async () => {
    try {
      // Make the actual API call after animation showed
      const res = await switchBranch(animationData?.branchId as number);

      // Reset animation state
      setAnimationData({
        isAnimating: false,
        branchId: null,
        branchName: "",
      });

      // Show success message
      setToasterData({
        open: true,
        message: res?.message,
        severity: res?.severity,
      });

      if (res?.severity === "success") {
        onClose();
      }
    } catch (error:any) {
      console.log(error)
      // Handle error
      setAnimationData({
        isAnimating: false,
        branchId: null,
        branchName: "",
      });

      setToasterData({
        open: true,
        message: "Failed to switch branch",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    getBranches();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {/* Branch Switch Animation Component */}
      <BranchSwitchAnimation
        isAnimating={animationData.isAnimating}
        onAnimationComplete={handleAnimationComplete}
        branchName={animationData.branchName}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gradient-to-br from-white/70 via-blue-50/60 to-indigo-100/70 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-indigo-100/50"
        >
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gradient-to-r from-indigo-50/60 to-blue-100/30 dark:from-gray-800 dark:to-gray-900">
            <h2 className="text-xl font-extrabold text-gray-800 dark:text-white tracking-tight">
              Manage Gym Branches
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 transition"
              aria-label="Close"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Add/Edit Branch Form */}
            {branches?.length < 3 || isEditingBranch ? (
              <BranchForm />
            ) : (
              <p className="text-red-500 text-center font-semibold">
                Max branches have been created
              </p>
            )}

            {/* Search */}
            <div className="relative mt-2">
              <input
                type="text"
                placeholder="Search branches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 dark:bg-gray-800 dark:text-gray-200 bg-gray-50"
              />
              <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300" />
            </div>

            {/* Branch List Table */}
            <div className="overflow-y-auto max-h-[32rem] w-full rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm bg-white/80 dark:bg-gray-800/80">
              <table className="w-full table-auto text-left">
                <thead className="sticky top-0 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 z-10">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Branch</th>
                    <th className="px-4 py-3 font-semibold">Location</th>
                    <th className="px-4 py-3 font-semibold">Added At</th>
                    <th className="px-4 py-3 font-semibold text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  <AnimatePresence>
                    {filteredBranches?.length ? (
                      filteredBranches.map((branch) => {
                        const isCurrent =
                          appUser?.currentBranch === branch?.name;
                        return (
                          <motion.tr
                            key={branch?.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              scale:
                                animationData.branchId === branch.id
                                  ? [1, 1.02, 1]
                                  : 1,
                              backgroundColor:
                                animationData.branchId === branch.id
                                  ? ["", "rgba(99, 102, 241, 0.12)", ""]
                                  : "",
                            }}
                            transition={{
                              duration: 0.3,
                              backgroundColor: { duration: 0.3 },
                            }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`hover:bg-indigo-50 dark:hover:bg-gray-900 transition-colors ${
                              isCurrent
                                ? "bg-gradient-to-r from-indigo-100 to-blue-50 dark:from-blue-900/30 dark:to-indigo-900/20 font-bold"
                                : ""
                            }`}
                          >
                            <td className="px-4 py-3 font-medium">
                              {branch?.name}
                              {isCurrent && (
                                <span className={getBranchBadge(true)}>
                                  Current
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                              {branch?.location}
                            </td>
                            <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                              {branch?.createdNepDate}
                            </td>
                            <td className="px-4 py-3 flex text-right space-x-2">
                              <button
                                onClick={() => handleEdit(branch)}
                                disabled={isSubmitting}
                                className="p-2 text-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 transition"
                                aria-label="Edit branch"
                              >
                                <ShadtoolTip
                                  tooltipTitle="Edit branch"
                                  icon={<FiEdit2 />}
                                />
                              </button>
                              <button
                                onClick={() => handleSwitch(branch?.id)}
                                disabled={isSubmitting}
                                className="p-2 text-green-500 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600 transition"
                                aria-label="Switch to branch"
                              >
                                {isSubmitting &&
                                animationData.branchId === branch.id ? (
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{
                                      duration: 0.8,
                                      repeat: Infinity,
                                      ease: "linear",
                                    }}
                                  >
                                    <ShadtoolTip
                                      tooltipTitle="Switching..."
                                      icon={<FiRefreshCw />}
                                    />
                                  </motion.div>
                                ) : (
                                  <ShadtoolTip
                                    tooltipTitle="Switch branch"
                                    icon={<RotateCw />}
                                  />
                                )}
                              </button>
                            </td>
                          </motion.tr>
                        );
                      })
                    ) : (
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-indigo-50 dark:hover:bg-gray-900"
                      >
                        <td
                          colSpan={4}
                          className="px-4 py-6 text-center text-gray-400"
                        >
                          No branches found.
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-5 border-t border-gray-100 dark:border-gray-800 flex justify-end bg-gradient-to-r from-indigo-50/60 to-blue-100/30 dark:from-gray-800 dark:to-gray-900">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 transition"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default SwitchBranchModal;
