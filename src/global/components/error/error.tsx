 
import { AlertTriangle } from "lucide-react";

const Error = () => {
  

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 text-gray-800 p-6">
      <AlertTriangle size={60} className="text-red-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Something went wrong.</h1>
      <p className="mb-6 text-center max-w-md text-gray-600">
        We encountered an unexpected error. Please try again or go back to the
        homepage.
      </p>
      <button
        onClick={() =>  window.location.reload()}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow transition"
      >
        Go Home
      </button>
    </div>
  );
};

export default Error;
