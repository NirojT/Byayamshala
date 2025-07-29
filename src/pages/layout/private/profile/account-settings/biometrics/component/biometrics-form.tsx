import React, { useEffect } from "react";
import { Cpu, BadgeInfo, ShieldCheck, MapPin, Pencil } from "lucide-react";
import { useGlobalStore } from "@/global/store";
 
import { useLocation, useNavigate } from "react-router-dom";
import { useBiometricsStore } from "../store";
import { IBiometricsDetails } from "../interface";

const BiometricsForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editData: IBiometricsDetails = location.state;

  const { data, setData, clearData, create, update } = useBiometricsStore();
  const { setToasterData } = useGlobalStore();

  useEffect(() => {
    if (editData) {
      setData({
        deviceName: editData.deviceName || "",
        deviceSN: editData.deviceSN || "",
        deviceModel: editData.deviceModel || "",
        deviceType: editData.deviceType || "",
        brand: editData.brand || "",
        locationDescription: editData.locationDescription || "",
      });
    } else {
      clearData();
    }
    // eslint-disable-next-line
  }, [editData]);

  function validate(): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!data?.deviceName) errors.deviceName = "Device name is required";
    if (!data?.deviceSN) errors.deviceSN = "Device serial number is required";
    if (!data?.brand) errors.brand = "Brand is required";
    return errors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setToasterData({
        message: Object.values(errors).join(", "),
        severity: "error",
        open: true,
      });
      return;
    }
    let res;
    if (editData) {
      res = await update(editData?.id);
    } else {
      res = await create();
    }

    setToasterData({
      message: res.message,
      severity: res.severity,
      open: true,
    });
    if (res.severity === "success") {
      clearData();
      navigate(-1);
    }
  }

  return (
    <div className="min-h-screen py-10 px-4 bg-[#FAFAFA] text-[#2E2E2E] font-poppins">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden font-poppins">
          <div className="p-5 text-center">
            <h1 className="text-xl font-semibold text-[#1A1A1A] mb-2 flex items-center justify-center">
              <Cpu className="mr-2 text-blue-600" size={20} />
              {editData ? (
                <>
                  Update Biometric Device
                  <Pencil className="ml-2 text-indigo-500" size={18} />
                </>
              ) : (
                "Register Biometric Device"
              )}
            </h1>
            <p className="text-[#2E2E2E] text-sm">
              Fill out the biometric device details below.
            </p>
          </div>
          <div className="h-0.5 bg-blue-600/20 w-full"></div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-7"
              autoComplete="off"
            >
              <div className="flex flex-col">
                <label className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center">
                  <BadgeInfo size={18} className="text-blue-600" />
                  <span className="ml-2">Device Name</span>
                  <span className="text-blue-600 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="deviceName"
                  value={data?.deviceName}
                  onChange={(e) =>
                    setData({ ...data, deviceName: e.target.value })
                  }
                  className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-blue-600 transition-colors"
                  placeholder="e.g. Main Entry Scanner"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center">
                  <BadgeInfo size={18} className="text-blue-600" />
                  <span className="ml-2">Device Serial Number (SN)</span>
                  <span className="text-blue-600 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="deviceSN"
                  value={data?.deviceSN}
                  onChange={(e) =>
                    setData({ ...data, deviceSN: e.target.value })
                  }
                  className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-blue-600 transition-colors"
                  placeholder="e.g. ZKTECO-123456"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center">
                  <BadgeInfo size={18} className="text-blue-600" />
                  <span className="ml-2">Device Model</span>
                </label>
                <input
                  type="text"
                  name="deviceModel"
                  value={data?.deviceModel}
                  onChange={(e) =>
                    setData({ ...data, deviceModel: e.target.value })
                  }
                  className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-blue-600 transition-colors"
                  placeholder="e.g. SpeedFace-V5L"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center">
                  <BadgeInfo size={18} className="text-blue-600" />
                  <span className="ml-2">Device Type</span>
                </label>
                <input
                  type="text"
                  name="deviceType"
                  value={data?.deviceType}
                  onChange={(e) =>
                    setData({ ...data, deviceType: e.target.value })
                  }
                  className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-blue-600 transition-colors"
                  placeholder="e.g. FINGERPRINT"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center">
                  <ShieldCheck size={18} className="text-blue-600" />
                  <span className="ml-2">Brand</span>
                  <span className="text-blue-600 ml-1">*</span>
                </label>
                <select
                  name="brand"
                  value={data?.brand}
                  onChange={(e) => setData({ ...data, brand: e.target.value })}
                  className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-blue-600 transition-colors bg-white"
                  required
                >
                  <option value="">Select Brand</option>
                  <option value="ZKTeco">ZKTeco</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center">
                  <MapPin size={18} className="text-pink-500" />
                  <span className="ml-2">Location Description</span>
                </label>
                <input
                  type="text"
                  name="locationDescription"
                  value={data?.locationDescription}
                  onChange={(e) =>
                    setData({ ...data, locationDescription: e.target.value })
                  }
                  className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-blue-600 transition-colors"
                  placeholder="e.g. Main Gate, Reception"
                />
              </div>
              {/* Form actions */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={clearData}
                  className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#FAFAFA] text-[#2E2E2E] border border-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>{editData ? "Update Device" : "Register Device"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiometricsForm;
