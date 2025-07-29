import { useLocation, useNavigate } from "react-router-dom";

const OAuth2ErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const error = location.state?.error || "Unknown error occurred.";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <div className="bg-white p-8 rounded shadow-md text-center max-w-lg">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Login Error</h1>
        <p className="text-gray-700 mb-6">{decodeURIComponent(error)}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-orange-500 hover:bg-orange-700 text-white px-6 py-2 rounded"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default OAuth2ErrorPage;