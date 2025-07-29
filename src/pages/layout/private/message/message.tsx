// Message.tsx

import { useNavigate } from "react-router-dom";
import MessageForm from "./component/message-form";
import { PrivateRoute } from "../../../../global/config";
import { useGlobalStore } from "@/global/store";
import { useEffect } from "react";

const Message = () => {
  // stores
  const {  scrollPosition } = useGlobalStore();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  return (
    <div className="min-h-screen w-full border bg-[#FAFAFA] text-[#2E2E2E] font-poppins p-4 md:p-6">
      <div className=" text-center max-w-1xl mx-auto space-y-8 mb-16">
        <h1 className="text-xl  brightness-75">Gym Messaging System</h1>
        <button
          className="text-black hover:cursor-pointer float-end underline rounded-lg hover:text-[#E26003] hover:text-bold transition-transform duration-300 ease-in-out hover:scale-105"
          onClick={() => navigate(`/${PrivateRoute}/message/list`)}
        >
          Go to Messages
        </button>
      </div>
      <div className="sm:flex sm:justify-center w-full ">
        <MessageForm />
      </div>
    </div>
  );
};

export default Message;
