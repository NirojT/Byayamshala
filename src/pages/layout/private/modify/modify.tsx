import { useNavigate } from "react-router-dom";
import { PrivateRoute } from "../../../../global/config";

const Modify = () => {
  const navigate = useNavigate();
  const operations: string[] = [
    "members",
    "trainers",
    "plans", // Covers both Plans and Subscriptions
    "classes",
    "inventory",
  ];

  const finance: string[] = [
    "savings",
    "expenses",
    "sales",
    "credits",
    "suppliers",
    "purchase",
  ];

  return (
    <div className="text-white p-4">
      {/* Gym Operations Section */}
      <h2 className="text-xl font-bold mb-4">Gym Operations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-6">
        {operations.map((task, index) => (
          <div
            onClick={() =>
              navigate(`/${PrivateRoute}/edit/gym/operation/${task}`)
            }
            key={index}
            className="bg-gray-800 w-full h-[8em] rounded-lg shadow-md flex items-center justify-center 
              cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-700"
          >
            <h3 className="text-lg font-semibold text-white tracking-wide capitalize">
              {task}
            </h3>
          </div>
        ))}
      </div>

      {/* Finance Section */}
      <h2 className="text-xl font-bold mb-4">Finance</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {finance.map((task, index) => (
          <div
            onClick={() => navigate(`/${PrivateRoute}/edit/finance/${task}`)}
            key={index}
            className="bg-gray-800 w-full h-[8em] rounded-lg shadow-md flex items-center justify-center 
              cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-700"
          >
            <h3 className="text-lg font-semibold text-white tracking-wide">
              {task}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Modify;
