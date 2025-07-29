import { useGlobalStore } from "@/global/store";
import { useCallback } from "react";
import { useAuthStore } from "../store";

const RegisterOtpModal = () => {
  // Stores data and methods
  const { setToasterData } = useGlobalStore();
  const {
    otp,
    setOtp,
    clearOtp,
    verifyRegisterOtp,
    setIsRegisterOtp,
    loading,
    setLoading, 
  } = useAuthStore();

  // Handle OTP verification
  const handleVerify = useCallback(async () => {
    if (!otp) {
      setToasterData({
        message: "Please enter a  OTP.",
        severity: "error",
        open: true,
      });
      return;
    }

    setLoading(true);
    try {
      const res = await verifyRegisterOtp();
      setToasterData({
        message: res?.message,
        severity: res?.severity,
        open: true,
      });

      if (res?.severity === "success") {
        setIsRegisterOtp(false);
        clearOtp();
      }
      
    } catch (error: any) {
      setToasterData({
        message: "Invalid OTP. Please try again.",
        severity: "error",
        open: true,
      });
    } finally {
      setLoading(false);
    }
  }, [
    otp,
    verifyRegisterOtp,
    setLoading,
    setToasterData,
    setIsRegisterOtp,
    clearOtp,
  ]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg text-gray-700 font-bold mb-4">
       Check your email for OTP
        </h3>

        <div className="mb-4">
          <label className="block text-gray-800 mb-1">Enter OTP</label>
          <input
            type="number"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="p-3 mt-1 block w-full rounded-md focus:outline-none border border-gray-400 shadow-sm focus:border-[#E26003] focus:ring-[#E26003]"
            placeholder="Enter 6-digit OTP"
          />
        </div>

        <div className="flex justify-end space-x-2">
           
          <button
            onClick={handleVerify}
            disabled={loading}
            className="bg-[#E26003] text-white py-2 px-4 rounded-md focus:outline-none focus:ring-1 border border-none focus:border-[#E26003] focus:ring-[#E26003] disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterOtpModal;
