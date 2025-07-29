import { PrivateRoute } from "@/global/config";
import { NepaliDate } from "@zener/nepali-datepicker-react";
import { useEffect } from "react";
import { IoMdCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../../../../../../global/store";
import { useListPlansStore } from "../../../../list/gymoperatiions/plans/store";
import { useAddMemberFormStore } from "../store";

const MemberFormModal = () => {
  const {
    data,
    setData,
    setIsModalOpen,
    createMember,
    isModalOpen,
    remainingDays,
    clearData,
    resetValidation,
    printBill,
    setPrintBill,
    setActiveSection,
    isExistingMember,
  } = useAddMemberFormStore();

  const navigate = useNavigate();

  const { setToasterData } = useGlobalStore();

  const { plans } = useListPlansStore();

  const plan = plans.find((p) => p.id === Number(data?.planId as string));

  // Calculate and update the ending date based on the current data
  useEffect(() => {
    if (plan?.durationInDays && data?.startDate) {
      const joiningDate = new NepaliDate(data?.startDate as string);
      joiningDate.setDate(joiningDate.getDate() + plan?.durationInDays);
      const endDate = joiningDate.toString();
      setData("expireDate", endDate);
    } else if (remainingDays !== undefined) {
      const currentDate = new NepaliDate();
      currentDate.setDate(currentDate.getDate() + remainingDays);
      const endDate = currentDate.toString();
      setData("expireDate", endDate);
    }
  }, [plan?.durationInDays, data?.startDate, remainingDays]);

  // Fee calculations
  const admissionFee = Number(data?.admissionFee) || 0;

  const discount = Number(data?.discount) || 0;
  const planPrice = Number(plan?.price) || 0;
  const totalCost =
    planPrice +
    (admissionFee > 0 ? admissionFee : 0) -
    (discount > 0 ? discount : 0);

  const handleConfirm = async () => {
    try {
      const res = await createMember({
        ...(data as Record<string, string>),
        ...(isExistingMember && { remainingDays }),
        ...{ isExistingMember },
      });

      setToasterData({
        open: true,
        message: res?.message,
        severity: res?.severity,
      });
      if (res?.severity === "success") {
        checkCredit();
        setIsModalOpen(!isModalOpen);
        resetValidation();
        clearData();
        setPrintBill(false);
        setActiveSection("personal");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkCredit = () => {
    if (data?.paymentMethod === "FULL_CREDIT") {
      navigate(`/${PrivateRoute}/add/finance/credits`, {
        state: { fromMember: true, memberData: data, price: plan?.price },
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm font-poppins flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-white p-6 sm:p-8 rounded-xl shadow-xl max-w-7xl w-full overflow-y-auto max-h-[90vh] transition-all transform duration-300 ease-in-out border border-gray-200">
        {/* Modal Header */}
        <div className="relative mb-6 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Confirm Member Details
          </h3>
          <div className="w-32 h-1 bg-gradient-to-r from-[#E26300] to-[#D25200] mx-auto rounded-full"></div>
        </div>

        {/* Settings Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Print Bill */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-lg font-semibold text-gray-800 block">
                    Print Bill
                  </span>
                  <span className="text-sm text-gray-500">
                    Generate receipt after confirmation
                  </span>
                </div>
              </div>
              <div
                className="hover:cursor-pointer transform hover:scale-110 transition-transform"
                onClick={() => setPrintBill(!printBill)}
              >
                {printBill ? (
                  <IoMdCheckbox size={28} className="text-green-600" />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank
                    size={28}
                    className="text-gray-400"
                  />
                )}
              </div>
            </div>
          </div>

          {/* WhatsApp Saved */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787" />
                  </svg>
                </div>
                <div>
                  <span className="text-lg font-semibold text-gray-800 block">
                    WhatsApp Saved
                  </span>
                  <span className="text-sm text-gray-500">
                    Contact: 9810591008
                  </span>
                </div>
              </div>
              <div
                className="hover:cursor-pointer transform hover:scale-110 transition-transform"
                onClick={() =>
                  setData("isWhatsAppSaved", !data?.isWhatsAppSaved)
                }
              >
                {data?.isWhatsAppSaved ? (
                  <IoMdCheckbox size={28} className="text-green-600" />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank
                    size={28}
                    className="text-gray-400"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Send Notification */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-5 5v-5zM4 5h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-lg font-semibold text-gray-800 block">
                    Send Notification
                  </span>
                  <span className="text-sm text-gray-500">
                    Welcome email & WhatsApp message
                  </span>
                </div>
              </div>
              <div
                className="hover:cursor-pointer transform hover:scale-110 transition-transform"
                onClick={() =>
                  setData("sendNotification", !data?.sendNotification)
                }
              >
                {data?.sendNotification ? (
                  <IoMdCheckbox size={28} className="text-green-600" />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank
                    size={28}
                    className="text-gray-400"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Member Details */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 text-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-gray-300">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-800">
                Member Details
              </h4>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                <span className="font-semibold text-gray-600">Full Name:</span>
                <span className="font-bold text-gray-800">
                  {data?.fullName as string}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                <span className="font-semibold text-gray-600">Email:</span>
                <span className="text-gray-800">{data?.email as string}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                <span className="font-semibold text-gray-600">Phone:</span>
                <span className="text-gray-800">{data?.phone as string}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                <span className="font-semibold text-gray-600">Address:</span>
                <span className="text-gray-800">{data?.address as string}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                <span className="font-semibold text-gray-600">Gender:</span>
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {data?.gender as string}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                <span className="font-semibold text-gray-600">Shift Type:</span>
                <span className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {data?.shiftType as string}
                </span>
              </div>
            </div>
          </div>

          {/* Plan Details */}
          {!isExistingMember && plan && (
            <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-orange-300">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800">
                  Plan Details
                </h4>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
                  <span className="font-semibold text-gray-600">Plan:</span>
                  <span className="font-bold text-gray-800">
                    {plan?.planName}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
                  <span className="font-semibold text-gray-600">Duration:</span>
                  <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {plan?.durationInDays} days
                  </span>
                </div>

                {/* Start Date */}
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
                  <span className="font-semibold text-gray-600">
                    Start Date:
                  </span>
                  <span className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {data?.startDate as string}
                  </span>
                </div>

                {/* End Date */}
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
                  <span className="font-semibold text-gray-600">End Date:</span>
                  <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {data?.expireDate as string}
                  </span>
                </div>

                <div className="p-3 bg-white rounded-lg border border-orange-200">
                  <span className="font-semibold text-gray-600 block mb-3">
                    Facilities:
                  </span>
                  {plan?.facilities?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {plan?.facilities?.map((facility, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {facility?.facilityName}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-500 italic">None</span>
                  )}
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
                  <span className="font-semibold text-gray-600">Price:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{plan?.price}
                  </span>
                </div>
                {plan?.discount > 0 && (
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
                    <span className="font-semibold text-gray-600">
                      Package Discount:
                    </span>
                    <span className="text-xl font-bold text-red-600">
                      -₹{plan?.discount}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Show existing member end date if it's an existing member */}
          {isExistingMember && (
            <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-orange-300">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800">
                  Membership Extension
                </h4>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
                  <span className="font-semibold text-gray-600">
                    Current End Date:
                  </span>
                  <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {data?.existingEndDate as string}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
                  <span className="font-semibold text-gray-600">
                    Remaining Days:
                  </span>
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {remainingDays} days
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Financial Details Section */}
        <div className="mt-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-green-300">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path
                    fillRule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-800">
                Financial Details
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {!isExistingMember && (
                <>
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <label className="block font-semibold text-gray-700 mb-2">
                      Admission / Handling Fee:
                    </label>
                    <input
                      type="number"
                      onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
                      min="0"
                      className="w-full text-gray-800 font-medium border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Enter admission fee"
                      value={data?.admissionFee as number}
                      onChange={(e) => setData("admissionFee", e.target.value)}
                    />
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <label className="block font-semibold text-gray-700 mb-2">
                      Discount:
                    </label>
                    <input
                      type="number"
                      onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
                      min="0"
                      className="w-full text-gray-800 font-medium border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="Enter discount"
                      value={data?.discount as number}
                      onChange={(e) => setData("discount", e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Cost Breakdown */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <h5 className="text-lg font-bold text-gray-800 mb-4">
                Cost Breakdown
              </h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Plan Price:</span>
                  <span className="font-semibold text-gray-800">
                    ₹ {planPrice}
                  </span>
                </div>
                {admissionFee > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Admission Fee:</span>
                    <span className="font-semibold text-green-600">
                      +₹ {admissionFee}
                    </span>
                  </div>
                )}

                {discount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Discount:</span>
                    <span className="font-semibold text-red-600">
                      -₹ {discount}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-300 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">
                      Total Cost:
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      ₹ {totalCost}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-purple-300">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-800">
                Additional Information
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <span className="font-semibold text-gray-700 block mb-2">
                  Remarks:
                </span>
                <div className="text-gray-800 bg-gray-50 p-3 rounded border min-h-[3rem]">
                  {(data?.remarks as string) || "No remarks"}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <span className="font-semibold text-gray-700 block mb-2">
                  Emergency Contact:
                </span>
                <div className="text-gray-800 bg-gray-50 p-3 rounded border">
                  {data?.emergencyContact as string}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-end gap-4">
          <button
            className="px-8 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2 font-semibold"
            onClick={() => setIsModalOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Cancel
          </button>
          <button
            className="px-8 py-3 rounded-lg text-white bg-gradient-to-r from-[#E26300] to-[#D25200] hover:from-[#D25200] hover:to-[#C24100] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 font-semibold transform hover:scale-105"
            onClick={handleConfirm}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Confirm Membership
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberFormModal;
