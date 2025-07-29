import { create } from "zustand";
import { IHamburger, IMobileActiveUrl, IUserProfile } from "../../../../global/interface";

export const useOpenHamburgerNavigation = create<IHamburger>((set) => ({
    isOpen:false,
    setIsOpen: (newIsOpen: boolean) => set({ isOpen :newIsOpen}),
  }))


  
  export const useOpenUserProfile = create<IUserProfile>((set) => ({
    isProfileOpen: false,
    setIsProfileOpen: (open:boolean) => {
      set({isProfileOpen:open})
    },
    isOpenTransaction: false,
    setIsOpenTransaction: (open:boolean) => {
      set({isOpenTransaction:open})
    }
  }));


export const useMobileNavigationStore = create<IMobileActiveUrl>((set) => ({
  activeUrl: "",
  setActiveUrl: (url:string) => {
    set({
      activeUrl:  url
    })
  }
}));