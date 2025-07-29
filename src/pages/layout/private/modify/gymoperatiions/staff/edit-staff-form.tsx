import { useGlobalStore } from "../../../../../../global/store";

import { useLocation, useNavigate } from "react-router-dom";

import { StaffEditFormFields } from "./component/edit-staff-form-fields";
import { useEditStaffFormStore } from "./store";
import {
  UserCog,
  User,
  AtSign,
  Phone,
  Calendar,
  MapPin,
  ClipboardList,
  Briefcase,
  Star,
  BookOpen,
  DollarSign,
} from "lucide-react";
import Back from "@/global/components/back/back";
import { IStaffDetails } from "../../../list/gymoperatiions/staff/interface";
import { useEffect } from "react";

const EditStaffForm = () => {
  // hooks
  const { state } = useLocation();
  const staff: IStaffDetails = { ...state };
  const navigate = useNavigate();

  console.log(staff);

  // stores
  const { data, setData, updateStaff } = useEditStaffFormStore();
  const { setToasterData } = useGlobalStore();

  // handlers
  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    // Only update if the value has changed
    if (data[name] !== value) {
      setData(name, value); // Update the specific field
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await updateStaff(
        {
          ...data,
          specialization: JSON.stringify(data?.specialization),
        },
        staff?.id
      );

      navigate(-1);

      setToasterData({
        open: true,
        message: res?.message,
        severity: res?.severity,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  // helper to determine which icon to use for each field
  const getFieldIcon = (fieldName: string) => {
    switch (fieldName) {
      case "name":
      case "firstName":
      case "lastName":
        return <User size={18} className="text-[#E26300]" />;
      case "email":
        return <AtSign size={18} className="text-[#E26300]" />;
      case "phone":
      case "phoneNumber":
      case "contactNumber":
        return <Phone size={18} className="text-[#E26300]" />;
      case "joiningDate":
      case "dob":
      case "dateOfBirth":
        return <Calendar size={18} className="text-[#E26300]" />;
      case "address":
        return <MapPin size={18} className="text-[#E26300]" />;
      case "remarks":
      case "notes":
      case "description":
        return <ClipboardList size={18} className="text-[#E26300]" />;
      case "experience":
        return <Briefcase size={18} className="text-[#E26300]" />;
      case "specialization":
        return <Star size={18} className="text-[#E26300]" />;
      case "qualification":
        return <BookOpen size={18} className="text-[#E26300]" />;
      case "salary":
        return <DollarSign size={18} className="text-[#E26300]" />;
      default:
        return <UserCog size={18} className="text-[#E26300]" />;
    }
  };

  useEffect(() => {
    if (staff) {
      Object.keys(staff).forEach((key) => {
        setData(key, (staff as Record<string, any>)[key]);
      });
    }
  }, []);

  return (
    <div className="min-h-screen py-10 px-4 bg-[#FAFAFA] text-[#2E2E2E] font-poppins">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden font-poppins">
          <div className="p-5 text-center">
            <Back />
            <h1 className="text-xl font-semibold text-[#1A1A1A] mb-2 flex items-center justify-center">
              <UserCog className="mr-2 text-[#E26300]" size={20} />
              Edit Staff Profile
            </h1>
            <p className="text-[#2E2E2E] text-sm">
              Update staff information and expertise
            </p>
          </div>
          {/* Subtle orange accent line at bottom */}
          <div className="h-0.5 bg-[#E26300]/20 w-full"></div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {/* Dynamically Render Form Fields */}
              {StaffEditFormFields.map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label
                    htmlFor={field.name}
                    className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center"
                  >
                    {getFieldIcon(field.name)}
                    <span className="ml-2">{field.label}</span>
                    {field.required && (
                      <span className="text-[#E26300] ml-1">*</span>
                    )}
                  </label>

                  <div className="relative">
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={(data[field.name] as string) || ""}
                        onChange={handleChange}
                        className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        rows={4}
                        required={field.required}
                      />
                    ) : field.type === "select" ? (
                      <select
                        id={field.name}
                        name={field.name}
                        value={(data[field.name] as string) || ""}
                        onChange={handleChange}
                        className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors bg-transparent"
                        required={field.required}
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={(data[field.name] as string) || ""}
                        onChange={handleChange}
                        className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        required={field.required}
                      />
                    )}
                  </div>
                </div>
              ))}

              <div className="col-span-1 md:col-span-2 mt-3 pt-6 flex justify-end flex-end gap-5">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#FAFAFA] text-[#2E2E2E] border transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#E26300] text-white hover:bg-[#D25200] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>Update Staff</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStaffForm;
