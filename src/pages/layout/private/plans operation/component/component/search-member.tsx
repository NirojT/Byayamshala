import { TextField, InputAdornment, IconButton } from "@mui/material";
import { IMemberDetails } from "../../../list/gymoperatiions/members/interface";
import { useListMemberStore } from "../../../list/gymoperatiions/members/store";
import { usePlansOperationFormStore } from "../../store";
import { GoArrowUpRight } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { useToggleAddPlanStore } from "./add-plan/add-new-plan-store";
import { useGlobalStore } from "@/global/store";
import Back from "@/global/components/back/back";
import { Search } from "lucide-react";
import { FiRefreshCw } from "react-icons/fi";
import React, { useState } from "react";
import { useToggleAddFacilityStore } from "./add-facility-new/add-new-facility-store";

const SearchMember = ({ task }: { task: string }) => {
  const { setToasterData } = useGlobalStore();
  const { searchByName, members, name, setName, getMembers } =
    useListMemberStore();
  const { setSearchedMember } = usePlansOperationFormStore();
  const { setIsOpen } = useToggleAddPlanStore();
  const { setIsOpen: setFacilityOpen } = useToggleAddFacilityStore();
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!name) {
      setToasterData({
        message: "Please enter a name to search.",
        severity: "warning",
        open: true,
      });
      return;
    }
    setIsSearching(true);
    const res = await searchByName();
    setToasterData({
      message: res?.message,
      severity: res?.severity,
      open: true,
    });
    setIsSearching(false);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClick = (member: IMemberDetails) => {
    setSearchedMember(member);
    if (task === "Renew Plans") {
      setIsOpen(true);
    } else {
      setFacilityOpen(true);
    }
  };

  const handleClearSearch = async () => {
    setName("");
    await getMembers();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10 px-2">
      <div className="w-full max-w-lg">
        {/* Back Button */}
        <Back />

        {/* Header */}
        <div className="text-center my-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center justify-center gap-2">
            Search Members
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Enter a name to quickly locate and select a member.
          </p>
        </div>

        {/* Search Bar */}
        <TextField
          fullWidth
          label="Search Member"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleEnter}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {name ? (
                  <IconButton
                    onClick={handleClearSearch}
                    aria-label="Clear Search"
                    edge="end"
                  >
                    <FiRefreshCw className="text-gray-400 hover:text-gray-600" />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={handleSearch}
                    aria-label="Search"
                    edge="end"
                    disabled={isSearching}
                  >
                    <Search className="text-gray-700" />
                  </IconButton>
                )}
              </InputAdornment>
            ),
            style: {
              background: "#fff",
              borderRadius: 8,
              fontSize: "1rem",
              fontWeight: 500,
            },
          }}
          sx={{
            mb: 4,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#e0e0e0" },
              "&:hover fieldset": { borderColor: "#bdbdbd" },
              "&.Mui-focused fieldset": { borderColor: "#6366f1" },
            },
          }}
        />

        {/* Search Results */}
        {members?.length > 0 && (
          <div className="rounded-xl shadow-lg bg-white/95 border border-gray-100 transition">
            <div className="divide-y divide-gray-100">
              {members.map((member) => (
                <button
                  key={member.id}
                  onClick={() => handleClick(member)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-indigo-50 transition group"
                >
                  <span className="flex items-center gap-3 text-gray-700 font-medium">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full shadow-sm">
                      <FaUser />
                    </span>
                    <span className="capitalize">{member.fullName}</span>
                  </span>
                  <GoArrowUpRight
                    size={22}
                    className="text-orange-400 group-hover:scale-110 transition"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {!members?.length && name && (
          <div className="mt-6 text-center text-gray-500 text-base">
            No members found matching "
            <span className="font-semibold">{name}</span>".
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchMember;
