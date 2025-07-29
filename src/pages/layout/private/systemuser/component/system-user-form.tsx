import { SystemUserType } from "@/global/components/enums/enums";
import { useGlobalStore } from "@/global/store";
import React, { useEffect, useState } from "react";
import { useSystemUserStore } from "../store";
import {
  User,
  Lock,
  Shield,
  Eye,
  EyeOff,
  X,
  Save,
  UserPlus,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react";

// Enhanced access list with better icons and descriptions
const accessList = [
  {
    key: "Dashboard",
    label: "Dashboard",
    icon: "📊",
    description: "View main dashboard and analytics",
    color: "bg-blue-50 border-blue-200 text-blue-700",
  },
  {
    key: "List",
    label: "Member Lists",
    icon: "📋",
    description: "Access member and staff lists",
    color: "bg-green-50 border-green-200 text-green-700",
  },
  {
    key: "Add Action",
    label: "Add Actions",
    icon: "➕",
    description: "Create new records and entries",
    color: "bg-purple-50 border-purple-200 text-purple-700",
  },
  {
    key: "Inventory",
    label: "Inventory",
    icon: "📦",
    description: "Manage equipment and supplies",
    color: "bg-orange-50 border-orange-200 text-orange-700",
  },
  {
    key: "Message",
    label: "Messaging",
    icon: "💬",
    description: "Send and receive messages",
    color: "bg-cyan-50 border-cyan-200 text-cyan-700",
  },
  {
    key: "Reports",
    label: "Reports",
    icon: "📈",
    description: "Generate and view reports",
    color: "bg-indigo-50 border-indigo-200 text-indigo-700",
  },
  {
    key: "Renew",
    label: "Renewals",
    icon: "🔄",
    description: "Handle membership renewals",
    color: "bg-teal-50 border-teal-200 text-teal-700",
  },
  {
    key: "Equipment",
    label: "Equipment",
    icon: "🔧",
    description: "Manage gym equipment",
    color: "bg-gray-50 border-gray-200 text-gray-700",
  },
  {
    key: "Party",
    label: "Parties",
    icon: "🎉",
    description: "Manage party bookings",
    color: "bg-pink-50 border-pink-200 text-pink-700",
  },
  {
    key: "Attendance",
    label: "Attendance",
    icon: "📅",
    description: "Track member attendance",
    color: "bg-yellow-50 border-yellow-200 text-yellow-700",
  },
  {
    key: "Cafe",
    label: "Cafe",
    icon: "☕",
    description: "Manage cafe operations",
    color: "bg-amber-50 border-amber-200 text-amber-700",
  },
];

 

export const SystemUserForm: React.FC<{
  isEdit?: boolean;
  userId?: number;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: () => void;
  onClose?: () => void;
}> = ({ isEdit, userId, setShowForm, onSuccess }) => {
  const {
    data,
    setData,
    clearData,
    createSystemUser,
    updateSystemUser,
    getSystemUserById,
    isSubmitting,
    setIsSubmitting,
  } = useSystemUserStore();

  const [selectedAccess, setSelectedAccess] = useState<string[]>([]);
  const { setToasterData } = useGlobalStore();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEdit && userId) {
      getSystemUserById(userId);
    } else {
      clearData();
    }
  }, [isEdit, userId]);

  useEffect(() => {
    setSelectedAccess(data?.access || []);
  }, [data?.access]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data?.userName || data.userName.length < 3) {
      newErrors.userName = "Username must be at least 3 characters long";
    }

    if (!isEdit) {
      if (!data?.password || data.password.length < 4) {
        newErrors.password = "Password must be at least 4 characters long";
      }
    } else {
      if (
        data?.password &&
        data.password.length > 0 &&
        data.password.length < 4
      ) {
        newErrors.password =
          "Password must be at least 4 characters long if provided";
      }
    }

    if (!data?.systemUserType) {
      newErrors.systemUserType = "Please select a user type";
    }

    if (selectedAccess.length === 0) {
      newErrors.access = "Please select at least one access permission";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleAccessChange = (access: string) => {
    const newAccess = selectedAccess.includes(access)
      ? selectedAccess.filter((a) => a !== access)
      : [...selectedAccess, access];
    setSelectedAccess(newAccess);
    setData({ ...data, access: newAccess });

    if (errors.access && newAccess.length > 0) {
      setErrors({ ...errors, access: "" });
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsSubmitting(true);
  let res;

  try {
    if (isEdit && userId) {
      // Create base update data that matches ISystemUserData interface
      const updateData = {
        userName: data?.userName || "",
        systemUserType: data?.systemUserType || SystemUserType.STAFF,
        access: selectedAccess,
        password: data?.password || "", // Provide empty string as fallback
      };

      // If password is empty, you might want to handle this on the backend
      // or create a separate update method for password-optional updates
      res = await updateSystemUser(userId, updateData);
    } else {
      res = await createSystemUser({ ...data, access: selectedAccess });
    }

    setToasterData({
      open: true,
      message: res.message,
      severity: res.severity,
    });

    if (res.severity === "success" && onSuccess) {
      onSuccess();
    }
  } catch (error: any) {
    console.error("Error saving user:", error);
    setToasterData({
      open: true,
      message: "An error occurred while saving the user",
      severity: "error",
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl mx-auto my-8 overflow-hidden">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              {isEdit ? (
                <User className="w-6 h-6 text-white" />
              ) : (
                <UserPlus className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {isEdit ? "Edit System User" : "Create New System User"}
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                {isEdit
                  ? "Update user information and permissions"
                  : "Add a new user to the system with specific access rights"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="p-2 text-white/70 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-200"
            aria-label="Close form"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Enhanced Form */}
      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {/* Basic Information Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
            <User className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              Basic Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <User className="w-4 h-4" />
                Username *
              </label>
              <input
                type="text"
                name="userName"
                value={data?.userName || ""}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                  errors.userName
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 bg-white"
                }`}
                placeholder="Enter username"
                required
                minLength={3}
                maxLength={50}
                autoComplete="username"
              />
              {errors.userName && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.userName}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Lock className="w-4 h-4" />
                Password {!isEdit && "*"}
                {isEdit && (
                  <span className="text-gray-500 text-xs">
                    (optional - leave blank to keep current)
                  </span>
                )}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data?.password || ""}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 pr-12 ${
                    errors.password
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                  placeholder={
                    isEdit ? "Enter new password (optional)" : "Enter password"
                  }
                  minLength={4}
                  autoComplete="new-password"
                  required={!isEdit}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </div>
              )}
              {isEdit && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Info className="w-4 h-4" />
                  Leave password field empty to keep the current password
                  unchanged
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User Type Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
            <Shield className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900">User Type</h3>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Shield className="w-4 h-4" />
              System User Type *
            </label>
            <select
              name="systemUserType"
              value={data?.systemUserType || ""}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                errors.systemUserType
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 bg-white"
              }`}
              required
            >
              <option value="">Select user type</option>
              {Object.values(SystemUserType).map((type) => (
                <option key={type} value={type}>
                  {type.replace("_", " ")}
                </option>
              ))}
            </select>
            {errors.systemUserType && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {errors.systemUserType}
              </div>
            )}
          </div>
        </div>

        {/* Access Permissions Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
            <Lock className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              Access Permissions
            </h3>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Lock className="w-4 h-4" />
              Select Permissions *
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {accessList.map((access) => (
                <label
                  key={access.key}
                  className={`group cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                    selectedAccess.includes(access.key)
                      ? `${access.color} border-current shadow-sm`
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedAccess.includes(access.key)}
                      onChange={() => handleAccessChange(access.key)}
                      className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{access.icon}</span>
                        <span className="font-medium text-gray-900">
                          {access.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 leading-tight">
                        {access.description}
                      </p>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {errors.access && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {errors.access}
              </div>
            )}

            {selectedAccess.length > 0 && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 text-sm text-blue-700 font-medium mb-2">
                  <CheckCircle className="w-4 h-4" />
                  Selected permissions: {selectedAccess.length}
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedAccess.map((access) => (
                    <span
                      key={access}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                    >
                      {accessList.find((a) => a.key === access)?.label ||
                        access}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Form Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            disabled={isSubmitting}
          >
            Cancel
          </button>

          <button
            type="submit"
            className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg transform hover:scale-105 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {isEdit ? "Updating..." : "Creating..."}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Save className="w-5 h-5" />
                {isEdit ? "Update User" : "Create User"}
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
