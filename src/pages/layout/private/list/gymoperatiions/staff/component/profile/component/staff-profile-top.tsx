import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { Edit } from "lucide-react";
import { GiCrossMark } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { PhoneCallIcon } from "lucide-react";
import { BsGenderAmbiguous } from "react-icons/bs";

import { IStaffDetails } from "../../../interface";
import { useStaffProfileStore } from "../store";
import { useGlobalStore } from "@/global/store";
import { PrivateRoute } from "@/global/config";

const StaffProfileTop: React.FC<{ staff: IStaffDetails }> = ({ staff }) => {
  const navigate = useNavigate();
  const { uploadProfileImage } = useStaffProfileStore();
  const { setToasterData } = useGlobalStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    const res = await uploadProfileImage(file, staff.id);
    setToasterData({
      message: res.message,
      severity: res.severity,
      open: true,
    });
    navigate(-1); // Navigate back after upload
  };

  return (
    <div className="flex items-start justify-between">
      {/* Left: Image + Info */}
      <div className="flex items-center gap-6">
        <div className="relative rounded-full bg-gray-100 shadow-lg">
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            className="hidden"
            onChange={(e) =>
              e.target.files?.[0] && handleUpload(e.target.files[0])
            }
          />
          <div
            role="button"
            tabIndex={0}
            className="cursor-pointer rounded-full border-4 border-orange-500 transition-transform duration-300 hover:shadow-lg"
            onClick={() => inputRef.current?.click()}
          >
            {staff.profileImageName ? (
              <img
                src={staff.profileImageName}
                alt={staff.fullName}
                className="h-32 w-32 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                <FaUser className="h-16 w-16" />
              </div>
            )}
          </div>
          <span className="absolute bottom-0 left-0 w-full rounded-b-full bg-black bg-opacity-50 py-1 text-center text-xs text-white">
            Change Photo
          </span>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-bold capitalize text-gray-800">
            {staff.fullName}
          </h1>
          <div className="space-y-1 text-gray-600">
            <div className="flex items-center gap-2 hover:text-orange-500 transition-colors">
              <MdEmail className="h-4 w-4" />
              <span className="text-sm">{staff.email || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2 hover:text-orange-500 transition-colors">
              <PhoneCallIcon className="h-4 w-4" />
              <span className="text-sm">{staff.phone || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2 hover:text-orange-500 transition-colors">
              <BsGenderAmbiguous className="h-4 w-4" />
              <span className="text-sm">{staff.gender || "N/A"}</span>
            </div>
            <button
              onClick={() =>
                navigate(`/${PrivateRoute}/staff-attendance`, { state: staff })
              }
              className="mt-3 rounded-lg  bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
            >
              View Attendance
            </button>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() =>
            navigate("/tenant/edit/gym/operation/staff", { state: staff })
          }
          className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-orange-500 transition"
          aria-label="Edit Profile"
        >
          <Edit size={20} />
        </button>
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full text-orange-500 hover:bg-gray-100 hover:text-orange-600 transition"
          aria-label="Close Profile"
        >
          <GiCrossMark size={24} />
        </button>
      </div>
    </div>
  );
};

export default StaffProfileTop;
