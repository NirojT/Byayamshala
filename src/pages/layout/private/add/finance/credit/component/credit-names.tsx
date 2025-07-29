import { PartyType } from "@/global/components/enums/enums";
import { useAddPurchaseFormStore } from "../../purchase/store";
import { useAddCreditFormStore } from "../store";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useEffect } from "react";
import { User } from "lucide-react";
import { zenSelectStyles } from "@/global/components/desing/design";

const CreditNames = () => {
  const { data, setData } = useAddCreditFormStore();
  const {
    getNamesOfMemberAndItem,
    supplierNames,
    memberNames,
    thirdPartyNames,
  } = useAddPurchaseFormStore();

  useEffect(() => {
    getNamesOfMemberAndItem();
  }, [getNamesOfMemberAndItem]);

  return (
    <div>
      {/* Credit For */}
      {data?.partyType === PartyType.SUPPLIER ? (
        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-2 flex items-center">
            Supplier <span className="text-[#E26300] ml-1">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E] z-10">
              <User size={16} />
            </div>
            <Select<{ label: string; value: string }>
              options={Object.values(supplierNames).map((name) => ({
                label: name,
                value: name,
              }))}
              styles={zenSelectStyles}
              value={
                data?.partyName
                  ? { label: data?.partyName, value: data?.partyName }
                  : null
              }
              onChange={(selectedOption) =>
                setData({
                  ...data,
                  partyName: selectedOption?.value as string,
                })
              }
              placeholder="Select supplier"
              noOptionsMessage={() => "No suppliers available"}
            />
          </div>
        </div>
      ) : data?.partyType === PartyType.MEMBER ? (
        <div>
          <label className="text-sm font-medium text-[#1A1A1A] mb-2 flex items-center">
            Member <span className="text-[#E26300] ml-1">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E] z-10">
              <User size={16} />
            </div>
            <Select<{ label: string; value: string }>
              options={Object.values(memberNames).map((name) => ({
                label: name,
                value: name,
              }))}
              styles={zenSelectStyles}
              value={
                data?.partyName
                  ? { label: data?.partyName, value: data?.partyName }
                  : null
              }
              onChange={(selectedOption) =>
                setData({
                  ...data,
                  partyName: selectedOption?.value as string,
                })
              }
              placeholder="Select member"
              noOptionsMessage={() => "No members available"}
            />
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-2 flex items-center">
            Third Party <span className="text-[#E26300] ml-1">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E] z-10">
              <User size={16} />
            </div>
            <CreatableSelect<{ label: string; value: string }>
              options={Object.values(thirdPartyNames).map((name) => ({
                label: name,
                value: name,
              }))}
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: "#FAFAFA",
                  borderColor: state.isFocused ? "#E26300" : "#E5E7EB",
                  boxShadow: state.isFocused ? "0 0 0 1px #E26300" : "none",
                  minHeight: "42px",
                  borderRadius: "0.5rem",
                  paddingLeft: "1.75rem",
                  color: "#2E2E2E",
                  "&:hover": {
                    borderColor: "#E26300",
                  },
                }),
                input: (base) => ({
                  ...base,
                  color: "#2E2E2E",
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "#9CA3AF",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "#2E2E2E",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused
                    ? "#F3F4F6"
                    : state.isSelected
                    ? "#E5E7EB"
                    : "white",
                  color: "#2E2E2E",
                  cursor: "pointer",
                  ":active": {
                    backgroundColor: "#E5E7EB",
                  },
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "white",
                  color: "#2E2E2E",
                  zIndex: 10,
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }),
              }}
              value={
                data?.partyName
                  ? { label: data.partyName, value: data.partyName }
                  : null
              }
              onChange={(selectedOption) =>
                setData({
                  ...data,
                  partyName: selectedOption?.value as string,
                })
              }
              onCreateOption={(newValue) =>
                setData({
                  ...data,
                  partyName: newValue,
                })
              }
              placeholder="Select or create a third party"
              formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
              noOptionsMessage={() => "No third parties available"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditNames;
