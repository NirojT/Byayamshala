import { Card } from "@heroui/react";
import { PrivateRoute } from "@/global/config";
import { useNavigate } from "react-router-dom";
import { gymOperations } from "../../add/operations";
import React from "react";
import {
    Users,
    UserCheck,
    ClipboardList,
    Building2,
    CheckSquare,
    UserPlus,
} from "lucide-react";

const CustomGymOperationsCard = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {gymOperations.map((operation) => (
                    <button
                        key={operation.id}
                        onClick={() => navigate(`/${PrivateRoute}/add/gym/operation/${operation.name}`)}
                        className="w-full"
                    >
                        <Card
                            className="p-6 shadow-sm flex flex-col items-center justify-center 
                            hover:shadow-md hover:scale-105 transition-transform duration-300 ease-in-out 
                             border border-gray-200 rounded-lg"
                        >
                            <div className="text-center">
                                <div className="flex justify-center mb-4">
                                    {/* Icon container with colored background */}
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${getIconBackground(operation.name)}`}>
                                        {getIconForCategory(operation.name)}
                                    </div>
                                </div>
                                <div className="px-4">
                                    <h3 className="font-semibold mb-2 capitalize">{operation.name}</h3>
                                    <p className="text-xs text-gray-500">{getDescription(operation.name)}</p>
                                </div>
                            </div>
                        </Card>
                    </button>
                ))}
            </div>
        </div>
    );
};

// Helper function to get the appropriate icon for each category
const getIconForCategory = (category: string) => {
    switch (category.toLowerCase()) {
        case 'members':
            return <Users className="h-6 w-6 text-blue-600" />;
        case 'visitors':
            return <UserPlus className="h-6 w-6 text-indigo-600" />;
        case 'trainers':
            return <UserCheck className="h-6 w-6 text-green-600" />;
        case 'plans':
            return <ClipboardList className="h-6 w-6 text-purple-600" />;
        case 'facilities':
            return <Building2 className="h-6 w-6 text-yellow-600" />;
        case 'task':
            return <CheckSquare className="h-6 w-6 text-orange-600" />;
        default:
            return <Users className="h-6 w-6 text-gray-600" />;
    }
};

// Helper function to get background color for icon container
const getIconBackground = (category: string) => {
    switch (category.toLowerCase()) {
        case 'members':
            return 'bg-blue-100';
        case 'visitors':
            return 'bg-indigo-100';
        case 'trainers':
            return 'bg-green-100';
        case 'plans':
            return 'bg-purple-100';
        case 'facilities':
            return 'bg-yellow-100';
        case 'task':
            return 'bg-orange-100';
        default:
            return 'bg-gray-100';
    }
};

// Helper function to get description for each category
const getDescription = (category: string) => {
    switch (category.toLowerCase()) {
        case 'members':
            return 'Add and manage gym members';
        case 'visitors':
            return 'Track and manage visitor entries';
        case 'trainers':
            return 'Manage trainers and instructors';
        case 'plans':
            return 'Create and view membership plans';
        case 'facilities':
            return 'Manage gym facilities and amenities';
        case 'task':
            return 'Create and assign tasks';
        default:
            return 'Manage gym operations';
    }
};

export default React.memo(CustomGymOperationsCard);