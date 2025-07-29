import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { useListMemberStore } from "../../store";

import MemberProfileTop from "./component/member-profile-top";
import MemberProfileFinances from "./component/member-profile-finances";
import MemberProfilePlanCard from "./component/member-profile-plan-card";
import { useGlobalStore } from "@/global/store";

const MemberProfile = () => {
  const { state } = useLocation();
  const { scrollPosition } = useGlobalStore();
  const { id, scrollDown } = state;

  const {
    member,
    getMemberById,
    getMemberShipByMemberId,
    getMemberFacilityByMemberId,
    currentSelect,
     
    getMemberFinance,
    
  } = useListMemberStore();

  const [expandedPlanIndex, setExpandedPlanIndex] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const togglePlanDetails = (index: number) => {
    setExpandedPlanIndex(expandedPlanIndex === index ? null : index);
  };
  useEffect(() => {
    if (!scrollDown) {
      
      window.scrollTo(0, scrollPosition);
    }
    
  }, [scrollPosition]);
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setIsLoading(true);
        try {
          await Promise.all([
            getMemberById(id),
            currentSelect === "membership" && getMemberShipByMemberId(id),
            currentSelect === "facility" && getMemberFacilityByMemberId(id),
            getMemberFinance(id),
          ]);
        } catch (error) {
          console.error("Error fetching member data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [id]);

 useEffect(() => {
   if (scrollDown) {
     setTimeout(() => {
       window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
     }, 100); // Delay ensures rendering is done
   }
 }, [scrollDown]);


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading member profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <MemberProfileTop member={member} />
          </motion.div>

          {/* Content Sections */}
          <div className="space-y-8 pb-8">
            {/* Member Finances */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <MemberProfileFinances />
            </motion.div>

            {/* Plan History */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <MemberProfilePlanCard
                
                expandedPlanIndex={expandedPlanIndex}
                togglePlanDetails={togglePlanDetails}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MemberProfile;
