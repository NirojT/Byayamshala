import { AppUserPlanType } from "@/global/components/enums/enums";
import { useAuthStore } from "@/pages/auth/store";
import { useSuperPlansStore } from "@/pages/layout/super/plans/store";
import { LogOut } from "lucide-react";
import { useEffect } from "react";
import StartedPlanCard from "../plans/started-plans-card";

const GettingStartedPlans = ({ onNext }: { onNext: () => void }) => {
  const { superPlans, getSuperPlans } = useSuperPlansStore();
  const { logout } = useAuthStore();
  const referenceFacilities =
    (superPlans &&
      superPlans?.length > 0 &&
      superPlans
        ?.filter((plan) => plan?.type === AppUserPlanType.PLATINUM)
        .map((plan) => plan?.features)
        .flat()) ||
    [];

  useEffect(() => {
    getSuperPlans();
  }, [getSuperPlans]);

  const handleLogout = async () => {
 const res=   await logout();
    if (res?.severity === "success") {
      window.location.href = "/";
    }
  }

  return (
    <div className="flex flex-col items-center justify-center mt-auto mb-auto bg-[#FAFAFA] text-[#2E2E2E] ">
      <div className="w-full group mt-auto">
        <button
          className="flex items-center justify-start w-full p-3 cursor-pointer gap-4 hover:scale-105 transition-all duration-300 ease-in-out rounded-lg"
          title="Logout"
          onClick={handleLogout}
        >
          <LogOut
            size={22}
            className="text-[#2E2E2E]duration-300 hover:text-[#E26003]"
          />
          <span className="text-base text-[#2E2E2E] duration-300 hover:text-[#E26003] ">
            Logout
          </span>
        </button>
      </div>
      <h1 className="text-center text-4xl font-semibold tracking-widest mb-8">
        Choose Your Plan
      </h1>

      <div className="grid  md:grid-cols-2 lg:grid-cols-3   gap-[17em]">
        {superPlans.map((plan, index) => (
          <StartedPlanCard
            key={index}
            plan={plan}
            onNext={onNext}
            referenceFacilities={referenceFacilities}
          />
        ))}
      </div>
    </div>
  );
};

export default GettingStartedPlans;
