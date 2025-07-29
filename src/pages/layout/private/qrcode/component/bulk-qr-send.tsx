import { useGlobalStore } from "@/global/store";
import { useQRStore } from "../store";

 

const BulkQrSend = () => {
  const { setToasterData } = useGlobalStore();
      const {
        setBulkSending,
        setBulkStatus,
        sendQrCodes,
        setShowBulkModal, 
        bulkSending,
      } = useQRStore();

       const handleBulkSend = async () => {
    setShowBulkModal(false);
    setBulkSending(true);
    setBulkStatus("");
    const res = await sendQrCodes();
    setBulkStatus("Bulk QR codes sent to all members' emails!");
    setToasterData({
      severity: res?.severity,
      message: res?.message,
      open: true,
    });
    setBulkSending(false);
  };
  return (
       <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl px-8 py-6 w-11/12 max-w-sm flex flex-col items-center border-4 border-green-300 relative">
              <button
                className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-3xl font-bold"
                onClick={() => setShowBulkModal(false)}
                aria-label="Close"
              >×</button>
              <div className="mb-2 flex flex-col items-center">
                <svg className="w-12 h-12 text-green-600 mb-2" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h4 className="text-xl font-bold text-green-700 text-center mb-1">Send Bulk QR Codes?</h4>
                <p className="text-gray-700 text-center text-base">
                  This will send QR codes to <span className="font-semibold text-green-800">all members' emails</span>.<br/>
                  Are you sure you want to continue?
                </p>
              </div>
              <div className="flex gap-3 mt-6 w-full">
                <button
                  className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-semibold shadow"
                  onClick={() => setShowBulkModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 py-2 px-4 bg-gradient-to-r from-green-600 to-green-400 text-white rounded-lg hover:from-green-700 hover:to-green-500 font-semibold shadow"
                  onClick={handleBulkSend}
                  disabled={bulkSending}
                >
                  {bulkSending ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Sending...
                    </span>
                  ) : "Confirm"}
                </button>
              </div>
            </div>
          </div>
  )
}

export default BulkQrSend
