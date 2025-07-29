import { Typography } from "@mui/material";

interface StatCardProps {
    title: string;
    value: number;
    isCurrency?: boolean;
    onClick?: () => void;
    color?: string;
    textColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    isCurrency,
    onClick,
    color = "bg-white",
    textColor = "text-orange-600"
}) => {
    return (
        <div
            className={`${color} rounded-lg shadow-md p-6 border border-gray-100 transition-all hover:shadow-lg 
            ${onClick ? 'cursor-pointer' : ''}`}
            onClick={onClick}
        >
            <Typography
                variant="subtitle1"
                className="text-gray-600 font-medium mb-2"
            >
                {title}
            </Typography>
            <Typography variant="h5" className={`${textColor} font-bold`}>
                {isCurrency
                    ? `Rs. ${value?.toLocaleString() || 0}`
                    : value?.toLocaleString() || 0}
            </Typography>
        </div>
    );
};

export default StatCard