import { ShiftType } from "@/global/components/enums/enums";
import { useGlobalStore } from "@/global/store";
import {
  Search,
  Filter,
  User,
  Briefcase,
  Heart,
  Droplet,
  X,
  Download,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IMemberFilterData } from "../interface";
import { useListMemberStore } from "../store";
import { motion, AnimatePresence } from "framer-motion";
import { ClearIcon } from "@mui/x-date-pickers/icons";

type Props = {
  handleClearSearch: () => void;
};

const MemberFilters = ({ handleClearSearch }: Props) => {
  const location = useLocation();
  const dashStatus = location.state?.status;
  const [activeSearchType, setActiveSearchType] = useState<
    "name" | "info" | "filters"
  >("name");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const {
    searchQuery,
    searchByName,
    searchByOtherInfo,
    members,
    setFilteredData,
    filters,
    setFilters,
    getMembers,
    isSearching,
    setIsSearching,
    name,
    setName,
    info,
    setInfo,
    exportMembers,
  } = useListMemberStore();

  const { setToasterData } = useGlobalStore();

  const updateFilter = (key: keyof typeof filters, value: string | boolean) => {
    setIsSearching(true);

    setFilters({ ...filters, [key]: value });
  };

  const getSearchData = (): Partial<IMemberFilterData> => {
    const searchData: IMemberFilterData = {
      shift: ShiftType.EVENING,
      status: "",
      whatsApp: "",
      doorCard: "",
      doorAccess: "",
    };

    if (filters.shift && filters.shift !== ShiftType.EVENING)
      searchData.shift = filters.shift;
    if (filters.status && filters.status !== ShiftType.EVENING)
      searchData.status = filters.status;

    searchData.whatsApp = filters.whatsApp;
    searchData.doorCard = filters.doorCard;
    searchData.doorAccess = filters.doorAccess;
    return searchData;
  };

  const handleSearchByName = async () => {
    if (!name.trim()) {
      setToasterData({
        message: "Please enter a name or phone number to search",
        severity: "warning",
        open: true,
      });
      return;
    }

    // Don't set isSearching here, let the store handle it
    try {
      const res = await searchByName();
      setToasterData({
        message: res?.message,
        severity: res?.severity,
        open: true,
      });
    } catch (error: any) {
      console.log(error);
      // Ensure loading stops even if there's an unexpected error
      setIsSearching(false);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchByInfo = async () => {
    if (!info.trim()) {
      setToasterData({
        message:
          "Please enter occupation, blood group, or health condition to search",
        severity: "warning",
        open: true,
      });
      return;
    }

    // Don't set isSearching here, let the store handle it
    try {
      const res = await searchByOtherInfo();
      setToasterData({
        message: res?.message,
        severity: res?.severity,
        open: true,
      });
    } catch (error: any) {
      console.log(error);
      // Ensure loading stops even if there's an unexpected error
      setIsSearching(false);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = async () => {
    try {
      const searchData = getSearchData();
      const res = await searchQuery(searchData as IMemberFilterData);
      setToasterData({
        message: res?.message,
        severity: res?.severity,
        open: true,
      });
    } catch (error: any) {
      console.log(error);
      setIsSearching(false);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchByNameEnter = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleSearchByName();
    }
  };

  const handleSearchByInfoEnter = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleSearchByInfo();
    }
  };

  const handleExport = async () => {
    await exportMembers();
  };

  const clearAllSearches = () => {
    setName("");
    setInfo("");
    setActiveSearchType("name");
    setIsSearching(false); // Reset loading state
    handleClearSearch();
  };

  useEffect(() => {
    setFilteredData(members);
  }, [members]);

  useEffect(() => {
    if (dashStatus) {
      setIsSearching(true);
      setFilters({ ...filters, status: dashStatus });
    }
  }, [dashStatus]);

  useEffect(() => {
    if (
      (isSearching && filters?.shift) ||
      filters?.status ||
      filters?.whatsApp ||
      filters?.doorCard ||
      filters?.doorAccess
    ) {
      handleSearch();
    }
  }, [filters]);

  useEffect(() => {
    if (!dashStatus) {
      getMembers();
    }
  }, [getMembers, dashStatus]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg mb-2 overflow-hidden">
      {/* Header */}

      {/* Search Tabs */}
      <div className="p-4 pb-0">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setActiveSearchType("name")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeSearchType === "name"
                ? "bg-orange-200 text-orange-700 border border-orange-200"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            <User className="w-4 h-4" />
            Name & Contact
          </button>

          <button
            onClick={() => setActiveSearchType("info")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeSearchType === "info"
                ? "bg-blue-200 text-blue-700 border border-blue-200"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Heart className="w-4 h-4" />
            Personal Details
          </button>

          <button
            onClick={() => {
              setActiveSearchType("filters");
              setShowAdvancedFilters(!showAdvancedFilters);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeSearchType === "filters"
                ? "bg-purple-200 text-purple-700 border border-purple-200"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Filter className="w-4 h-4" />
            Advanced Filters
          </button>

          <button
            onClick={clearAllSearches}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all bg-gray-50 text-gray-600  
              hover:bg-red-50 hover:text-red-600 border border-gray-200
              `}
          >
            <ClearIcon className="w-4 h-4" />
            Clear
          </button>
        </div>
      </div>

      {/* Search Content */}
      <div className="p-4 pt-0">
        <AnimatePresence mode="wait">
          {activeSearchType === "name" && (
            <motion.div
              key="name-search"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name or phone number..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleSearchByNameEnter}
                  className="w-full pl-12 pr-4 py-4 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                />
                {name && (
                  <button
                    onClick={() => setName("")}
                    className="absolute inset-y-0 right-12 flex items-center"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
                <button
                  onClick={handleSearchByName}
                  disabled={!name.trim()}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  <Search
                    className={`h-5 w-5 transition-colors ${
                      name.trim()
                        ? "text-orange-600 hover:text-orange-700"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              </div>
            </motion.div>
          )}

          {activeSearchType === "info" && (
            <motion.div
              key="info-search"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {/* Info Search Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-gray-100 rounded-lg">
                <div className="text-center py-2 text-xs font-medium text-gray-600 flex items-center justify-center gap-1">
                  <Briefcase className="w-3 h-3" />
                  Occupation
                </div>
                <div className="text-center py-2 text-xs font-medium text-gray-600 flex items-center justify-center gap-1">
                  <Droplet className="w-3 h-3" />
                  Blood Group
                </div>
                <div className="text-center py-2 text-xs font-medium text-gray-600 flex items-center justify-center gap-1">
                  <Heart className="w-3 h-3" />
                  Health
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Heart className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by occupation, blood group, or health condition..."
                  value={info}
                  onChange={(e) => setInfo(e.target.value)}
                  onKeyDown={handleSearchByInfoEnter}
                  className="w-full pl-12 pr-4 py-4 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                />
                {info && (
                  <button
                    onClick={() => setInfo("")}
                    className="absolute inset-y-0 right-12 flex items-center"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
                <button
                  onClick={handleSearchByInfo}
                  disabled={!info.trim()}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  <Search
                    className={`h-5 w-5 transition-colors ${
                      info.trim()
                        ? "text-blue-600 hover:text-blue-700"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              </div>
            </motion.div>
          )}

          {activeSearchType === "filters" && (
            <motion.div
              key="filters"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 lg:md:grid-cols-5 gap-4">
                {/* Shift Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Shift Type
                  </label>
                  <select
                    onChange={(e) =>
                      updateFilter("shift", e.target.value as ShiftType)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-sm"
                  >
                    {Object.values(ShiftType).map((shift) => (
                      <option key={shift} value={shift}>
                        {shift}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Membership Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => updateFilter("status", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-sm"
                  >
                    <option value="">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>

                {/* WhatsApp Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    WhatsApp Status
                  </label>
                  <select
                    value={filters.whatsApp}
                    onChange={(e) => updateFilter("whatsApp", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-sm"
                  >
                    <option value="">All</option>
                    <option value="saved">Saved</option>
                    <option value="unsaved">Unsaved</option>
                  </select>
                </div>
                {/*Card Entered */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Door Card Number
                  </label>
                  <select
                    value={filters.doorCard}
                    onChange={(e) => updateFilter("doorCard", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-sm"
                  >
                    <option value="">All</option>
                    <option value="entered">Entered</option>
                    <option value="not entered">Not Entered</option>
                  </select>
                </div>
                {/*Card Entered */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Door Access
                  </label>
                  <select
                    value={filters.doorAccess}
                    onChange={(e) => updateFilter("doorAccess", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-sm"
                  >
                    <option value="">All</option>
                    <option value="blocked">Blocked</option>
                    <option value="allowed">Allowed</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Actions */}
      <div className="p-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isSearching && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              Searching...
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-600">
            {members.length} member{members.length !== 1 ? "s" : ""} found
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-all shadow-sm hover:shadow-md"
          >
            <Download className="w-4 h-4" />
            <span className="font-medium">Export CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberFilters;
