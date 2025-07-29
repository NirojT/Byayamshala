import { useNavigate } from "react-router-dom";
import { DetailItemProps } from "../../../interface";
import { useListMemberStore } from "../../../store";
import { PrivateRoute } from "@/global/config";
import { PartyType } from "@/global/components/enums/enums";
import { motion } from "framer-motion";
import { CreditCard, User, TrendingUp, Eye } from "lucide-react";

const MemberProfileFinances = () => {
  const navigate = useNavigate();
  const { memberFinance, member } = useListMemberStore();

  const handleNavigate = () => {
    navigate(`/${PrivateRoute}/party-accounts-transaction`, {
      state: { partyName: member?.fullName, partyType: PartyType.MEMBER },
    });
  };

  const DetailItem: React.FC<DetailItemProps> = ({ label, value, status }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group flex justify-between items-center py-4 px-4 rounded-xl bg-white/60 hover:bg-white/90 transition-all duration-300 border border-gray-100 hover:border-orange-200 hover:shadow-md"
    >
      <dt className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
        {label}
      </dt>
      <dd
        className={`text-sm font-bold transition-colors ${
          status !== undefined
            ? status
              ? "text-emerald-600"
              : "text-rose-600"
            : "text-gray-800 group-hover:text-gray-900"
        }`}
      >
        {value ?? "N/A"}
      </dd>
    </motion.div>
  );

  const imageUrl =
    member?.profileImageName ||
    "https://www.freeiconspng.com/uploads/gym-icon-png-gym-weight-icon-png-30.png";

  return (
    <div className="px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
      >
        {/* Finance Information Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                Financial Overview
              </h3>
              <p className="text-sm text-gray-600">Member account summary</p>
            </div>
          </div>

          <div className="space-y-4">
            <DetailItem
              label="Current Balance"
              value={`रु ${memberFinance?.amt || 0}`}
            />
            <DetailItem
              label="Account Status"
              value={memberFinance?.partyMoneyType || "Unknown"}
              status={memberFinance?.partyMoneyType === "SETTLED"}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNavigate}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 border border-blue-200 hover:border-blue-300 group"
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                  View Transaction History
                </span>
              </div>
              <Eye className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>

        {/* Profile Image Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center space-y-6"
        >
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/60 border border-gray-200 shadow-sm">
            <User className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">Profile</span>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative group"
          >
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              title="View profile image in full size"
            >
              <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-2xl">
                <img
                  src={imageUrl}
                  alt="Profile Image"
                  className="w-64 h-64 object-cover group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-xs font-semibold text-gray-800 text-center">
                    Profile Picture
                  </p>
                </div>
              </div>
            </a>
          </motion.div>

          <div className="text-center space-y-2">
            <p className="text-sm font-semibold text-gray-800">Member photo</p>
            <p className="text-xs text-gray-600">
              Click image to view full size
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MemberProfileFinances;
