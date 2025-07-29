import { defaultNepaliDate } from "@/global/config";
import React, { useEffect, useState } from "react";
import { FaCoffee, FaPizzaSlice, FaUtensils } from "react-icons/fa";
import { TbPlus, TbSearch } from "react-icons/tb";
import { IMenuDetails } from "../../menus/interface";
import { useMenuStore } from "../../menus/store";
import { useTakeOrderStore } from "../store";

const MenusOrder: React.FC = () => {
  const { menus, getMenus } = useMenuStore();
  const { addSelectedMenu } = useTakeOrderStore();
  const [search, setSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<IMenuDetails[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const handleMenuClick = (menu: IMenuDetails) => {
    addSelectedMenu(menu);
  };

  useEffect(() => {
    getMenus();
  }, [getMenus]);

  useEffect(() => {
    if (search || activeCategory !== "all") {
      let filtered = [...(menus || [])];

      // Apply search filter
      if (search) {
        filtered = filtered.filter((menu) =>
          menu?.name?.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Apply category filter
      if (activeCategory !== "all") {
        filtered = filtered.filter(
          (menu) =>
            menu?.menuType?.toLowerCase() === activeCategory.toLowerCase()
        );
      }

      setFilteredData(filtered);
      return;
    }
    setFilteredData(menus || []);
  }, [menus, search, activeCategory]);

  const getMenuIcon = (menuType: string) => {
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

  // Get unique menu types for categories
  const menuTypes = [
    "all",
    ...new Set(
      menus?.map((menu) => menu?.menuType?.toLowerCase() || "").filter(Boolean)
    ),
  ];

  return (
    <div className="flex flex-col space-y-4">
      {/* Search Input */}
      <div className="relative">
        <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E]/50" />
        <input
          type="text"
          placeholder="Search menu items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 pl-10 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors bg-transparent"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-[#1A1A1A]/10">
        {menuTypes.map((type, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(type)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              activeCategory === type
                ? "bg-[#1A1A1A] text-white"
                : "bg-[#1A1A1A]/5 text-[#2E2E2E] hover:bg-[#1A1A1A]/10"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      {filteredData && filteredData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-1">
          {filteredData.map((menu, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-indigo-400/50 hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-between"
              onClick={() => handleMenuClick(menu)}
            >
              <div className="flex items-center space-x-3">
                <div className="text-indigo-500">
                  {getMenuIcon(menu?.menuType)}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {menu?.name}
                  </h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {menu?.menuType}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-blue-600 whitespace-nowrap">
                  रु {menu?.price}
                </span>
                <button className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <TbPlus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center">
          <div className="w-12 h-12 mx-auto bg-[#1A1A1A]/5 rounded-full flex items-center justify-center mb-3">
            <FaUtensils className="text-[#1A1A1A]/30" size={20} />
          </div>
          <p className="text-[#2E2E2E] font-medium">No menu items found</p>
          <p className="text-[#2E2E2E]/70 text-sm">
            {search
              ? "Try a different search term"
              : "There are no menu items in this category"}
          </p>
        </div>
      )}

      {/* Footer Info */}
      <div className="text-xs text-[#2E2E2E]/50 text-center">
        Click on a menu item to add it to the order •{" "}
        {defaultNepaliDate.toString()}
      </div>
    </div>
  );
};

export default MenusOrder;
