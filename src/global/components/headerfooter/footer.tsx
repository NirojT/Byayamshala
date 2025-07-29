import { BusinessName } from "../../config";
import MessageForm from "./components/message/message-form";
import { useClientQueryStore } from "./components/message/store";
import MessageModal from "./components/message/message-modal";

const Footer = () => {
  const { sending } = useClientQueryStore();
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-gray-300 py-14 px-6 md:px-12 lg:px-20 border-t-2 border-gray-700/50">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row  gap-12">
          {/* Column 1 - Business Description */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="font-extrabold mb-5 text-3xl md:text-4xl bg-[#FF6A00] bg-clip-text text-transparent">
              {BusinessName}
            </h2>
            <p className="text-base text-gray-400 leading-relaxed">
              Your <span className="text-[#E26003] font-medium">gym</span>{" "}
              management solution that revolutionizes the way you handle gym
              memberships, schedules, and operations. Features include{" "}
              <span className="text-[#E26003] font-medium">WhatsApp</span>{" "}
              messaging,{" "}
              <span className="text-[#E26003] font-medium">finance</span>,{" "}
              <span className="text-[#E26003] font-medium">reports</span>, and{" "}
              <span className="text-[#E26003] font-medium">user</span> management
              with ease.
            </p>
          </div>

          {/* Column 2 - Contact Form */}
          <div className="w-full flex items-center justify-center md:w-1/2">
            <MessageForm />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-center md:text-left">
          <p className="text-sm  text-center text-gray-400">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-medium text-white">{BusinessName}</span>. All
            rights reserved. Built with ❤️ for gyms worldwide.
          </p>
        </div>
      </div>

      {/* Modal - Contact Information */}
      {sending && <MessageModal />}
    </footer>
  );
};

export default Footer;