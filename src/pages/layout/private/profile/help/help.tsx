import { QueryFrom } from "@/global/components/enums/enums";
import { useClientQueryStore } from "@/global/components/headerfooter/components/message/store";
import { useGlobalStore } from "@/global/store";
import { useEffect, useState } from "react";
import { useBusinessDetailsStore } from "../account-settings/component/store";

const Help = () => {
  const { setToasterData, appUser } = useGlobalStore();
  const { data: business } = useBusinessDetailsStore();
  const { setSending, data, setData, clearData, create } =
    useClientQueryStore();
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
    }
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
    <div className="w-full sm:w-96 max-w-sm mx-auto bg-[#FAFAFA] p-6 rounded-lg shadow-md">
      {/* Admin Header */}
      <div className="mb-5">
        <h3 className="text-2xl font-bold text-[#2E2E2E] text-center">
          Admin Help Center
        </h3>
        <p className="text-sm text-[#2E2E2E] text-center mt-1">
          Need help? Send us a message, and we’ll get back to you shortly!
        </p>
      </div>

      {/* Form Section */}
      <div className="space-y-4">
        <div className="relative">
          <textarea
            placeholder="Enter your message..."
            rows={4}
            value={data?.message}
            onChange={(e) => {
              setData({ ...data, message: e.target.value });
              setCharCount(e.target.value.length);
            }}
            className="w-full px-4 py-3 bg-white border border-[#EAEAEA] rounded-lg text-[#2E2E2E] focus:outline-none focus:ring-2 focus:ring-[#E26300] transition-all duration-200"
            maxLength={maxCharCount}
            aria-label="Message input"
          ></textarea>
          <div className="flex justify-between text-[#2E2E2E] text-sm mt-1">
            <span>
              Character count: {charCount}/{maxCharCount}
            </span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleSend}
          disabled={isSending}
          className={`w-full bg-[#E26300] text-white py-3 px-4 rounded-lg transition-all duration-300 font-medium flex justify-center items-center group ${
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </>
          )}
        </button>
      </div>

      {/* Footer */}
      <div className="mt-5 text-center">
        <p className="text-sm text-[#2E2E2E]">
          Need further assistance? Contact us at{" "}
          <a
            href="mailto:adminsupport@example.com"
            className="text-[#E26300] hover:underline"
          >
            nirajtmg222@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Help;
