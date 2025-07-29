// import React, { ChangeEvent, useState } from "react";
// import { useAddMessageStore } from "../store";
// import {
//   DeliveryType,
//   MessageType,
//   SendWhom,
// } from "../../../../../global/components/enums/enums";
// import { useGlobalStore } from "../../../../../global/store";
// import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
// import { defaultNepaliDate } from "@/global/config";
// import {
//   MessageSquare,
//   Clock,
//   Send,
//   MailOpen,
//   Users,
//   Calendar,
//   Type,
//   Loader,
//   Info,
//   CheckCircle2,
//   HelpCircle,
// } from "lucide-react";

// const MessageForm = () => {
//   // State for submission handling
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//   const { data, setData, clearData, createMessage } = useAddMessageStore();
//   const { setToasterData } = useGlobalStore();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const res = await createMessage(data);
//       setToasterData({
//         message: res?.message,
//         severity: res?.severity,
//         open: true,
//       });

//       if (res?.severity === "success") {
//         setShowSuccessMessage(true);
//         clearData();

//         setTimeout(() => {
//           setShowSuccessMessage(false);
//         }, 3000);
//       }
//     } catch (error) {
//       console.error(error);
//       setToasterData({
//         message: "Failed to send message. Please try again.",
//         severity: "error",
//         open: true,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   //nepalii date handlers
//   // const handleChange = (e: NepaliDate | null) => {
//   //   setData({ ...data, scheduleDate: (e as NepaliDate)?.toString() });
//   // };
//   //nepalii date handlers
//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setData({ ...data, scheduleDate:  e.target.value });
//   };

//   const ignoreType = [
//     MessageType.BIRTHDAY_WISH,
//     MessageType.STOCK_ALERT,
//     MessageType.WELCOME,
//   ];

//   return (
//     <div className="min-h-screen w-full py-10 px-4 sm:px-6 bg-[#FAFAFA] text-[#2E2E2E] font-poppins">
//       <div className=" mx-auto">
//         {/* Header Card */}
//         <div className="mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-xl border border-gray-800 overflow-hidden">
//           <div className="p-6 md:p-8 text-center">
//             <h1 className="text-3xl font-bold    mb-2 flex items-center justify-center">
//               <MessageSquare className="mr-3 text-orange-500" size={28} />
//               Create Message
//             </h1>
//             <p className="  ">
//               Compose and schedule messages to your customers and suppliers
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 w-full">
//           <div className="xl:col-span-3">
//             {/* Main Form Card */}
//             <div className=" backdrop-blur-sm border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
//               <div className="p-8">
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   {/* Message Type */}
//                   <section aria-labelledby="message-type-title">
//                     <h2
//                       id="message-type-title"
//                       className="text-lg font-medium mb-6 flex items-center border-b border-gray-800 pb-3"
//                     >
//                       <Type className="mr-2 text-orange-500" />
//                       Message Details
//                     </h2>

//                     <div className="space-y-6">
//                       <div className="flex flex-col text-black">
//                         <label
//                           htmlFor="messageType"
//                           className="text-black font-medium mb-2 flex items-center"
//                         >
//                           Message Type{" "}
//                           <span className="text-orange-500 ml-1">*</span>
//                         </label>
//                         <div className="relative">
//                           <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
//                             <Info size={18} />
//                           </span>
//                           <select
//                             id="messageType"
//                             value={data?.messageType || MessageType.OCCASION}
//                             onChange={(e) =>
//                               setData({
//                                 ...data,
//                                 messageType: e.target.value as MessageType,
//                               })
//                             }
//                             className="bg-gray-800/70 pl-10 pr-10 py-4 w-full border border-gray-700 rounded-lg    shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200 appearance-none"
//                             required
//                           >
//                             {Object.values(MessageType)
//                               .filter(
//                                 (type) =>
//                                   !ignoreType.includes(type as MessageType)
//                               )
//                               .map((type) => (
//                                 <option
//                                   className="bg-gray-800  "
//                                   key={type}
//                                   value={type}
//                                 >
//                                   {type}
//                                 </option>
//                               ))}
//                           </select>
//                           <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-5 w-5 text-gray-400"
//                               viewBox="0 0 20 20"
//                               fill="currentColor"
//                             >
//                               <path
//                                 fillRule="evenodd"
//                                 d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                                 clipRule="evenodd"
//                               />
//                             </svg>
//                           </div>
//                         </div>
//                         <p className="text-xs text-gray-500 mt-1 ml-1">
//                           Select the type of message you want to send
//                         </p>
//                       </div>

