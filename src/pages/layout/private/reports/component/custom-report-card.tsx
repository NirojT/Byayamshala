import { PrivateRoute } from "@/global/config";
import { useNavigate } from "react-router-dom";
import { Card } from "@heroui/react";
import { reportOPerations } from "./operations";
import {
  Users,
  CreditCard,
  BarChart3,
  ShoppingCart,
  Receipt,
  LineChart,
} from "lucide-react";

const CustomReportCard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {reportOPerations.map((operation) => (
          <button
            key={operation.name}
            onClick={() =>
              navigate(`/${PrivateRoute}/reports/${operation.name}`)
            }
            className="w-fullrounded-lg"
          >
            <Card
              className="p-6 rounded-lg shadow-sm flex flex-col items-center justify-center 
                hover:shadow-md hover:scale-105 transition-transform duration-300 ease-in-out
                 border border-gray-200 "
            >
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {/* Icon container with colored background */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center ${getIconBackground(
                      operation.name
                    )}`}
                  >
                    {getIconForCategory(operation.name)}
                  </div>
                </div>
                <div className="px-4">
                  <h3 className="font-semibold mb-2 capitalize">
                    {formatDisplayName(operation.name)}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {getDescription(operation.name)}
                  </p>
                </div>
              </div>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
};

// Helper function to format display name (replace underscores with spaces)
const formatDisplayName = (name: string) => {
  return name.replace(/_/g, " ");
};

// Helper function to get the appropriate icon for each category
const getIconForCategory = (category: string) => {
  switch (category.toLowerCase()) {
    case "party":
      return <Users className="h-6 w-6 text-purple-600" />;
    case "membership":
      return <CreditCard className="h-6 w-6 text-indigo-600" />;
    case "sales":
      return <BarChart3 className="h-6 w-6 text-green-600" />;
    case "purchase":
      return <ShoppingCart className="h-6 w-6 text-blue-600" />;
    case "expenses":
      return <Receipt className="h-6 w-6 text-red-600" />;
    case "business_stats":
      return <LineChart className="h-6 w-6 text-amber-600" />;
    default:
      return <BarChart3 className="h-6 w-6 text-gray-600" />;
  }
};

// Helper function to get background color for icon container
const getIconBackground = (category: string) => {
  switch (category.toLowerCase()) {
    case "party":
      return "bg-purple-100";
    case "membership":
      return "bg-indigo-100";
    case "facilities":
      return "bg-indigo-100";
    case "sales":
      return "bg-green-100";
    case "purchase":
      return "bg-blue-100";
    case "expenses":
      return "bg-red-100";
    case "business_stats":
      return "bg-amber-100";
    default:
      return "bg-gray-100";
  }
};

// Helper function to get description for each category
const getDescription = (category: string) => {
  switch (category.toLowerCase()) {
    case "party":
      return "View party and event reports";
    case "membership":
      return "Track membership statistics and revenue";
    case "facilities":
      return "Track facilities statistics and revenue";
    case "sales":
      return "Analyze sales data and trends";
    case "purchase":
      return "Review purchase orders and inventory";
    case "expenses":
      return "Monitor expenses and cost management";
    case "business_stats":
      return "View overall business performance metrics";
    default:
      return "View detailed report data";
  }
};

export default CustomReportCard;
