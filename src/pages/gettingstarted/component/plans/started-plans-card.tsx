import { AppUserPlanType } from "@/global/components/enums/enums";
import { ISuperPlansDetails } from "@/pages/layout/super/plans/interface";
import { Check, X } from "lucide-react";
import { useGettingStartedStore } from "../../store";

const StartedPlanCard = ({
  plan,
  onNext,
  referenceFacilities,
}: {
  plan: ISuperPlansDetails;
  onNext: () => void;
  referenceFacilities: string[];
}) => {
  // const allFacilities = [
  //   "Cafe Management",
  //   "Inventory Management",
  //   "Member Management",
  //   "WhatsApp Integration",
  //   "Advance Analytics",
  //   "Finance",
  // ];

  const getPlanStyles = () => {
    switch (plan?.type) {
      case AppUserPlanType.FREE_TRIAL:
        return {
          headerBg: "bg-[#f0f0f0]",
          borderAccent: "border-l-4 border-l-gray-400",
          titleEmphasis: "font-medium text-[#1A1A1A]",
          perfectFor: "Use for 3 days",
        };
      case AppUserPlanType.GOLD:
        return {
          headerBg: "bg-yellow-50",
          borderAccent: "border-l-4 border-l-yellow-400",
          titleEmphasis: "font-medium text-[#1A1A1A]",
          perfectFor: "Perfect for small and medium gyms",
        };
      default: // Assuming other plans are 'PLATINUM' or similar
        return {
          headerBg: "bg-blue-50",
          borderAccent: "border-l-4 border-l-blue-400",
          titleEmphasis: "font-medium text-[#1A1A1A]",
          perfectFor: "Perfect for large gyms with cafe and restaurant",
        };
    }
  };

  const { setSelectedPlan } = useGettingStartedStore();
  const styles = getPlanStyles();

  const handleSelectPlan = (plan: ISuperPlansDetails) => {
    setSelectedPlan(plan);
    onNext();
  };

  return (
    <div
      className={`w-96 bg-[#FAFAFA] text-[#2E2E2E] border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ${styles.borderAccent}`}
    >
      {/* Plan Header */}
      <div className={`${styles.headerBg} p-6 rounded-t-lg`}>
        <h2 className={`text-2xl ${styles.titleEmphasis}`}>
          {plan?.type} Plan
        </h2>
        <p className="text-[#2E2E2E] opacity-80 mt-1">{styles.perfectFor}</p>
      </div>

      {/* Pricing */}

      {}
   
<div className="p-6 border-b border-gray-100">
        <div className="text-3xl font-bold text-[#1A1A1A]">
          Rs {plan?.price}
            {plan?.type!==AppUserPlanType.FREE_TRIAL && ( <span className="text-lg font-normal opacity-75 ml-1">/year</span>)}
        </div>
      </div>

   
      

      {/* Features */}
      <div className="p-6">
        <div className="space-y-3 mb-6">
          {/* Included Features */}
          {plan?.features?.map((feature,index) => (
            <div key={index} className="flex items-center">
              <span className="mr-3 text-green-600">
                <Check size={18} strokeWidth={2.5} />
              </span>
              <span className="text-[#2E2E2E]">{feature}</span>
            </div>
          ))}

          {/* Not Included Features */}
          {referenceFacilities
            .filter((feature) => !plan?.features?.includes(feature))
            .map((feature,index) => (
              <div key={index} className="flex items-center opacity-60">
                <span className="mr-3 text-red-500">
                  <X size={18} strokeWidth={2.5} />
                </span>
                <span className="text-[#2E2E2E]">{feature}</span>
              </div>
            ))}
        </div>

        {/* Action Button */}
        <button
          className="w-full bg-[#E26300] text-white py-3 rounded-md font-medium hover:bg-[#d15a00] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E26300]"
          onClick={() => handleSelectPlan(plan)}
        >
          Select Plan
        </button>
      </div>
    </div>
  );
};

export default StartedPlanCard;
