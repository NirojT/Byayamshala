import { create } from "zustand";
import { IUserPlansStore } from "./interface";
import { axios_auth } from "@/global/config";

export const useUserPlansStore = create<IUserPlansStore>((set) => ({
    subscriptions: [],

    getUserSubscriptions: async (appUserId:number) => {
            // appUser/get-subscriptions/{id} 
        try {
            const res = await axios_auth.get(`appUser/get-subscriptions/${appUserId}`);
            const data = res?.data?.data;
            if(res?.data?.data){
                set({subscriptions:data})
            }

        } catch (error) {
            console.log(error);
        }
    }

}));