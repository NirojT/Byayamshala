// import { AppUserPaymentMode } from "@/global/components/enums/enums";
// import { useGettingStartedStore } from "../../store";
// import PaymentMyQrModal from "./component/payment-my-qr-modal";

// import { useGlobalStore } from "@/global/store";
// import { ChangeEvent, useEffect, useState } from "react";
// import { ArrowLeft, Check } from "lucide-react";

// const PaymentStartedPlans = ({
//   onNext,
//   onPrevious,
// }: {
//   onNext: () => void;
//   onPrevious: () => void;
// }) => {
//   const { setToasterData } = useGlobalStore();
//   const [isQrOpen, setIsQrOpen] = useState(false);
//   const {
//     setPaymentDetails,
//     paymentDetails,
//     selectedPlan,
//     discountedPrice,
//     applyAffiliateDiscount,
//   } = useGettingStartedStore();

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setPaymentDetails({ ...paymentDetails, [name]: value });
//   };

//   const handleAffiliatorCodeChange = (e: any) => {
//     if (e.key === 'Enter') {
//       handleApplyDiscount();
//     }

//   }

//   const handleApplyDiscount = async () => {
//     if (!paymentDetails?.affiliateCode) {
//       setToasterData({
//         message: "Please enter a  affiliate code.",
//         severity: "error",
//         open: true,
//       });
//       return;
//     }
//     const res = await applyAffiliateDiscount();
//     setToasterData({
//       message: res?.message,
//       severity: res?.severity,
//       open: true,
//     });
//   };

//   // You can also call applyAffiliateDiscount when the component mounts
//   // in case there's a pre-filled affiliate code (though less common in this flow)
//   // useEffect(() => {
//   //   applyAffiliateDiscount();
//   // }, []);

//   const handleNext = () => {
//     if (paymentDetails.paymentMode) {
//       onNext();
//     } else {
//       alert("Please select a payment mode.");
//     }
//   };

//   useEffect(() => {
//     if (paymentDetails?.paymentMode === AppUserPaymentMode.QR) {
//       setIsQrOpen(true);
//     } else {
//       setIsQrOpen(false);
//     }
//   }, [paymentDetails?.paymentMode]);

//   return (
//     <div className="py-12 w-96 border p-6 border-gray-500">
//       <div className="flex gap-2 mb-8 items-center">
//         <ArrowLeft onClick={onPrevious} size={22} />
//         <h1 className="text-center text-xl tracking-wider text-white ml-3">
//           Choose Your Payment Mode
//         </h1>
//       </div>

//       <div>
//         {/* form */}
//         <div className="flex flex-col items-center justify-start w-full gap-4 ">
//           <div className="w-full">
//             <label className="block text-lg ml-2">Payment Mode:</label>
//             <div className="flex gap-4 w-full p-2">
//               <select
//                 className="p-3 bg-black text-gray-300 block w-full rounded-md focus:outline-none border border-gray-600 shadow-sm focus:border-[#E26003] focus:ring-[#E26003]"
//                 name="paymentMode"
//                 value={paymentDetails?.paymentMode} // Assuming you have this enum
//                 onChange={handleChange}
//               >
//                 {Object.values(AppUserPaymentMode)
//                   .filter((mode) => mode !== AppUserPaymentMode.NONE) // Exclude NONE
//                   .map((mode) => (
//                     <option key={mode} value={mode}>
//                       {mode}
//                     </option>
//                   ))}
//               </select>
//             </div>
//           </div>

//           <div className="flex items-center justify-center gap-5 w-full">
//             <div className="w-full p-2">
//               <label className="block text-lg">
//                 Affiliate Code (Optional):
//               </label>
//               <div className="flex items-center justify-center gap-4">
//                 <input
//                   type="text"
//                   // className="p-3 bg-black text-gray-300 w-full rounded-md focus:outline-none border border-gray-600 shadow-sm focus:border-[#E26003] focus:ring-[#E26003]"
//                   className="p-3 w-full rounded-md bg-black text-white border border-gray-600  shadow-sm focus:outline-none focus:border-[#E26003] focus:ring-[#E26003]"
//                   name="affiliateCode"
//                   value={paymentDetails?.affiliateCode}
//                   onChange={handleChange}
//                   onKeyDown={handleAffiliatorCodeChange}
//                 />
//                 <Check onClick={handleApplyDiscount} className="border " />
//               </div>
//             </div>

//           </div>

//           <div className="flex flex-col sm:flex-row gap-5 p-2 w-full">
//             <button
//               className="w-full p-3 bg-[#E26300] text-white font-semibold rounded-md  focus:outline-none"
//               onClick={handleNext}
//               disabled={!paymentDetails.paymentMode}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* <div className="">
//         <h2 className="text-center text-xl font-bold mt-8 text-white">
//           Selected Plan:
//         </h2>
//         <p className="text-center text-lg text-gray-300 mt-4">
//           {selectedPlan?.type} - {selectedPlan?.price}{" "}
//           {selectedPlan?.durationInDays} days
//         </p>
//         {discountedPrice > 0 && (
//           <p className="text-center text-lg text-green-400 mt-2">
//             Discounted Price: {discountedPrice}
//           </p>
//         )}
//         {discountedPrice > 0 && selectedPlan?.price !== undefined && (
//           <p className="text-center text-sm text-gray-400 mt-1 line-through">
//             Original Price: {selectedPlan.price}
//           </p>
//         )}
//         <p className="text-center text-lg text-gray-300 mt-4">
//           {selectedPlan?.features.map((feature, index) => (
//             <span key={index} className="block">
//               {index + 1} {feature}
//             </span>
//           ))}
//         </p>
//       </div> */}

