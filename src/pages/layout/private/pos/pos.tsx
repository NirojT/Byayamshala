import   { useState, useRef } from "react";
import { Printer, PlusCircle, Trash2, X, CheckCircle2 } from "lucide-react";

// Dummy stock and payment data
const stockItems = [
  { id: 1, name: "neckless", price: 30 },
  { id: 2, name: "ring", price: 20 },
  { id: 3, name: "Bra", price: 40 },
  { id: 4, name: "leggings", price: 15 },
];

const paymentModes = ["CASH", "CARD", "ESWA", "COMPLEMENTARY", "BANK"];

const formatCurrency = (num: number) => "₹" + num.toFixed(2);

export default function POSBilling() {
  const [selectedItem, setSelectedItem] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number>(1);
  const [paymentMode, setPaymentMode] = useState<string>("CASH");
  const [remarks, setRemarks] = useState("");
  const [billItems, setBillItems] = useState<
    {
      id: number;
      itemId: number;
      name: string;
      price: number;
      quantity: number;
    }[]
  >([]);
  const [showPrint, setShowPrint] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const itemSelectRef = useRef<HTMLSelectElement>(null);

  // Add item to bill logic
  const handleAdd = () => {
    setError(null);
    if (!selectedItem || quantity < 1) {
      setError("Choose an item and quantity.");
      return;
    }
    // Prevent duplicate
    if (billItems.some((i) => i.itemId === selectedItem)) {
      setError("This item is already added.");
      return;
    }
    const item = stockItems.find((s) => s.id === selectedItem);
    if (!item) return;
    setBillItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        itemId: item.id,
        name: item.name,
        price: item.price,
        quantity,
      },
    ]);
    setSelectedItem("");
    setQuantity(1);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1000);
    setTimeout(() => itemSelectRef.current?.focus(), 100); // Focus back to dropdown
  };

  const handleDeleteItem = (id: number) => {
    setBillItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Bill total
  const total = billItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Print simulation
  const handlePrint = () => setShowPrint(true);
  const handleClosePrint = () => setShowPrint(false);

  return (
    <div className="max-w-6xl mx-auto my-10 p-2 sm:p-6 bg-gradient-to-tr from-blue-50 via-white to-green-50 shadow-2xl rounded-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 px-6 pt-8 pb-2 border-b border-blue-100">
        <h2 className="text-3xl font-extrabold text-blue-800 tracking-tight flex-1">
          POS Billing
        </h2>
        <div className="text-sm bg-blue-100 text-blue-700 rounded-full px-4 py-1 font-semibold shadow">
          {new Date().toLocaleDateString()}{" "}
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {/* Main content with Form (Left) & Table (Right) */}
      <div className="flex flex-col lg:flex-row gap-8 py-8">
        {/* Form */}
        <div className="flex-1 min-w-[290px] max-w-lg mx-auto lg:mx-0 bg-white bg-opacity-90 rounded-2xl shadow-lg border border-blue-100 px-6 py-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-blue-700 mb-4">Add Item</h3>
            <div className="grid grid-cols-1 gap-4">
              {/* Item */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Stock Item <span className="text-red-500">*</span>
                </label>
                <select
                  ref={itemSelectRef}
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-blue-400 bg-white ${
                    error && !selectedItem ? "border-red-400" : ""
                  }`}
                  value={selectedItem}
                  onChange={(e) =>
                    setSelectedItem(Number(e.target.value) || "")
                  }
                >
                  <option value="">Select item</option>
                  {stockItems.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                      disabled={billItems.some((i) => i.itemId === item.id)}
                    >
                      {item.name} ({formatCurrency(item.price)})
                      {billItems.some((i) => i.itemId === item.id)
                        ? " (Added)"
                        : ""}
                    </option>
                  ))}
                </select>
              </div>
              {/* Quantity */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={1}
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-blue-400 ${
                    error && quantity < 1 ? "border-red-400" : ""
                  }`}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value)))
                  }
                />
              </div>
              {/* Add */}
              <div>
                <button
                  className={`w-full bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 shadow transition disabled:opacity-60 hover:from-blue-700 hover:to-green-600`}
                  onClick={handleAdd}
                  disabled={!selectedItem || quantity < 1}
                  type="button"
                >
                  <PlusCircle size={20} /> Add to Bill
                </button>
              </div>
            </div>
            {/* Feedback */}
            <div className="min-h-[24px] mt-2">
              {error && (
                <div className="text-red-600 bg-red-100 rounded px-3 py-1 text-sm flex items-center gap-2">
                  <X size={16} /> {error}
                </div>
              )}
              {success && (
                <div className="text-green-700 bg-green-100 rounded px-3 py-1 text-sm flex items-center gap-2">
                  <CheckCircle2 size={16} /> Item added!
                </div>
              )}
            </div>
          </div>
          {/* Payment Mode and Remarks */}
          <div className="grid grid-cols-1 gap-4 mt-8">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Payment Mode <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:outline-blue-400 bg-white"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
              >
                {paymentModes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Remarks
              </label>
              <input
                className="w-full border rounded-lg px-3 py-2 focus:outline-blue-400"
                placeholder="Enter any remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
          </div>
          {/* Print */}
          <div className="mt-8">
            <button
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-3 rounded-xl font-bold text-xl flex justify-center items-center gap-2 shadow-lg hover:from-green-700 hover:to-blue-700 transition"
              onClick={handlePrint}
              disabled={billItems.length === 0}
            >
              <Printer size={22} /> Print Bill
            </button>
          </div>
        </div>

        {/* Bill Table */}
        <div className="flex-1 min-w-[320px] max-w-2xl mx-auto lg:mx-0 bg-white bg-opacity-90 rounded-2xl shadow-lg border border-blue-100 px-3 py-6">
          <h3 className="text-xl font-bold mb-4 text-blue-800">Bill Details</h3>
          <div className="overflow-x-auto rounded-lg border border-blue-100 bg-white shadow">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-blue-100 to-green-100 text-blue-900">
                  <th className="py-2 px-3 text-left">Item</th>
                  <th className="py-2 px-3 text-center">Qty</th>
                  <th className="py-2 px-3 text-right">Price</th>
                  <th className="py-2 px-3 text-right">Subtotal</th>
                  <th className="py-2 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {billItems.length === 0 ? (
                  <tr>
                    <td
                      className="py-6 px-3 text-center text-gray-400"
                      colSpan={5}
                    >
                      No items added yet.
                    </td>
                  </tr>
                ) : (
                  billItems.map((item) => (
                    <tr key={item.id} className="hover:bg-blue-50 transition">
                      <td className="py-2 px-3 font-medium">{item.name}</td>
                      <td className="py-2 px-3 text-center">{item.quantity}</td>
                      <td className="py-2 px-3 text-right">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="py-2 px-3 text-right font-semibold">
                        {formatCurrency(item.price * item.quantity)}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <button
                          className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
                          onClick={() => handleDeleteItem(item.id)}
                          title="Remove"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
                {billItems.length > 0 && (
                  <tr className="bg-gradient-to-r from-blue-100 to-green-100 font-bold">
                    <td className="py-2 px-3 text-right" colSpan={3}>
                      Total
                    </td>
                    <td className="py-2 px-3 text-right">
                      {formatCurrency(total)}
                    </td>
                    <td />
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Print Preview Modal */}
      {showPrint && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative border-2 border-blue-200 animate-fadeIn">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={handleClosePrint}
            >
              <X size={22} />
            </button>
            <h3 className="text-2xl font-extrabold mb-5 text-blue-700 text-center tracking-wide">
              Print Preview
            </h3>
            <div className="mb-2 text-xs text-gray-500">
              <div>
                <b>Date:</b> {new Date().toLocaleString()}
              </div>
              <div>
                <b>Payment Mode:</b> {paymentMode}
              </div>
              {remarks && (
                <div>
                  <b>Remarks:</b> {remarks}
                </div>
              )}
            </div>
            <table className="w-full mb-4 text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-1 text-left">Item</th>
                  <th className="py-1 text-center">Qty</th>
                  <th className="py-1 text-right">Price</th>
                  <th className="py-1 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {billItems.map((item) => (
                  <tr key={item.id}>
                    <td className="py-1">{item.name}</td>
                    <td className="py-1 text-center">{item.quantity}</td>
                    <td className="py-1 text-right">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="py-1 text-right">
                      {formatCurrency(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
                <tr className="border-t font-bold">
                  <td colSpan={3} className="text-right py-1">
                    Total
                  </td>
                  <td className="text-right py-1">{formatCurrency(total)}</td>
                </tr>
              </tbody>
            </table>
            <div className="text-center text-lg text-green-700 font-bold mt-4">
              Thank you for your purchase!
            </div>
          </div>
        </div>
      )}

      {/* Fade animation */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s;
        }
        @keyframes fadeIn {
          0% {transform: scale(0.94) translateY(40px); opacity: 0}
          100% {transform: scale(1) translateY(0); opacity: 1}
        }
      `}</style>
    </div>
  );
}
