import { defaultNepaliDate } from "@/global/config";
import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../../../../../global/store";
import { IMemberDetails } from "../../../list/gymoperatiions/members/interface";
import { useMemberEditFormFields } from "./component/edit-member-form-fields";
import { useEditMemberFormStore } from "./store";
// Add these imports at the top of your file
import {
  UserCog,
  User,
  AtSign,
  Phone,
  CalendarDays,
  MapPin,
  ClipboardList,
  Clock,
  Users,
  Dumbbell,
  CreditCard,
  Weight,
  Ruler,
  Droplet,
  UserCheck,
  Heart,
  Briefcase,
} from "lucide-react";
import Back from "@/global/components/back/back";
import { BsCash, BsGenderAmbiguous } from "react-icons/bs";

const EditMemberForm = () => {
  // hooks
  const { state } = useLocation();
  const member: IMemberDetails = { ...state };
  const navigate = useNavigate();

  // stores
  const { data, setData, updateMember } = useEditMemberFormStore();
  const { setToasterData } = useGlobalStore();

  // dynamic input fields
  const fields = useMemberEditFormFields();

  // handlers
  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await updateMember(
        {
          ...(data as Record<string, string>),
        },
        member?.id
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

  const handleNepDate = (e: NepaliDate | null, field: string) => {
    setData(field, (e as NepaliDate)?.toString());
  };

  // helper to determine which icon to use for each field
  const getFieldIcon = (fieldName: string) => {
    switch (fieldName) {
      case "name":
      case "firstName":
      case "lastName":
      case "fullName":
        return <User size={18} className="text-[#E26300]" />;
      case "email":
        return <AtSign size={18} className="text-[#E26300]" />;
      case "phone":
      case "phoneNumber":
      case "contactNumber":
      case "emergencyContact":
        return <Phone size={18} className="text-[#E26300]" />;
      case "birthDate":
      case "dob":
      case "dateOfBirth":
      case "joiningDate":
        return <CalendarDays size={18} className="text-[#E26300]" />;
      case "address":
        return <MapPin size={18} className="text-[#E26300]" />;
      case "remarks":
      case "notes":
        return <ClipboardList size={18} className="text-[#E26300]" />;
      case "shift":
      case "shiftType":
        return <Clock size={18} className="text-[#E26300]" />;
      case "membership":
      case "membershipType":
        return <Users size={18} className="text-[#E26300]" />;
      case "admissionFee":
        return <BsCash size={18} className="text-[#E26300]" />;

      case "gender":
        return <BsGenderAmbiguous size={18} className="text-[#E26300]" />;
      case "cardNumber":
        return <CreditCard size={18} className="text-[#E26300]" />;
      case "weight":
        return <Weight size={18} className="text-[#E26300]" />;
      case "height":
        return <Ruler size={18} className="text-[#E26300]" />;
      case "bloodGroup":
        return <Droplet size={18} className="text-[#E26300]" />;
      case "guardianName":
        return <UserCheck size={18} className="text-[#E26300]" />;
      case "healthCondition":
        return <Heart size={18} className="text-[#E26300]" />;
      case "occupation":
        return <Briefcase size={18} className="text-[#E26300]" />;
      default:
        return <Dumbbell size={18} className="text-[#E26300]" />;
    }
  };

  // useEffect
  useEffect(() => {
    if (member) {
      Object.keys(member).forEach((key) => {
        setData(key, (member as Record<string, any>)[key]); // Type assertion
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
              Edit Member Profile
            </h1>
            <p className="text-[#2E2E2E] text-sm">
              Update member information and details
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
              {fields.map((field) => (
                <div key={field?.name} className="flex flex-col">
                  <label
                    htmlFor={field?.name}
                    className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center"
                  >
                    {getFieldIcon(field?.name)}
                    <span className="ml-2">{field?.label}</span>
                    {field?.required && (
                      <span className="text-[#E26300] ml-1">*</span>
                    )}
                  </label>

                  <div className="relative">
                    {field?.type === "textarea" ? (
                      <input
                        id={field?.name}
                        name={field?.name}
                        value={(data[field?.name] as string) || ""}
                        onChange={handleChange}
                        className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors"
                        placeholder={`Enter ${field?.label?.toLowerCase()}`}
                        // rows={4}
                        required={field?.required}
                      />
                    ) : field?.type === "select" ? (
                      <select
                        id={field?.name}
                        name={field?.name}
                        value={(data[field?.name] as string) || ""}
                        onChange={handleChange}
                        className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors  bg-transparent"
                        required={field?.required}
                      >
                        <option value="">Select {field?.label}</option>
                        {field?.options?.map((option) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))}
                      </select>
                    ) : field?.name === "birthDate" ||
                      field?.name === "joiningDate" ? (
                      <NepaliDatePicker
                        value={
                          typeof data?.[field?.name] === "string"
                            ? new NepaliDate(data[field?.name] as string)
                            : defaultNepaliDate
                        }
                        placeholder={`Select ${field?.label?.toLowerCase()}`}
                        onChange={(e) => handleNepDate(e, field?.name)}
                        className="p-3 w-full text-sm text-[#2E2E2E] border-b-2 border-b-gray-300 focus:border-b-[#E26300] focus:outline-none transition-colors bg-[#FAFAFA]"
                      />
                    ) : (
                      <input
                        onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
                        type={field?.type}
                        id={field?.name}
                        name={field?.name}
                        value={(data[field?.name] as string) || ""}
                        onChange={handleChange}
                        className="p-3 w-full  text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors"
                        placeholder={`Enter ${field?.label?.toLowerCase()}`}
                        required={field?.required}
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
                  className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#E26300] text-white hover:bg-[#D25200]  transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {/* <UserCog size={18} /> */}
                  <span>Update Member</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMemberForm;
