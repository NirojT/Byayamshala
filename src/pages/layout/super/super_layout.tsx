import { Outlet } from "react-router-dom";

import MobileNavigation from "../private/navigation/super-appUser-mobile-navigation";
import PrivateSuperAppBar from "./components/private-super-app-bar";
import { SuperSidebar } from "./components/sidebar/super-sidebar";
import { useOpenHamburgerNavigationSuper } from "./store/privatestore";

const SuperLayout = () => {
  // get the current state of the hamburger in smaller screens
  // initially false, when the user clicks the hamburger icons the content of outlet is set to hidden and
  // navigation to different links is displayed.
  const { isOpen } = useOpenHamburgerNavigationSuper();

  return (
    <div className="flex flex-row justify-center items-center w-[100%] rounded-lg bg-[#FAFAFA]  ">
      <SuperSidebar />
      <div className="w-full border-2">
        <PrivateSuperAppBar />
        {/* render a navigation menu when user click the hamburger icon from the <PrivateAppBar/> 
      and hide the component loaded in the outlet in smaller screens  only*/}
        <div className="rounded min-h-screen">
          {isOpen ? <MobileNavigation /> : <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default SuperLayout;
