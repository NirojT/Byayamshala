import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckInDetailsModal from "./component/attendance-checkin-res";
import { useAttendancePublicStore } from "./store";
import { defaultNepaliDate } from "@/global/config";
import { decrypt, encrypt } from "@/global/components/encryption/decrypt";
 

const Spinner = () => (
  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
    />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
  </svg>
);

const AttendancePublicView = () => {
  const params = useParams();
  const businessName = params.businessName || "";

  const {
    getBusinessInfoPublic,
    publicCheckIns,
    phone,
    setPhone,
    clearPhone,
    businessPublicInfo,
    chekInsRes,
    // Optionally add: clearchekInsRes
  } = useAttendancePublicStore();

  // UI state
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "";
  }>({ text: "", type: "" });
  const [showCheckInModal, setShowCheckInModal] = useState(false);

  useEffect(() => {
    if (businessName) getBusinessInfoPublic(businessName);
    // eslint-disable-next-line
  }, [businessName]);

  // Handle phone input change
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value.replace(/\D/g, "")); // Only numbers
  };

  // Handle check-in
  const handleCheckIn = async () => {
    setLoading(true);
    setMessage({ text: "", type: "" });
    setShowMessage(false);
    const res = await publicCheckIns();
    setLoading(false);
    if (res?.severity === "success") {
      // Encrypt phone before storing
      localStorage.setItem("phone", encrypt(phone));
      setMessage({ text: res.message, type: "success" });
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      setShowCheckInModal(true);
    } else {
      setMessage({
        text: res.message || "Something went wrong",
        type: "error",
      });
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2500);
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowCheckInModal(false);
    clearPhone();
    // Optionally clearchekInsRes here if needed
  };

  // On mount, decrypt phone if exists
  useEffect(() => {
    const encryptedPhn = localStorage.getItem("phone");
    if (encryptedPhn) {
      setPhone(decrypt(encryptedPhn));
    }
  }, []);

  // Auto check-in if phone and business info exist
  useEffect(() => {
    const encryptedPhn = localStorage.getItem("phone");
    if (
      encryptedPhn &&
      phone &&
      phone.length === 10 &&
      businessPublicInfo?.businessName
    ) {
      handleCheckIn();
    }
    // eslint-disable-next-line
  }, [phone, businessPublicInfo]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* Main Card */}
      <div className="w-full max-w-md bg-white/70 backdrop-blur shadow-2xl rounded-3xl p-8 flex flex-col items-center gap-8 relative overflow-visible">
        {/* Gym Logo */}
        {businessPublicInfo?.imageName && (
          <img
            src={businessPublicInfo?.imageName}
            alt="Gym Logo"
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100 shadow-lg -mt-20 mb-2 bg-white"
            style={{ boxShadow: "0 6px 24px rgba(80,80,180,0.15)" }}
          />
        )}

        {/* Business Info */}
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold text-indigo-700 tracking-tight">
            {businessPublicInfo?.businessName || "Loading..."}
          </h1>
          <p className="mt-1 text-gray-600 font-medium">
            {businessPublicInfo?.businessAddress}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Contact: {businessPublicInfo?.businessPhone}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            date: {defaultNepaliDate?.toString()}
          </p>
        </div>

        {/* Phone Input */}
        <div className="w-full flex flex-col gap-2">
          <label
            className="text-gray-700 font-medium text-left"
            htmlFor="phone"
          >
            Enter Your Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            maxLength={14}
            inputMode="numeric"
            autoComplete="tel"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow"
            placeholder="e.g. 98XXXXXXXX"
            value={phone}
            onChange={handlePhoneChange}
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === "Enter" && phone.length >= 8 && !loading) {
                handleCheckIn();
              }
            }}
          />
        </div>

        {/* Check In Button */}
        <button
          className={`mt-2 w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 transition flex items-center justify-center gap-2 shadow-md ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          onClick={handleCheckIn}
          disabled={loading || !phone || phone.length < 8}
        >
          {loading ? <Spinner /> : "Check In"}
        </button>

        {/* Animated Message Pop-up */}
        {showMessage && (
          <div
            className={`fixed top-8 left-1/2 z-50 -translate-x-1/2 px-8 py-3 rounded-xl shadow-xl text-center text-lg font-semibold transition-all duration-300 ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300 animate-pop"
                : "bg-red-100 text-red-700 border border-red-300 animate-pop"
            }`}
            style={{ minWidth: "270px" }}
          >
            {message.text}
          </div>
        )}

        {/* Check-in Modal */}
        {showCheckInModal && chekInsRes?.fullName && (
          <CheckInDetailsModal
            isOpen={showCheckInModal}
            onClose={handleCloseModal}
          />
        )}
      </div>

      {/* Fancy animation for pop-up */}
      <style>
        {`
        @keyframes pop {
          0% { transform: translateY(-30px) scale(0.95); opacity: 0; }
          60% { transform: translateY(8px) scale(1.03); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-pop {
          animation: pop 0.35s cubic-bezier(.47,1.64,.41,.8);
        }
        `}
      </style>
    </div>
  );
};

export default AttendancePublicView;