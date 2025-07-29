import { useLocation, useNavigate } from "react-router-dom";
import { IPlansDetails } from "../../interface";
import { PrivateRoute } from "../../../../../../../../global/config";

const PlansProfile = () => {
  const { state } = useLocation();
  const plans: IPlansDetails = { ...state };
  const navigate = useNavigate();
  const handleEditProfile = () => {

    navigate(`/${PrivateRoute}/edit/gym/operation/plans`, { state: plans });
  };
  // State to track which plan's details are visible

  return (
    // bg-gradient-to-br from-blue-50 to-white
    <div className="max-w-4xl mx-auto mt-5 ml-6 mr-6 sm:ml-auto sm:mr-auto sm:flex sm:flex-col sm:justify-center bg-black border border-gray-300 shadow-lg rounded-lg p-8">
      {/* Profile Header */}
      <div className="flex flex-col ">
        <div className="text-start w-full">
          <h2 className="text-2xl font-bold text-white">
            Plan Name: <span className="text-gray-400">{plans?.planName}</span>
          </h2>
          <p className="text-white">Price: <span className="text-gray-400">Rs {plans?.price}</span></p>
          <p className="text-white">Phone: <span className="text-gray-400">{plans?.facilities?.map(i=>i.facilityName)}</span></p>
          <p className="text-white">Shift: <span className="text-gray-400">{plans?.description}</span></p>
          <p className="text-white">
            Facilities:{" "}
            {plans?.facilities?.map((f) => f.facilityName).join(",")}
          </p>
        </div>
        {/* Basic Details */}
        {/* <div className="grid grid-cols-2 gap-6 text-gray-700"> */}
        {/* <p> */}
        <p className="font-semibold text-start text-white capitalize">
          created date: <span className="text-gray-400">{plans.createdDate}</span>
        </p>
        {/* </p> */}
        {/* </div> */}
      </div>



      {/* Call to Action */}
      <div className="mt-10 text-center" onClick={handleEditProfile}>
        <button
          // className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
          className="w-full sm:w-1/2 p-3 bg-[#FF6A00] text-white font-semibold rounded-md hover:bg-[#FF6A00] focus:outline-none">
          Edit Plans
        </button>
      </div>
    </div>
  );
};

export default PlansProfile;
