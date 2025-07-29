import { useEffect, useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import PrivateAppBar from "./components/private_app_bar";
import { AppSidebar } from "./components/sidebar/sidebar";
import { SystemUserLoginModal } from "./systemuser/component/system-user-login-modal";
import { useSystemUserStore } from "./systemuser/store";

const PrivateLayout = () => {
  const {
    getSystemUsers,
    systemUsers,
    currentSystemUser,
    getSytemProfile, 
  } = useSystemUserStore();

  

  useEffect(() => {
    getSystemUsers();
  }, [getSystemUsers]);

  useLayoutEffect(() => {
    // Fetch system user profile on initial load
    getSytemProfile();
  }, [ ]);

  // Normal layout (no system users or logged in)
  return (
    <div className="flex w-full min-h-screen bg-[#FAFAFA]">
      <AppSidebar />
      <div className="flex flex-col flex-1 border-l-2">
        <PrivateAppBar />
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>

      {systemUsers?.length > 0 && !currentSystemUser && (
        <SystemUserLoginModal />
      )}
    </div>
  );
};

export default PrivateLayout;
