import { GiCrossMark } from "react-icons/gi";
import { IMemberDetails, DetailItemProps } from "../../../interface";
import { useNavigate } from "react-router-dom";
import { Edit, PhoneCallIcon, Shield, ShieldCheck, Heart } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PrivateRoute } from "@/global/config";
import { BsGenderAmbiguous } from "react-icons/bs";
import { useRef, useState } from "react";
import { useListMemberStore } from "../../../store";
import { useGlobalStore } from "@/global/store";
import { motion } from "framer-motion";

const DetailItem: React.FC<DetailItemProps> = ({ label, value, status }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="group flex justify-between items-start py-4 px-4 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-300 border border-gray-100 hover:border-orange-200"
  >
    <dt className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
      {label}
    </dt>
    <dd
      className={`text-sm font-medium transition-colors ${
        status !== undefined
          ? status
            ? "text-emerald-600 font-semibold"
            : "text-rose-600 font-semibold"
          : "text-gray-800 group-hover:text-gray-900"
      }`}
    >
      {value ?? "N/A"}
    </dd>
  </motion.div>
);

const MemberProfileTop: React.FC<{ member: IMemberDetails }> = ({ member }) => {
  const [access, setAccess] = useState(member?.doorAccess);
  const { uploadProfileImage, doorControl } = useListMemberStore();
  const { setToasterData } = useGlobalStore();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleDoor = async (newAccess: boolean) => {
    const res = await doorControl(newAccess, member?.id);
    setToasterData({
      message: res?.message,
      severity: res?.severity,
      open: true,
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const res = await uploadProfileImage(file, member?.id);
    setToasterData({
      message: res?.message,
      severity: res?.severity,
      open: true,
    });
  };

  const handleToggle = () => {
    const newAccess = !access;
    if (!newAccess) {
      if (!window.confirm("Are you sure you want to revoke door access?"))
        return;
    }
    setAccess(newAccess);
    handleDoor(newAccess);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-blue-500/10"></div>

      <div className="relative p-8 lg:p-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 flex-1">
            {/* Profile Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative group cursor-pointer"
              onClick={handleImageClick}
            >
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />

              <div className="relative">
                {member?.profileImageName ? (
                  <img
                    src={member?.profileImageName}
                    alt={member?.fullName}
                    className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover border-4 border-orange-400 shadow-2xl group-hover:scale-105 transition-all duration-300"
                  />
                ) : (
                  <div className="w-36 h-36 flex items-center justify-center rounded-3xl border-4 border-orange-400 bg-gradient-to-br from-orange-50 to-orange-100 shadow-2xl group-hover:scale-105 transition-all duration-300">
                    <FaUser className="w-16 h-16 text-orange-400" />
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-end justify-center pb-3">
                  <span className="text-white text-xs font-semibold bg-black/50 px-3 py-1 rounded-full">
                    Click to change
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Profile Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6 flex-1"
            >
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent capitalize mb-2">
                  {member?.fullName}
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-300 border border-gray-100">
                    <MdEmail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 truncate">
                      {member?.email || "No email provided"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-300 border border-gray-100">
                    <PhoneCallIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      {member?.phone || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-300 border border-gray-100">
                    <BsGenderAmbiguous className="w-5 h-5 text-purple-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      {member?.gender || "N/A"}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/${PrivateRoute}/member-attendance`)
                    }
                    className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 transition-all duration-300 border border-pink-200 w-full group"
                  >
                    <div className="w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      View Attendance
                    </span>
                  </button>
                </div>
              </div>

              {/* Door Access Toggle */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 border border-gray-100">
                {access ? (
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
                ) : (
                  <Shield className="w-6 h-6 text-red-500" />
                )}
                <div className="flex-1">
                  <span className="text-sm font-semibold text-gray-700">
                    Door Access Control
                  </span>
                  <p className="text-xs text-gray-500">
                    Toggle to grant or revoke door access
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleToggle}
                  className={`relative inline-flex h-8 w-16 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/20 ${
                    access
                      ? "bg-emerald-500 shadow-lg shadow-emerald-500/25"
                      : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-7 w-7 rounded-full bg-white shadow-lg transform transition-transform duration-300 ${
                      access ? "translate-x-8" : "translate-x-0.5"
                    }`}
                  />
                </button>
                <span
                  className={`text-sm font-semibold ${
                    access ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {access ? "Allowed" : "Denied"}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={() =>
                navigate("/tenant/edit/gym/operation/members", {
                  state: member,
                })
              }
              className="p-3 bg-white/80 hover:bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 group"
              title="Edit profile"
            >
              <Edit className="w-6 h-6 text-gray-600 group-hover:text-orange-600 transition-colors" />
            </button>

            <button
              onClick={() => navigate(-1)}
              className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              title="Close"
            >
              <GiCrossMark className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Details Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {/* Personal Information Card */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <FaUser className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Personal Information
              </h3>
            </div>
            <div className="space-y-3">
              <DetailItem label="Address" value={member?.address} />
              <DetailItem
                label="Birth Date"
                value={
                  member?.birthDate
                    ? new Date(member?.birthDate).toLocaleDateString()
                    : "N/A"
                }
              />
              <DetailItem label="Blood Group" value={member?.bloodGroup} />
              <DetailItem label="Guardian Name" value={member?.guardianName} />
              <DetailItem label="Occupation" value={member?.occupation} />
            </div>
          </div>

          {/* Physical & Health Information Card */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Physical & Health
              </h3>
            </div>
            <div className="space-y-3">
              <DetailItem
                label="Height"
                value={member?.height ? `${member?.height} ft` : "N/A"}
              />
              <DetailItem
                label="Weight"
                value={member?.weight ? `${member?.weight} kg` : "N/A"}
              />
              <DetailItem
                label="Health Condition"
                value={member?.healthCondition}
              />
              <DetailItem
                label="Emergency Contact"
                value={member?.emergencyContact}
              />
            </div>
          </div>

          {/* Gym Information Card */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Gym Information
              </h3>
            </div>
            <div className="space-y-3">
              <DetailItem
                label="Joining Date"
                value={
                  member?.joiningDate
                    ? member?.joiningDate 
                    : "N/A"
                }
              />
              <DetailItem label="Shift" value={member?.shiftType} />
              <DetailItem
                label="Membership Status"
                value={member?.currentMemberShipExpired ? "Expired" : "Active"}
                status={!member?.currentMemberShipExpired}
              />
              <DetailItem label="Remarks" value={member?.remarks} />
              <DetailItem label="Card Number" value={member?.cardNumber} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MemberProfileTop;
