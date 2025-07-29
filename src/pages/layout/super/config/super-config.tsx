
import { useGlobalStore } from "@/global/store";
import { useEffect } from "react";
import { useSuperConfigStore } from "./store";

const SuperConfig = () => {
  const { setToasterData } = useGlobalStore();
  const { data, setData, create, update, getSuperConfigs } =
    useSuperConfigStore();

  //handleres
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let res  

if(data?.id>0){
      res = await update();
      
}

else{
  res = await create();

}
    setToasterData({
      open: true,
      message: res?.message,
      severity: res?.severity,
    });
  };

  useEffect(() => {
    getSuperConfigs();
  }, [getSuperConfigs]);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm animate-fadeIn transition-all duration-300">
      <form
        className="bg-gray-900 rounded-xl shadow-2xl w-[450px] max-w-full mx-4 border border-gray-700 overflow-hidden animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with improved styling */}
        <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <span className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mr-3 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </span>
            Contact Information
          </h3>
          <p className="text-gray-400 mt-2 text-sm pl-12">
            Please provide your contact details so we can reach out to you
          </p>
        </div>

        {/* Modal Body with improved styling */}
        <div className="p-6 space-y-5 bg-gray-900/60">
          <div className="space-y-2">
            {/* email company */}
            <label className="text-sm font-medium text-gray-300 flex items-center">
              Email Address
              <span className="text-orange-500 ml-1">*</span>
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                type="email"
                placeholder="hello@example.com"
                value={data?.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          
          </div>
          {/* phone company */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center">
              Phone Number
              <span className="text-orange-500 ml-1">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <input
                type="tel"
                value={data?.phoneNumber}
                onChange={(e) =>
                  setData({ ...data, phoneNumber: e.target.value })
                }
                placeholder="+977 9800907453"
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
          </div>
          {/* about company */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center">
              About Company
              <span className="text-orange-500 ml-1">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
              <input
                type="text"
                value={data?.aboutCompany}
                onChange={(e) =>
                  setData({ ...data, aboutCompany: e.target.value })
                }
                placeholder="About Company"
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
          </div>
        </div>

        {/* Modal Footer with improved styling */}
        <div className="bg-gray-800/80 p-6 flex justify-end gap-3 border-t border-gray-800">
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 py-2.5 rounded-lg px-5 text-white text-sm transition-all duration-200 font-medium flex items-center focus:outline-none focus:ring-2 focus:ring-orange-500 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            Submit
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SuperConfig;
