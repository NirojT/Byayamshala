import { Typography } from "@mui/material";

interface StatCategoryProps {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

const StatCategory: React.FC<StatCategoryProps> = ({ title, icon, children }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
                {icon && <div className="mr-2">{icon}</div>}
                <Typography variant="h6" className="text-gray-800 font-semibold">
                    {title}
                </Typography>
            </div>
            <div className="mt-4">
                {children}
            </div>
        </div>
    );
};

export default StatCategory