//       {/* {modal} */}
//       {/* QR code modal */}
//       {isQrOpen && <PaymentMyQrModal setIsQrOpen={setIsQrOpen} />}
//     </div>
//   );
// };

// export default PaymentStartedPlans;

import { AppUserPaymentMode, AppUserPlanType } from "@/global/components/enums/enums";
import { useGettingStartedStore } from "../../store";
import PaymentMyQrModal from "./component/payment-my-qr-modal";

import { useGlobalStore } from "@/global/store";
import { ChangeEvent, useEffect, useState } from "react";
import { ArrowLeft, Check } from "lucide-react"; 
import { PrivateRoute } from "@/global/config";
import { useNavigate } from "react-router-dom";

const PaymentSection = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => {
  const { setToasterData } = useGlobalStore();
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const {
    setPaymentDetails,
    paymentDetails,
    selectedPlan,
    // discountedPrice,
    applyAffiliateDiscount,
  } = useGettingStartedStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleAffiliatorCodeChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleApplyDiscount();
    }
  };

  const handleApplyDiscount = async () => {
    if (!paymentDetails?.affiliateCode) {
      setToasterData({
        message: "Please enter an affiliate code.",
        severity: "error",
        open: true,
      });
      return;
    }
    const res = await applyAffiliateDiscount();
    setToasterData({
      message: res?.message,
      severity: res?.severity,
      open: true,
    });
  };

  const handleNext = () => {
    if (paymentDetails.paymentMode) {
      onNext();
      setIsComplete(true);
    } else {
      alert("Please select a payment mode.");
    }
  };

  useEffect(() => {
    if (paymentDetails?.paymentMode === AppUserPaymentMode.QR) {
      setIsQrOpen(true);
    } else {
      setIsQrOpen(false);
    }
  }, [paymentDetails?.paymentMode]);


  const { clearAppUser } = useGlobalStore();
  const { submitInfo } = useGettingStartedStore();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    const res = await submitInfo();

    setToasterData({
      message: res?.message,
      severity: res?.severity,
      open: true,
    });
    if (res?.severity === "success") {
      /*
  only allow free trail to access the dashboard make others wait for 2 hours
  */

      let path = `/${PrivateRoute}/`;

      path = selectedPlan?.type === AppUserPlanType.FREE_TRIAL ? path : "/";

      if (path !== `/${PrivateRoute}/`) {
        clearAppUser();
      }

      navigate(path);
    }
  };





  return (
    <>
      {isComplete ? (
        <div className="border border-gray-700 text-center p-8 flex flex-col gap-5 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-xl">
          <h2 className="text-2xl text-white font-extrabold">Setup Complete!</h2>
          <p className="text-lg text-gray-300">You are now ready to go.</p>

          {selectedPlan?.type === AppUserPlanType.FREE_TRIAL ? (
            <p className="text-lg text-green-400">Enjoy your free trial!</p>
          ) : (
            <p className="text-lg text-orange-400">Within 2 hours your account will be activated. Thank you!</p>
          )}

          <button
            onClick={() => handleConfirm()}
            className="w-full p-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-md hover:from-orange-600 hover:to-red-600 focus:outline-none shadow-lg transform hover:scale-105 transition-transform"
          >
            Confirm
          </button>
        </div>
      ) : (
        <div className="py-12 w-full max-w-md mx-auto border border-gray-700 p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-xl">
          <div className="flex gap-2 mb-8 items-center">
            <ArrowLeft onClick={onPrevious} size={22} className="text-white cursor-pointer hover:text-orange-500 transition-colors" />
            <h1 className="text-center text-xl tracking-widest text-white ml-3 font-bold">Choose Your Payment Mode</h1>
          </div>

          <div>
            <div className="flex flex-col items-center justify-start w-full gap-6">
              <div className="w-full">
                <label className="block text-lg ml-2 text-gray-300">Payment Mode:</label>
                <div className="flex gap-4 w-full p-2">
                  <select
                    className="p-3 bg-black text-gray-300 block w-full rounded-md focus:outline-none border border-gray-600 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition-transform transform hover:scale-105"
                    name="paymentMode"
                    value={paymentDetails?.paymentMode}
                    onChange={handleChange}
                  >
                    {Object.values(AppUserPaymentMode)
                      
                      .map((mode) => (
                        <option key={mode} value={mode}>
                          {mode}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-center gap-5 w-full">
                <div className="w-full p-2">
                  <label className="block text-lg text-gray-300">Affiliate Code (Optional):</label>
                  <div className="flex items-center justify-center gap-2">
                    <input
                      type="text"
                      className="p-3 w-full rounded-md bg-black text-white border border-gray-600 shadow-sm focus:outline-none focus:border-orange-500 focus:ring-orange-500 transition-transform transform hover:scale-105"
                      name="affiliateCode"
                      value={paymentDetails?.affiliateCode}
                      onChange={handleChange}
                      onKeyDown={handleAffiliatorCodeChange}
                    />
                    <div className="border p-3 border-gray-600 rounded-lg bg-gray-900 hover:bg-gray-800 cursor-pointer transition-colors transform hover:scale-105">
                      <Check onClick={handleApplyDiscount} className="text-green-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 p-2 w-full">
                <button
                  className="w-full p-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-md focus:outline-none shadow-lg transform hover:scale-105 transition-transform"
                  onClick={handleNext}
                  disabled={!paymentDetails.paymentMode}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>

          {isQrOpen && <PaymentMyQrModal setIsQrOpen={setIsQrOpen} />}
        </div>
      )}
    </>

  );
};

export default PaymentSection;