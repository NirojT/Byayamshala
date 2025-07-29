import { handleGettingStarted } from "@/global/config";
import { useGlobalStore } from "@/global/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaymentMyQrModal from "./component/paymentmode/component/payment-my-qr-modal";
import ReviewDetails from "./component/steps/components/review-details";
import GettingStartedSteps from "./component/steps/getting-started-steps";
import { useGettingStartedStore } from "./store";

const GettingStarted = () => {
  const navigate = useNavigate();
  const { isQrOpen, setIsQrOpen, reviewDetails } = useGettingStartedStore();

  const { appUser } = useGlobalStore();

  //so i wrapped in private layout i didnt work so checking here
  useEffect(() => {
    handleGettingStarted(appUser, navigate);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans flex justify-center sm:justify-start relative">
      <div className="sm:hidden block mt-10">
        {reviewDetails ? <ReviewDetails /> : <GettingStartedSteps />}
      </div>

      {/* for bigger screens  */}
      <div className="hidden sm:block ml-20">
        <GettingStartedSteps />
      </div>

      {/* Review Details Panel for bigger screens */}
      <div className="hidden sm:block absolute top-52 right-10">
        {reviewDetails && <ReviewDetails />}
      </div>

      {/* this is for the show qr view on the right side of the form in big screens */}
      <div className="hidden sm:flex absolute top-52 right-10">
        {isQrOpen && <PaymentMyQrModal setIsQrOpen={setIsQrOpen} />}
      </div>
    </div>
  );
};

export default GettingStarted;
