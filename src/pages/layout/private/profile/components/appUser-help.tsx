import { useGlobalStore } from "@/global/store";
import { useBusinessDetailsStore } from "../account-settings/component/store";
import { useClientQueryStore } from "@/global/components/headerfooter/components/message/store";
import { useEffect, useState } from "react";
import { QueryFrom } from "@/global/components/enums/enums";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Info, Phone } from "lucide-react";

const AppUserHelp = () => {
  const { setToasterData, appUser } = useGlobalStore();
  const { data: business } = useBusinessDetailsStore();
  const { setSending, data, setData, clearData, create } =
    useClientQueryStore();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const maxCharCount = 500;

  const handleSend = async () => {
    if (!data?.message) {
      setToasterData({
        open: true,
        message: "Please enter a message",
        severity: "error",
      });
      return;
    }
    if (data.message.length > maxCharCount) {
      setToasterData({
        open: true,
        message: "Message exceeds the maximum character limit",
        severity: "error",
      });
      return;
    }

    setIsSending(true);
    setSending(true);

    const res = await create();
    setToasterData({
      open: true,
      message: res?.message,
      severity: res?.severity,
    });

    if (res?.severity === "success") {
      setSending(false);
      clearData();
      setCharCount(0);
    }

    setIsSending(false);
  };

  useEffect(() => {
    setData({
      ...data,
      email: appUser?.email,
      whatsapp: business?.businessPhone,
      queryFrom: QueryFrom.INSIDER,
    });
  }, []);

  return (
    <div className="w-full sm:w-[44rem] max-w-md sm:max-w-full mt-10 mx-auto my-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Card Header with Gradient */}
      <div className="bg-gradient-to-r from-[#E26300] to-[#FF8C40] p-6 text-white">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-white hover:text-white/80 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back</span>
          </button>
          <h2 className="text-2xl font-bold">Admin Help Center</h2>
          <div className="w-[76px]"></div> {/* Spacer for alignment */}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Introduction */}
        <div className="text-center mb-2">
          <p className="text-gray-600">
            Need assistance? Send us a message and our support team will respond
            shortly.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="bg-[#E26300]/10 p-2 rounded-full mr-3">
              <Info size={18} className="text-[#E26300]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700">
                Email Support
              </h4>
              <a
                href="mailto:gymudaan@gmail.com"
                className="text-sm text-[#E26300] hover:underline"
              >
                gymudaan@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="bg-[#E26300]/10 p-2 rounded-full mr-3">
              <Phone size={18} className="text-[#E26300]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700">
                Phone Support
              </h4>
              <a
                href={`tel:${9800960639}`}
                className="text-sm text-[#E26300] hover:underline"
              >
                {9800960639}
              </a>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="space-y-4">
          <div className="relative">
            <textarea
              placeholder="Describe your issue or question in detail..."
              rows={5}
              value={data?.message || ""}
              onChange={(e) => {
                setData({ ...data, message: e.target.value });
                setCharCount(e.target.value.length);
              }}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E26300] focus:border-transparent resize-none transition-all duration-200"
              maxLength={maxCharCount}
              aria-label="Message input"
            ></textarea>

            <div className="flex justify-end text-gray-500 text-sm mt-2">
              <span
                className={
                  charCount > maxCharCount * 0.9
                    ? "text-amber-600 font-medium"
                    : ""
                }
              >
                {charCount}/{maxCharCount} characters
              </span>
            </div>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={isSending}
            className={`w-full bg-[#E26300] hover:bg-[#D45800] text-white py-3.5 px-4 rounded-lg transition-all duration-300 font-medium flex justify-center items-center gap-2 shadow-sm ${
              isSending ? "opacity-70 cursor-not-allowed" : ""
            }`}
            aria-label="Send message button"
          >
            {isSending ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              <>
                Send Message
                <Send size={16} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-4 border-t border-gray-100">
        <p className="text-sm text-gray-500 text-center">
          Your request will be processed within 24-48 business hours.
        </p>
      </div>
    </div>
  );
};

export default AppUserHelp;
