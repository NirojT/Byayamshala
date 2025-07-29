import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useAddPurchaseFormStore } from "../../purchase/store";
import { useEffect } from "react";
import { useAddSalesFormStore } from "../store";
import { PartyType } from "@/global/components/enums/enums";
import { User } from "lucide-react"; 
import { zenSelectStyles } from "@/global/components/desing/design";


const SalesFormNames = () => {
  const { data, setData } = useAddSalesFormStore();
  const {
    getNamesOfMemberAndItem,
    memberNames,
    thirdPartyNames,
  } = useAddPurchaseFormStore();

  useEffect(() => {
    getNamesOfMemberAndItem();
  }, [getNamesOfMemberAndItem]);

  return (
    <div>
      {/* Member Selection */}
      {data?.partyType === PartyType.MEMBER ? (
        <div>
          <label className="block text-[#1A1A1A] text-sm font-medium mb-2 flex items-center">
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
          <label className="block text-[#1A1A1A] text-sm font-medium mb-2 flex items-center">
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
                ...zenSelectStyles,
                control: (base, state) => ({
                  ...zenSelectStyles.control(base, state),
                  paddingLeft: "1.75rem",
                }),
              }}
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

export default SalesFormNames;