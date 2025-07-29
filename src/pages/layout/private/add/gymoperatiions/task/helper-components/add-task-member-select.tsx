import { IMemberDetails } from "@/pages/layout/private/list/gymoperatiions/members/interface";
import { useState } from "react";

// Simple custom member select (autocomplete dropdown)
export const MemberSearchSelect = ({
  members,
  value,
  onChange,
  error,
  placeholder,
  searchFunction,
  searchValue,
  setSearchValue,
}: {
  members: IMemberDetails[];
  value: IMemberDetails | null;
  onChange: (member: IMemberDetails) => void;
  error?: string;
  placeholder?: string;
  searchFunction: (name: string) => void;
  searchValue: string;
  setSearchValue: (name: string) => void;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative">
      <input
        type="text"
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        placeholder={placeholder || "Search member..."}
        value={searchValue}
        onChange={(e) => {
          const val = e.target.value;
          setSearchValue(val);
          if (val.trim() === "") {
            setShowDropdown(false);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (searchValue.trim() !== "") {
              searchFunction(searchValue);
              setShowDropdown(true);
            } else {
              setShowDropdown(false);
            }
          }
        }}
        onFocus={() => {
          if (searchValue.trim() !== "" && members.length > 0)
            setShowDropdown(true);
        }}
        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
      />
      {showDropdown && members && members.length > 0 && (
        <ul className="absolute z-20 bg-white border border-gray-200 rounded-md mt-1 w-full max-h-52 overflow-y-auto shadow-lg">
          {members.map((member) => (
            <li
              key={member?.id}
              className={`px-4 py-2 cursor-pointer hover:bg-orange-50 ${
                value?.id === member?.id ? "bg-orange-100" : ""
              }`}
              onMouseDown={() => {
                onChange(member);
                setShowDropdown(false);
              }}
            >
              <span className="font-medium">{member?.fullName}</span> (
              {member?.phone || "000000"})
            </li>
          ))}
        </ul>
      )}
      {error && (
        <p className="text-red-500 text-sm mt-1 animate-fadeIn">{error}</p>
      )}
    </div>
  );
};
