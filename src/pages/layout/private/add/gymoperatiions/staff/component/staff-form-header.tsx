import { FiUser } from "react-icons/fi";

const StaffFormHeader = () => {
  return (
    <div className="relative overflow-hidden  rounded-2xl shadow-2xl mb-4">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-400"></div>
      <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-orange-600/10 blur-3xl"></div>
      <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl"></div>

      <div className="relative px-8 py-10">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-orange-600/20 rounded-full">
            <FiUser className="h-6 w-6 text-orange-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-2">
              Add New Staff
            </h2>
            <p className="text-gray-400">
              Complete the form below to add a new staff to your gym. Fields
              marked with <span className="text-orange-500">*</span> are
              required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffFormHeader;
