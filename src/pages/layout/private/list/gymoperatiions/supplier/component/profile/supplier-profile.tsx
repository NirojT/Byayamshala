import { useLocation, useNavigate } from "react-router-dom";
import { ISupplierDetails } from "../../interface";
import { PrivateRoute } from "../../../../../../../../global/config";

const SupplierProfile = () => {
  const { state } = useLocation();
  const supplier: ISupplierDetails = { ...state };
    const navigate = useNavigate();
  const handleEditProfile = () => {
 
    navigate(`/${PrivateRoute}/edit/gym/operation/supplier`, { state: supplier });
  };
  // State to track which plan's details are visible

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-white shadow-lg rounded-lg p-8">
      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {supplier?.name}
          </h2>
          <p className="text-gray-600"> Rs {supplier?.initialBalance} {supplier?.partyMoneyType}</p>
          <p className="text-gray-600">Phone: {supplier?.phoneNo}</p>
          <p className="text-gray-600">Email: {supplier?.email}</p>
          {/* <p className="text-gray-600">
            Facilities:{" "}
            {supplier?.facilities?.map((f) => f.facilityName).join(",")}
          </p> */}
        </div>
      </div>

      {/* Basic Details */}
      <div className="grid grid-cols-2 gap-6 text-gray-700">
        <p>
          <span className="font-semibold">
            created at date: {supplier.createdDate}
          </span>
        </p>
      </div>

      {/* Call to Action */}
      <div className="mt-10 text-center"  onClick={handleEditProfile}>
        <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
          Edit Supplier
        </button>
      </div>
    </div>
  );
};

export default SupplierProfile;
