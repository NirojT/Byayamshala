import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGlobalStore } from "@/global/store";
import { useEffect } from "react";
import CustomFinanceOperationsCard from "../components/card-component/custom-finance-operations-card";
import CustomGymOperationsCard from "../components/card-component/custom-gym-operations-card";
import { useCurrentAddActionStore } from "./store";

const Add = () => {
  const { currentTab, setCurrentTab } = useCurrentAddActionStore();

      const scrollPosition = useGlobalStore((state) => state.scrollPosition);

  useEffect(() => {
 
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  
  return (
    <div className="p-4">
      <Tabs
        defaultValue={currentTab}
        onValueChange={setCurrentTab}
        className="w-full min-h-screen flex flex-col items-center gap-16"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            className="text-sm md:text-lg lg:text-xl text-black"
            value="gym"
          >
            Gym Operations
          </TabsTrigger>
          <TabsTrigger
            className="text-sm md:text-lg lg:text-xl text-black"
            value="finance"
          >
            Finanace Operations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="finance">
          {/* Finance operations section */}
          {/* <h2 className="text-center text-white text-xl font-bold mb-4">Financial Operations</h2> */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-6"> */}
          <CustomFinanceOperationsCard />
        </TabsContent>

        <TabsContent value="gym">
          {/* Gym Operations Section */}
          {/* <h2 className="text-center text-xl font-bold mb-4 text-white">Gym Operations</h2> */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-6"> */}
          <div>
            <CustomGymOperationsCard />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Add;
