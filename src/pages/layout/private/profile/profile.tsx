import profile from "@/assets/profile.webp";
import { useGlobalStore } from "@/global/store";
import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaBuilding,
  FaCog,
  FaExchangeAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SwitchBranchModal from "./branches/switch-branch-modal";
import { GiHelp } from "react-icons/gi";
import { useAuthStore } from "@/pages/auth/store";
import { LogOut } from "lucide-react";
import { useBusinessDetailsStore } from "./account-settings/component/store";

// Utility for nice gradients
const getGradientForRole = (idx: number) => {
  const gradients = [
    "from-indigo-400 to-purple-400",
    "from-emerald-400 to-teal-400",
    "from-pink-400 to-rose-400",
    "from-orange-400 to-yellow-400",
  ];
  return gradients[idx % gradients.length];
};

const Profile = () => {
  const { appUser, getUserDetails } = useGlobalStore();
  const { data } = useBusinessDetailsStore();
  const { setIsLoggingOut } = useAuthStore();
  const { email, roles, currentBranch } = appUser;
  const navigate = useNavigate();
  const [openSwitchBranchModal, setOpenSwitchBranchModal] = useState(false);

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="min-h-screen py-10 px-3 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-blue-50 to-indigo-100 font-poppins">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Profile Card */}
        <div className="relative border border-gray-200/80 bg-white/90 rounded-3xl p-8 pt-12 shadow-2xl overflow-hidden">
          {/* Top Accent */}
          <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-[120%] h-32 bg-gradient-to-r from-indigo-300/60 via-sky-300/40 to-purple-200/50 blur-2xl rounded-b-3xl" />
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-32 h-32 mb-2">
              <img
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl ring-4 ring-indigo-200/80 transition-transform duration-300 hover:scale-105"
                src={data?.imageName || profile}
                alt="User profile"
              />
              <span className="absolute bottom-2 right-3 bg-green-400/80 rounded-full p-1 border-2 border-white shadow-lg">
                <FaCheckCircle className="text-white w-5 h-5" />
              </span>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-lg font-bold text-gray-800 tracking-tight">
                {email}
              </h2>
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {roles?.map((role, idx) => (
                  <span
                    key={role?.roleName}
                    className={`px-3 py-1 rounded-full bg-gradient-to-r ${getGradientForRole(
                      idx
                    )} text-xs font-semibold uppercase shadow-sm text-white tracking-wider border border-white/30`}
                  >
                    {role?.roleName}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Branch Info */}
          <div className="flex flex-col items-center gap-2 mt-8 text-gray-700 text-sm">
            <div className="flex items-center gap-2">
              <FaBuilding className="w-5 h-5 text-blue-500" />
              <span>
                <span className="font-semibold">Branch:</span> {currentBranch}
              </span>
            </div>
            <button
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium group transition-colors"
              onClick={() => setOpenSwitchBranchModal(!openSwitchBranchModal)}
            >
              <FaExchangeAlt className="w-4 h-4 transition-transform group-hover:rotate-180" />
              <span>Switch Branch</span>
            </button>
          </div>

          {/* Logout */}
          <div className="w-full mt-8">
            <button
              className="flex items-center justify-center gap-3 w-full py-3 bg-gradient-to-r from-rose-100 to-orange-100 hover:from-orange-200 hover:to-rose-200 text-gray-700 font-semibold rounded-xl shadow-md transition-all duration-200"
              title="Logout"
              onClick={() => setIsLoggingOut(true)}
            >
              <LogOut size={22} className="text-[#E26003]" />
              <span className="text-base">Logout</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid gap-5 sm:grid-cols-2 mt-2">
          <button
            onClick={() => navigate("plans")}
            className="group bg-white/80 border border-indigo-200 rounded-2xl p-5 hover:bg-gradient-to-br hover:from-indigo-100 hover:to-purple-50 hover:border-indigo-400 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-indigo-400/20 rounded-full">
                <FaBoxOpen className="w-6 h-6 text-indigo-500" />
              </div>
              <span className="font-medium text-lg text-indigo-700 group-hover:text-indigo-900">
                My Plans
              </span>
            </div>
          </button>
          <button
            onClick={() => navigate("account-settings")}
            className="group bg-white/80 border border-purple-200 rounded-2xl p-5 hover:bg-gradient-to-br hover:from-purple-100 hover:to-indigo-50 hover:border-purple-400 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-400/20 rounded-full">
                <FaCog className="w-6 h-6 text-purple-500" />
              </div>
              <span className="font-medium text-lg text-purple-700 group-hover:text-purple-900">
                Account Settings
              </span>
            </div>
          </button>
          <button
            onClick={() => navigate("archieved")}
            className="group bg-white/80 border border-emerald-200 rounded-2xl p-5 hover:bg-gradient-to-br hover:from-emerald-100 hover:to-green-50 hover:border-emerald-400 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-emerald-400/20 rounded-full">
                <FaCog className="w-6 h-6 text-emerald-500" />
              </div>
              <span className="font-medium text-lg text-emerald-700 group-hover:text-emerald-900">
                Archived
              </span>
            </div>
          </button>
          <button
            onClick={() => navigate("help")}
            className="group bg-white/80 border border-amber-200 rounded-2xl p-5 hover:bg-gradient-to-br hover:from-amber-100 hover:to-yellow-50 hover:border-amber-400 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-amber-400/20 rounded-full">
                <GiHelp className="w-6 h-6 text-amber-500" />
              </div>
              <span className="font-medium text-lg text-amber-700 group-hover:text-amber-900">
                Help
              </span>
            </div>
          </button>
        </div>
      </div>
      {openSwitchBranchModal && (
        <SwitchBranchModal onClose={() => setOpenSwitchBranchModal(false)} />
      )}
    </div>
  );
};

export default Profile;
