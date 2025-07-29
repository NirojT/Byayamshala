import { useListMembershipStore } from "@/pages/layout/private/reports/component/membership/store";
import { Gift, Trash2, Calendar, Clock, Dumbbell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronIconProps,
  FacilitySectionProps,
  IMemberFacilitiesDetails,
  IMemberships,
  MemberProfilePlanCardProps,
} from "../../../interface";
import MembershipDeleteModal from "./modal/membership-delete-modal";
import { useListMemberStore } from "../../../store";
import { FaServicestack } from "react-icons/fa";
import { useGlobalStore } from "@/global/store";

const FacilitySection = ({ title, facilities }: FacilitySectionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="space-y-4"
  >
    <h5 className="text-sm font-bold text-gray-700 flex items-center gap-2">
      <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
      {title}
    </h5>
    <div className="space-y-2">
      {facilities && facilities?.length > 0 ? (
        facilities?.map((facility, index) => (
          <motion.div
            key={facility?.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl text-sm border border-gray-200 hover:border-orange-200 hover:shadow-sm transition-all duration-200"
          >
            <span className="text-gray-700 font-medium">
              {facility?.facilityName}
            </span>
            <span className="text-orange-600 font-bold bg-orange-50 px-3 py-1 rounded-full">
              रु {facility?.price}
            </span>
          </motion.div>
        ))
      ) : (
        <p className="text-gray-400 text-sm italic text-center py-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          No {title.toLowerCase()}
        </p>
      )}
    </div>
  </motion.div>
);

const ChevronIcon = ({ isExpanded }: ChevronIconProps) => (
  <motion.svg
    animate={{ rotate: isExpanded ? 180 : 0 }}
    transition={{ duration: 0.3 }}
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
    />
  </motion.svg>
);

const MemberProfilePlanCard = ({
  expandedPlanIndex,
  togglePlanDetails,
}: MemberProfilePlanCardProps) => {
  const { openDelete, setOpenDelete, data, setData, deleteMemberFacility } =
    useListMembershipStore();
const {setToasterData}=useGlobalStore()
  const {
    currentSelect,
    setCurrentSelect,
    memberShips,
    memberFacilities,
    
  } = useListMemberStore();
  const handleDelete = (sub: IMemberships) => {
    setOpenDelete(true);
    setData(sub);
  };

  const handleCurrentSelect = () => {
    setCurrentSelect(
      currentSelect === "membership" ? "facility" : "membership"
    );
    console.log(currentSelect); // This will log the **old** value
  };

  const handleDeleteFacility = async(facility: IMemberFacilitiesDetails) => {
    if (confirm("Are you sure you want to delete this facility?")) {
      const res = await deleteMemberFacility(facility?.id);
      setToasterData({
        severity: res?.severity  ,
        message: res?.message,
        open: true,
        
      });
    }
  };

  return (
    <div className="px-8 pb-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover:bg-purple-700 cursor-pointer transition-all duration-300"
            onClick={handleCurrentSelect}
          >
            {currentSelect === "membership" ? (
              <Dumbbell className="w-6 h-6 text-white" />
            ) : (
              <FaServicestack className="w-6 h-6 text-white" />
            )}
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              {currentSelect === "membership" ? "Membership" : "Facility"}{" "}
              History
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg"
              >
                {currentSelect === "membership" ? memberShips?.length || 0 : memberFacilities?.length || 0}
              </motion.span>
            </h3>
            <p className="text-gray-600 mt-1">
              Track all{" "}
              {currentSelect === "membership" ? "membership" : "facility"} plans
              and history
            </p>
          </div>
        </div>
      </motion.div>

      {/* Plans Grid */}
      {currentSelect === "membership" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {memberShips?.map((sub, index) => (
            <motion.div
              key={sub?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200 overflow-hidden"
            >
              {/* Plan Header */}
              <div
                className={`p-6 relative overflow-hidden ${
                  sub?.memberShipStatus === "ACTIVE"
                    ? "bg-gradient-to-br from-emerald-50 via-emerald-100 to-green-50"
                    : "bg-gradient-to-br from-red-50 via-red-100 to-rose-50"
                }`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-full"></div>
                  <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white rounded-full"></div>
                </div>

                <div className="relative flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-800 capitalize mb-2">
                      {sub?.planName}
                    </h4>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600 font-medium">
                        {sub?.remainingDays} days remaining
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm ${
                        sub?.memberShipStatus === "ACTIVE"
                          ? "bg-emerald-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {sub?.memberShipStatus}
                    </motion.span>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => handleDelete(sub)}
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-200 border border-red-200"
                      title="Delete membership record"
                      disabled={openDelete}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Plan Body */}
              <div className="p-6 space-y-6">
                <AnimatePresence>
                  {expandedPlanIndex === index ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <FacilitySection
                        title="Included Facilities"
                        facilities={sub?.facilities}
                      />

                      {/* Price & Discount Info */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-5 space-y-3 shadow-sm"
                      >
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 font-semibold text-gray-700">
                            <Clock className="w-4 h-4" />
                            Base Price:
                          </span>
                          <span className="font-bold text-orange-700 text-lg">
                            रु {sub?.price + sub?.discount}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 font-semibold text-gray-700">
                            <Gift className="w-4 h-4 text-emerald-500" />
                            Discount Applied:
                          </span>
                          <span className="font-bold text-emerald-600 text-lg">
                            - रु {sub?.discount || 0}
                          </span>
                        </div>

                        <div className="border-t-2 border-orange-300 pt-3 mt-3">
                          <div className="flex items-center justify-between text-lg font-bold">
                            <span className="text-orange-800">
                              Final Amount
                            </span>
                            <span className="text-orange-800 bg-white px-3 py-1 rounded-full shadow-sm">
                              रु {sub?.price}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                        <p className="text-gray-500 text-xs font-semibold mb-1">
                          Start Date
                        </p>
                        <p className="font-bold text-gray-800 text-sm">
                          {sub?.membershipStartDate}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                        <p className="text-gray-500 text-xs font-semibold mb-1">
                          End Date
                        </p>
                        <p className="font-bold text-gray-800 text-sm">
                          {sub?.membershipEndDate}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Toggle Button */}
              <motion.button
                whileHover={{ backgroundColor: "rgb(255 247 237)" }}
                onClick={() => togglePlanDetails(index)}
                className="w-full border-t border-gray-200 p-4 transition-all duration-300 group-hover:border-orange-200"
              >
                <div className="flex items-center justify-center gap-3 text-orange-600 font-bold">
                  {expandedPlanIndex === index
                    ? "Hide Details"
                    : "View Details"}
                  <ChevronIcon isExpanded={expandedPlanIndex === index} />
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>
      ) : (
        //for facility
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {memberFacilities?.map((facility, index) => (
            <motion.div
              key={facility?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200 overflow-hidden"
            >
              {/* Plan Header */}
              <div
                className={`p-6 relative overflow-hidden ${
                  facility?.memberShipStatus === "ACTIVE"
                    ? "bg-gradient-to-br from-emerald-50 via-emerald-100 to-green-50"
                    : "bg-gradient-to-br from-red-50 via-red-100 to-rose-50"
                }`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-full"></div>
                  <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white rounded-full"></div>
                </div>

                <div className="relative flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-800 capitalize mb-2">
                      {facility?.facilityName}
                    </h4>
                   
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm ${
                        facility?.memberShipStatus === "ACTIVE"
                          ? "bg-emerald-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {facility?.memberShipStatus}
                    </motion.span>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      //alert instead of modal
                      onClick={() => {
                        
                          handleDeleteFacility(facility);
                        }}
                    
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-200 border border-red-200"
                      title="Delete membership record"
                      disabled={openDelete}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Plan Body */}
              <div className="p-6 space-y-6">
                <AnimatePresence>
                  {expandedPlanIndex === index ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                     

                      {/* Price & Discount Info */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-5 space-y-3 shadow-sm"
                      >
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 font-semibold text-gray-700">
                            <Clock className="w-4 h-4" />
                            Base Price:
                          </span>
                          <span className="font-bold text-orange-700 text-lg">
                            रु {facility?.price + facility?.discount}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 font-semibold text-gray-700">
                            <Gift className="w-4 h-4 text-emerald-500" />
                            Discount Applied:
                          </span>
                          <span className="font-bold text-emerald-600 text-lg">
                            - रु {facility?.discount || 0}
                          </span>
                        </div>

                        <div className="border-t-2 border-orange-300 pt-3 mt-3">
                          <div className="flex items-center justify-between text-lg font-bold">
                            <span className="text-orange-800">
                              Final Amount
                            </span>
                            <span className="text-orange-800 bg-white px-3 py-1 rounded-full shadow-sm">
                              रु {facility?.price}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                        <p className="text-gray-500 text-xs font-semibold mb-1">
                          Start Date
                        </p>
                        <p className="font-bold text-gray-800 text-sm">
                          {facility?.facilityStartDate}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                        <p className="text-gray-500 text-xs font-semibold mb-1">
                          End Date
                        </p>
                        <p className="font-bold text-gray-800 text-sm">
                          {facility?.facilityEndDate}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {(!memberShips || memberShips.length === 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Dumbbell className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-600 mb-2">
            No {currentSelect === "membership" ? "Membership" : "Facility"}{" "}
            History
          </h3>
          <p className="text-gray-500">
            This member hasn't enrolled in any plans yet.
          </p>
        </motion.div>
      )}

      {openDelete && data && <MembershipDeleteModal />}
    </div>
  );
};

export default MemberProfilePlanCard;
