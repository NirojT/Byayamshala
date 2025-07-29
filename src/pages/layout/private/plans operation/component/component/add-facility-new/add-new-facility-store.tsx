import { create } from "zustand";

interface IToggleAddFacility {
    isOpen: boolean,
    setIsOpen: (newIsOpen: boolean) => void
}

export const useToggleAddFacilityStore = create<IToggleAddFacility>((set) => ({
    isOpen: false,
    setIsOpen: (newIsOpen: boolean) => set({ isOpen: newIsOpen }),
}))