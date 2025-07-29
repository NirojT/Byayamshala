import { create } from "zustand";
import { IHamburger } from "../../../../global/interface";

export const useOpenHamburgerNavigationSuper = create<IHamburger>((set) => ({
    isOpen:false,
    setIsOpen: (newIsOpen: boolean) => set({ isOpen :newIsOpen}),
  }))