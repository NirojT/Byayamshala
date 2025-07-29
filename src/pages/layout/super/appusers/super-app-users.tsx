import { AppUserPlanType, AppUserRoles } from "@/global/components/enums/enums";
import { useIsDesktop } from "@/global/desktop-checker";
import { useGlobalStore } from "@/global/store";
import { Delete, Eye, Pen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { TbStatusChange } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useSuperPlansStore } from "../plans/store";
import SuperAppUserFormModal from "./component/super-app-user-form-modal";
import SuperAppUserSubscriptionModal from "./component/super-app-user-subscriptions-modal";
import { ISuperAppUserDetails } from "./interface";
import { useSuperAppUserStore } from "./store";

const SuperAppUsers: React.FC = () => {
  const navigate = useNavigate();
  const {
    getSuperAppUser,
    deleteUser,
    changeStatus,
    superAppUsers,
    setOpen,
    setOpenSubscription,
    open,
    openSubscription,
    setId,
    setData,
    clearData,
  } = useSuperAppUserStore();
  const { getSuperPlans } = useSuperPlansStore();
  const { setToasterData } = useGlobalStore();

  // --- Search states ---
  const [searchName, setSearchName] = useState("");
  const [searchBusiness, setSearchBusiness] = useState("");
  const [searchAddress, setSearchAddress] = useState("");

  const handleAdd = () => {
    setId(0);
    setOpen(true);
    clearData();
  };
  const handleEdit = (user: ISuperAppUserDetails) => {
    setId(user?.id);
    setOpen(true);
    const role = user?.roles?.map((role) => role?.roleName).join(", ");
    setData({
      ...user,
      planType: user?.currentPlan as AppUserPlanType,
      role: role as AppUserRoles,
    });
  };
  const handleOpenSubscription = (user: ISuperAppUserDetails) => {
    if (
      user?.roles?.some(
        (role) => role?.roleName === AppUserRoles.ROLE_AFFILIATE
      )
    ) {
      navigate("/super/affiliate-details", { state: user });
      return;
    }
    setId(user?.id);
    setOpenSubscription(true);
  };
  const handleDelete = async (user: ISuperAppUserDetails) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user?.email}? This action cannot be undone.`
    );
    if (!confirmed) return;
    const res = await deleteUser(user?.id);
    setToasterData({
      open: true,
      message: res?.message,
      severity: res?.severity,
    });
  };
  const handleStatus = async (user: ISuperAppUserDetails) => {
    const res = await changeStatus(user?.id);
    setToasterData({
      open: true,
      message: res?.message,
      severity: res?.severity,
    });
  };
  const [appUserToRetrieve, setAppUserToRetrieve] = useState<AppUserRoles>(
    AppUserRoles.ALL
  );
  const isDesktop = useIsDesktop(640); // 640px matches Tailwind 'sm'
  useEffect(() => {
    getSuperAppUser();
  }, [getSuperAppUser, appUserToRetrieve]);
  useEffect(() => {
    getSuperPlans();
  }, [getSuperPlans]);

  // --- Filtering logic ---
  const filteredUsers = Array.isArray(superAppUsers)
    ? superAppUsers.filter((user) => {
        const matchName =
          !searchName ||
          (user?.email &&
            user.email.toLowerCase().includes(searchName.toLowerCase()));
        const matchBusiness =
          !searchBusiness ||
          (user?.businessDetails?.businessName &&
            user.businessDetails.businessName
              .toLowerCase()
              .includes(searchBusiness.toLowerCase()));
        const matchAddress =
          !searchAddress ||
          (user?.businessDetails?.businessAddress &&
            user.businessDetails.businessAddress
              .toLowerCase()
              .includes(searchAddress.toLowerCase()));
        return matchName && matchBusiness && matchAddress;
      })
    : [];

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-2 sm:px-8">
      {/* Controls */}
      <div>
        <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mb-4">
          <button
            className="capitalize px-8 py-3 bg-[#E26300] rounded-lg text-white font-semibold hover:bg-orange-700 transition"
            onClick={handleAdd}
          >
            Add
          </button>
          <select
            value={appUserToRetrieve}
            onChange={(e) =>
              setAppUserToRetrieve(e.target.value as AppUserRoles)
            }
            className="bg-black border border-gray-400 text-white w-52 px-3 py-2 rounded-md focus:outline-none"
          >
            <option value={AppUserRoles.ALL}>{AppUserRoles.ALL}</option>
            <option value={AppUserRoles.ROLE_ADMIN}>
              {AppUserRoles.ROLE_ADMIN}
            </option>
            <option value={AppUserRoles.ROLE_AFFILIATE}>
              {AppUserRoles.ROLE_AFFILIATE}
            </option>
          </select>
        </div>

        {/* Search Inputs */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            placeholder="Search by Name or Email"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none w-full sm:w-64"
          />
          <input
            type="text"
            placeholder="Search by Business"
            value={searchBusiness}
            onChange={(e) => setSearchBusiness(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none w-full sm:w-64"
          />
          <input
            type="text"
            placeholder="Search by Address"
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none w-full sm:w-64"
          />
        </div>
      </div>
      {/* Table for desktop */}

      {isDesktop ? (
        <div className="border border-gray-200 rounded-lg shadow-sm bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-slate-200 text-gray-800 sticky top-0 z-20">
                <tr>
                  <th className="p-3 text-sm font-semibold">SN</th>
                  <th className="p-3 text-sm font-semibold">Email</th>
                  <th className="p-3 text-sm font-semibold">Business</th>
                  <th className="p-3 text-sm font-semibold">Current Plan</th>
                  <th className="p-3 text-sm font-semibold">Roles</th>
                  <th className="p-3 text-sm font-semibold">Status</th>
                  <th className="p-3 text-sm font-semibold">Added At</th>
                  <th className="p-3 text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((data, index: number) => (
                    <tr
                      key={data?.id ?? index}
                      className="hover:bg-gray-100 border-t transition-colors duration-200"
                    >
                      <td className="p-3 text-center text-sm">{index + 1}</td>
                      <td className="p-3 text-sm">{data?.email} </td>
                      <td className="p-3 text-md">
                        {data?.businessDetails?.businessName}
                        {" ("}
                        {data?.businessDetails?.businessAddress}
                        {")"}
                      </td>
                      <td className="p-3 text-sm">
                        <span className="font-medium">{data?.currentPlan}</span>
                        <span className="ml-1 text-xs text-gray-400">
                          ({data?.status})
                        </span>
                      </td>
                      <td className="p-3 text-sm">
                        {data?.roles?.map((role) => role?.roleName).join(", ")}
                        {data?.roles?.some(
                          (role) =>
                            role?.roleName === AppUserRoles.ROLE_AFFILIATE
                        ) && (
                          <span className="ml-2 text-xs text-orange-500">
                            {data?.affiliateCode}
                          </span>
                        )}
                      </td>
                      <td
                        className={`p-3 text-sm ${
                          data?.activeStatus ? "text-green-600" : "text-red-600"
                        } font-semibold`}
                      >
                        {data?.activeStatus ? "Active" : "Inactive"}
                      </td>
                      <td className="p-3 text-sm">
                        <div>
                          {data?.createdNepDate}_{data?.localTimeZone}
                        
                        </div>
                      </td>
                      <td className="p-3 text-sm">
                        <div className="flex gap-2">
                          <button
                            className="hover:text-orange-600 p-2 rounded transition"
                            onClick={() => handleEdit(data)}
                            title="Edit"
                          >
                            <Pen size={18} />
                          </button>
                          <button
                            className="hover:text-orange-600 p-2 rounded transition"
                            onClick={() => handleOpenSubscription(data)}
                            title="View"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            className="hover:text-orange-600 p-2 rounded transition"
                            onClick={() => handleDelete(data)}
                            title="Delete"
                          >
                            <Delete size={18} />
                          </button>
                          <button
                            className="hover:text-orange-600 p-2 rounded transition"
                            onClick={() => handleStatus(data)}
                            title="Change Status"
                          >
                            <TbStatusChange size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="p-6 text-center text-red-500">
                      No app user are added
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {/* Mobile card view */}
          {filteredUsers.length > 0 ? (
            filteredUsers.map((data, idx) => (
              <div
                className="border border-gray-200 rounded-xl bg-white shadow flex flex-col p-4"
                key={data?.id ?? idx}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500 font-semibold">
                    SN: {idx + 1}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      data?.activeStatus
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {data?.activeStatus ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="mb-2">
                  <div className="text-xs text-gray-400">Email</div>
                  <div className="font-medium break-all">{data?.email}</div>
                </div>
                <div className="grid grid-cols-2 gap-y-2 text-sm mb-2">
                  <div>
                    <div className="text-xs text-gray-400">Current Plan</div>
                    <div className="font-medium">{data?.currentPlan}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Status</div>
                    <div className="font-medium">{data?.status}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Roles</div>
                    <div className="font-medium">
                      {data?.roles?.map((role) => role?.roleName).join(", ")}
                    </div>
                  </div>
                  {data?.affiliateCode && (
                    <div>
                      <div className="text-xs text-gray-400">
                        Affiliate Code
                      </div>
                      <div className="font-medium">{data?.affiliateCode}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-xs text-gray-400">Added</div>
                    <div className="font-medium">{data?.createdDate}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Nepali Date</div>
                    <div className="font-medium">{data?.createdNepDate}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs text-gray-400">Business</div>
                    <div className="font-medium">
                      {data?.businessDetails?.businessName} (
                      {data?.businessDetails?.businessAddress})
                    </div>
                  </div>
                </div>
                {/* Big action buttons, full width and touch friendly */}
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    className="flex items-center justify-center gap-2 bg-green-400 text-white rounded-lg py-3 text-base font-semibold shadow hover:bg-orange-700 transition"
                    onClick={() => handleEdit(data)}
                  >
                    <Pen size={22} /> Edit
                  </button>
                  <button
                    className="flex items-center justify-center gap-2 bg-gray-800 text-white rounded-lg py-3 text-base font-semibold shadow hover:bg-gray-900 transition"
                    onClick={() => handleOpenSubscription(data)}
                  >
                    <Eye size={22} /> View
                  </button>
                  <button
                    className="flex items-center justify-center gap-2 bg-red-600 text-white rounded-lg py-3 text-base font-semibold shadow hover:bg-red-700 transition"
                    onClick={() => handleDelete(data)}
                  >
                    <Delete size={22} /> Delete
                  </button>
                  <button
                    className="flex items-center justify-center gap-2 bg-blue-500 text-white rounded-lg py-3 text-base font-semibold shadow hover:bg-blue-600 transition"
                    onClick={() => handleStatus(data)}
                  >
                    <TbStatusChange size={22} /> Status
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex justify-center items-center p-7 border border-gray-300 rounded-lg bg-white">
              <div className="text-center text-red-400">
                <p>No members found. Add members to view their details.</p>
                <p>Or bulk import them from CSV or Excel.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {open && <SuperAppUserFormModal />}
      {openSubscription && <SuperAppUserSubscriptionModal />}
    </div>
  );
};

export default SuperAppUsers;