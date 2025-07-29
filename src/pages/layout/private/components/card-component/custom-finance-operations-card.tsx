import { Card } from "@heroui/react";
import { PrivateRoute } from "@/global/config";
import { useNavigate } from "react-router-dom";
import { finance } from "../../add/finance";
import React from "react";
import {
  PiggyBank,
  Receipt,
  BarChart3,
  CreditCard,
  Truck,
  ShoppingCart,
  ArrowLeftRight,
  RotateCcw,
} from "lucide-react";

const CustomFinanceOperationsCard = () => {
  const navigate = useNavigate();

  const handleNavigate = (name: string) => {
    navigate(`/${PrivateRoute}/add/finance/${name}`);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {finance.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigate(item?.name)}
            className="w-full "
          >
            <Card
              className="p-6 shadow-sm flex flex-col items-center justify-center 
                                        hover:shadow-md hover:scale-105 transition-transform duration-300 
                                        ease-in-out border border-gray-200 rounded-lg"
            >
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {/* Icon container with colored background */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center ${getIconBackground(
                      item.name
                    )}`}
                  >
                    {getIconForCategory(item.name)}
                  </div>
                </div>
                <div className="px-4">
                  <h3 className="font-semibold mb-2 capitalize">
                    {formatDisplayName(item.name)}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {getDescription(item.name)}
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

// Helper function to format display name (replace hyphens with spaces)
const formatDisplayName = (name: string) => {
  return name.replace(/-/g, " ");
};

// Helper function to get the appropriate icon for each category
const getIconForCategory = (category: string) => {
  switch (category.toLowerCase()) {
    case "savings":
      return <PiggyBank className="h-6 w-6 text-blue-600" />;
    case "expenses":
      return <Receipt className="h-6 w-6 text-red-600" />;
    case "sales":
      return <BarChart3 className="h-6 w-6 text-green-600" />;
    case "credits":
      return <CreditCard className="h-6 w-6 text-purple-600" />;
    case "suppliers":
      return <Truck className="h-6 w-6 text-yellow-600" />;
    case "purchase":
      return <ShoppingCart className="h-6 w-6 text-blue-600" />;
    case "sales-returns":
      return <ArrowLeftRight className="h-6 w-6 text-pink-600" />;
    case "purchase-returns":
      return <RotateCcw className="h-6 w-6 text-teal-600" />;
    default:
      return <Receipt className="h-6 w-6 text-gray-600" />;
  }
};

// Helper function to get background color for icon container
const getIconBackground = (category: string) => {
  switch (category.toLowerCase()) {
    case "savings":
      return "bg-blue-100";
    case "expenses":
      return "bg-red-100";
    case "sales":
      return "bg-green-100";
    case "credits":
      return "bg-purple-100";
    case "suppliers":
      return "bg-yellow-100";
    case "purchase":
      return "bg-blue-100";
    case "sales-returns":
      return "bg-pink-100";
    case "purchase-returns":
      return "bg-teal-100";
    default:
      return "bg-gray-100";
  }
};

// Helper function to get description for each category
const getDescription = (category: string) => {
  switch (category.toLowerCase()) {
    case "savings":
      return "Track your savings and investments";
    case "expenses":
      return "Manage your daily expenses";
    case "sales":
      return "Record your sales transactions";
    case "credits":
      return "Manage credit transactions";
    case "suppliers":
      return "Add supplier transactions";
    case "purchase":
      return "Record purchase transactions";
    case "sales-returns":
      return "Manage sales returns";
    case "purchase-returns":
      return "Record purchase returns";
    default:
      return "Manage financial records";
  }
};

export default React.memo(CustomFinanceOperationsCard);