//                       {/* Content */}
//                       <div className="flex flex-col">
//                         <label
//                           htmlFor="content"
//                           className=" font-medium mb-2 flex items-center"
//                         >
//                           Message Content{" "}
//                           <span className="text-orange-500 ml-1">*</span>
//                         </label>
//                         <div className="relative">
//                           <textarea
//                             id="content"
//                             value={data?.content}
//                             onChange={(e) =>
//                               setData({ ...data, content: e.target.value })
//                             }
//                             placeholder="Type your message here..."
//                             className="bg-gray-800/70 p-4 w-full border border-gray-700 rounded-lg text-white shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200 resize-none"
//                             rows={5}
//                             required
//                           />
//                         </div>
//                         <p className="text-xs text-gray-500 mt-1 ml-1 flex items-center justify-between">
//                           <span>Write clear and concise message</span>
//                           <span>{data?.content?.length || 0} characters</span>
//                         </p>
//                       </div>

//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                         {/* Delivery Method */}
//                         <div className="flex flex-col">
//                           <label
//                             htmlFor="deliveryMethod"
//                             className="text-black font-medium mb-2 flex items-center"
//                           >
//                             Delivery Method{" "}
//                             <span className="text-orange-500 ml-1">*</span>
//                           </label>
//                           <div className="relative">
//                             <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
//                               <MailOpen size={18} />
//                             </span>
//                             <select
//                               id="deliveryMethod"
//                               value={data?.deliveryMethod}
//                               onChange={(e) =>
//                                 setData({
//                                   ...data,
//                                   deliveryMethod: e.target
//                                     .value as DeliveryType,
//                                 })
//                               }
//                               className="bg-gray-800/70 pl-10 pr-10 py-4 w-full border border-gray-700 rounded-lg text-white shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200 appearance-none"
//                               required
//                             >
//                               {Object.values(DeliveryType).map((method) => (
//                                 <option
//                                   className="bg-gray-800 text-white"
//                                   key={method}
//                                   value={method}
//                                 >
//                                   {method}
//                                 </option>
//                               ))}
//                             </select>
//                             <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-5 w-5 text-gray-400"
//                                 viewBox="0 0 20 20"
//                                 fill="currentColor"
//                               >
//                                 <path
//                                   fillRule="evenodd"
//                                   d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                                   clipRule="evenodd"
//                                 />
//                               </svg>
//                             </div>
//                           </div>
//                         </div>

//                         {/* SEND TO */}
//                         <div className="flex flex-col">
//                           <label
//                             htmlFor="sendWhom"
//                             className="text-black font-medium mb-2 flex items-center"
//                           >
//                             Send To{" "}
//                             <span className="text-orange-500 ml-1">*</span>
//                           </label>
//                           <div className="relative">
//                             <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
//                               <Users size={18} />
//                             </span>
//                             <select
//                               id="sendWhom"
//                               value={data?.sendWhom}
//                               onChange={(e) =>
//                                 setData({
//                                   ...data,
//                                   sendWhom: e.target.value as SendWhom,
//                                 })
//                               }
//                               className="bg-gray-800/70 pl-10 pr-10 py-4 w-full border border-gray-700 rounded-lg text-white shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200 appearance-none"
//                               required
//                             >
//                               {Object.values(SendWhom).map((sendWhom) => (
//                                 <option
//                                   className="bg-gray-800 text-white"
//                                   key={sendWhom}
//                                   value={sendWhom}
//                                 >
//                                   {sendWhom}
//                                 </option>
//                               ))}
//                             </select>
//                             <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-5 w-5 text-gray-400"
//                                 viewBox="0 0 20 20"
//                                 fill="currentColor"
//                               >
//                                 <path
//                                   fillRule="evenodd"
//                                   d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                                   clipRule="evenodd"
//                                 />
//                               </svg>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </section>

