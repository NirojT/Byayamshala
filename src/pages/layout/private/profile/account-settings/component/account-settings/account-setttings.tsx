import { useNavigate } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { RiResetLeftLine } from "react-icons/ri";
import { useProfileStore } from "../../store";
import ConfirmResetBranchModal from "../reset-branch/confirm-reset-branch-modal";
import ReconfirmResetBranch from "../reset-branch/reconfirm-reset-branch";
import Back from "@/global/components/back/back";
import { Dumbbell, Info, Users } from "lucide-react";
import { BsDeviceHdd } from "react-icons/bs";
import { useSystemUserStore } from "@/pages/layout/private/systemuser/store";
import { SystemUserType } from "@/global/components/enums/enums";

const InnerAccountOptions = () => {
  const { currentSystemUser } = useSystemUserStore();
  const navigate = useNavigate();
  const { openConfirmReset, setOpenConfirmReset, openReConfirmReset } =
    useProfileStore();

  // All available options
  const allOptions = [
    {
      label: "Business Information",
      route: "update-account-info",
      icon: <Info className="w-5 h-5 text-[#E26300]" />,
      color: "from-amber-200 to-orange-100",
      ring: "ring-amber-100",
      userTypes: [SystemUserType.ADMIN, SystemUserType.STAFF], // Available for both admin and staff
    },
    {
      label: "Change Password",
      route: "change-password",
      icon: <FiLock className="w-5 h-5 text-[#E26300]" />,
      color: "from-orange-100 to-amber-200",
      ring: "ring-orange-100",
      userTypes: [SystemUserType.ADMIN], // Only for admin
    },
    {
      label: "Workout Plan",
      route: "/tenant/workoutplan",
      icon: <Dumbbell className="w-5 h-5 text-[#E26300]" />,
      color: "from-orange-100 to-yellow-100",
      ring: "ring-yellow-100",
      userTypes: [SystemUserType.STAFF, SystemUserType.ADMIN], // Available for both admin and staff
    },
    {
      label: "Biometrics",
      route: "/tenant/biometrics",
      icon: <BsDeviceHdd className="w-5 h-5 text-[#E26300]" />,
      color: "from-yellow-100 to-amber-100",
      ring: "ring-amber-100",
      userTypes: [SystemUserType.STAFF, SystemUserType.ADMIN], // Available for both admin and staff
    },
    {
      label: "System Users",
      route: "/tenant/system-users",
      icon: <Users className="w-5 h-5 text-[#E26300]" />,
      color: "from-yellow-100 to-amber-100",
      ring: "ring-amber-100",
      userTypes: [SystemUserType.ADMIN], // Only for admin
    },
  ];

  // Filter options based on current user type
  const filteredOptions = allOptions.filter((option) => {
    // If no current system user, show all options
    if (!currentSystemUser || !currentSystemUser.systemUserType) {
      return true; // Show all options when user is not present
    }

    // Check if current user type is in the allowed userTypes for this option
    return option.userTypes.includes(currentSystemUser.systemUserType);
  });

  // Check if user is admin for reset functionality
  // If no current user, allow reset functionality (show all options)
  const isAdmin =
    !currentSystemUser ||
    !currentSystemUser.systemUserType ||
    currentSystemUser?.systemUserType === SystemUserType.ADMIN;

  return (
    <div className="min-h-screen w-full relative overflow-hidden text-black font-poppins bg-gradient-to-br from-white via-orange-50 to-amber-100">
      {/* Glass Overlay for effect */}
      <div className="absolute inset-0 z-1 bg-white/80 backdrop-blur-lg pointer-events-none" />

      <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with back button */}
        <div className="w-full max-w-lg flex items-center mb-8 gap-4">
          <Back />
          <h2 className="text-2xl sm:text-3xl tracking-tight flex-1 pr-10 font-extrabold text-gray-800">
            Manage Your Account
          </h2>
        </div>

        {/* Options Container - glassy, with soft shadow */}
        <div className="w-full max-w-lg space-y-4 bg-white/90 border border-orange-200 rounded-2xl shadow-2xl backdrop-blur-md p-7">
          {filteredOptions.map(({ label, route, icon, color, ring }) => (
            <button
              key={label}
              onClick={() => navigate(route)}
              className={`w-full flex items-center justify-between rounded-xl px-6 py-5
                hover:bg-gradient-to-r hover:${color} border border-gray-200 hover:border-orange-300 transition-all duration-200 shadow-sm hover:shadow-lg group`}
            >
              <div className="flex items-center gap-4 text-left">
                <div
                  className={`p-2 bg-gradient-to-r ${color} rounded-lg ${ring} ring-2 ring-inset`}
                >
                  {icon}
                </div>
                <span className="text-base font-medium group-hover:text-[#E26300] transition-colors">
                  {label}
                </span>
              </div>
              <span className="text-lg text-[#E26300] opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                &rarr;
              </span>
            </button>
          ))}

          {/* Reset option - Show for admin or when no current user */}
          {isAdmin && (
            <button
              onClick={() => setOpenConfirmReset(true)}
              className="w-full flex items-center justify-between rounded-xl px-6 py-5
                bg-white border border-gray-200 hover:bg-gradient-to-r hover:from-red-100 hover:to-rose-100 hover:border-red-400 hover:shadow-lg group transition-all duration-200"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="p-2 bg-gradient-to-r from-red-100 to-rose-100 rounded-lg ring-2 ring-red-100 ring-inset">
                  <RiResetLeftLine className="w-5 h-5 text-red-500" />
                </div>
                <span className="text-base font-medium group-hover:text-red-600 transition-colors">
                  Reset
                </span>
              </div>
              <span className="text-lg text-red-500 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                &rarr;
              </span>
            </button>
          )}

          {/* Branch Info */}
          <div className="flex flex-col items-center space-y-3 text-xs pt-4 border-t border-orange-100">
            <div className="flex items-center space-x-2">
              <span className="tracking-wide text-gray-500">
                © {new Date().getFullYear()} • All settings changes are saved
                instantly
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {openConfirmReset && <ConfirmResetBranchModal />}
      {openReConfirmReset && <ReconfirmResetBranch />}
    </div>
  );
};

export default InnerAccountOptions;
