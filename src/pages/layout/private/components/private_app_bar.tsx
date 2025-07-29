import { BusinessName, PrivateRoute } from "@/global/config";
import { useAuthStore } from "@/pages/auth/store";
import {
  useMobileNavigationStore,
  useOpenHamburgerNavigation,
  useOpenUserProfile,
} from "@/pages/layout/private/store/privatestore";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Building2,
  Calendar, 
  // QrCode,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  FiChevronDown,
  FiClock,
  FiMenu,
  FiUser,
  FiWifi,
  FiX,
} from "react-icons/fi";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import gymLogo from "../../../../assets/gymhero.jpg";
import LogoutModal from "../navigation/mobile-logout-modal";
import { navigation } from "../navigation/private-app-navigation";
import { useBusinessDetailsStore } from "../profile/account-settings/component/store";

import { TransactionBell } from "./transaction/transaction-modal2";
import { useSystemUserStore } from "../systemuser/store";
import { useGlobalStore } from "@/global/store";

/**
 * PrivateAppBar - Modern, compact navigation bar with enhanced UX
 */
const PrivateAppBar = () => {
  const { isOpen, setIsOpen } = useOpenHamburgerNavigation();
  const { isLoggingOut } = useAuthStore();
  const navigate = useNavigate();
  const { activeUrl, setActiveUrl } = useMobileNavigationStore();
  const { isOpenTransaction, setIsOpenTransaction } = useOpenUserProfile();
  const { getBusinessDetails, data } = useBusinessDetailsStore();
 
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { setToasterData } = useGlobalStore();
  const { currentSystemUser, logoutSystemUser } = useSystemUserStore();
  // Get current time for display
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleHamburgerClick = () => setIsOpen(!isOpen);

  function goToProfile() {
    navigate("profile");
    setShowUserMenu(false);
  }

  function navigateTo(link: string) {
    setIsOpen(false);
    navigate(link);
  }

  // Handle Shift Off action or logut
  async function handleShiftOff() {
    const res = await logoutSystemUser();
    setToasterData({
      severity: res?.severity,
      message: res?.message,
      open: true,
    });
  }

  const getBusinessInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };
  // Filter items based on current system user's access
  const filteredItems = navigation.filter((item) => {
    // If no current system user or no access defined, show all items (fallback)
    if (
      !currentSystemUser ||
      !currentSystemUser.access ||
      currentSystemUser.access.length === 0
    ) {
      return true;
    }

    // Check if the item title is in the user's access array
    return currentSystemUser.access.includes(item?.to);
  });
  useEffect(() => {
    setActiveUrl(window.location.href);
    const pathSegments = window.location.pathname.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];
    if (lastSegment === "tenant") {
      setActiveUrl("/" + lastSegment);
      return;
    }
    setActiveUrl(`/${PrivateRoute}/` + lastSegment);
  }, [navigate]);

  useEffect(() => {
    if (data?.id < 1) {
      getBusinessDetails();
    }
  }, [data?.id, getBusinessDetails]);

  return (
    <>
      {/* --- MODERN APP BAR --- */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-200/60 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* --- Left Section: Menu + Brand --- */}
            <div className="flex items-center gap-3 flex-1">
              {/* Mobile Hamburger */}
              <button
                onClick={handleHamburgerClick}
                className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-all active:scale-95"
                aria-label="Toggle menu"
              >
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? (
                    <FiX className="w-5 h-5 text-gray-700" />
                  ) : (
                    <FiMenu className="w-5 h-5 text-gray-700" />
                  )}
                </motion.div>
              </button>

              {/* Brand Section */}
              <div className="hidden sm:flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">
                      {getBusinessInitials(data?.businessName || "GU")}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>

                <div className="hidden lg:block">
                  <h1 className="font-bold text-gray-800 text-lg truncate max-w-48">
                    {data?.businessName || BusinessName}
                  </h1>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    Management System
                  </p>
                </div>
              </div>
            </div>

            {/* --- Center Section: Time & Date (Desktop) --- */}
            <div className="hidden xl:flex items-center gap-4 px-4 py-2 bg-gray-50/80 rounded-xl border border-gray-200/60 mr-2">
              <div className="text-center">
                <div className="flex items-center gap-2 text-sm font-mono font-bold text-gray-800">
                  <FiClock className="w-4 h-4 text-orange-500" />
                  {formatTime(currentTime)}
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(currentTime)}
                </div>
              </div>
            </div>

            {/* --- Right Section: Actions + Profile --- */}
            <div className="flex items-center gap-2">
              {/* Quick Actions */}
              <div className="hidden sm:flex items-center gap-1">
                {/* Transactions */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpenTransaction(!isOpenTransaction)}
                    className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all"
                    title="Transactions"
                  >
                    <Bell size={16} />
                  </motion.button>
                  {isOpenTransaction && <TransactionBell />}
                </div>

                

                {/* QR Code */}
                {/* <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/${PrivateRoute}/qrcode`)}
                  className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all"
                  title="QR Code"
                >
                  <QrCode size={16} />
                </motion.button> */}
              </div>

              {/* User Profile Dropdown */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition-all"
                >
                  <div className="relative">
                    <img
                      src={data?.imageName || gymLogo}
                      alt="Profile"
                      className="w-8 h-8 rounded-lg object-cover border-2 border-orange-400 shadow-sm"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>

                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium text-gray-700">
                      {currentSystemUser?.userName ||
                        data?.businessName?.slice(0, 15) ||
                        BusinessName}
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: showUserMenu ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiChevronDown className="w-4 h-4 text-gray-500" />
                  </motion.div>
                </motion.button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50"
                    >
                      {/* User Info Header */}
                      <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <img
                            src={data?.imageName || gymLogo}
                            alt="Profile"
                            className="w-12 h-12 rounded-xl object-cover border-2 border-orange-400"
                          />
                          <div>
                            <div className="font-semibold text-gray-800">
                              {currentSystemUser?.userName ||
                                data?.businessName?.slice(0, 15) ||
                                "Gym Udaan"}
                            </div>

                            <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                              <FiWifi className="w-3 h-3" />
                              Connected
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        <button
                          onClick={goToProfile}
                          className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <FiUser className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">
                            Profile Settings
                          </span>
                        </button>

                        {currentSystemUser && (
                          <button
                            onClick={handleShiftOff}
                            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">
                              Shift Off
                            </span>
                          </button>
                        )}
                      </div>

                      {/* Session Info */}
                      <div className="p-4 bg-gray-50 border-t border-gray-100">
                        <div className="text-xs text-gray-500 space-y-1">
                          <div className="flex justify-between">
                            <span>
                              Last active: {currentSystemUser?.userName}
                            </span>
                            <span>Just now</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Session:</span>
                            <span className="text-green-600">Active</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* --- ORIGINAL MOBILE NAVIGATION OVERLAY --- */}
      <div
        className={`
    fixed top-0 left-0 w-full h-full z-50 bg-white/95 backdrop-blur-lg transition-all 
    duration-300 md:hidden ${
      isOpen
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    }`}
      >
        {/* Sticky top bar */}
        <div className="sticky top-0 bg-white/90 backdrop-blur-lg px-4 py-3 flex justify-between items-center shadow-sm z-20">
          <img
            src={gymLogo}
            alt="Gym Udaan Logo"
            className="w-9 h-9 rounded-xl object-cover border border-gray-200"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Close menu"
          >
            <FiX className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Scrollable nav links */}
        <nav className="flex flex-col items-center justify-start h-full pt-4">
          <div
            className="w-full max-w-xs mx-auto px-4 overflow-y-auto flex flex-col items-center scrollbar-hide"
            style={{
              maxHeight: "calc(100vh - 64px)",
              scrollbarWidth: "none" /* Firefox */,
              msOverflowStyle: "none" /* Internet Explorer and Edge */,
            }}
          >
            {filteredItems.map((nav, index) => (
              <button
                onClick={() => navigateTo(nav.link)}
                key={index}
                className={`py-4 w-full text-center px-2 border-b border-gray-100 text-base font-medium rounded-md focus:bg-gray-50 focus:outline-none ${
                  activeUrl === nav.link
                    ? "text-[#E26300] underline"
                    : "text-gray-600"
                } transition-colors`}
              >
                {nav.to}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* --- MODALS --- */}

      {isLoggingOut && <LogoutModal />}
       
    </>
  );
};

export default PrivateAppBar;
