import { FiUserCheck } from "react-icons/fi";

const TaskHeaderForm = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-hidden">
      <div className="relative px-8 py-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gray-100 rounded-md">
            <FiUserCheck className="h-5 w-5 text-[#1A1A1A]" />
          </div>
          <div>
            <h2 className="text-xl font-medium text-[#2E2E2E] mb-2">
              Assign Personal Trainer
            </h2>
            <p className="text-gray-600">
              Schedule training sessions by assigning a trainer to a member.
              Fields marked with <span className="text-[#E26300]">*</span> are
              required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskHeaderForm;