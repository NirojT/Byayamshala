import { PaymentMode, ShiftType } from "@/global/components/enums/enums";
import React, { useCallback, useEffect } from "react";
import {
  FaCalendarAlt,
  FaCreditCard,
  FaEnvelope,
  FaExclamationTriangle,
  FaListUl,
  FaMapMarkerAlt,
  FaPhone,
  FaStickyNote,
  FaUser,
  FaVenusMars,
  FaWeightHanging,
  FaTextHeight,
} from "react-icons/fa";

import { Droplet, UserCheck, Heart, Briefcase } from "lucide-react";

import { useListPlansStore } from "../../../../list/gymoperatiions/plans/store";
import { IMemberFormField } from "../interface";

export const useMemberFormFields = (
  isExistingMember: boolean
): IMemberFormField[] => {
  const { plans, getPlans } = useListPlansStore();

  const memoizedGetPlans = useCallback(() => {
    getPlans();
  }, [getPlans]);

  useEffect(() => {
    memoizedGetPlans();
  }, [memoizedGetPlans]);

  return [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      required: true,
      icon: React.createElement(FaUser),
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: false,
      icon: React.createElement(FaEnvelope),
    },
    {
      name: "phone",
      label: "Phone",
      type: "number",
      required: true,
      icon: React.createElement(FaPhone),
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      required: true,
      icon: React.createElement(FaMapMarkerAlt),
    },
    {
      name: "shiftType",
      label: "Shift Type",
      type: "select",
      options: Object.values(ShiftType).map((shiftType: ShiftType) => ({
        value: shiftType.toString(),
        label: shiftType.toString(),
      })),
      required: true,
      icon: React.createElement(FaListUl),
    },
    {
      name: "planId",
      label: "Plan",
      type: "select",
      options:
        plans?.map((plan) => ({
          value: plan?.id,

          label: `${plan?.planName}-Rs ${plan?.price}-(${
            plan?.facilities?.length > 3
              ? `${plan?.facilities?.length} facilities`
              : plan?.facilities?.map((i) => i?.facilityName).join(", ") || "0"
          })`,
        })) || [],
      required: !isExistingMember,
      hidden: isExistingMember,
      icon: React.createElement(FaListUl),
    },
    {
      name: "joiningDate",
      label: "Joining Date",
      type: "text",
      required: !isExistingMember,
      hidden: isExistingMember,
      icon: React.createElement(FaCalendarAlt),
    },
    {
      name: "startDate",
      label: "Plan Start Date",
      type: "text",
      required: !isExistingMember,
      hidden: isExistingMember,
      icon: React.createElement(FaCalendarAlt),
    },

    {
      name: "admissionDate",
      label: "Entry Date",
      type: "text",
      required: !isExistingMember,
      hidden: isExistingMember,
      icon: React.createElement(FaCalendarAlt),
    },
    {
      name: "paymentMethod",
      label: "Payment Method",
      type: "select",
      options: Object.values(PaymentMode)
        .filter((mode) => mode !== PaymentMode.PARTIAL_CREDIT)
        .map((mode) => ({
          value: mode,
          label: mode,
        })),
      required: !isExistingMember,
      hidden: isExistingMember,
      icon: React.createElement(FaCreditCard),
    },
    {
      name: "cardNumber",
      label: "Door Card Number",
      type: "text",
      required: false,
      icon: React.createElement(FaCreditCard),
    },
    {
      name: "remarks",
      label: "Remarks",
      type: "textarea",
      required: false,
      icon: React.createElement(FaStickyNote),
    },
    {
      name: "emergencyContact",
      label: "Emergency Contact",
      type: "tel",
      required: false,
      icon: React.createElement(FaExclamationTriangle),
    },
    {
      name: "weight",
      label: "Weight (kg)",
      type: "number",
      required: false,
      icon: React.createElement(FaWeightHanging),
    },
    {
      name: "height",
      label: "Height (ft)",
      type: "number",
      required: false,
      icon: React.createElement(FaTextHeight),
    },
    // occupation,bloodGroup,gaurdianName,healthCondition

    {
      name: "bloodGroup",
      label: "Blood Group",
      type: "text",
      required: false,
      icon: React.createElement(Droplet),
    },
    {
      name: "guardianName",
      label: "Guardian Name",
      type: "text",
      required: false,
      icon: React.createElement(UserCheck),
    },
    {
      name: "healthCondition",
      label: "Health Condition",
      type: "text",
      required: false,
      icon: React.createElement(Heart),
    },
    {
      name: "occupation",
      label: "Occupation",
      type: "text",
      required: false,
      icon: React.createElement(Briefcase),
    },

    // GENDER FIELD at last
    {
      name: "gender",
      label: "Gender",
      type: "radio",
      required: true,
      options: [
        { value: "M", label: "Male" },
        { value: "F", label: "Female" },
      ],
      icon: React.createElement(FaVenusMars),
    },
  ];
};
