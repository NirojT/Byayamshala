import React, { useState } from "react";
import {
    FaCalendarAlt,
    FaCheck,
    FaDollarSign,
    FaEdit,
    FaList,
    FaSpinner,
    FaTable,
    FaTags,
    FaTimes,
} from "react-icons/fa";
import { TiInfo } from "react-icons/ti";

import Back from "@/global/components/back/back";
import { OrderStatus } from "@/global/components/enums/enums";
import { defaultNepaliDate } from "@/global/config";
import OrderDetails from "./component/order-details";
import OrderFilter from "./component/order-filters";
import { IOrderDetails } from "./interface";
import { useOrderTableStore } from "./store";

const OrderTable = () => {
  // stores
  const {
    orderDetails,

    filterStatus,
  } = useOrderTableStore();

  // view details states
  const [viewData, setViewData] = useState<null | number>(null);
  const [shouldOpen, setShouldOpen] = useState(false);

  //view details
  const viewClick = (data: IOrderDetails) => {
    if (viewData === data?.id) {
      setShouldOpen(!shouldOpen);
      return;
    }
    setShouldOpen(true);
    setViewData(data?.id);
  };

  const getStatusClass = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PAID:
        return "bg-[#1A1A1A] text-white";
      case OrderStatus.PENDING:
        return "bg-[#E26300] text-white";
      case OrderStatus.CANCELLED:
        return "bg-[#2E2E2E]/80 text-white";
      case OrderStatus.UPDATED:
        return "bg-[#1A1A1A]/70 text-white";
      default:
        return "bg-[#1A1A1A]/20 text-[#2E2E2E]";
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PAID:
        return <FaCheck size={12} className="mr-1" />;
      case OrderStatus.PENDING:
        return <FaSpinner size={12} className="mr-1 animate-spin" />;
      case OrderStatus.CANCELLED:
        return <FaTimes size={12} className="mr-1" />;
      case OrderStatus.UPDATED:
        return <FaEdit size={12} className="mr-1" />;
      default:
        return null;
    }
  };

  // Filter orders based on search term
  const filteredOrders =
    filterStatus !== OrderStatus.ALL
      ? orderDetails?.filter((order) => order?.orderStatus === filterStatus)
      : orderDetails;

  // filter the order based on status

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#2E2E2E] font-poppins">
      {/* Header */}
      <div className="border-b border-[#1A1A1A]/10 p-4 flex justify-between items-center">
        <Back />
        <div className="flex items-center">
          <div>
            <h1 className="text-xl font-bold text-[#1A1A1A]">Order History</h1>
            <div className="flex items-center text-[#2E2E2E]/70 text-sm">
              <span className="flex items-center mr-3">
                <FaCalendarAlt size={12} className="mr-1" />
                {defaultNepaliDate.toString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 bg-[#FAFAFA]">
        <div className="mb-10 ">
          <OrderFilter />
        </div>

        {/* Desktop Table View - Hidden on Mobile */}
        <div className="hidden sm:block overflow-hidden rounded-lg border border-[#1A1A1A]/10 bg-[#FAFAFA]">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#1A1A1A]/10">
              <thead className="bg-[#FAFAFA]">
                <tr>
                  {[
                    "SN",
                    "Table No",
                    "Order Items",
                    "Status",
                    "Total",
                    "Date",
                    "Action",
                  ].map((head) => (
                    <th
                      key={head}
                      className="px-6 py-4 text-left text-xs font-medium text-[#2E2E2E]/70 uppercase tracking-wider"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-[#FAFAFA] divide-y divide-[#1A1A1A]/10">
                {Array.isArray(filteredOrders) && filteredOrders?.length > 0 ? (
                  filteredOrders?.map((order, index) => (
                    <React.Fragment key={order?.id ?? index}>
                      <tr className="hover:bg-[#1A1A1A]/[0.02] transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-8 h-8 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center text-[#1A1A1A] font-medium">
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-[#E26300] mr-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6 3h8a2 2 0 012 2v12l-4-2-4 2-4-2V5a2 2 0 012-2zm2 2v10.59l2-1 2 1V5H8z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="font-medium text-[#1A1A1A]">
                              {order?.tableNames}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap max-w-xs overflow-hidden">
                            {Array.isArray(order?.orderItems) &&
                              order.orderItems.slice(0, 3).map((item, i) => (
                                <span
                                  key={i}
                                  className="inline-block bg-[#1A1A1A]/5 rounded-full px-2 py-1 text-xs font-medium text-[#2E2E2E] mr-1 mb-1"
                                >
                                  {item?.name}
                                </span>
                              ))}
                            {order?.orderItems?.length > 3 && (
                              <span className="inline-block bg-[#1A1A1A]/10 rounded-full px-2 py-1 text-xs font-medium text-[#2E2E2E] mr-1 mb-1">
                                +{order.orderItems.length - 3} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClass(
                              order?.orderStatus
                            )}`}
                          >
                            {getStatusIcon(order?.orderStatus)}
                            {order?.orderStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-bold text-[#E26300]">
                            रु {order?.price}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-[#2E2E2E]/70">
                          <div className="flex flex-col">
                            <span>{order?.createdNepDate}</span>
                            <span className="text-xs">
                              {order?.localTimeZone}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => viewClick(order)}
                            className="p-2 rounded-full bg-[#E26300]/10 hover:bg-[#E26300]/20 text-[#E26300] transition-colors"
                            title="View Details"
                          >
                            <TiInfo size={18} />
                          </button>
                        </td>
                      </tr>
                      {shouldOpen && viewData === order?.id && (
                        <tr className="bg-[#1A1A1A]/[0.01]">
                          <td colSpan={7} className="p-0">
                            <div className="border-t border-[#1A1A1A]/10 bg-[#FAFAFA] py-4 px-6">
                              <OrderDetails order={order} />
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center mb-4">
                          <FaList className="text-[#1A1A1A]/20" size={24} />
                        </div>
                        <p className="text-[#2E2E2E] font-medium mb-1">
                          o orders found
                        </p>
                        <p className="text-[#2E2E2E]/70 text-sm max-w-md">
                          When orders are placed, they will appear here for
                          tracking and management
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="sm:hidden space-y-4">
          {Array.isArray(filteredOrders) && filteredOrders?.length > 0 ? (
            filteredOrders?.map((order, index) => (
              <div
                key={order?.id ?? index}
                className="bg-white rounded-lg border border-[#1A1A1A]/10 overflow-hidden shadow-sm"
              >
                {/* Card Header */}
                <div className="bg-[#FAFAFA] border-b border-[#1A1A1A]/10 px-4 py-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-7 h-7 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center mr-3">
                      <FaTable className="text-[#E26300]" size={14} />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#1A1A1A]">
                        Table {order?.tableNames}
                      </h3>
                      <span className="text-xs text-[#2E2E2E]/70">
                        Order #{order?.id}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClass(
                      order?.orderStatus
                    )}`}
                  >
                    {getStatusIcon(order?.orderStatus)}
                    {order?.orderStatus}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  {/* Order Items Section */}
                  <div className="mb-3">
                    <div className="flex items-center mb-2">
                      <FaTags className="text-[#E26300] mr-2" size={14} />
                      <h4 className="text-sm font-medium text-[#2E2E2E]">
                        Order Items
                      </h4>
                    </div>
                    <div className="flex flex-wrap">
                      {Array.isArray(order?.orderItems) &&
                        order.orderItems.slice(0, 3).map((item, i) => (
                          <span
                            key={i}
                            className="inline-block bg-[#1A1A1A]/5 rounded-full px-2 py-1 text-xs font-medium text-[#2E2E2E] mr-1 mb-1"
                          >
                            {item?.name}
                          </span>
                        ))}
                      {order?.orderItems?.length > 3 && (
                        <span className="inline-block bg-[#1A1A1A]/10 rounded-full px-2 py-1 text-xs font-medium text-[#2E2E2E] mr-1 mb-1">
                          +{order.orderItems.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Order Meta Information */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex items-center mb-1">
                        <FaDollarSign
                          className="text-[#E26300] mr-1"
                          size={12}
                        />
                        <span className="text-xs text-[#2E2E2E]/70">
                          Total Amount
                        </span>
                      </div>
                      <span className="text-base font-bold text-[#E26300]">
                        रु {order?.price}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <FaCalendarAlt
                          className="text-[#E26300] mr-1"
                          size={12}
                        />
                        <span className="text-xs text-[#2E2E2E]/70">
                          Order Date
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {order?.createdNepDate}
                      </span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => viewClick(order)}
                    className={`w-full py-2.5 rounded-lg flex items-center justify-center transition-colors ${
                      shouldOpen && viewData === order?.id
                        ? "bg-[#E26300] text-white"
                        : "bg-[#1A1A1A]/5 text-[#2E2E2E] hover:bg-[#1A1A1A]/10"
                    }`}
                  >
                    {shouldOpen && viewData === order?.id ? (
                      <>
                        <FaTimes size={14} className="mr-2" />
                        Hide Details
                      </>
                    ) : (
                      <>
                        <TiInfo size={18} className="mr-2" />
                        View Details
                      </>
                    )}
                  </button>
                </div>

                {/* Expanded Details */}
                {shouldOpen && viewData === order?.id && (
                  <div className="border-t border-[#1A1A1A]/10 p-4">
                    <OrderDetails order={order} />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg border border-[#1A1A1A]/10 p-8 text-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center mx-auto mb-4">
                <FaList className="text-[#1A1A1A]/20" size={24} />
              </div>
              <p className="text-[#2E2E2E] font-medium mb-1">No orders found</p>
              <p className="text-[#2E2E2E]/70 text-sm">
                When orders are placed, they will appear here for tracking and
                management
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
