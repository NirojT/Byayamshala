import Back from "@/global/components/back/back";
import { useGlobalStore } from "@/global/store";
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaCoffee, FaPizzaSlice, FaUtensils } from "react-icons/fa";
import { TbDotsVertical, TbEdit, TbFileInfo } from "react-icons/tb";
import MenuModalForm from "./component/menu-modal-form";
import { IMenuDetails } from "./interface";
import { useMenuStore } from "./store";

const Menus: React.FC = () => {
  const {
    menus,
    getMenus,
    disabledMenus,
    getDisabledMenus,

    open,
    toggleOpen,
    setData,
    data,
    changeStatus,
  } = useMenuStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMenu, setSelectedMenu] = useState<IMenuDetails | null>(null);
  const [view, setView] = useState<"grid" | "table">("table"); // Default to grid for smaller screens
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 640);
  const [enabled, setEnabled] = useState(true);
  const { setToasterData } = useGlobalStore();
  useEffect(() => {
    if (enabled) {
      getMenus();
    } else {
      getDisabledMenus();
    }

    // Set responsive view based on screen size
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      if (mobile) {
        setView("grid");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize on load

    return () => window.removeEventListener("resize", handleResize);
  }, [getMenus, enabled]);

  const handleOpen = () => {
    toggleOpen();
  };

  const handleEdit = (menu: IMenuDetails) => {
    setData({
      ...data,
      id: menu?.id,
      name: menu?.name,
      price: menu?.price,
      menuType: menu?.menuType,
      stockItems: menu?.stockItems || [],
    });
    handleOpen();
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    menu: IMenuDetails
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedMenu(menu);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleDisable = async (menu: IMenuDetails) => {
    const res = await changeStatus(menu?.id);
    setToasterData({
      message: res?.message,
      severity: res?.severity,
      open: true,
    });
  };

  const getMenuTypeIcon = (menuType: string) => {
    switch (menuType?.toLowerCase()) {
      case "main course":
        return <FaUtensils className="text-[#E26300]" />;
      case "appetizer":
        return <FaPizzaSlice className="text-[#E26300]" />;
      case "beverage":
        return <FaCoffee className="text-[#E26300]" />;
      default:
        return <FaUtensils className="text-[#E26300]" />;
    }
  };

  // Custom Minimal Zen theme chip colors

  const getMenuTypeChipStyle = (menuType: string) => {
    switch (menuType?.toLowerCase()) {
      case "main course":
        return "bg-[#1A1A1A] text-[#FAFAFA]";
      case "appetizer":
        return "bg-[#2E2E2E] text-[#FAFAFA]";
      case "beverage":
        return "bg-[#1A1A1A] text-[#FAFAFA]";
      default:
        return "bg-[#2E2E2E] text-[#FAFAFA]";
    }
  };

  // Current date in the requested format

  return (
    <div className="min-h-screen font-poppins bg-[#FAFAFA] text-[#2E2E2E]">
      <Box sx={{ padding: { xs: 2, md: 4 }, position: "relative" }}>
        {/* Header Section */}
        <Card
          elevation={1}
          className="mb-6"
          sx={{
            borderRadius: 2,
            backgroundColor: "#FAFAFA",
            overflow: "visible",
            position: "relative",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <Back/>
          <CardContent
            sx={{ py: 3, px: { xs: 2, sm: 4 } }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="bg-[#FAFAFA] p-2 rounded-lg shadow-sm mr-3 border border-[#1A1A1A]/10">
                <FaUtensils className="text-3xl text-[#E26300]" />
              </div>
              <div>
                <Typography
                  variant="h5"
                  className="text-[#1A1A1A] font-bold tracking-wide"
                >
                  Manage Menus
                </Typography>
                <Typography variant="body2" className="text-[#2E2E2E]/70">
                  {(enabled ? menus?.length : disabledMenus?.length) || 0} items
                  available •
                </Typography>
                <div className="">
                  <button
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      enabled
                        ? "bg-green-400 text-white"
                        : "bg-[#E26300] text-[#2E2E2E]"
                    }`}
                    onClick={() => setEnabled(!enabled)}
                  >
                    {enabled ? "Enabled" : "Disabled"}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center w-full sm:w-auto space-x-2">
              <Button
                variant="contained"
                onClick={handleOpen}
                startIcon={<TbEdit />}
                className="bg-[#E26300] text-white hover:bg-[#E26300]/90 font-medium shadow-sm"
                sx={{
                  borderRadius: 1.5,
                  textTransform: "none",
                  px: 3,
                  py: 1,
                  backgroundColor: "#E26300",
                  "&:hover": {
                    backgroundColor: "#D25800",
                  },
                }}
              >
                Add New Menu
              </Button>
              {/* Only show view toggle on non-mobile */}
              {!isMobile && (
                <div className="hidden sm:flex bg-[#FAFAFA] border border-[#1A1A1A]/10 rounded-lg ml-4">
                  <Button
                    variant={view === "table" ? "contained" : "text"}
                    onClick={() => setView("table")}
                    size="small"
                    className={
                      view === "table"
                        ? "bg-[#1A1A1A] text-white"
                        : "text-[#1A1A1A]"
                    }
                    sx={{
                      minWidth: "auto",
                      borderRadius: 1.5,
                      backgroundColor:
                        view === "table" ? "#1A1A1A" : "transparent",
                      "&:hover": {
                        backgroundColor:
                          view === "table"
                            ? "#1A1A1A"
                            : "rgba(26, 26, 26, 0.04)",
                      },
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm0 2h10a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                  <Button
                    variant={view === "grid" ? "contained" : "text"}
                    onClick={() => setView("grid")}
                    size="small"
                    className={
                      view === "grid"
                        ? "bg-[#1A1A1A] text-white"
                        : "text-[#1A1A1A]"
                    }
                    sx={{
                      minWidth: "auto",
                      borderRadius: 1.5,
                      backgroundColor:
                        view === "grid" ? "#1A1A1A" : "transparent",
                      "&:hover": {
                        backgroundColor:
                          view === "grid"
                            ? "#1A1A1A"
                            : "rgba(26, 26, 26, 0.04)",
                      },
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1A1A1A]/10 to-transparent"></div>
        </Card>

        {/* Modal for Add/Edit Menu */}
        {open && <MenuModalForm />}

        {/* Grid View - Always used for mobile, optionally for desktop */}
        {(isMobile || view === "grid") && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
            {(menus?.length || disabledMenus?.length) > 0 ? (
              (enabled ? menus : disabledMenus)?.map((menu, index) => (
                <Card
                  key={menu?.id ?? index}
                  elevation={0}
                  className="hover:shadow-md transition-all duration-300 border border-[#1A1A1A]/10"
                  sx={{ borderRadius: 2, backgroundColor: "#FAFAFA" }}
                >
                  <CardContent className="relative p-0">
                    <div className="bg-[#FAFAFA] h-40 flex items-center justify-center relative border-b border-[#1A1A1A]/10">
                      <div className="absolute top-2 right-2">
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getMenuTypeChipStyle(
                            menu?.menuType
                          )}`}
                        >
                          {menu?.menuType}
                        </div>
                      </div>
                      <div className="w-20 h-20 bg-[#FAFAFA] rounded-full flex items-center justify-center shadow-sm border border-[#1A1A1A]/10">
                        {getMenuTypeIcon(menu?.menuType)}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <Typography
                          variant="h6"
                          className="font-bold text-[#1A1A1A]"
                        >
                          {menu?.name}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuClick(e, menu)}
                          className="text-[#2E2E2E]"
                        >
                          <TbDotsVertical />
                        </IconButton>
                      </div>
                      <Typography
                        variant="h5"
                        className="font-bold text-[#E26300] my-2"
                      >
                        {" "}
                        <span className="  transform -translate-y-1/2 text-[#2E2E2E] mr-4 text-xs">
                          रु
                        </span>
                        {menu?.price}
                      </Typography>
                      <Divider className="my-2 bg-[#1A1A1A]/10" />
                      <div className="flex justify-between items-center">
                        <Typography
                          variant="caption"
                          className="text-[#2E2E2E]/70"
                        >
                          Added: {menu?.createdNepDate}
                        </Typography>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleEdit(menu)}
                          startIcon={<TbEdit />}
                          className="bg-[#E26300] text-white"
                          sx={{
                            textTransform: "none",
                            borderRadius: 1,
                            backgroundColor: "#E26300",
                            "&:hover": {
                              backgroundColor: "#D25800",
                            },
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card
                className="col-span-full p-8 text-center"
                elevation={0}
                sx={{
                  borderRadius: 2,
                  backgroundColor: "#FAFAFA",
                  border: "1px solid rgba(26, 26, 26, 0.1)",
                }}
              >
                <Typography variant="h6" className="text-[#2E2E2E] mb-2">
                  No menu items found
                </Typography>
                <Typography variant="body2" className="text-[#2E2E2E]/70 mb-4">
                  Start by adding your first menu item
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleOpen}
                  startIcon={<TbEdit />}
                  className="bg-[#E26300] text-white mx-auto"
                  sx={{
                    borderRadius: 1.5,
                    backgroundColor: "#E26300",
                    "&:hover": {
                      backgroundColor: "#D25800",
                    },
                  }}
                >
                  Add New Menu
                </Button>
              </Card>
            )}
          </div>
        )}

        {/* Table View - Only for non-mobile view */}
        {!isMobile && view === "table" && (
          <Card
            elevation={0}
            sx={{
              borderRadius: 2,
              backgroundColor: "#FAFAFA",
              border: "1px solid rgba(26, 26, 26, 0.1)",
            }}
            className="overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#1A1A1A]/10">
                <thead className="bg-[#FAFAFA]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#2E2E2E]/70 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#2E2E2E]/70 uppercase tracking-wider">
                      Menu Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#2E2E2E]/70 uppercase tracking-wider">
                      Menu Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#2E2E2E]/70 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#2E2E2E]/70 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#2E2E2E]/70 uppercase tracking-wider">
                      Added At
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#2E2E2E]/70 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-[#FAFAFA] divide-y divide-[#1A1A1A]/10">
                  {(menus?.length || disabledMenus?.length) > 0 ? (
                    (enabled ? menus : disabledMenus)?.map((menu, index) => (
                      <tr
                        key={menu?.id ?? index}
                        className="hover:bg-[#1A1A1A]/[0.02] transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-8 h-8 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center text-[#1A1A1A] font-medium">
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="mr-2">
                              {getMenuTypeIcon(menu?.menuType)}
                            </div>
                            <Typography
                              variant="body1"
                              className="font-medium text-[#1A1A1A]"
                            >
                              {menu?.name}
                            </Typography>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getMenuTypeChipStyle(
                              menu?.menuType
                            )}`}
                          >
                            {menu?.menuType}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Typography
                            variant="body1"
                            className="font-bold text-[#E26300]"
                          >
                            <span className="  transform -translate-y-1/2 text-[#2E2E2E] mr-4 text-xs">
                              रु
                            </span>
                            {menu?.price}
                          </Typography>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Typography
                            variant="body1"
                            className="font-bold text-[#E26300]"
                          >
                            {menu?.activeStatus ? "Enabled" : "Disabled"}
                          </Typography>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2E2E2E]/70">
                          {menu?.createdNepDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2">
                            <Tooltip title="Edit Menu">
                              <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleEdit(menu)}
                                className="bg-[#E26300] text-white min-w-0 p-2"
                                sx={{
                                  minWidth: "unset",
                                  borderRadius: 1,
                                  backgroundColor: "#E26300",
                                  "&:hover": {
                                    backgroundColor: "#D25800",
                                  },
                                }}
                              >
                                <TbEdit size={18} />
                              </Button>
                            </Tooltip>
                            <IconButton
                              size="small"
                              onClick={(e) => handleMenuClick(e, menu)}
                              className="border border-[#1A1A1A]/10 text-[#2E2E2E]"
                              sx={{
                                backgroundColor: "transparent",
                                "&:hover": {
                                  backgroundColor: "rgba(26, 26, 26, 0.04)",
                                },
                              }}
                            >
                              <TbDotsVertical size={18} />
                            </IconButton>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <FaUtensils className="text-4xl text-[#1A1A1A]/20 mb-4" />
                          <Typography
                            variant="h6"
                            className="text-[#2E2E2E] mb-2"
                          >
                            No menu items found
                          </Typography>
                          <Typography
                            variant="body2"
                            className="text-[#2E2E2E]/70 mb-4"
                          >
                            Start by adding your first menu item
                          </Typography>
                          <Button
                            variant="contained"
                            onClick={handleOpen}
                            startIcon={<TbEdit />}
                            className="bg-[#E26300] text-white"
                            sx={{
                              borderRadius: 1.5,
                              backgroundColor: "#E26300",
                              "&:hover": {
                                backgroundColor: "#D25800",
                              },
                            }}
                          >
                            Add New Menu
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </Box>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 1,
          sx: {
            borderRadius: 2,
            minWidth: 180,
            backgroundColor: "#FAFAFA",
            border: "1px solid rgba(26, 26, 26, 0.1)",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleEdit(selectedMenu!);
            handleMenuClose();
          }}
          sx={{ color: "#2E2E2E" }}
        >
          <TbEdit className="mr-2 text-[#E26300]" />
          Edit Menu
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: "#2E2E2E" }}>
          <TbFileInfo className="mr-2 text-[#E26300]" />
          View Details
        </MenuItem>
        <Divider sx={{ backgroundColor: "rgba(26, 26, 26, 0.1)" }} />
        <MenuItem
          onClick={() => handleDisable(selectedMenu!)}
          sx={{ color: "#E26300" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>

          {enabled ? "Disable Menu" : "Enable Menu"}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Menus;
