import { useListPlansStore } from "@/pages/layout/private/list/gymoperatiions/plans/store";

import { MemberShipStaus } from "@/global/components/enums/enums";
import { usePlansOperationFormStore } from "../../../../store";

import { defaultNepaliDate } from "@/global/config";
import {
    ChevronIconProps,
    FacilitySectionProps,
} from "@/pages/layout/private/list/gymoperatiions/members/interface";
import { useListMemberStore } from "@/pages/layout/private/list/gymoperatiions/members/store";
import { useEffect, useState } from "react";
import { DateItemProps, DetailItemProps } from "../interface";
const AddNewPlanCards = () => {
  // stores
  const { getPlans } = useListPlansStore();

  const { data, setData, searchedMember } = usePlansOperationFormStore();

  const { memberShips, getMemberShipByMemberId } = useListMemberStore();

  // State to track which plan's details are visible
  const [expandedPlanIndex, setExpandedPlanIndex] = useState<number | null>(
    null
  );

  const togglePlanDetails = (index: number) => {
    setExpandedPlanIndex(expandedPlanIndex === index ? null : index);
  };

 

 

  useEffect(() => {
    if (
      memberShips?.length > 0 &&
      memberShips[0]?.memberShipStatus !== MemberShipStaus.CANCELED
    ) {
      const latestMemberShip = memberShips[0];
      const formattedDate = latestMemberShip?.membershipEndDate
        ? latestMemberShip?.membershipEndDate?.split(" ")[0]
        : defaultNepaliDate.toString();
      setData({ ...data, startDate: formattedDate });
    }
    
    //if no member ship is there
    // set the start date to default date
    else {
      setData({ ...data, startDate: defaultNepaliDate.toString() });
    }
  }, [searchedMember, memberShips]);

  useEffect(() => {
    getPlans();
    getMemberShipByMemberId(searchedMember?.id);
  }, [searchedMember]);

  // Reusable Components
  const DetailItem: React.FC<DetailItemProps> = ({
    label,
    value,
    highlight,
  }) => (
    <div>
      <p className="text-gray-500 text-xs">{label}</p>
      <p
        className={`font-medium ${
          highlight ? "text-orange-600" : "text-gray-700"
        }`}
      >
        {value}
      </p>
    </div>
  );

  const DateItem: React.FC<DateItemProps> = ({ label, date }) => (
    <div>
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-medium text-gray-700">
        {new Date(date).toLocaleDateString()}
      </p>
    </div>
  );

  const FacilitySection: React.FC<FacilitySectionProps> = ({
    title,
    facilities,
  }) => (
    <div className="">
      <h5 className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <span className="w-2 h-4 bg-orange-500 rounded-sm"></span>
        {title}
      </h5>
      <div className="space-y-2">
        {facilities?.length > 0 ? (
          facilities?.map((facility) => (
            <div
              key={facility?.id}
              className="flex justify-between items-center p-2 bg-white rounded-lg text-sm border border-gray-100"
            >
              <span className="text-gray-600">{facility?.facilityName}</span>
              <span className="text-orange-600">रु {facility?.price}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm italic">
            No {title?.toLowerCase()}
          </p>
        )}
      </div>
    </div>
  );

  const ChevronIcon: React.FC<ChevronIconProps> = ({ isExpanded }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-4 w-4 transition-transform ${
        isExpanded ? "rotate-180" : ""
      }`}
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
      />
    </svg>
  );

  return (
    <div className="  px-4  max-h-[80vh] overflow-y-auto  ">
      {/* Section Header */}
      <div className="mb-2 border-b border-orange-100 ">
        <h3 className="text-2xl font-semibold text-gray-700 flex items-center gap-2 font-poppins">
          Membership Plans
          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
            {memberShips?.length || 0}
          </span>
        </h3>
      </div>

      {/* Plans Grid */}
      <div className="lg:grid lg:grid-cols-2 gap-3 ">
        {memberShips?.map((plan, index) => (
          <div
            key={plan?.id}
            className="rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
          >
            {/* Plan Header */}
            <div
              className={`p-4 rounded-t-xl ${
                plan?.memberShipStatus === "ACTIVE"
                  ? "bg-green-50"
                  : "bg-red-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-800 capitalize">
                  {plan?.planName}
                </h4>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    plan?.memberShipStatus === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {plan?.memberShipStatus}
                </span>
              </div>
            </div>

            {/* Plan Details */}
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <DetailItem
                  label="Duration"
                  value={`${plan?.remainingDays} days`}
                />
                <DetailItem label="Price" value={`रु ${plan?.price}`} highlight />
                <DetailItem
                  label="Discount"
                  value={`रु ${plan?.discount || 0}`}
                />
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between text-sm">
                  <DateItem
                    label="Start Date"
                    date={plan?.membershipStartDate}
                  />
                  <DateItem label="End Date" date={plan?.membershipEndDate} />
                </div>
              </div>
            </div>

            {/* Toggle Button */}
            <div
              onClick={() => togglePlanDetails(index)}
              className="border-t border-gray-100 p-3 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-center gap-2 text-sm text-orange-600 font-medium">
                {expandedPlanIndex === index
                  ? "Hide Facilities"
                  : "View Facilities"}
                <ChevronIcon isExpanded={expandedPlanIndex === index} />
              </div>
            </div>

            {/* Expanded Facilities */}
            {expandedPlanIndex === index && (
              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <FacilitySection
                  title="Included Facilities"
                  facilities={plan?.facilities}
                />
                <FacilitySection
                  title="Added Facilities"
                  facilities={plan?.addedFacilities}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddNewPlanCards;
