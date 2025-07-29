import { OrderStatus, PaymentMode } from "@/global/components/enums/enums";
import { defaultNepaliDate } from "@/global/config";
import { useEffect, useState } from "react";

import {
    FaCalendarAlt,
    FaCheck,
    FaChevronDown,
    FaChevronUp,
    FaClock,
    FaCreditCard,
    FaInfo,
    FaMoneyBill,
    FaPrint,
    FaReceipt,
    FaTable,
    FaTrash,
    FaUser,
    FaUtensils,
} from "react-icons/fa";
import { IOrderDetails } from "../interface";
import { useOrderTableStore } from "../store";
import OrderTaskModal from "./order-task-modal";

const OrderDetails = ({ order }: { order: IOrderDetails }) => {
  const [expandedSection, setExpandedSection] = useState<string>("items");
  const [modalTask, setModalTask] = useState<"print" | "delete" | "pay" | "">(
    ""
  );

  // stores
  const { data, setData } = useOrderTableStore();

  const handlePayment = async () => {
    setModalTask("pay");
  };

  const handleDelete = async () => {
    setModalTask("delete");
  };

  const handlePrint = async () => {
    setModalTask("print");
  };

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? "" : section);
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
        return <FaReceipt className="mr-2" />;
      case OrderStatus.PENDING:
        return <FaInfo className="mr-2" />;
      case OrderStatus.CANCELLED:
        return <FaTrash className="mr-2" />;
      case OrderStatus.UPDATED:
        return <FaInfo className="mr-2" />;
      default:
        return null;
    }
  };

  //manually set the orderId
  useEffect(() => {
    if (!order?.id) return;
    setData({
      ...data,
      orderId: order?.id,
    });
  }, [order?.id]);

  return (
    <div className="w-full border border-[#1A1A1A]/10 rounded-lg overflow-hidden bg-[#FAFAFA]">
      {/* Order Details Header */}
      <div className="bg-[#FAFAFA] px-4 sm:px-6 py-4 border-b border-[#1A1A1A]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center">
          <div className="bg-[#1A1A1A]/5 p-2 rounded-lg mr-3">
            <FaReceipt className="text-[#E26300]" size={16} />
          </div>
          <div>
            <h3 className="text-[#1A1A1A] font-bold">Order Details</h3>
            <p className="text-xs text-[#2E2E2E]/70">
              Order #{order?.id} • {defaultNepaliDate.toString()}
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full inline-flex items-center ${getStatusClass(
            order?.orderStatus
          )}`}
        >
          {getStatusIcon(order?.orderStatus)}
          {order?.orderStatus || "N/A"}
        </span>
      </div>

      {/* Mobile Order Summary Card - Always visible on mobile */}
      <div className="p-4 border-b border-[#1A1A1A]/10 md:hidden">
        <div className="bg-white rounded-lg border border-[#1A1A1A]/10 p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-base font-medium text-[#1A1A1A]">
              Order Summary
            </span>
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded-full inline-flex items-center ${getStatusClass(
                order?.orderStatus
              )}`}
            >
              {getStatusIcon(order?.orderStatus)}
              {order?.orderStatus || "N/A"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-[#FAFAFA] p-2 rounded-md border border-[#1A1A1A]/5">
              <div className="flex items-center mb-1">
                <FaTable className="text-[#E26300] mr-2" size={12} />
                <span className="text-xs text-[#2E2E2E]/70">Table</span>
              </div>
              <p className="text-sm font-medium text-[#1A1A1A]">
                {order?.tableNames || "N/A"}
              </p>
            </div>

            <div className="bg-[#FAFAFA] p-2 rounded-md border border-[#1A1A1A]/5">
              <div className="flex items-center mb-1">
                <FaClock className="text-[#E26300] mr-2" size={12} />
                <span className="text-xs text-[#2E2E2E]/70">Time</span>
              </div>
              <p className="text-sm font-medium text-[#1A1A1A]">
                {order?.localTimeZone || "N/A"}
              </p>
            </div>

            <div className="bg-[#FAFAFA] p-2 rounded-md border border-[#1A1A1A]/5">
              <div className="flex items-center mb-1">
                <FaCalendarAlt className="text-[#E26300] mr-2" size={12} />
                <span className="text-xs text-[#2E2E2E]/70">Date</span>
              </div>
              <p className="text-sm font-medium text-[#1A1A1A]">
                {order?.createdNepDate || "N/A"}
              </p>
            </div>

            <div className="bg-[#FAFAFA] p-2 rounded-md border border-[#1A1A1A]/5">
              <div className="flex items-center mb-1">
                <FaUser className="text-[#E26300] mr-2" size={12} />
                <span className="text-xs text-[#2E2E2E]/70">Items</span>
              </div>
              <p className="text-sm font-medium text-[#1A1A1A]">
                {order?.orderItems?.length || 0} items
              </p>
            </div>
          </div>

          <div className="bg-[#FAFAFA] p-3 rounded-md border border-[#1A1A1A]/5">
            <div className="flex justify-between items-center">
              <p className="text-sm font-bold text-[#1A1A1A]">Total Amount:</p>
              <p className="text-lg font-bold text-[#E26300]">
                {" "}
                रु {order?.price}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Card-based Order Items Section */}
      <div className="md:hidden px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <FaUtensils className="text-[#E26300] mr-2" size={14} />
            <h4 className="text-base font-medium">Order Items</h4>
          </div>
          <button
            onClick={() => toggleSection("items")}
            className="text-[#1A1A1A]/70"
          >
            {expandedSection === "items" ? (
              <FaChevronUp size={14} />
            ) : (
              <FaChevronDown size={14} />
            )}
          </button>
        </div>

        {expandedSection === "items" && (
          <div className="space-y-3 max-h-[320px] overflow-y-auto pb-2">
            {order?.orderItems?.map((item, index) => (
              <div
                key={item?.id || index}
                className="bg-white rounded-lg border border-[#1A1A1A]/10 overflow-hidden shadow-sm"
              >
                <div className="flex items-center bg-[#FAFAFA] px-3 py-2 border-b border-[#1A1A1A]/5">
                  <FaUtensils className="text-[#E26300] mr-2" size={12} />
                  <p className="text-sm font-medium text-[#1A1A1A] capitalize flex-1">
                    {item?.name || "Unknown Item"}
                  </p>
                  <span className="bg-[#E26300]/10 text-[#E26300] text-xs font-medium px-2 py-1 rounded-full">
                    रु {item?.price || 0 * (item?.quantity || 0)}
                  </span>
                </div>

                <div className="p-3 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-[#2E2E2E]/70">Unit Price</p>
                    <p className="text-sm font-medium">रु {item?.price || 0}</p>
                  </div>

                  <div className="bg-[#1A1A1A]/5 h-6 w-px mx-2"></div>

                  <div className="text-center">
                    <p className="text-xs text-[#2E2E2E]/70">Quantity</p>
                    <p className="text-sm font-medium">{item?.quantity || 0}</p>
                  </div>

                  <div className="bg-[#1A1A1A]/5 h-6 w-px mx-2"></div>

                  <div className="text-right">
                    <p className="text-xs text-[#2E2E2E]/70">Status</p>
                    <div className="flex items-center text-green-600">
                      <FaCheck size={10} className="mr-1" />
                      <span className="text-sm font-medium">Added</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {!order?.orderItems ||
              (order?.orderItems?.length === 0 && (
                <div className="bg-white rounded-lg border border-[#1A1A1A]/10 p-6 text-center">
                  <div className="w-12 h-12 mx-auto bg-[#1A1A1A]/5 rounded-full flex items-center justify-center mb-3">
                    <FaUtensils className="text-[#1A1A1A]/30" size={16} />
                  </div>
                  <p className="text-[#2E2E2E] font-medium">
                    No items in this order
                  </p>
                  <p className="text-xs text-[#2E2E2E]/70 mt-1">
                    This order appears to be empty
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Mobile Payment Card */}
      <div className="md:hidden px-4 py-3 border-t border-[#1A1A1A]/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <FaCreditCard className="text-[#E26300] mr-2" size={14} />
            <h4 className="text-base font-medium">Payment</h4>
          </div>
          <button
            onClick={() => toggleSection("payment")}
            className="text-[#1A1A1A]/70"
          >
            {expandedSection === "payment" ? (
              <FaChevronUp size={14} />
            ) : (
              <FaChevronDown size={14} />
            )}
          </button>
        </div>

        {expandedSection === "payment" && (
          <div className="space-y-3">
            <div className="bg-white rounded-lg border border-[#1A1A1A]/10 overflow-hidden shadow-sm">
              <div className="bg-[#FAFAFA] px-3 py-2 border-b border-[#1A1A1A]/5">
                <p className="text-sm font-medium">Payment Details</p>
              </div>

              <div className="p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-[#2E2E2E]">Subtotal:</p>
                  <p className="text-sm font-medium text-[#1A1A1A]">
                    रु {order?.price || 0}
                  </p>
                </div>

                {/* <div className="flex justify-between items-center">
                  <p className="text-sm text-[#2E2E2E]">VAT (13%):</p>
                  <p className="text-sm font-medium text-[#1A1A1A]">
                     रु {(order?.price || 0 * 0.13)}
                  </p>
                </div> */}

                <div className="pt-2 border-t border-[#1A1A1A]/10">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-bold text-[#1A1A1A]">Total:</p>
                    <p className="text-lg font-bold text-[#E26300]">
                      रु {order?.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {order?.orderStatus !== OrderStatus.PAID && (
              <div className="bg-white rounded-lg border border-[#1A1A1A]/10 overflow-hidden shadow-sm">
                <div className="bg-[#FAFAFA] px-3 py-2 border-b border-[#1A1A1A]/5">
                  <p className="text-sm font-medium">Process Payment</p>
                </div>

                <div className="p-3">
                  <label className="block text-xs text-[#2E2E2E]/70 mb-1">
                    Payment Method
                  </label>
                  <select
                    name="paymentMode"
                    value={data?.paymentMode as PaymentMode}
                    onChange={handleChange}
                    className="p-2.5 mb-3 w-full text-[#2E2E2E] focus:outline-none text-sm border rounded-md border-[#1A1A1A]/20 focus:border-[#E26300] transition-colors bg-[#FAFAFA]"
                  >
                    {Object.values(PaymentMode)
                      .filter((mode) => mode !== PaymentMode.PARTIAL_CREDIT)
                      .map((mode) => (
                        <option key={mode} value={mode}>
                          {mode}
                        </option>
                      ))}
                  </select>

                  <button
                    className="w-full bg-[#E26300] text-white px-4 py-3 rounded-lg hover:bg-[#D25800] transition-colors flex items-center justify-center"
                    onClick={handlePayment}
                  >
                    <FaMoneyBill className="mr-2" size={14} />
                    Process Payment
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Actions Card */}
      <div className="md:hidden px-4 py-3 border-t border-[#1A1A1A]/10 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <FaInfo className="text-[#E26300] mr-2" size={14} />
            <h4 className="text-base font-medium">Actions</h4>
          </div>
          <button
            onClick={() => toggleSection("actions")}
            className="text-[#1A1A1A]/70"
          >
            {expandedSection === "actions" ? (
              <FaChevronUp size={14} />
            ) : (
              <FaChevronDown size={14} />
            )}
          </button>
        </div>

        {expandedSection === "actions" && (
          <div className="bg-white rounded-lg border border-[#1A1A1A]/10 overflow-hidden shadow-sm p-3">
            <div className="grid grid-cols-1 gap-2">
              <button
                className="w-full bg-[#2E2E2E] text-white px-4 py-3 rounded-lg hover:bg-[#1A1A1A] transition-colors flex items-center justify-center"
                onClick={handleDelete}
              >
                <FaTrash className="mr-2" size={14} />
                Delete Order
              </button>

              {order?.orderStatus === OrderStatus.PAID && (
                <button
                  className="w-full bg-[#E26300] text-white px-4 py-3 rounded-lg hover:bg-[#D25800] transition-colors flex items-center justify-center"
                  onClick={handlePrint}
                >
                  <FaPrint className="mr-2" size={14} />
                  Print Receipt
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Desktop Layout - Hidden on Mobile */}
      <div className="hidden md:block p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Basic Info */}
          <div className="space-y-4">
            {/* Basic Information */}
            <div className="bg-[#FAFAFA] p-4 rounded-lg border border-[#1A1A1A]/10">
              <h4 className="text-sm font-semibold text-[#2E2E2E] mb-3 border-b border-[#1A1A1A]/10 pb-2">
                Basic Information
              </h4>

              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-[#1A1A1A]/5 p-1.5 rounded mr-3 flex items-center justify-center mt-0.5">
                    <FaTable className="text-[#E26300]" size={12} />
                  </div>
                  <div>
                    <p className="text-xs text-[#2E2E2E]/70">Table Number</p>
                    <p className="text-sm font-medium text-[#1A1A1A]">
                      {order?.tableNames || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#1A1A1A]/5 p-1.5 rounded mr-3 flex items-center justify-center mt-0.5">
                    <FaTable className="text-[#E26300]" size={12} />
                  </div>
                  <div>
                    <p className="text-xs text-[#2E2E2E]/70">Remarks</p>
                    <p className="text-sm font-medium text-[#1A1A1A]">
                      {order?.remarks || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#1A1A1A]/5 p-1.5 rounded mr-3 flex items-center justify-center mt-0.5">
                    <FaCalendarAlt className="text-[#E26300]" size={12} />
                  </div>
                  <div>
                    <p className="text-xs text-[#2E2E2E]/70">Order Date</p>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-[#1A1A1A]">
                        {order?.createdNepDate || "N/A"}
                      </p>
                      <p className="text-xs text-[#2E2E2E]/70">
                        {order?.localTimeZone || ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-[#FAFAFA] p-4 rounded-lg border border-[#1A1A1A]/10">
              <h4 className="text-sm font-semibold text-[#2E2E2E] mb-3 border-b border-[#1A1A1A]/10 pb-2">
                Payment Details
              </h4>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#2E2E2E]">Subtotal:</p>
                  <p className="text-sm font-medium text-[#1A1A1A]">
                    रु {order?.price || 0}
                  </p>
                </div>

                {/* Add tax row if applicable */}
                {/* <div className="flex items-center justify-between">
                  <p className="text-sm text-[#2E2E2E]">VAT (13%):</p>
                  <p className="text-sm font-medium text-[#1A1A1A]">
                    रु {order?.price || 0 * 0.13}
                  </p>
                </div> */}

                <div className="pt-2 border-t border-[#1A1A1A]/10">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-[#1A1A1A]">Total:</p>
                    <p className="text-lg font-bold text-[#E26300]">
                      रु {order?.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle & Right Columns - Order Items & Actions */}
          <div className="space-y-4 md:col-span-2">
            {/* Order Items */}
            <div className="bg-[#FAFAFA] p-4 rounded-lg border border-[#1A1A1A]/10">
              <h4 className="text-sm font-semibold text-[#2E2E2E] mb-3 border-b border-[#1A1A1A]/10 pb-2 flex justify-between">
                <span>Order Items</span>
                <span className="text-xs font-medium text-[#2E2E2E]/70">
                  {order?.orderItems?.length || 0} items
                </span>
              </h4>

              <div className="space-y-2 max-h-[240px] overflow-y-auto pr-2">
                {order?.orderItems?.map((item, index) => (
                  <div
                    key={item?.id || index}
                    className="flex justify-between items-center py-3 px-4 bg-[#FAFAFA] rounded-lg border border-[#1A1A1A]/10 hover:border-[#E26300]/30 transition-colors"
                  >
                    <div className="flex items-center flex-1">
                      <div className="bg-[#1A1A1A]/5 p-1.5 rounded mr-3">
                        <FaUtensils className="text-[#E26300]" size={12} />
                      </div>
                      <p className="text-sm font-medium text-[#1A1A1A] capitalize">
                        {item?.name || "Unknown Item"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 bg-[#1A1A1A]/5 text-[#1A1A1A] text-xs font-medium rounded-full">
                        रु {item?.price || 0}
                      </span>
                      <span className="px-2 py-1 bg-[#1A1A1A]/5 text-[#1A1A1A] text-xs font-medium rounded-full">
                        Qty: {item?.quantity || 0}
                      </span>
                      <span className="px-2 py-1 bg-[#E26300]/10 text-[#E26300] text-xs font-medium rounded-full">
                        रु {item?.price * item?.quantity}
                      </span>
                    </div>
                  </div>
                ))}

                {!order?.orderItems ||
                  (order?.orderItems?.length === 0 && (
                    <div className="py-8 text-center">
                      <div className="w-12 h-12 mx-auto bg-[#1A1A1A]/5 rounded-full flex items-center justify-center mb-3">
                        <FaUtensils className="text-[#1A1A1A]/30" size={20} />
                      </div>
                      <p className="text-[#2E2E2E] font-medium">
                        No items in this order
                      </p>
                      <p className="text-[#2E2E2E]/70 text-sm mt-1">
                        This order appears to be empty
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Payment Actions */}
            {order?.orderStatus !== OrderStatus.PAID && (
              <div className="bg-[#FAFAFA] p-4 rounded-lg border border-[#1A1A1A]/10">
                <h4 className="text-sm font-semibold text-[#2E2E2E] mb-3 border-b border-[#1A1A1A]/10 pb-2 flex items-center">
                  <FaCreditCard className="text-[#E26300] mr-2" size={14} />
                  Process Payment
                </h4>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="w-full sm:w-2/3">
                    <label className="block text-xs text-[#2E2E2E]/70 mb-1">
                      Payment Method
                    </label>
                    <select
                      name="paymentMode"
                      value={data?.paymentMode as PaymentMode}
                      onChange={handleChange}
                      className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors bg-transparent"
                    >
                      {Object.values(PaymentMode)
                        .filter((mode) => mode !== PaymentMode.PARTIAL_CREDIT)
                        .map((mode) => (
                          <option key={mode} value={mode}>
                            {mode}
                          </option>
                        ))}
                    </select>
                  </div>
                  <button
                    className="w-full sm:w-1/3 bg-[#E26300] text-white px-4 py-3 rounded-lg hover:bg-[#D25800] transition-colors flex items-center justify-center"
                    onClick={handlePayment}
                  >
                    <FaMoneyBill className="mr-2" size={14} />
                    Process Payment
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="bg-[#FAFAFA] p-4 rounded-lg border border-[#1A1A1A]/10">
              <h4 className="text-sm font-semibold text-[#2E2E2E] mb-3 border-b border-[#1A1A1A]/10 pb-2">
                Order Actions
              </h4>

              <div className="flex flex-wrap gap-3">
                <button
                  className="flex-1 bg-[#2E2E2E] text-white px-4 py-2.5 rounded-lg hover:bg-[#1A1A1A] transition-colors flex items-center justify-center"
                  onClick={handleDelete}
                >
                  <FaTrash className="mr-2" size={14} />
                  Delete Order
                </button>

                {order?.orderStatus === OrderStatus.PAID && (
                  <button
                    className="flex-1 bg-[#E26300] text-white px-4 py-2.5 rounded-lg hover:bg-[#D25800] transition-colors flex items-center justify-center"
                    onClick={handlePrint}
                  >
                    <FaPrint className="mr-2" size={14} />
                    Print Receipt
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalTask && (
        <OrderTaskModal
          order={order}
          modalTask={modalTask}
          setModalTask={setModalTask}
        />
      )}
    </div>
  );
};

export default OrderDetails;
