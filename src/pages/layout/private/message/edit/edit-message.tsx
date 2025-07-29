import { useLocation } from "react-router-dom";
import { useAddMessageStore } from "../store";
import MessageEditForm from "./component/message-edit-form";
import { useEffect } from "react";

const MessageEdit = () => {
  const { setEData } = useAddMessageStore();
  const state = useLocation();
  const data = state.state.data;

  useEffect(() => {
    if (data) setEData({ ...data });
  }, [data]);
  return (
    <div className="min-h-screen bg-black p-4 md:p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-zinc-300 text-center">
          Gym Messaging System
        </h1>

        <div className="flex items-center justify-center">
          {data && (<MessageEditForm id={data?.id} />)}
        </div>
      </div>
    </div>
  );
};

export default MessageEdit;
