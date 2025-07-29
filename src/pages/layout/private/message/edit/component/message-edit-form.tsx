import React from "react";
import { useAddMessageStore } from "../../store";
import {
  DeliveryType,
  MessageType,
  SendWhom,
} from "../../../../../../global/components/enums/enums";
import { useGlobalStore } from "../../../../../../global/store";
import { useNavigate } from "react-router-dom";

 

const MessageEditForm = ({ id }: { id: number }) => {
  // back navigation
  const navigate = useNavigate();
  const { edata, setEData, clearEData, updateMessage } = useAddMessageStore();
  const { setToasterData } = useGlobalStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await updateMessage(id, edata);
    setToasterData({
      message: res?.message,
      severity: res?.severity,
      open: true,
    });

    if (res?.severity === "success") clearEData();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-black p-6 rounded-lg shadow-sm sm:border sm:w-[36rem] sm:border-gray-400"
    >
      {/* Message Type */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Type:</label>
        <select
          value={edata?.messageType}
          onChange={(e) =>
            setEData({ ...edata, messageType: e.target.value as MessageType })
          }
          // className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          className="p-3 bg-black text-gray-300 block w-full rounded-md focus:outline-none border border-gray-600 shadow-sm focus:border-[#E26003] focus:ring-[#E26003]"
        >
          {Object.entries(MessageType).map(([key, value]) => (
            <option key={key} value={value}>
              {key.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Content:
        </label>
        <textarea
          value={edata.content}
          onChange={(e) => setEData({ ...edata, content: e.target.value })}
          // className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          className="p-3 bg-black text-gray-300 block w-full rounded-md focus:outline-none border border-gray-600 shadow-sm focus:border-[#E26003] focus:ring-[#E26003]"
          rows={4}
          required
        />
      </div>
      {/* Delivery Method */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Delivery Method:
        </label>
        <select
          value={edata.deliveryMethod}
          onChange={(e) =>
            setEData({
              ...edata,
              deliveryMethod: e.target.value as DeliveryType,
            })
          }
          // className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          className="p-3 bg-black text-gray-300 block w-full rounded-md focus:outline-none border border-gray-600 shadow-sm focus:border-[#E26003] focus:ring-[#E26003]"
        >
          {Object.values(DeliveryType).map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </div>
      {/* SEND TO */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          SEND TO:
        </label>
        <select
          value={edata.sendWhom}
          onChange={(e) =>
            setEData({ ...edata, sendWhom: e.target.value as SendWhom })
          }
          // className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          className="p-3 bg-black text-gray-300 block w-full rounded-md focus:outline-none border border-gray-600 shadow-sm focus:border-[#E26003] focus:ring-[#E26003]"
        >
          {Object.values(SendWhom).map((sendWhom) => (
            <option key={sendWhom} value={sendWhom}>
              {sendWhom}
            </option>
          ))}
        </select>
      </div>
      {/* Schedule Checkbox */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={edata.schedule}
          onChange={() => setEData({ ...edata, schedule: !edata.schedule })}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="text-sm font-medium text-gray-700">
          Schedule Message
        </label>
      </div>

      {/* Scheduled Date-Time (Only Show if Schedule is Enabled) */}
      {edata.schedule && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Schedule Date & Time:
          </label>
          <input
            type="datetime-local"
            value={edata?.scheduleDate}
            onChange={(e) =>
              setEData({ ...edata, scheduleDate: e.target.value })
            }
            // className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            className="p-3 bg-black text-gray-300 block w-full rounded-md focus:outline-none border border-gray-600 shadow-sm focus:border-[#E26003] focus:ring-[#E26003]"
            required
          />
        </div>
      )}

      {/* Submit Button */}
      <div className="flex gap-5 justify-center">
        <button
          type="submit"
          // className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          className=" flex justify-center w-full sm:w-1/3 p-3 bg-[#FF6A00] text-white font-semibold rounded-md hover:bg-[#FF6A00] focus:outline-none"
        >
          {edata.schedule ? "Schedule Message" : "Send Message"}
        </button>
        <button
          onClick={() => {
            navigate("/tenant/message/list");
          }}
          // className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          className="border border-gray-400 flex justify-center w-full sm:w-1/3 p-3 bg-black text-white font-semibold rounded-md hover:bg-white hover:text-black focus:outline-none"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default MessageEditForm;
