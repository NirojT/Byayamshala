import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useAddPurchaseFormStore } from "../store";
import { useEffect } from "react";
import { PartyType } from "@/global/components/enums/enums";
import { User, Building } from "lucide-react";
import { zenSelectStyles } from "@/global/components/desing/design";

const PurchaseFormNames = () => {
  const { data, setData } = useAddPurchaseFormStore();
  const {
    getNamesOfMemberAndItem,
    supplierNames,
    thirdPartyNames,
  } = useAddPurchaseFormStore();

  useEffect(() => {
    getNamesOfMemberAndItem();
  }, [getNamesOfMemberAndItem]);

  return (
    <div>
      {/* Purchase From */}
      {data?.partyType === PartyType.SUPPLIER ? (
        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-2 flex items-center">
            Supplier <span className="text-[#E26300] ml-1">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E] z-10">
              <Building size={16} />
            </div>
            <Select
              options={supplierNames?.map((name) => ({
                label: name,
                value: name,
              }))}
              styles={zenSelectStyles}
              onChange={(selectedOption) =>
                setData({
                  ...data,
                  partyName: selectedOption?.value || "",
                })
              }
              placeholder="Select supplier"
              noOptionsMessage={() => "No suppliers available"}
              value={
                data?.partyName
                  ? { label: data.partyName, value: data.partyName }
                  : null
              }
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
              styles={zenSelectStyles}
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

export default PurchaseFormNames;