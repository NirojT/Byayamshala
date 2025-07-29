import { useGlobalStore } from "@/global/store";
import { useClientQueryStore } from "./store";

const MessageForm = () => {
  const { setToasterData } = useGlobalStore();
  const { setSending, data, setData } = useClientQueryStore();
  const handleSend = () => {
    if (!data?.message) {
      setToasterData({
        open: true,
        message: "Please enter a message",
        severity: "error",
      });
      return;
    }
    setSending(true);
  };
  return (
    <div className="w-full sm:w-96 max-w-sm">
      <h3 className="text-xl font-bold text-gray-100 mb-5 text-center md:text-left relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:mx-auto md:after:mx-0 after:h-1 after:w-12 after:bg-orange-500">
        Send Message
      </h3>
      <div className="space-y-4">
        <div className="relative">
          <textarea
            placeholder="Enter your message..."
            rows={4}
            value={data?.message}
            onChange={(e) => setData({ ...data, message: e.target.value })}
            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
          ></textarea>
        </div>

        <button
          onClick={handleSend}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-4 rounded-lg transition-all duration-300 font-medium flex justify-center items-center group"
        >
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
        </button>
      </div>
    </div>
  );
};

export default MessageForm;
