import { defaultNepaliDate } from "@/global/config";
import { useAttendancePublicStore } from "../store";
import { PartyMoneyType } from "@/global/components/enums/enums";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CheckInDetailsModal = ({ isOpen, onClose }: Props) => {
  const { chekInsRes } = useAttendancePublicStore();

  if (!isOpen || !chekInsRes) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl p-8 relative w-[95vw] max-w-lg animate-modal-pop">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-indigo-700 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative mb-3">
            {chekInsRes?.profileImageName ? (
              <img
                src={chekInsRes?.profileImageName}
                alt={chekInsRes?.fullName || "Profile"}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover bg-gray-50"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-100 border-4 border-white shadow-lg">
                <svg
                  className="w-12 h-12 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="8"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="white"
                  />
                  <path
                    d="M4 20c0-4 8-6 8-6s8 2 8 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            )}
          </div>
          {/* Marked Attendance */}
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="white"
              />
              <path
                d="M8 12l2 2 4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-2xl font-bold text-blue-700">
              Attendance Marked !
              <br />
              {defaultNepaliDate?.toString()}
            </span>
          </div>
        </div>
        {/* Details */}
        <div className="flex flex-col items-center gap-2 mb-3">
          <div className="text-xl font-semibold text-blue-900">
            {chekInsRes?.fullName}
          </div>
          <div className="text-base text-gray-600 flex items-center gap-2">
            <svg
              className="w-4 h-4 text-blue-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M16 2h-8c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18h-8V4h8v16zm-4-7c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
            </svg>
            <span>{chekInsRes?.phone}</span>
          </div>
          <div className="text-base text-gray-600 flex items-center gap-2">
            <svg
              className="w-4 h-4 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            </svg>
            <span>{chekInsRes?.address}</span>
          </div>
        </div>
        {/* Membership & Payment Details */}
        <div className="grid grid-cols-2 gap-4 w-full mb-4">
          <div className="bg-blue-50 rounded-lg px-3 py-2 flex flex-col items-center">
            <span className="text-xs text-gray-500">Membership</span>
            <span
              className={`font-semibold ${
                chekInsRes?.membershipStatus === "EXPIRED"
                  ? "text-red-600"
                  : "text-green-700"
              }`}
            >
              {chekInsRes?.membershipStatus}
            </span>
          </div>
          <div className="bg-blue-50 rounded-lg px-3 py-2 flex flex-col items-center">
            <span className="text-xs text-gray-500">Transaction Type</span>
            <span className="font-semibold text-blue-800">
              {chekInsRes?.partyMoneyType === PartyMoneyType.TO_GIVE
                ? PartyMoneyType.TO_RECEIVE
                : chekInsRes?.partyMoneyType === PartyMoneyType.TO_RECEIVE
                ? PartyMoneyType.TO_GIVE
                : PartyMoneyType.SETTLED}
            </span>
          </div>
          <div className="bg-blue-50 rounded-lg px-3 py-2 flex flex-col items-center col-span-2">
            <span className="text-xs text-gray-500">Membership End Date</span>
            <span className="font-semibold text-blue-900">
              {chekInsRes?.membershipEndDate || "-"}
            </span>
          </div>
          <div className="bg-blue-50 rounded-lg px-3 py-2 flex flex-col items-center col-span-2">
            <span className="text-xs text-gray-500">Amount</span>
            <span className="font-bold text-blue-700 text-lg">
              {chekInsRes?.amount}
            </span>
          </div>
        </div>
        {/* Continue Button */}
        <button
          className="mt-3 py-2 px-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition font-semibold shadow"
          onClick={onClose}
        >
          Continue
        </button>
      </div>
      {/* Modal Animations */}
      <style>
        {`
          @keyframes modal-pop {
            0% { transform: scale(0.95) translateY(40px); opacity: 0; }
            80% { transform: scale(1.02) translateY(-4px); opacity: 1; }
            100% { transform: scale(1) translateY(0); opacity: 1; }
          }
          .animate-modal-pop {
            animation: modal-pop 0.33s cubic-bezier(.47,1.64,.41,.8);
          }
          @keyframes fade-in {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 0.2s ease;
          }
        `}
      </style>
    </div>
  );
};

export default CheckInDetailsModal;
