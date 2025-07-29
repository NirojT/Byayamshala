import { create } from "zustand";

interface IRenewPlanStore {
    isOpen: boolean,
    setIsOpen: (newOpen: boolean) => void
}

export const useRenewPlanStore = create<IRenewPlanStore>((set) => ({
    isOpen: false,
    setIsOpen: (newOpen) => set({ isOpen: newOpen })
}));