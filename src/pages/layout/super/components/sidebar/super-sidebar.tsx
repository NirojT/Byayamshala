import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useGlobalStore } from "@/global/store";
import { useAuthStore } from "@/pages/auth/store";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { superNavigationItems } from "./super-appUser-navigation";

export function SuperSidebar() {
  const [open, setOpen] = useState<boolean>(false);
  const { setToasterData } = useGlobalStore();
  const { logout } = useAuthStore();

  const logOutClick = async () => {
    setOpen(!open);
    const res = await logout();
    setToasterData({
      open: true,
      message: res?.message,
      severity: res?.severity,
    });
    if (res?.severity === "success") {
      window.location.href = "/";
    }
  };

  return (
    <Sidebar className="">
      <SidebarContent className="bg-[#FAFAFA] text-black">
        <SidebarGroup className="flex items-center h-full">
          {/* text-[#E26003] 
                    border-b-2
                    */}
          <SidebarGroupLabel className="text-2xl mb-2 h-22 w-full">
            <span className="ml-auto mr-auto mb-2 ">
            Gym Udaan
            </span>
          </SidebarGroupLabel>
          <div className="flex flex-col   justify-around h-full ">
            {superNavigationItems.map((item) => (
              <Link key={item.title} to={item.url}>
                <SidebarGroupContent key={item.title} className="">
                  <SidebarMenu className="flex justify-evenly items-center w-full">
                    <SidebarMenuItem className=" hover:scale-105 transition-transform duration-300 ease-in-out w-full">
                      <div className="flex  gap-2 items-center justify-center px-3 py-4">
                        <item.icon size={22} className="" />
                        <span className="text-base ">
                          {item.title}
                        </span>
                      </div>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </Link>
            ))}
            <div className="w-full">
              <button
                className="flex items-center justify-center w-full p-2 cursor-pointer select-none md:justify-start gap-x-2 delay-150  hover:scale-105 transition-transform duration-300 ease-in-out"
                title="logout"
                onClick={() => logOutClick()}
              >
                <LogOut size={22} className="text-black" />
                <p className="ml-4 text-base ">Logout</p>
              </button>
              {/* {open && <LogOutClick open={open} setOpen={setOpen} />} */}
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
