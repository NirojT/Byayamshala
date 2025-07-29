import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useItemFormStore } from "../../form/store";
import UpdateInventoryForm from "../../form/update/update-inventory";
import { IItemDetails } from "../../list/interface";
import ItemDeleteModal from "./component/item-delete-modal";

const InventoryDetails = () => {
  const { updateData, getItem, openDelete, setOpenDelete } = useItemFormStore();
  const item: IItemDetails = useLocation().state;

  const [open, setOpen] = useState(false);

  // Calculate profit percentage
  const profitPercentage = updateData?.cp
    ? (((updateData?.sp - updateData?.cp) / updateData?.cp) * 100)?.toFixed(2)
    : "0.00";
  //for popup
  const handleDelete = async () => {
    setOpenDelete(true);
  };
  useEffect(() => {
    getItem(item?.id);
  }, [getItem, item?.id]);

  return (
    <div className="font-poppins p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border rounded-lg shadow-sm p-6">
          {/* Header Section */}
          <div className="border-b border-gray-200 pb-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-[#1A1A1A] capitalize">
              {updateData?.name}
            </h1>

            <div className="flex items-center">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {updateData?.category}
              </span>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => handleDelete()}
                className="p-2 rounded-full hover:bg-red-100 transition-colors duration-200"
                title="Delete Item"
              >
                <MdDeleteOutline size={22} color="#e53e3e" />
              </button>
              <button
                className="p-2 rounded-full hover:bg-green-100 transition-colors duration-200"
                title="Edit Item"
                onClick={() => setOpen(true)}
              >
                <FaRegEdit size={20} color="#38a169" />
              </button>
            </div>
          </div>

          {/* Pricing and Stock Information Section */}
          <div className="mt-6">
            <h2 className="text-sm uppercase font-medium text-gray-600 tracking-wider mb-4">
              Item Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left column */}
              <div className="flex flex-col gap-4 p-4 bg-slate-50 rounded-md">
                <h3 className="text-sm font-medium text-gray-500">Pricing</h3>

                <div>
                  <label className="text-xs text-gray-500">Selling Price</label>
                  <p className="text-lg font-semibold text-gray-800">
                    रु {(updateData?.sp ?? 0)?.toFixed(2)}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500">
                    Purchase Price
                  </label>
                  <p className="text-lg font-semibold text-gray-800">
                    रु {(updateData?.cp ?? 0)?.toFixed(2)}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500">Profit Margin</label>
                  <p
                    className={`text-lg font-semibold ${
                      profitPercentage?.startsWith("-")
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {profitPercentage}%
                  </p>
                </div>
              </div>

              {/* Middle column */}
              <div className="flex flex-col gap-4 p-4 bg-slate-50 rounded-md">
                <h3 className="text-sm font-medium text-gray-500">Inventory</h3>

                <div>
                  <label className="text-xs text-gray-500">Current Stock</label>
                  <div className="mt-1 flex items-center">
                    <span
                      className={`text-xl font-bold ${
                        updateData?.stockQuantity <= 5
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {updateData?.stockQuantity}
                    </span>
                    <span className="ml-2 text-gray-500">
                      {updateData?.primaryUnit}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500">Stock Status</label>
                  <p
                    className={`text-sm font-medium ${
                      updateData?.stockQuantity <= 5
                        ? "text-red-500"
                        : updateData?.stockQuantity <= 10
                        ? "text-yellow-500"
                        : "text-green-600"
                    }`}
                  >
                    {updateData?.stockQuantity <= 5
                      ? "Low Stock"
                      : updateData?.stockQuantity <= 10
                      ? "Medium Stock"
                      : "In Stock"}
                  </p>
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-4 p-4 bg-slate-50 rounded-md">
                <h3 className="text-sm font-medium text-gray-500">
                  Record Details
                </h3>

                <div>
                  <label className="text-xs text-gray-500">Created At</label>
                  <p className="text-sm text-gray-700">
                    {updateData?.createdDate
                      ? new Date(updateData?.createdDate).toLocaleString()
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500">Last Updated</label>
                  <p className="text-sm text-gray-700">
                    {updateData?.lastModifiedDate
                      ? updateData?.lastModifiedDate
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openDelete && <ItemDeleteModal />}
      {open && <UpdateInventoryForm open={open} setOpen={setOpen} />}
    </div>
  );
};

export default InventoryDetails;
