import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useBusinessStatsStore } from "../store";
import FinancialStatistics from "../categories/financial-statistics";
import AccountStatistics from "../categories/account-statistics";
import InventoryStatistics from "../categories/inventory-statistics";
import MembershipStatistics from "../categories/membership-statistics";
import FacilitiesResourcesStat from "../categories/facilities-resources-statistics";

const BusinessReportTabs = () => {
    // Use local state for handling tab transitions
    const { currentTab, setCurrentTab } = useBusinessStatsStore();

    return (
        <div className="w-full">
            <Tabs
                value={currentTab}
                defaultValue="financial"
                onValueChange={setCurrentTab}
                className="w-full flex flex-col"
            >
                <div className="w-full overflow-x-auto">
                    <TabsList className="grid grid-cols-2 sm:flex sm:w-full mb-4 bg-gray-100 rounded-lg p-1 sm:min-w-max">
                        <TabsTrigger
                            value="financial"
                            className="flex-1 py-2 px-4 text-sm sm:text-base rounded-md text-gray-700 hover:text-[#E26300] data-[state=active]:bg-white data-[state=active]:text-[#E26300] data-[state=active]:shadow-sm data-[state=active]:border-b-2 data-[state=active]:border-[#E26300] transition-all"
                        >
                            Financial Statistics
                        </TabsTrigger>
                        <TabsTrigger
                            value="account"
                            className="flex-1 py-2 px-4 text-sm sm:text-base rounded-md text-gray-700 hover:text-[#E26300] data-[state=active]:bg-white data-[state=active]:text-[#E26300] data-[state=active]:shadow-sm data-[state=active]:border-b-2 data-[state=active]:border-[#E26300] transition-all"
                        >
                            Account Statistics
                        </TabsTrigger>
                        <TabsTrigger
                            value="inventory"
                            className="flex-1 py-2 px-4 text-sm sm:text-base rounded-md text-gray-700 hover:text-[#E26300] data-[state=active]:bg-white data-[state=active]:text-[#E26300] data-[state=active]:shadow-sm data-[state=active]:border-b-2 data-[state=active]:border-[#E26300] transition-all"
                        >
                            Inventory Statistics
                        </TabsTrigger>
                        <TabsTrigger
                            value="membership"
                            className="flex-1 py-2 px-4 text-sm sm:text-base rounded-md text-gray-700 hover:text-[#E26300] data-[state=active]:bg-white data-[state=active]:text-[#E26300] data-[state=active]:shadow-sm data-[state=active]:border-b-2 data-[state=active]:border-[#E26300] transition-all"
                        >
                            Membership Statistics
                        </TabsTrigger>
                        <TabsTrigger
                            value="facilities"
                            className="flex-1 py-2 px-4 text-sm sm:text-base rounded-md text-gray-700 hover:text-[#E26300] data-[state=active]:bg-white data-[state=active]:text-[#E26300] data-[state=active]:shadow-sm data-[state=active]:border-b-2 data-[state=active]:border-[#E26300] transition-all"
                        >
                            Facilities Statistics
                        </TabsTrigger>
                    </TabsList>
                </div>

                <div className="mt-4">
                    {/* Financial statistics */}
                    <TabsContent value="financial" className="w-full animate-in fade-in-50 duration-300">
                        <FinancialStatistics />
                    </TabsContent>

                    {/* Account statistics */}
                    <TabsContent value="account" className="w-full animate-in fade-in-50 duration-300">
                        <AccountStatistics />
                    </TabsContent>

                    {/* Inventory statistics */}
                    <TabsContent value="inventory" className="w-full animate-in fade-in-50 duration-300">
                        <InventoryStatistics />
                    </TabsContent>

                    {/* Membership statistics */}
                    <TabsContent value="membership" className="w-full animate-in fade-in-50 duration-300">
                        <MembershipStatistics />
                    </TabsContent>

                    {/* Facilities and resources */}
                    <TabsContent value="facilities" className="w-full animate-in fade-in-50 duration-300">
                        <FacilitiesResourcesStat />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}

export default BusinessReportTabs;