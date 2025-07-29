import { useState } from "react";
import { FaList } from "react-icons/fa";

import { IoLogOut } from "react-icons/io5";
import { MdInventory2 } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

import "./style.css";
import { useGlobalStore } from "../../../../../global/store";
import { PrivateRoute } from "../../../../../global/config";
import { AiTwotoneDashboard } from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { useAuthStore } from "@/pages/auth/store";

// font-mono delete from every side-menu bar
const Sidebar = () => {
  const navigate = useNavigate();
  // stores
  const { activeUrl, setActiveUrl, setToasterData } = useGlobalStore();
  const { logout } = useAuthStore();
  const [open, setOpen] = useState<boolean>(false);
  const logOutClick = async () => {
    setOpen(!open);
    const res = await logout();
    setToasterData({
      open: true,
      message: res?.message,
      severity: res?.severity,
    });
  };
  return (
    <>
      <div className="hidden md:flex md:flex-col md:min-w-[15em] lg:min-w-64 xl:min-w-[18em] px-4 py-2 h-screen   border-r sticky top-0">
        {/* <hr className="mt-2" /> */}
        <div className="flex flex-col items-center justify-between w-full h-full py-1 mt-3 text-white md:items-start">
          <div className="flex flex-col w-full gap-y-2">
            <div className="cards">
              {/* dashboard */}

              <div className="card">
                <div
                  className={`flex items-center justify-center w-full p-2 cursor-pointer select-none md:justify-start gap-x-2 delay-150 transition-[.5s] rounded-sm opacity-70 hover:opacity-100 ${
                    activeUrl === "dashboard" && "md:border opacity-100"
                  }`}
                  title="dashboard"
                  onClick={() => navigate(`/tenant/`)}
                >
                  <AiTwotoneDashboard
                    color="black"
                    className="w-8 h-8 border md:w-7 md:h-7"
                  />
                  <p className="hidden md:block text-[1.1rem] font-semibold tracking-wide">
                    Dashboard
                  </p>
                </div>
              </div>

              {/* Attendence section */}

              <div className="card">
                <div
                  className={`flex items-center justify-center w-full p-2 
                    cursor-pointer select-none md:justify-start gap-x-2 delay-150 transition-[.5s] rounded-sm 
                    opacity-70 hover:opacity-100 ${
                      activeUrl === "Attendence" && "md:border opacity-100"
                    }`}
                  title="Attendence"
                  onClick={() => navigate(`/${PrivateRoute}/attendance`)}
                >
                  <FaPeopleGroup className="border p- w-9 h-9 md:w-7 md:h-7 p-[.1rem]" />
                  <p className="hidden md:block text-[1.1rem] font-semibold tracking-wide">
                    Attendence
                  </p>
                </div>
              </div>

              {/* Add section */}

              <div className="card">
                <div
                  className={`flex items-center justify-center w-full p-2 cursor-pointer select-none md:justify-start gap-x-2 delay-150 transition-[.5s] rounded-sm opacity-70 hover:opacity-100 ${
                    activeUrl === "Add" && "md:border opacity-100"
                  }`}
                  title="Add"
                  onClick={() => navigate(`/${PrivateRoute}/add`)}
                >
                  <IoMdAdd className="w-8 h-8 border md:w-7 md:h-7" />
                  <p className="hidden md:block text-[1.1rem] font-semibold tracking-wide">
                    Add
                  </p>
                </div>
              </div>

              {/* modify section */}

              {/* <div className="card">
                <div
                  onClick={() => navigate(`/${PrivateRoute}/modify`)}
                  className={`flex items-center justify-center w-full p-2 cursor-pointer select-none md:justify-start gap-x-2 delay-150 transition-[.5s] rounded-sm opacity-70 hover:opacity-100 ${
                    activeUrl === "modify" && "md:border opacity-100"
                  }`}
                  title="modify"
                >
                  <FaRegEdit className="w-8 h-8 p-1 border md:w-7 md:h-7" />
                  <p className="hidden md:block text-[1.1rem] font-semibold tracking-wide">
                    Modify
                  </p>
                </div>
              </div> */}

              {/* List section */}

              <div className="card">
                <div
                  className={`flex items-center justify-center w-full p-2 cursor-pointer 
                    select-none md:justify-start gap-x-2 delay-150 transition-[.5s] 
                    rounded-sm opacity-70 hover:opacity-100 ${
                      activeUrl === "list" && "md:border opacity-100"
                    }`}
                  title="list"
                  onClick={() => navigate(`/${PrivateRoute}/list`)}
                >
                  <FaList className="w-8 h-8 p-1 border md:w-7 md:h-7 text-[1.1rem]" />
                  <p className="hidden md:block text-[1.1rem] font-semibold tracking-wide">
                    List
                  </p>
                </div>
              </div>

              {/* message section */}

              <div className="card">
                <div
                  className={`flex items-center justify-center w-full p-2 cursor-pointer 
                    select-none md:justify-start gap-x-2 delay-150 transition-[.5s] rounded-sm
                     opacity-70 hover:opacity-100 ${
                       activeUrl === "message" && "md:border opacity-100"
                     }`}
                  title="message"
                  onClick={() => navigate(`/${PrivateRoute}/message`)}
                >
                  <MdInventory2 className="w-8 h-8 p-1 border md:w-7 md:h-7" />
                  <p className="hidden md:block text-[1.1rem] font-semibold tracking-wide">
                    message
                  </p>
                </div>
              </div>
              {/* renew section */}

              <div className="card">
                <div
                  className={`flex items-center justify-center w-full p-2 cursor-pointer 
                    select-none md:justify-start gap-x-2 delay-150 transition-[.5s] rounded-sm
                     opacity-70 hover:opacity-100 ${
                       activeUrl === "renew" && "md:border opacity-100"
                     }`}
                  title="renew"
                  onClick={() => navigate(`/${PrivateRoute}/plans/operation`)}
                >
                  <MdInventory2 className="w-8 h-8 p-1 border md:w-7 md:h-7" />
                  <p className="hidden md:block text-[1.1rem] font-semibold tracking-wide">
                    renew
                  </p>
                </div>
              </div>
              {/* inventory section */}

              <div className="card">
                <div
                  className={`flex items-center justify-center w-full p-2 cursor-pointer 
                    select-none md:justify-start gap-x-2 delay-150 transition-[.5s] rounded-sm
                     opacity-70 hover:opacity-100 ${
                       activeUrl === "inventory" && "md:border opacity-100"
                     }`}
                  title="inventory"
                  onClick={() => navigate(`/${PrivateRoute}/inventory`)}
                >
                  <MdInventory2 className="w-8 h-8 p-1 border md:w-7 md:h-7" />
                  <p className="hidden md:block text-[1.1rem] font-semibold tracking-wide">
                    Inventory
                  </p>
                </div>
              </div>

              {/* Reports section */}

              <div className="card" onClick={() => setActiveUrl("reports")}>
                <div
                  className={`flex items-center justify-center w-full p-2 cursor-pointer select-none 
                    md:justify-start gap-x-2 delay-150 transition-[.5s] rounded-sm opacity-70 
                    hover:opacity-100 ${
                      activeUrl === "reports" && "md:border opacity-100"
                    }`}
                  title="reports"
                  onClick={() => navigate(`/${PrivateRoute}/reports`)}
                >
                  <TbReportSearch className="w-8 h-8 p-1 border md:w-7 md:h-7" />
                  <p className="hidden md:block text-[1.1rem] font-semibold tracking-wide">
                    Reports
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* logout section */}
          <div className="w-full py-2">
            <div
              className="flex items-center justify-center w-full p-2 cursor-pointer select-none md:justify-start gap-x-2 delay-150 transition-[.5s] opacity-70 hover:opacity-100"
              title="logout"
              onClick={() => logOutClick()}
            >
              <IoLogOut className="w-8 h-8 border md:w-7 md:h-7" />
              <p className="hidden md:block text-[1.1rem] font-semibold  tracking-wide">
                {" "}
                {/* font mono  */}
                Logout
              </p>
            </div>
            {/* {open && <LogOutClick open={open} setOpen={setOpen} />} */}

            {}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
