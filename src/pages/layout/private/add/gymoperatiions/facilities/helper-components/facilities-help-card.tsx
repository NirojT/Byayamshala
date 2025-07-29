import { FiInfo } from "react-icons/fi";

const FacilitiesHelpCard = () => {
  return (
    <div className="mt-6 bg-gray-800/50 border border-gray-700 rounded-xl shadow-lg p-6 flex items-start gap-4">
      <div className="bg-blue-600/20 p-3 rounded-lg">
        <FiInfo className="h-5 w-5 text-blue-400" />
      </div>
      <div>
        <h4 className="text-white font-medium mb-2">
          Tips for Adding Facilities
        </h4>
        <ul className="text-gray-400 text-sm space-y-2">
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>
              Be specific with facility names to avoid confusion (e.g., "Premium
              Cardio Room" instead of just "Cardio").
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>
              Add capacity limits when applicable to help manage facility usage
              and prevent overcrowding.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>
              Include detailed descriptions to help members understand what's
              included with each facility.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FacilitiesHelpCard;
