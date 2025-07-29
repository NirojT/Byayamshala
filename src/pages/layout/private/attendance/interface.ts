import { AttendanceFrom, ShiftType } from "@/global/components/enums/enums";
import {
  IAuditDetails,
  IGenericFilterData,
  IResponse,
} from "../../../../global/interface";

export type IAddAttendanceStore = {
  data: IAttendanceData[]; // Added support for numeric fields like `remainingDays`
  setData: (data: IAttendanceData[]) => void; // Updates the `data` state
  details: IAttendanceDetails[];
  memberAttendances: IAttendanceDetails[];
  staffAttendances: IAttendanceDetails[];
  setDetails: (details: IAttendanceDetails[]) => void;

  saveAttendance: (data: IAttendanceData[]) => Promise<IResponse>;
  getAttendanceOfToday: () => Promise<void>;
  addNewAttendance: () => Promise<IResponse>;

  searchAttendance: () => Promise<void>;
  searchByMember: (memberId: number) => Promise<void>;
  searchByStaff: (staffId: number) => Promise<void>;
  toggleAttendance: (id: number) => void;
  toggelAllAttendance: () => void;

  shift: ShiftType;
  setShift: (shift: ShiftType) => void;

  search: string;
  setSearch: (search: string) => void;

  date: string;
  setDate: (date: string) => void;

  selectAll: boolean;
  setSelectAll: (selectAll: boolean) => void;

  filters: IGenericFilterData;
  setFilters: (data: IGenericFilterData) => void;

  // for showing the dialog before goinng to the attendence page
  showDialog: boolean;
  setShowDialog: (value: boolean) => void;

  attendenceFor: "member" | "staff";
  setAttendenceFor: (attendenceFor: "member" | "staff") => void;
};

export type IAttendanceData = {
  id: number;
  memberId: number;
  checkInTime?: string | null;
  checkOutTime?: string | null;
  isPresent: boolean;
};

export interface IAttendanceDetails extends IAuditDetails {
  isPresent: boolean;
  member: IAttendanceMemberRes;
 
  attendanceFrom: AttendanceFrom;
  remarks: string;
  checkInTime?: string;
  checkOutTime?: string;
}

export type IAttendanceMemberRes = {
  id: number;
  fullName: string;
  shift: string;
  address: string;
};
