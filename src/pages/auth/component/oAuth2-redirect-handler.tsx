import {
  AppUserPlanType,
  MemberShipStatus,
} from "@/global/components/enums/enums";
import CoolSpinner from "@/global/components/loader/suspense-loader";
import { IRoleDetails } from "@/global/interface";
import { useGlobalStore } from "@/global/store";
import { useEffect } from "react";
import { useAuthStore } from "../store";
import { useNavigate } from "react-router-dom";

const OAuth2RedirectHandler = () => {
  const { setAppUser, appUser } = useGlobalStore();
  const { setInfoMsg, setOpenInfo } = useAuthStore();
  const navigate=useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // getting the appUserId from params and changing it's type to match global appuser.id
    const id = Number(params.get("appUserId"));
    const email = params.get("email");
    const isNewStr = params.get("isNew");
    const roleStr = params.get("role") || "";
    const statusStr = params.get("status") || "";
    const planTypeStr = params.get("planType") || "";
    const currentBranch = params.get("currentBranch") || "";
    const error = params.get("error") || "";

    const isNew = isNewStr === "true" ? true : false;
    // Extract roles as an array if available


    //if subscription error is present
    if (error?.includes("subscription")) {
      setOpenInfo(true);
       setInfoMsg(error);
        navigate("/oauth2/error", { state: { error } });
      return;
    }

    if (email) {
      const roles = roleStr?.split(",");
      setAppUser({
        ...appUser,
        id,
        email,
        isNew,
        currentBranch,
        roles: roles?.map(
          (role: string) => ({ roleName: role } as IRoleDetails)
        ),
        subscriptionStatus: statusStr as MemberShipStatus,
        planType: planTypeStr as AppUserPlanType,
      });
    }
  }, []);

  return (
    <div>
      <CoolSpinner />
    </div>
  );
};

export default OAuth2RedirectHandler;
