import { useAddSalesReturnFormStore } from "../store";
import { Eye, ShoppingBag, User, Calendar, FileText, DollarSign } from "lucide-react";

const PreviewCard: React.FC = () => {
  const { salesDetail } = useAddSalesReturnFormStore();

  return (
    <div className="xl:col-span-2">
      <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-xl overflow-hidden sticky top-6">
        <div className="p-6">
          <h3 className="text-white text-lg font-medium mb-4 flex items-center border-b border-gray-800 pb-3">
            <Eye className="h-5 w-5 mr-2 text-blue-400" />
            Return Preview
          </h3>

          {!salesDetail ? (
            <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700 text-center">
              <ShoppingBag className="h-12 w-12 mx-auto text-gray-600 mb-3" />
              <p className="text-gray-400 text-sm">
                No sales record found. Enter a bill number and search to view
                sales details.
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              <div className="bg-gray-800/70 rounded-lg p-4 border border-gray-700">
                <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                  Original Sale
                </h4>
                <div className="flex items-center text-white mb-2">
                  <FileText size={14} className="mr-2 text-blue-400" />
                  <span className="font-medium">
                    Bill #{salesDetail?.billNo}
                  </span>
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <Calendar size={14} className="mr-2 text-blue-400" />
                  <span>
                    {salesDetail?.createdNepDate || "No date available"}
                  </span>
                </div>
              </div>

              {salesDetail?.partyName && (
                <div className="bg-gray-800/70 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                    Customer Details
                  </h4>
                  <div className="flex items-center text-white">
                    <User size={14} className="mr-2 text-blue-400" />
                    <span className="font-medium">{salesDetail?.partyName}</span>
                  </div>
                  {salesDetail?.partyType && (
                    <p className="text-gray-400 text-sm mt-1 ml-6">
                      {salesDetail?.partyType}
                    </p>
                  )}
                </div>
              )}

              <div className="bg-gray-800/70 rounded-lg p-4 border border-gray-700">
                <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                  Items For Return
                </h4>
                <div className="space-y-2">
                  {salesDetail?.salesItemsRes &&
                  salesDetail?.salesItemsRes.length > 0 ? (
                    salesDetail?.salesItemsRes.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center border-b border-gray-700 pb-2 last:border-b-0 last:pb-0"
                      >
                        <span className="text-white">
                          {item.itemName || "Unnamed item"}
                        </span>
                        <span className="text-gray-300">
                          {item.quantity} x NPR {item.price?.toFixed(2)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No items available</p>
                  )}
                </div>
              </div>

              <div className="bg-orange-900/30 rounded-lg p-4 border border-orange-800/50">
                <div className="flex justify-between items-center">
                  <h4 className="text-orange-300 font-medium">Total Amount</h4>
                  <div className="flex items-center text-white text-xl font-bold">
                    <DollarSign size={16} className="mr-1 text-orange-300" />
                    <span>
                      NPR{" "}
                      {salesDetail?.totalAmt
                        ? salesDetail?.totalAmt.toFixed(2)
                        : "0.00"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;