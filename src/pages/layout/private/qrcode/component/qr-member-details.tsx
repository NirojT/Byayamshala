import { useQRStore } from "../store";

const QrMemberDetails = () => {
  const { scanResult, clearScanResult } = useQRStore();


  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-green-100 border border-blue-300 rounded-2xl p-6 mt-6 text-center shadow-lg flex flex-col items-center max-w-md mx-auto animate-fade-in">
      {/* Avatar */}
      <div className="relative mb-4">
        {scanResult?.profileImageName ? (
          <img
            src={scanResult?.profileImageName}
            alt={scanResult?.fullName || "Profile"}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
          />
        ) : (
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-200 border-4 border-white shadow-lg">
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
      <div className="flex items-center gap-2 mb-3">
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
          Attendance Marked!
        </span>
      </div>
      {/* Details */}
      <div className="flex flex-col items-center gap-2 mb-4">
        <div className="text-xl font-semibold text-blue-900">
          {scanResult?.fullName}
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
          <span>{scanResult?.phone}</span>
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
          <span>{scanResult?.address}</span>
        </div>
      </div>
      {/* Membership & Payment Details */}
      <div className="grid grid-cols-2 gap-4 w-full mb-4">
        <div className="bg-blue-50 rounded-lg px-3 py-2 flex flex-col items-center">
          <span className="text-xs text-gray-500">Membership</span>
          <span
            className={`font-semibold ${
              scanResult?.membershipStatus === "EXPIRED"
                ? "text-red-600"
                : "text-green-700"
            }`}
          >
            {scanResult?.membershipStatus}
          </span>
        </div>
        <div className="bg-blue-50 rounded-lg px-3 py-2 flex flex-col items-center">
          <span className="text-xs text-gray-500">Transaction Type</span>
          <span className="font-semibold text-blue-800">
            {scanResult?.partyMoneyType}
          </span>
        </div>
        <div className="bg-blue-50 rounded-lg px-3 py-2 flex flex-col items-center col-span-2">
          <span className="text-xs text-gray-500">Membership End Date</span>
          <span className="font-semibold text-blue-900">
            {scanResult?.membershipEndDate || "-"}
          </span>
        </div>
        <div className="bg-blue-50 rounded-lg px-3 py-2 flex flex-col items-center col-span-2">
          <span className="text-xs text-gray-500">Amount</span>
          <span className="font-bold text-blue-700 text-lg">
            {scanResult?.amount}
          </span>
        </div>
      </div>
      <button
        className="mt-2 py-2 px-6 bg-blue-200 text-blue-800 rounded-lg hover:bg-blue-300 transition font-semibold shadow"
        onClick={clearScanResult}
      >
        Clear Result
      </button>
    </div>
  );
};

export default QrMemberDetails;
