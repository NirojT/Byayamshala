import {
  AppUserPlanType,
  MemberShipStatus,
} from "@/global/components/enums/enums"; 
import { useGlobalStore } from "@/global/store";
import { PrivateRoute } from "@/global/config";
import { useNavigate } from "react-router-dom";
import { useGettingStartedStore } from "../../store";

const CompleteGettingStarted = () => {
  const { selectedPlan, setOpenReviewDeatils, submitInfo } =
    useGettingStartedStore();
  const { setToasterData, clearAppUser, appUser, setAppUser } =
    useGlobalStore();
  const navigate = useNavigate();

  /*when user confirm than this function will be called*/
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
      set new to false to not show this getting started page again
      */
      let path = "/"; // to public route
      if (selectedPlan?.type === AppUserPlanType.FREE_TRIAL) {
        setAppUser({
          ...appUser,
          isNew: false,
          subscriptionStatus: MemberShipStatus.ACTIVE,
        });
        path = `/${PrivateRoute}/`; //to private route
        return;
      }

      //if not free trial then clear the app user data
      if (path !== `/${PrivateRoute}/`) {
        clearAppUser();
      }

      navigate(path);
    }
  };

  return (
    <div className="col-span-full bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 transform hover:shadow-md">
      <div className="p-8 flex flex-col items-center">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-md">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Setup Complete!
        </h1>
        <p className="text-lg text-gray-600 mb-6 text-center">
          By Clicking Complete You are now ready to manage your gym at the next
          level.
        </p>

        {selectedPlan?.type === AppUserPlanType.FREE_TRIAL ? (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center mb-6 w-full">
            <p className="text-lg text-green-700">
              Enjoy your free trial! Get ready to experience all premium
              features.
            </p>
          </div>
        ) : (
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg text-center mb-6 w-full">
            <p className="text-lg text-orange-700">
              Your account will be activated within 2 hours. Thank you for
              choosing our premium service!
            </p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={() => setOpenReviewDeatils(true)}
            className="py-2.5 px-5 bg-gray-100 text-gray-700 font-medium rounded-md border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-200"
          >
            Review Details
          </button>

          <button
            onClick={() => handleConfirm()}
            className="py-2.5 px-5 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
          >
            Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteGettingStarted;
