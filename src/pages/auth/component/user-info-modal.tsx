import { useAuthStore } from "../store";

const InfoIcon = () => (
  <svg
    className="w-8 h-8 text-blue-600"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.25 11.25v3.75m0-7.5h.008M12 21a9 9 0 100-18 9 9 0 000 18z"
    />
  </svg>
);

const UserInfoModal = () => {
  const { openInfo, infoMsg, setOpenInfo } = useAuthStore();

  if (!openInfo) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm font-poppins flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full overflow-hidden max-h-[85vh] transition-all duration-300 border border-gray-200">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full mb-3">
            <InfoIcon />
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            Subscription Status
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            We need your attention on this.
          </p>
        </div>

        {/* Message */}
        <div className="bg-blue-50 border border-blue-200 text-blue-800 text-sm rounded-md px-4 py-3 mb-6 shadow-inner">
          {infoMsg}
        </div>

        {/* Actions */}
        <div className="flex justify-end">
          <button
            className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
            onClick={() => setOpenInfo(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoModal;