//                   {/* Scheduling Section */}
//                   <section aria-labelledby="scheduling-title" className="pt-4">
//                     <h2
//                       id="scheduling-title"
//                       className="text-lg font-medium text-black mb-6 flex items-center border-b border-gray-800 pb-3"
//                     >
//                       <Clock className="mr-2 text-orange-500" />
//                       Scheduling Options
//                     </h2>

//                     <div className="flex items-center mb-4">
//                       <div className="relative inline-block h-6 w-11">
//                         <input
//                           type="checkbox"
//                           id="schedule"
//                           checked={data?.schedule}
//                           onChange={() =>
//                             setData({ ...data, schedule: !data?.schedule })
//                           }
//                           className="opacity-0 absolute h-0 w-0"
//                         />
//                         <label
//                           htmlFor="schedule"
//                           className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${
//                             data?.schedule ? "bg-orange-500" : "bg-gray-700"
//                           }`}
//                         >
//                           <span
//                             className={`absolute left-1 bottom-1 bg-black h-4 w-4 rounded-full transition-transform duration-300 ${
//                               data?.schedule ? "transform translate-x-5" : ""
//                             }`}
//                           ></span>
//                         </label>
//                       </div>
//                       <label
//                         htmlFor="schedule"
//                         className="text-black ml-3 cursor-pointer"
//                       >
//                         Schedule for later
//                       </label>
//                     </div>

//                     {data?.schedule && (
//                       <div className="transition-all duration-300 ease-in-out">
//                         <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 mt-2">
//                           <label
//                             htmlFor="scheduleDate"
//                             className="block text-sm font-medium text-gray-300 mb-2"
//                           >
//                             <div className="flex items-center">
//                               <Calendar
//                                 className="mr-2 text-blue-400"
//                                 size={16}
//                               />
//                               Schedule Date & Time
//                             </div>
//                           </label>
//                           <div className="relative">
//                             <input
//                               type="datetime-local"
//                               placeholder="Select date"
//                               value={data?.scheduleDate}
//                               onChange={(e) => handleChange(e)}
//                               className="w-full pl-3 py-3 bg-gray-800 text-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                             />
//                             {/* <NepaliDatePicker
//                               value={
//                                 data?.scheduleDate
//                                   ? new NepaliDate(data?.scheduleDate)
//                                   : defaultNepaliDate
//                               }
//                               placeholder="Select date"
//                               onChange={(e) => handleChange(e)}
//                               className="w-full pl-3 py-3 bg-gray-800 text-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                             /> */}
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </section>

//                   {/* Success Message */}
//                   {showSuccessMessage && (
//                     <div className="bg-green-900/30 text-green-300 px-4 py-3 rounded-lg border border-green-800 flex items-center">
//                       <CheckCircle2 className="h-5 w-5 mr-2 text-green-400" />
//                       Message {data?.schedule ? "scheduled" : "sent"}{" "}
//                       successfully!
//                     </div>
//                   )}

//                   {/* Submit Button */}
//                   <div className="pt-6 border-t border-gray-800">
//                     <button
//                       type="submit"
//                       disabled={isSubmitting}
//                       className={`w-full px-8 py-3 rounded-lg bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-medium shadow-lg shadow-orange-700/20 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center justify-center gap-2 ${
//                         isSubmitting ? "opacity-70 cursor-not-allowed" : ""
//                       }`}
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <Loader className="animate-spin h-5 w-5" />
//                           Processing...
//                         </>
//                       ) : (
//                         <>
//                           <Send className="h-5 w-5" />
//                           {data?.schedule ? "Schedule Message" : "Send Message"}
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>

//           {/* Right side - Preview Card */}
//           <div className="xl:col-span-2  gap-10">
//             <div className=" backdrop-blur-sm border border-gray-800 rounded-2xl shadow-xl overflow-hidden sticky top-6">
//               <div className="p-6">
//                 <h3 className="  text-lg font-medium mb-4 flex items-center border-b border-gray-800 pb-3">
//                   <MessageSquare className="h-5 w-5 mr-2 text-blue-400" />
//                   Message Preview
//                 </h3>

