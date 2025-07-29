/* eslint-disable @typescript-eslint/no-explicit-any */
import { BulkTask, PartyMoneyType } from "@/global/components/enums/enums";
import { create } from "zustand";
import {
  axios_auth,
  axios_auth_form
} from "../../../../../../global/config";
import {
  IListMemberStore,
  IMemberDetails,
  IMemberFacilitiesDetails,
  IMemberFilterData,
  IMemberships,
  IShowDence,
} from "./interface";

const defaultFinance = {
  amt: 0,
  partyMoneyType: PartyMoneyType.SETTLED,
};

export const useListMemberStore = create<IListMemberStore>((set, get) => ({
  isSearching: false,
  currentSearchData: null,
  members: [], // Initialize an empty object to store  data
  memberShips: [],
  memberFacilities: [],
  member: {} as IMemberDetails,
  //for filtering
  filteredData: [],
  memberFinance: defaultFinance,

  //just update the member data
  updateMemberShips: (data: IMemberships) => {
    set(() => ({
      memberShips: get().memberShips.map((item) =>
        item.id === data.id ? { ...data } : item
      ),
    }));
  },
  getMembers: async () => {
    try {
      const res = await axios_auth.get(
        `member/get-all/${get().page}/${get().rowsPerPage}`
      );

      if (res?.data?.status === 200) {
        set({ members: res?.data?.data?.content });
        set({ totalLength: res?.data?.data?.totalElements });
      } else {
        console.log("No data found");
        set({ members: [] });
      }
    } catch (error: any) {
      console.log(error);
      set({ members: [] });
    }
  },
  getMemberById: async (id: number) => {
    try {
      const res = await axios_auth.get(`member/get/${id}`);

      if (res?.data?.status === 200) {
        set({ member: res?.data?.data });
      }
    } catch (error: any) {
      console.log(error);
    }
  },
  getMemberFinance: async (id: number) => {
    try {
      const res = await axios_auth.get(`member/get-finance/${id}`);

      if (res?.data?.status === 200) {
        set({ memberFinance: res?.data?.data });
      }
    } catch (error: any) {
      console.log(error);
    }
  },
  getMemberShipByMemberId: async (memberId: number) => {
    try {
      const res = await axios_auth.get(`member/get-membership/${memberId}`);

      if (res?.data?.status === 200) {
        set({ memberShips: res?.data?.data });
      } else {
        set({ memberShips: [] });
      }
    } catch (error: any) {
      console.log(error);
      set({ memberShips: [] });
    }
  },
  getMemberFacilityByMemberId: async (memberId: number) => {
    try {
      const res = await axios_auth.get(`member/get-facility/${memberId}`);

      if (res?.data?.status === 200) {
        set({ memberFacilities: res?.data?.data });
      } else {
        set({ memberFacilities: [] });
      }
    } catch (error: any) {
      console.log(error);
      set({ memberFacilities: [] });
    }
  },

  addMembshipToList: (data: IMemberships) => {
    set((state) => ({
      memberShips: [data, ...state.memberShips],
    }));
  },
  addMemberFacilityInList: (data: IMemberFacilitiesDetails) => {
    set((state) => ({
      memberFacilities: [data, ...state.memberFacilities],
    }));
  },
  //update memberships data to list
  updateMembershipInList: (data: IMemberships) => {
    set((state) => ({
      memberShips: state.memberShips.map((item) =>
        item.id === data.id ? { ...data } : item
      ),
    }));
  },
  removeMembershipFromList: (id: number) => {
    set({
      memberShips: get().memberShips.filter((item) => item.id !== id),
    });
  },
  removeMemberFacilityFromList: (id: number) => {
    set({
      memberFacilities: get().memberFacilities.filter((item) => item.id !== id),
    });
  },

  //for facilty
  updateMemberFacilityInList: (data: IMemberFacilitiesDetails) => {
    set((state) => ({
      memberFacilities: state.memberFacilities.map((item) =>
        item.id === data.id ? { ...data } : item
      ),
    }));
  },
  // for pagination we neeed total length of members
  totalLength: 0,

  //for searching api
  searchQuery: async (data: IMemberFilterData) => {
    set({ isSearching: true, currentSearchData: data }); // Store search state
    try {
      const res = await axios_auth.patch(`member/search`, data);

      if (res?.data?.status === 200) {
        const serverData = res?.data?.data;
        set({
          members: serverData,
          totalLength: serverData?.length,
        });

        return { message: "member found", severity: "success" };
      }

      set({
        members: [],
        totalLength: 0,
      });

      return { message: "member did not found", severity: "error" };
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "something went wrong", severity: "error" };
    }
  },
  // searchQuery: async (data: IMemberFilterData) => {
  //   set({ isSearching: true, currentSearchData: data }); // Store search state
  //   try {
  //     const res = await axios_auth.patch(
  //       `member/search/${get().page}/${get().rowsPerPage}`,
  //       data
  //     );

  //     if (res?.data?.status === 200) {
  //       set({
  //         members: res?.data?.data?.content,
  //         totalLength: res?.data?.data?.totalElements,
  //       });
  //     }
  //     if (res?.data?.status === 400) {
  //       set({
  //         members: res?.data?.data?.content,
  //         totalLength: res?.data?.data?.totalElements,
  //       });
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // },
  cancelMembership: async (id: number) => {
    try {
      const res = await axios_auth.patch("member/cancel-membership/" + id);

      if (res?.data?.status === 200) {
        const data = res?.data?.data;
        set({
          memberShips: get().memberShips?.map((item) =>
            item.id === id ? { ...data } : item
          ),
        });
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

  exportMembers: async () => {
    try {
      const res = await axios_auth.get(`member/export/csv`, {
        responseType: "arraybuffer", // Important to treat the response as binary data
      });

      // Create a Blob from the response data
      const blob = new Blob([res.data], { type: "text/csv" });

      // Create an anchor element to trigger the download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob); // Create a URL for the Blob
      link.download = "members.csv"; // Name of the downloaded file

      // Append the link to the document body and trigger the click event
      document.body.appendChild(link);
      link.click();

      // Clean up by removing the link after the click
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  },

  bulkTask: null,
  setBulkTask: (data: BulkTask | null) => set({ bulkTask: data }),
  openModal: false,
  setOpenModal: (data: boolean) => set({ openModal: data }),

  bulkAction: async () => {
    try {
      const memberIds = get()
        .filteredData?.filter((item) => item?.isSelected)
        ?.map((item) => item?.id);

      const res = await axios_auth.post(
        `member/bulk-action?bulkTask=${get().bulkTask}`,
        memberIds
      );

      if (res?.data?.status === 200) {
        if (get().bulkTask !== BulkTask.WHATSAPP_SAVED) {
          set({
            // filteredData: get().filteredData.filter(
            //   (item: IMemberDetails) => !memberIds?.includes(item?.id)
            // ),
            members: get().members.filter(
              (item: IMemberDetails) => !memberIds?.includes(item?.id)
            ),
          });
        } else if (get().bulkTask === BulkTask.WHATSAPP_SAVED) {
          set({
            // filteredData: get().filteredData.filter(
            //   (item: IMemberDetails) => !memberIds?.includes(item?.id)
            // ),
            members: get().members.map((member) => {
              if (memberIds.includes(member.id)) member.isWhatsAppSaved = true;

              return member;
            }),
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

  resetSearch: async () => {
    set({ isSearching: false, currentSearchData: null });
    set({
      filters: {
        shift: null,
        status: "",
        whatsApp: "",
        doorCard: "",
        doorAccess: "",
      },
    });
    set({ page: 0 });
    set({ rowsPerPage: 10 });
    await get().getMembers();
  },

  filters: {
    fullName: "",
    shift: null,
    status: "",
    whatsApp: "",
    doorCard: "",
    doorAccess: "",
  },
  setFilters: (data: IMemberFilterData) => {
    set(() => ({
      filters: data,
    }));
  },

  setFilteredData: (data: IMemberDetails[]) => {
    set(() => ({
      filteredData: data,
    }));
  },

  page: 0,

  setPage: (data: number) => {
    set(() => ({
      page: data,
    }));
  },

  rowsPerPage: 10,

  setRowsPerPage: (data: number) => {
    set(() => ({
      rowsPerPage: data,
    }));
  },

  //for toggering
  toggleSelectMember: (id: number) => {
    set((state) => ({
      filteredData: state.filteredData.map((member) =>
        member.id === id
          ? { ...member, isSelected: !member.isSelected }
          : member
      ),
    }));
  },

  toggleSelectAll: () => {
    set((state) => ({
      filteredData: state.filteredData.map((member) => ({
        ...member,
        isSelected: !member.isSelected,
      })),
    }));
  },
  setIsSearching: (isSearching) => {
    set(() => ({
      isSearching,
    }));
  },
  searchByName: async () => {
    try {
      const res = await axios_auth.get(
        `member/search-by-name?name=${get().name}`
      );

      if (res?.data?.status === 200) {
        set({ members: res?.data?.data });
        return { message: "member found", severity: "success" };
      } else {
        console.log("No data found");
        set({ members: [] });
        return { message: "member didn't found", severity: "error" };
      }
    } catch (error: any) {
      console.log(error);
      set({ members: [] });
      return { message: "something went wrong", severity: "error" };
    }
  },
  name: "",
  setName(name) {
    set({ name });
  },
  searchByOtherInfo: async () => {
    try {
      const res = await axios_auth.get(
        `member/search-by-info?info=${get().info}`
      );

      if (res?.data?.status === 200) {
        set({ members: res?.data?.data });
        return { message: "member found", severity: "success" };
      } else {
        console.log("No data found");
        set({ members: [] });
        return { message: "member didn't found", severity: "error" };
      }
    } catch (error: any) {
      console.log(error);
      set({ members: [] });
      return { message: "something went wrong", severity: "error" };
    }
  },
  info: "",
  setInfo(info) {
    set({ info });
  },

  uploadProfileImage: async (file: File, memberId: number) => {
    try {
      const formData = new FormData();
      formData.append("imageFile", file);
      const response = await axios_auth_form.post(
        `/member/upload-profile/${memberId}`,
        formData
      );

      if (response?.data?.status === 200) {
        const serverData = response?.data?.data;

        set({ member: serverData }); // Update the member's image in the store
        set({
          members: get().members.map((member) =>
            member.id === memberId ? { ...serverData } : member
          ),
        }); // Update the member's image in the members list
        // Optionally: refresh profile or show a message
        return { message: response?.data?.message, severity: "success" };
      } else {
        return { message: "Failed to upload image", severity: "error" };
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "Something went wrong", severity: "error" };
    }
  },
  qrCode: "",
  generateQrCode: async (memberId: number) => {
    try {
      const res = await axios_auth.get(`/member/generate-qr/${memberId}`, {
        responseType: "arraybuffer", // <--- This is key!
      });

      // Create a Blob for image/png
      const qrBlob = new Blob([res.data], { type: "image/png" });

      // Create an Object URL for the Blob (can use in <img src=...>)
      const qrUrl = URL.createObjectURL(qrBlob);

      set({
        qrCode: qrUrl, // Save this URL in your state
      });
    } catch (error) {
      console.log(error);
    }
  },
  doorControl: async (allows: boolean, memberId: number) => {
    try {
      const cmd = allows ? "access" : "revoke"; // Convert boolean to string for API

      const response = await axios_auth_form.post(
        `/member/door-control/${memberId}?cmd=${cmd}`
      );

      if (response?.data?.status === 200) {
        const serverData = response?.data?.data;

        set({ member: serverData }); // Update the member's image in the store
        set({
          members: get().members.map((member) =>
            member.id === memberId ? { ...serverData } : member
          ),
        }); // Update the member's image in the members list
        // Optionally: refresh profile or show a message
        return { message: response?.data?.message, severity: "success" };
      } else {
        return { message: "Failed to upload image", severity: "error" };
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        return { message: error?.response?.data?.message, severity: "error" };
      }
      return { message: "Something went wrong", severity: "error" };
    }
  },
  currentSelect: "membership",
  setCurrentSelect: (currentSelect) => {
    set({ currentSelect });
  },
}));

//for attendence
export const showAttendence = create<IShowDence>((set) => ({
  isShowAttendence: false,
  setIsShowAttendence: () => set({ isShowAttendence: true }),
  setIsHideAttendence: () => set({ isShowAttendence: false }),
}));
