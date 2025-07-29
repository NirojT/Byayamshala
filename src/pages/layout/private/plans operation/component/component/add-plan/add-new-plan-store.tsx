import { create } from "zustand";

interface IToggleAddPlan {
    isOpen: boolean,
    setIsOpen: (newIsOpen: boolean) => void
}

export const useToggleAddPlanStore = create<IToggleAddPlan>((set) => ({
    isOpen: false,
    setIsOpen: (newIsOpen: boolean) => set({ isOpen: newIsOpen }),
}))