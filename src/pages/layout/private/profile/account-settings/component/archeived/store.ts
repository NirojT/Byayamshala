import { create } from "zustand";
import { IArcheivedStore } from "./interface";
import { axios_auth } from "@/global/config";
import { BulkSelect, BulkTask } from "@/global/components/enums/enums";
import { IPlansDetails } from "@/pages/layout/private/list/gymoperatiions/plans/interface"; 
import { IMemberDetails } from "@/pages/layout/private/list/gymoperatiions/members/interface";
import { IStaffDetails } from "@/pages/layout/private/list/gymoperatiions/staff/interface";

export const useArcheivedStore = create<IArcheivedStore>((set, get) => ({
  members: [],
  plans: [],
  staffs: [],
  filteredMembers: [],
  filteredPlans: [],
  filteredStaffs: [],

  getArcheived: async () => {
    try {
      const res = await axios_auth.get("archieved/get-all");

      if (res.status >= 200 && res.status <= 300) {
        const data = res?.data?.data;
        set({
          members: data?.members,
          plans: data?.plans,
          staffs: data?.staffs,
         
        });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  },
  setFilteredMembers: (filteredMembers: IMemberDetails[]) => {
    set({ filteredMembers });
  },
  setFilteredPlans: (filteredPlans: IPlansDetails[]) => {
    set({ filteredPlans });
  },
  setFilteredStaffs: (filteredStaffs: IStaffDetails[]) => {
    set({ filteredStaffs });
  },

  //   for toggelling member
  toggleMember: (id: number) => {
    set((state) => ({
      filteredMembers: state.filteredMembers.map((member) =>
        member?.id === id
          ? { ...member, isSelected: !member?.isSelected }
          : member
      ),
    }));
  },

  toggleMemberAll: () => {
    set((state) => ({
      filteredMembers: state.filteredMembers.map((member) => ({
        ...member,
        isSelected: !member?.isSelected,
      })),
    }));
  },
  //   for toggelling staffs
  toggleStaff: (id: number) => {
    set((state) => ({
      filteredStaffs: state.filteredStaffs.map((trainer) =>
        trainer?.id === id
          ? { ...trainer, isSelected: !trainer?.isSelected }
          : trainer
      ),
    }));
  },

  toggleStaffAll: () => {
    set((state) => ({
      filteredStaffs: state.filteredStaffs.map((trainer) => ({
        ...trainer,
        isSelected: !trainer?.isSelected,
      })),
    }));
  },
  //   for toggelling plan
  togglePlans: (id: number) => {
    set((state) => ({
      filteredPlans: state.filteredPlans.map((plan) =>
        plan?.id === id ? { ...plan, isSelected: !plan?.isSelected } : plan
      ),
    }));
  },

  togglePlansAll: () => {
    set((state) => ({
      filteredPlans: state.filteredPlans.map((plan) => ({
        ...plan,
        isSelected: !plan?.isSelected,
      })),
    }));
  },

  bulkTask: BulkTask.RESTORE,
  setBulkTask: (data: BulkTask | null) => set({ bulkTask: data }),
  openModal: false,
  setOpenModal: (data: boolean) => set({ openModal: data }),
  selected: BulkSelect.MEMBER,
  setSelected: (data: BulkSelect) => set({ selected: data }),

  bulkAction: async (ids: number[]) => {
    try {
      const res = await axios_auth.post(
        `archieved/bulk-action?bulkTask=${get().bulkTask}&bulkSelect=${
          get().selected
        }`,
        ids
      );

      if (res?.data?.status === 200) {
        // update member list
        if (get().selected === BulkSelect.MEMBER) {
           
          set({
            
              members: get().members.filter(
                (item: IMemberDetails) => !ids?.includes(item?.id)
                ),
                bulkTask: BulkTask.DELETE_PERMANENTLY

          });
        }
        // update member list
        else if (get().selected === BulkSelect.STAFF) {
          
          set({
           
              staffs: get().staffs.filter(
                (item: IStaffDetails) => !ids?.includes(item?.id) )
              
              });
            }
        // update member list
       else if (get().selected === BulkSelect.PLAN) {
           
          set({
             
              plans: get().plans.filter(
                (item: IPlansDetails) => !ids?.includes(item?.id) ),
          });
        
      }
      }
      return res?.data?.status === 200
        ? { message: res?.data?.message, severity: "success" }
        : { message: res?.data?.message, severity: "error" };
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },
}));
