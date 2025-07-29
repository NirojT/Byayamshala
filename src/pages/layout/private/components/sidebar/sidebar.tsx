import { Sidebar, SidebarContent, SidebarGroup } from "@/components/ui/sidebar";

import { useGlobalStore } from "@/global/store";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBusinessDetailsStore } from "../../profile/account-settings/component/store";
import { useProfileStore } from "../../profile/account-settings/store";
import { useOpenUserProfile } from "../../store/privatestore";
import { items } from "./menuItems";
import { useSystemUserStore } from "../../systemuser/store";
import { BusinessName } from "@/global/config";

export function AppSidebar() {
  const { activeUrl, setActiveUrl, getUserDetails } = useGlobalStore();
  const { data } = useBusinessDetailsStore();

  const { setIsProfileOpen } = useOpenUserProfile();
  const { setOpenBusinessDetails } = useProfileStore();

  const { currentSystemUser } = useSystemUserStore();

  const handleClearProfile = () => {
    setIsProfileOpen(false);
    setOpenBusinessDetails("");
  };

  useEffect(() => {
    setActiveUrl(window.location.href);
    const pathSegments = window.location.pathname.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];

    if (lastSegment === "tenant") {
      setActiveUrl("/" + lastSegment);
      return;
    }

    setActiveUrl("/tenant/" + lastSegment);
  }, []);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getBusinessInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Filter items based on current system user's access
  const filteredItems = items.filter((item) => {
    // If no current system user or no access defined, show all items (fallback)
    if (
      !currentSystemUser ||
      !currentSystemUser.access ||
      currentSystemUser.access.length === 0
    ) {
      return true;
    }

    // Check if the item title is in the user's access array
    return currentSystemUser.access.includes(item?.title);
  });

 

  return (
    <Sidebar className="h-full overflow-hidden font-poppins w-[16.1em]">
      <SidebarContent
        className="bg-white border-r border-gray-200 scrollbar-hide"
        style={{
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* Internet Explorer and Edge */,
        }}
      >
        <SidebarGroup className="flex flex-col h-full scrollbar-hide">
          {/* Header */}
          <div className="flex items-center p-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {getBusinessInitials(
                    currentSystemUser?.userName || data?.businessName || "GU"
                  )}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-base truncate">
                  {currentSystemUser?.userName ||
                    data?.businessName?.slice(0, 15) ||
                    BusinessName}
                </h3>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div
            className="flex-1 py-6 px-4 space-y-3 overflow-y-auto scrollbar-hide"
            style={{
              scrollbarWidth: "none" /* Firefox */,
              msOverflowStyle: "none" /* Internet Explorer and Edge */,
            }}
          >
            {filteredItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                onClick={handleClearProfile}
                className="block"
              >
                <div
                  onClick={() => setActiveUrl(item.url)}
                  className={`relative flex items-center gap-4 p-3 rounded-lg transition-all cursor-pointer
                    ${
                      activeUrl === item.url
                        ? "bg-orange-500 text-white"
                        : "hover:bg-orange-50 text-gray-700 hover:text-orange-600"
                    }`}
                >
                  <item.icon
                    size={20}
                    className={`
                      ${
                        activeUrl === item.url ? "text-white" : "text-gray-600"
                      }`}
                  />

                  <span
                    className={`font-medium text-sm
                      ${
                        activeUrl === item.url ? "text-white" : "text-gray-700"
                      }`}
                  >
                    {item.title}
                  </span>
                </div>
              </Link>
            ))}

            {/* Cafe Button - Only show if user has access */}
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
