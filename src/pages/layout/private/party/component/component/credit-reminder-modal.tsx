import  { useEffect, useState } from "react";
import { usePartyAccTransactionStore } from "../store";
import { useGlobalStore } from "@/global/store";

const CreditReminderModal = ({ partyName }: { partyName: string }) => {
  const { sendReminder, reminderOpen, setReminderOpen, partyAccDetail } =
    usePartyAccTransactionStore();
  const { setToasterData } = useGlobalStore();

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (reminderOpen && partyAccDetail?.balance) {
      setMessage(
        `Dear ${partyName}, you have a pending credit of रु ${partyAccDetail?.balance}. Please clear it soon.`
      );
    }
  }, [reminderOpen, partyAccDetail, partyName]);

  const handleSendReminder = async () => {
    const res = await sendReminder(partyName, message);
    setToasterData({
      message: res.message,
      severity: res.severity,
      open: true,
    });
    if (res.severity === "success") {
      setReminderOpen(false);
    }
  };

  if (!reminderOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl transition-all">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Send Credit Reminder
          </h3>
          <button
            onClick={() => setReminderOpen(false)}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-4">
          <p className="text-sm text-gray-600">
            Send a reminder to{" "}
            <strong className="text-gray-800">{partyName}</strong> for the
            pending credit.
          </p>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reminder Message
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-orange-500 focus:outline-none"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 border-t px-6 py-3">
          <button
            onClick={() => setReminderOpen(false)}
            className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSendReminder}
            className="px-4 py-2 bg-orange-600 text-white text-sm font-semibold rounded-md hover:bg-orange-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditReminderModal;
