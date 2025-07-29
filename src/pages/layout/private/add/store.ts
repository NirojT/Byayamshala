import { create } from "zustand";

interface ICurrentAddAction {
    currentTab : string;
    setCurrentTab: (tab:string) => void

}

export const useCurrentAddActionStore  = create<ICurrentAddAction>((set) => ({
    currentTab:"gym",
    setCurrentTab: (tab:string) => {
        set({currentTab:tab})
    }
}));