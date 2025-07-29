import React from "react";
import {
  FaClock,
  FaCreditCard,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaStickyNote,
  FaUser, 
} from "react-icons/fa";

import { ShiftType, StaffType } from "@/global/components/enums/enums";
import { IStaffFormField } from "../interface";

export const StaffFormFields: IStaffFormField[] = [
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
    type: "tel",
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
    icon: React.createElement(FaClock),
  },
  {
    name: "staffType",
    label: "Staff Type",
    type: "select",
    options: Object.values(StaffType).map((staffType: StaffType) => ({
      value: staffType.toString(),
      label: staffType.toString(),
    })),
    required: true,
    icon: React.createElement(FaClock),
  },

  {
    name: "remarks",
    label: "Remarks",
    type: "text",
    required: false,
    icon: React.createElement(FaStickyNote),
  },
  {
    name: "cardNumber",
    label: "Door Card Number  ",
    type: "text",
    required: false,
    icon: React.createElement(FaCreditCard),
  },
];