//                 <div className="mt-4 space-y-4">
//                   <div className=" rounded-lg p-4 border border-gray-700">
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-gray-400 text-xs uppercase tracking-wider">
//                         Type
//                       </span>
//                       <span className="text-orange-400 bg-orange-900/30 px-2.5 py-0.5 rounded-full border border-orange-800/50 text-xs">
//                         {data?.messageType || MessageType.OCCASION}
//                       </span>
//                     </div>

//                     <div className="flex items-center justify-between mt-3">
//                       <span className="text-gray-400 text-xs uppercase tracking-wider">
//                         Delivery
//                       </span>
//                       <span className="text-blue-400 bg-blue-900/30 px-2.5 py-0.5 rounded-full border border-blue-800/50 text-xs">
//                         {data?.deliveryMethod || DeliveryType.WHATSAPP}
//                       </span>
//                     </div>

//                     <div className="flex items-center justify-between mt-3">
//                       <span className="text-gray-400 text-xs uppercase tracking-wider">
//                         Recipients
//                       </span>
//                       <span className="text-green-400 bg-green-900/30 px-2.5 py-0.5 rounded-full border border-green-800/50 text-xs">
//                         {data?.sendWhom || SendWhom.ALL}
//                       </span>
//                     </div>
//                   </div>

//                   {data?.schedule && data?.scheduleDate && (
//                     <div className="bg-indigo-900/20 rounded-lg p-4 border border-indigo-900/40">
//                       <div className="flex items-center text-indigo-300">
//                         <Clock className="h-4 w-4 mr-2 text-indigo-400" />
//                         <span className="text-sm">Scheduled</span>
//                       </div>
//                       <div className="flex items-center mt-1 ml-6">
//                         <Calendar className="h-3.5 w-3.5 mr-1.5 text-indigo-400" />
//                         <span className="text-indigo-200 text-sm">
//                           {data?.scheduleDate}
//                         </span>
//                       </div>
//                     </div>
//                   )}

//                   <div className="bg-gray-800/70 rounded-lg p-4 border border-gray-700">
//                     <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-3">
//                       Message Content
//                     </h4>
//                     <div className="bg-gray-900/80 rounded-lg p-3 border border-gray-700 min-h-[120px]">
//                       {data?.content ? (
//                         <p className="text-gray-300 text-sm whitespace-pre-wrap">
//                           {data?.content}
//                         </p>
//                       ) : (
//                         <p className="text-gray-500 italic text-sm">
//                           Message content will appear here...
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700">
//                     <div className="flex items-start">
//                       <Info
//                         size={16}
//                         className="text-blue-500 mr-2 mt-0.5 flex-shrink-0"
//                       />
//                       <p className="text-gray-300 text-sm">
//                         {data?.schedule
//                           ? "Your message will be sent automatically at the scheduled date and time."
//                           : "Your message will be sent immediately after submission."}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Help Card */}
//             <div className="mt-6 bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-md overflow-hidden">
//               <div className="p-6">
//                 <h3 className="  text-lg font-medium mb-3 flex items-center">
//                   <HelpCircle className="h-5 w-5 mr-2 text-blue-400" />
//                   Tips for Effective Messages
//                 </h3>
//                 <div className="text-gray-400 text-sm space-y-3">
//                   <p>
//                     <span className="text-orange-500 font-medium">
//                       Business Messages
//                     </span>{" "}
//                     help you connect with your customers and suppliers.
//                   </p>
//                   <p>
//                     <span className="text-blue-400">•</span> Keep messages clear
//                     and concise
//                   </p>
//                   <p>
//                     <span className="text-blue-400">•</span> Use the scheduling
//                     option for campaigns or promotions
//                   </p>
//                   <p>
//                     <span className="text-blue-400">•</span> Choose the right
//                     delivery method for your audience
//                   </p>
//                   <p>
//                     <span className="text-blue-400">•</span> Target specific
//                     groups for better engagement
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessageForm;

