import { useState } from "react";
import { useLocation } from "react-router-dom";
import { IStaffDetails } from "../../interface";
import Modal from "./component/modal";
import StaffProfileTop from "./component/staff-profile-top";
import PayrollSection from "./component/payroll-section";
import AddSalaryForm from "./component/form/add-salary-form";
import AddAdjustmentForm from "./component/form/add-adjustment-form";
import AddPayrollForm from "./component/form/add-payroll-form";

// All tabs config
const TABS = [
  { key: "salary", label: "Add Salary", title: "Add Salary" },
  { key: "adjustment", label: "Adjust Salary", title: "Salary Adjustment" },
  { key: "payroll", label: "Generate Payroll", title: "Payroll Records" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const StaffProfile = () => {
  const { state } = useLocation();
  const staff = state as IStaffDetails;

  const [activeTab, setActiveTab] = useState<TabKey>("salary");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = (key: TabKey) => {
    setActiveTab(key);
    setIsModalOpen(true);
  };

  return (
    <div className="mx-auto my-6 max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      {/* Top section with staff info and image */}
      <StaffProfileTop staff={staff} />

      {/* Tab section */}
      <div className="mt-6 border-b">
        <nav className="flex gap-4">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleOpen(tab.key)}
              className={`
                pb-2 text-sm font-medium transition
                ${
                  activeTab === tab.key
                    ? "border-b-2 border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-orange-500"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Payroll history table */}
      <div className="mt-8 p-4 rounded-lg shadow-inner">
        <h3 className="mb-4 text-lg font-semibold text-gray-700">
          Payments History
        </h3>
        <PayrollSection staff={staff} />
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={TABS.find((t) => t.key === activeTab)?.title}
        size="md"
      >
        {activeTab === "salary" && (
          <AddSalaryForm
            staff={staff}
            onSuccess={() => setIsModalOpen(false)}
          />
        )}
        {activeTab === "adjustment" && (
          <AddAdjustmentForm staff={staff} setShowAdd={setIsModalOpen} />
        )}
        {activeTab === "payroll" && (
          <AddPayrollForm
            staff={staff}
            onSuccess={() => setIsModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default StaffProfile;
