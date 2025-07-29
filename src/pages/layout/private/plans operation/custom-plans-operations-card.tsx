import { PrivateRoute } from "@/global/config";
import { Card } from "@heroui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw, Building } from "lucide-react";

const CustomPlansOperationsCard = () => {
    const renewOperations = [
        {
            id: 1,
            name: "Renew Plans",
        },
        {
            id: 2,
            name: "Add Facilities",
        },
    ];

    const navigate = useNavigate();

    return (
        <div className="flex w-full font-poppins">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                {renewOperations.map((task) => (
                    <button
                        key={task.id}
                        onClick={() => navigate(`/${PrivateRoute}/plans/operation/task`, { state: { task } })}
                        className="w-full "
                    >
                        <Card
                            className="p-6 shadow-sm flex flex-col items-center justify-center 
                hover:shadow-md hover:scale-105 transition-transform duration-300 ease-in-out
                border border-gray-200 rounded-lg"
                        >
                            <div className="text-center">
                                <div className="flex justify-center mb-4">
                                    {/* Icon container with colored background */}
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${getIconBackground(task.name)}`}>
                                        {getIconForTask(task.name)}
                                    </div>
                                </div>
                                <div className="px-4">
                                    <h3 className=" mb-2 capitalize">{task.name}</h3>
                                    <p className="text-xs text-gray-500">{getDescription(task.name)}</p>
                                </div>
                            </div>
                        </Card>
                    </button>
                ))}
            </div>
        </div>
    );
};

// Helper function to get the appropriate icon for each task
const getIconForTask = (taskName: string) => {
    switch (taskName.toLowerCase()) {
        case 'renew plans':
            return <RefreshCw className="h-6 w-6 text-blue-600" />;
        case 'add facilities':
            return <Building className="h-6 w-6 text-green-600" />;
        default:
            return <RefreshCw className="h-6 w-6 text-gray-600" />;
    }
};

// Helper function to get background color for icon container
const getIconBackground = (taskName: string) => {
    switch (taskName.toLowerCase()) {
        case 'renew plans':
            return 'bg-blue-100';
        case 'add facilities':
            return 'bg-green-100';
        default:
            return 'bg-gray-100';
    }
};

// Helper function to get description for each task
const getDescription = (taskName: string) => {
    switch (taskName.toLowerCase()) {
        case 'renew plans':
            return 'Update and extend existing membership plans';
        case 'add facilities':
            return 'Add new facilities and amenities to your gym';
        default:
            return 'Manage plan operations';
    }
};

export default React.memo(CustomPlansOperationsCard);