import React, { ChangeEvent, useState } from "react";
import { useAddMessageStore } from "../store";
import {
  DeliveryType,
  MessageType,
  SendWhom,
} from "../../../../../global/components/enums/enums";
import { useGlobalStore } from "../../../../../global/store";
import {
  MessageSquare,
  Clock,
  Send,
  MailOpen,
  Users,
  Calendar,
  Type,
  Loader,
  Info,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

const MessageForm = () => {
  // State for submission handling
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { data, setData, clearData, createMessage } = useAddMessageStore();
  const { setToasterData } = useGlobalStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await createMessage(data);
      setToasterData({
        message: res?.message,
        severity: res?.severity,
        open: true,
      });

      if (res?.severity === "success") {
        setShowSuccessMessage(true);
        clearData();

        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setToasterData({
        message: "Failed to send message. Please try again.",
        severity: "error",
        open: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, scheduleDate: e.target.value });
  };

  const ignoreType = [
    MessageType.BIRTHDAY_WISH,
    MessageType.STOCK_ALERT,
    MessageType.WELCOME,
    MessageType.MEMBERSHIP_EXPIRY
  ];

  return (
    <div className="min-h-screen w-full py-10 px-4 sm:px-6 bg-[#FAFAFA] text-[#2E2E2E] font-poppins">
      <div className="mx-auto">
        {/* Header Card */}
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 md:p-8 text-center">
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center text-[#2E2E2E]">
              <MessageSquare className="mr-3 text-[#1A1A1A]" size={28} />
              Create Message
            </h1>
            <p className="text-[#2E2E2E]">
              Compose and schedule messages to your customers and suppliers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 w-full">
          <div className="xl:col-span-3">
            {/* Main Form Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Message Type */}
                  <section aria-labelledby="message-type-title">
                    <h2
                      id="message-type-title"
                      className="text-lg font-medium mb-6 flex items-center border-b border-gray-200 pb-3 text-[#2E2E2E]"
                    >
                      <Type className="mr-2 text-[#1A1A1A]" />
                      Message Details
                    </h2>

                    <div className="space-y-6">
                      <div className="flex flex-col">
                        <label
                          htmlFor="messageType"
                          className="text-[#2E2E2E] font-medium mb-2 flex items-center"
                        >
                          Message Type{" "}
                          <span className="text-[#1A1A1A] ml-1">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1A1A1A]">
                            <Info size={18} />
                          </span>
                          <select
                            id="messageType"
                            value={data?.messageType || MessageType.OCCASION}
                            onChange={(e) =>
                              setData({
                                ...data,
                                messageType: e.target.value as MessageType,
                              })
                            }
                            className="bg-white pl-10 pr-10 py-3 w-full border border-gray-200 rounded-md text-[#2E2E2E] shadow-sm focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] focus:outline-none transition-all duration-200 appearance-none"
                            required
                          >
                            {Object.values(MessageType)
                              .filter(
                                (type) =>
                                  !ignoreType.includes(type as MessageType)
                              )
                              .map((type) => (
                                <option
                                  className="bg-white text-[#2E2E2E]"
                                  key={type}
                                  value={type}
                                >
                                  {type}
                                </option>
                              ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 ml-1">
                          Select the type of message you want to send
                        </p>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col">
                        <label
                          htmlFor="content"
                          className="text-[#2E2E2E] font-medium mb-2 flex items-center"
                        >
                          Message Content{" "}
                          <span className="text-[#1A1A1A] ml-1">*</span>
                        </label>
                        <div className="relative">
                          <textarea
                            id="content"
                            value={data?.content}
                            onChange={(e) =>
                              setData({ ...data, content: e.target.value })
                            }
                            placeholder="Type your message here..."
                            className="bg-white p-4 w-full border border-gray-200 rounded-md text-[#2E2E2E] shadow-sm focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] focus:outline-none transition-all duration-200 resize-none"
                            rows={5}
                            required
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1 ml-1 flex items-center justify-between">
                          <span>Write clear and concise message</span>
                          <span>{data?.content?.length || 0} characters</span>
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Delivery Method */}
                        <div className="flex flex-col">
                          <label
                            htmlFor="deliveryMethod"
                            className="text-[#2E2E2E] font-medium mb-2 flex items-center"
                          >
                            Delivery Method{" "}
                            <span className="text-[#1A1A1A] ml-1">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1A1A1A]">
                              <MailOpen size={18} />
                            </span>
                            <select
                              id="deliveryMethod"
                              value={data?.deliveryMethod}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  deliveryMethod: e.target
                                    .value as DeliveryType,
                                })
                              }
                              className="bg-white pl-10 pr-10 py-3 w-full border border-gray-200 rounded-md text-[#2E2E2E] shadow-sm focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] focus:outline-none transition-all duration-200 appearance-none"
                              required
                            >
                              {Object.values(DeliveryType).map((method) => (
                                <option
                                  className="bg-white text-[#2E2E2E]"
                                  key={method}
                                  value={method}
                                >
                                  {method}
                                </option>
                              ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* SEND TO */}
                        <div className="flex flex-col">
                          <label
                            htmlFor="sendWhom"
                            className="text-[#2E2E2E] font-medium mb-2 flex items-center"
                          >
                            Send To{" "}
                            <span className="text-[#1A1A1A] ml-1">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1A1A1A]">
                              <Users size={18} />
                            </span>
                            <select
                              id="sendWhom"
                              value={data?.sendWhom}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  sendWhom: e.target.value as SendWhom,
                                })
                              }
                              className="bg-white pl-10 pr-10 py-3 w-full border border-gray-200 rounded-md text-[#2E2E2E] shadow-sm focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] focus:outline-none transition-all duration-200 appearance-none"
                              required
                            >
                              {Object.values(SendWhom).map((sendWhom) => (
                                <option
                                  className="bg-white text-[#2E2E2E]"
                                  key={sendWhom}
                                  value={sendWhom}
                                >
                                  {sendWhom}
                                </option>
                              ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Scheduling Section */}
                  <section aria-labelledby="scheduling-title" className="pt-4">
                    <h2
                      id="scheduling-title"
                      className="text-lg font-medium text-[#2E2E2E] mb-6 flex items-center border-b border-gray-200 pb-3"
                    >
                      <Clock className="mr-2 text-[#1A1A1A]" />
                      Scheduling Options
                    </h2>

                    <div className="flex items-center mb-4">
                      <div className="relative inline-block h-6 w-11">
                        <input
                          type="checkbox"
                          id="schedule"
                          checked={data?.schedule}
                          onChange={() =>
                            setData({ ...data, schedule: !data?.schedule })
                          }
                          className="opacity-0 absolute h-0 w-0"
                        />
                        <label
                          htmlFor="schedule"
                          className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${
                            data?.schedule ? "bg-[#1A1A1A]" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute left-1 bottom-1 bg-white h-4 w-4 rounded-full transition-transform duration-300 ${
                              data?.schedule ? "transform translate-x-5" : ""
                            }`}
                          ></span>
                        </label>
                      </div>
                      <label
                        htmlFor="schedule"
                        className="text-[#2E2E2E] ml-3 cursor-pointer"
                      >
                        Schedule for later
                      </label>
                    </div>

                    {data?.schedule && (
                      <div className="transition-all duration-300 ease-in-out">
                        <div className="bg-white rounded-md p-4 border border-gray-200 mt-2">
                          <label
                            htmlFor="scheduleDate"
                            className="block text-sm font-medium text-[#2E2E2E] mb-2"
                          >
                            <div className="flex items-center">
                              <Calendar
                                className="mr-2 text-[#1A1A1A]"
                                size={16}
                              />
                              Schedule Date & Time
                            </div>
                          </label>
                          <div className="relative">
                            <input
                              type="datetime-local"
                              placeholder="Select date"
                              value={data?.scheduleDate}
                              onChange={(e) => handleChange(e)}
                              className="w-full pl-3 py-3 bg-white text-[#2E2E2E] border border-gray-200 rounded-md focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A]"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </section>

                  {/* Success Message */}
                  {showSuccessMessage && (
                    <div className="bg-green-50 text-green-800 px-4 py-3 rounded-md border border-green-200 flex items-center">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" />
                      Message {data?.schedule ? "scheduled" : "sent"}{" "}
                      successfully!
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-6 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-8 py-3 rounded-md border  bg-[#E26300] text-white font-medium shadow-sm transition-all duration-300 hover:bg-black focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] flex items-center justify-center gap-2 ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="animate-spin h-5 w-5" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 " />
                          {data?.schedule ? "Schedule Message" : "Send Message"}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right side - Preview Card */}
          <div className="xl:col-span-2 gap-10">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-6">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4 flex items-center border-b border-gray-200 pb-3 text-[#2E2E2E]">
                  <MessageSquare className="h-5 w-5 mr-2 text-[#1A1A1A]" />
                  Message Preview
                </h3>

                <div className="mt-4 space-y-4">
                  <div className="bg-white rounded-md p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-500 text-xs uppercase tracking-wider">
                        Type
                      </span>
                      <span className="text-[#1A1A1A] bg-gray-100 px-2.5 py-0.5 rounded-md text-xs">
                        {data?.messageType || MessageType.OCCASION}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-gray-500 text-xs uppercase tracking-wider">
                        Delivery
                      </span>
                      <span className="text-[#1A1A1A] bg-gray-100 px-2.5 py-0.5 rounded-md text-xs">
                        {data?.deliveryMethod || DeliveryType.WHATSAPP}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-gray-500 text-xs uppercase tracking-wider">
                        Recipients
                      </span>
                      <span className="text-[#1A1A1A] bg-gray-100 px-2.5 py-0.5 rounded-md text-xs">
                        {data?.sendWhom || SendWhom.ALL}
                      </span>
                    </div>
                  </div>

                  {data?.schedule && data?.scheduleDate && (
                    <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                      <div className="flex items-center text-[#2E2E2E]">
                        <Clock className="h-4 w-4 mr-2 text-[#1A1A1A]" />
                        <span className="text-sm">Scheduled</span>
                      </div>
                      <div className="flex items-center mt-1 ml-6">
                        <Calendar className="h-3.5 w-3.5 mr-1.5 text-[#1A1A1A]" />
                        <span className="text-[#2E2E2E] text-sm">
                          {data?.scheduleDate}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="bg-white rounded-md p-4 border border-gray-200">
                    <h4 className="text-gray-500 text-xs uppercase tracking-wider mb-3">
                      Message Content
                    </h4>
                    <div className="bg-gray-50 rounded-md p-3 border border-gray-200 min-h-[120px]">
                      {data?.content ? (
                        <p className="text-[#2E2E2E] text-sm whitespace-pre-wrap">
                          {data?.content}
                        </p>
                      ) : (
                        <p className="text-gray-400 italic text-sm">
                          Message content will appear here...
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                    <div className="flex items-start">
                      <Info
                        size={16}
                        className="text-[#1A1A1A] mr-2 mt-0.5 flex-shrink-0"
                      />
                      <p className="text-[#2E2E2E] text-sm">
                        {data?.schedule
                          ? "Your message will be sent automatically at the scheduled date and time."
                          : "Your message will be sent immediately after submission."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Card */}
            <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-3 flex items-center text-[#2E2E2E]">
                  <HelpCircle className="h-5 w-5 mr-2 text-[#1A1A1A]" />
                  Tips for Effective Messages
                </h3>
                <div className="text-[#2E2E2E] text-sm space-y-3">
                  <p>
                    <span className="text-[#1A1A1A] font-medium">
                      Business Messages
                    </span>{" "}
                    help you connect with your customers and suppliers.
                  </p>
                  <p>
                    <span className="text-[#1A1A1A]">•</span> Keep messages clear
                    and concise
                  </p>
                  <p>
                    <span className="text-[#1A1A1A]">•</span> Use the scheduling
                    option for campaigns or promotions
                  </p>
                  <p>
                    <span className="text-[#1A1A1A]">•</span> Choose the right
                    delivery method for your audience
                  </p>
                  <p>
                    <span className="text-[#1A1A1A]">•</span> Target specific
                    groups for better engagement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageForm;