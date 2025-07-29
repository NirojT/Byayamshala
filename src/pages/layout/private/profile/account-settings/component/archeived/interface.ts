 
import { BulkSelect, BulkTask } from "@/global/components/enums/enums";
import { IResponse } from "@/global/interface";
 
import { IMemberDetails } from "@/pages/layout/private/list/gymoperatiions/members/interface";
import { IPlansDetails } from "@/pages/layout/private/list/gymoperatiions/plans/interface";
import { IStaffDetails } from "@/pages/layout/private/list/gymoperatiions/staff/interface";
 
export interface IArcheivedStore {
  // actions to get the business details of a user
  members: IMemberDetails[];
  plans: IPlansDetails[];
  staffs: IStaffDetails[];

  filteredMembers: IMemberDetails[];
  filteredPlans: IPlansDetails[];
  filteredStaffs: IStaffDetails[];

  getArcheived: () => void;
       bulkAction: (ids: number[]) => Promise<IResponse>
  setFilteredMembers: (filteredMembers: IMemberDetails[]) => void;
  setFilteredPlans: (filteredPlans: IPlansDetails[]) => void;
  setFilteredStaffs: (filteredStaffs: IStaffDetails[]) => void;

  bulkTask: null | BulkTask;
  setBulkTask: (data: BulkTask | null) => void;
  selected: BulkSelect ;
  setSelected: (data: BulkSelect ) => void;

  openModal: boolean;
  setOpenModal: (data: boolean) => void;

  toggleMember: (id: number) => void;
  toggleMemberAll: () => void;
  toggleStaff: (id: number) => void;
  toggleStaffAll: () => void;
  togglePlans: (id: number) => void;
  togglePlansAll: () => void;

  // action for business details
}
