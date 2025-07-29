 

const ExpenseHeader = ({ id }: { id: number }) => {
  return (
    <div className="relative overflow-hidden bg-white rounded-xl shadow-sm mb-8 border border-gray-100">
     
      <div className="absolute top-0 left-0 w-full h-0.5 bg-[#E26300]"></div>

      <div className="relative px-6 py-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-[#FAFAFA] rounded-full border border-gray-100">
            रु
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#1A1A1A] mb-1">
              {id ? "Update" : "Create"} Expense
            </h2>
            <p className="text-[#2E2E2E] text-sm">
              {id ? "Update existing" : "Add a new"} expense record. Fields
              marked with <span className="text-[#E26300]">*</span> are
              required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseHeader;
