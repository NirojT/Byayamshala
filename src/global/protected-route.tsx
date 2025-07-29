import { Navigate, Outlet } from "react-router-dom";
import { useGlobalStore } from "../global/store";
import { AppUserRoles, MemberShipStatus } from "./components/enums/enums";
import { useEffect } from "react";
import { useAuthStore } from "@/pages/auth/store";

interface ProtectedRouteProps {
  allowedRoles: AppUserRoles[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { appUser } = useGlobalStore();
  const { checkAuth } = useAuthStore();

  // Periodically check authentication status every 60 minutes
  useEffect(() => {
    const authCheckInterval = setInterval(() => {
      checkAuth();
    
   }, 60 * 60 * 1000); // 60 minutes

    return () => clearInterval(authCheckInterval); // Clean up interval on unmount
  }, [checkAuth]);

  // Helper function to check if the user has permission
  const hasPermission = appUser.roles.some((role) =>
    allowedRoles.includes(role.roleName)
  );

  // Helper function to check if the user is a super admin
  const isSuperAdmin = appUser.roles.some(
    (role) => role.roleName === AppUserRoles.ROLE_SUPER_ADMIN
  );

  // Helper function to check if the user is an admin
  const isAdmin = appUser.roles.some(
    (role) => role.roleName === AppUserRoles.ROLE_ADMIN
  );

  // Helper function to check if the subscription is active
  const isSubscriptionActive =
    appUser.subscriptionStatus === MemberShipStatus.ACTIVE;

  // Redirect if the user is not authenticated
  if (!appUser.email) return <Navigate to="/auth" replace />;

  // If the user is new and is an admin, navigate to getting started
  if (isAdmin && appUser.isNew) {
    return <Navigate to="/getting-started" replace />;
  }

  // Restrict access if the subscription is not active
  if (!isSuperAdmin && !isSubscriptionActive) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render the Outlet if the user has permission, otherwise redirect to unauthorized
  return hasPermission ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
