import React, { useEffect, useState } from "react";
import { useSystemUserStore } from "../store";
import { useGlobalStore } from "@/global/store";
import { SystemUserType } from "@/global/components/enums/enums";
import { SystemUserForm } from "./system-user-form";

// Icons (you can replace these with your preferred icon library)
const Icons = {
  Add: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  ),
  Edit: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  ),
  Delete: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  ),
  Search: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  ),
  User: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  ),
  EmptyState: () => (
    <svg
      className="w-16 h-16 mx-auto text-gray-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  ),
};

// Custom Modal Component
const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {title}
                </h3>
                <div className="mt-2">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SystemUserList: React.FC = () => {
  const { setToasterData } = useGlobalStore();
  const {
    systemUsers,
    getSystemUsers,
    deleteSystemUser,
    changeStatus,
    changeType,
  } = useSystemUserStore();

  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    userId: number | null;
  }>({
    isOpen: false,
    userId: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getSystemUsers();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const filteredUsers = systemUsers.filter((user) => {
    const matchesSearch = user?.userName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "all" || user?.systemUserType === selectedType;
    return matchesSearch && matchesType;
  });

  const handleEdit = (id: number) => {
    setEditId(id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    setDeleteModal({ isOpen: false, userId: null });
    const res = await deleteSystemUser(id);
    setToasterData({
      open: true,
      message: res.message,
      severity: res.severity,
    });
    await getSystemUsers();
  };

  const handleStatusChange = async (id: number, activeStatus: boolean) => {
    const res = await changeStatus(id, !activeStatus);
    setToasterData({
      open: true,
      message: res.message,
      severity: res.severity,
    });
    await getSystemUsers();
  };

  const handleTypeChange = async (
    id: number,
    systemUserType: SystemUserType
  ) => {
    const types = Object.values(SystemUserType);
    const idx = types.indexOf(systemUserType);
    const nextType = types[(idx + 1) % types.length];
    const res = await changeType(id, nextType as SystemUserType);
    setToasterData({
      open: true,
      message: res.message,
      severity: res.severity,
    });
    await getSystemUsers();
  };

  const getStatusColor = (status: boolean) => {
    return status
      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
      : "bg-red-100 text-red-800 border-red-200";
  };

  const getTypeColor = (type: SystemUserType) => {
    const colors = {
      [SystemUserType.ADMIN]: "bg-purple-100 text-purple-800 border-purple-200",
      [SystemUserType.STAFF]: "bg-blue-100 text-blue-800 border-blue-200",
    };
    return colors[type] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="animate-pulse">
            <div className="flex justify-between items-center mb-6">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icons.User />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  System Users
                </h2>
                <p className="text-sm text-gray-500">
                  Manage {systemUsers.length} system user
                  {systemUsers.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setEditId(null);
                setShowForm(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
            >
              <Icons.Add />
              Add User
            </button>
          </div>
        </div>

        {/* Filters Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icons.Search />
                </div>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="all">All Types</option>
              {Object.values(SystemUserType).map((type) => (
                <option key={type} value={type}>
                  {type.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Form Card */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <SystemUserForm
              isEdit={Boolean(editId)}
              userId={editId || undefined}
              setShowForm={setShowForm}
              onSuccess={async () => {
                setShowForm(false);
                await getSystemUsers();
              }}
            />
          </div>
        )}

        {/* Users Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-16">
              <Icons.EmptyState />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No users found
              </h3>
              <p className="mt-2 text-gray-500">
                {searchTerm || selectedType !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by adding your first system user"}
              </p>
              {!searchTerm && selectedType === "all" && (
                <button
                  onClick={() => {
                    setEditId(null);
                    setShowForm(true);
                  }}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Icons.Add />
                  Add First User
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <div
                  key={user?.id}
                  className="p-6 hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium">
                          {user?.userName?.charAt(0)?.toUpperCase()}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {user?.userName}
                          </h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <button
                            onClick={() =>
                              handleTypeChange(user?.id, user?.systemUserType)
                            }
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors hover:scale-105 ${getTypeColor(
                              user?.systemUserType
                            )}`}
                          >
                            {user?.systemUserType?.replace("_", " ")}
                          </button>

                          <button
                            onClick={() =>
                              handleStatusChange(user?.id, user?.activeStatus)
                            }
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors hover:scale-105 ${getStatusColor(
                              user?.activeStatus
                            )}`}
                          >
                            {user?.activeStatus ? "Active" : "Inactive"}
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-2">
                          {user?.access?.slice(0, 3).map((access) => (
                            <span
                              key={access}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                            >
                              {access}
                            </span>
                          ))}
                          {user?.access?.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                              +{user.access.length - 3} more
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-gray-500">
                          Created:{" "}
                          {new Date(user?.createdDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(user?.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit User"
                      >
                        <Icons.Edit />
                      </button>

                      {/* {(user?.systemUserType !== SystemUserType.ADMIN) && ( */}
                       
                      <button
                        onClick={() =>
                          setDeleteModal({ isOpen: true, userId: user?.id })
                        }
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete User"
                      >
                        <Icons.Delete />
                      </button>
                      {/* )} */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, userId: null })}
        title="Delete User"
      >
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this user? This action cannot be
          undone.
        </p>
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={() => setDeleteModal({ isOpen: false, userId: null })}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              deleteModal.userId && handleDelete(deleteModal.userId)
            }
            className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
};
