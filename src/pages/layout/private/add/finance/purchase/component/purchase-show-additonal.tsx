import { Calendar, FileText, PlusIcon } from "lucide-react";
import { useAddPurchaseFormStore } from "../store";
import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import { defaultNepaliDate } from "@/global/config";

const PurchaseShowAdditonal = () => {
  const { data, setData } = useAddPurchaseFormStore();

  const handleNepaliDateChange = (e: NepaliDate | null) => {
    setData({ ...data, date: (e as NepaliDate)?.toString() });
  };
  // Helper: get displayable image URL
  function getDisplayImage() {
    if (data?.image instanceof File) {
      return URL.createObjectURL(data?.image);
    }
    return data?.imageName;
  }
  return (
    <section aria-labelledby="Additional Details" className="mb-6">
      <h2
        id="additional-details-title"
        className="text-[#1A1A1A] text-sm font-medium mb-4 flex items-center border-b border-gray-100 pb-3"
      >
        <PlusIcon className="mr-2 text-[#E26300] w-4 h-4" />
        Additional Details
      </h2>

      <div className="space-y-5 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0">
        {/* Bill Number */}
        <div className="flex flex-col">
          <label
            htmlFor="billNo"
            className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center"
          >
            Bill No
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E]">
              <FileText size={16} />
            </span>
            <input
              id="billNo"
              type="text"
              className="bg-[#FAFAFA] pl-9 py-2.5 w-full border border-gray-200 rounded-lg text-[#2E2E2E] focus:border-[#E26300] focus:ring-1 focus:ring-[#E26300] focus:outline-none transition-all duration-200"
              value={data.billNo}
              onChange={(e) => setData({ ...data, billNo: e.target.value })}
              placeholder="Enter bill number"
            />
          </div>
        </div>

        {/* Nepali Date Picker */}
        <div className="flex flex-col">
          <label
            htmlFor="date"
            className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center"
          >
            Date
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E]">
              <Calendar size={16} />
            </div>
            <NepaliDatePicker
              value={data?.date || defaultNepaliDate}
              placeholder="Select date"
              onChange={(e) => handleNepaliDateChange(e)}
              className="pl-9 w-full text-sm text-[#2E2E2E] border border-gray-200 py-2.5 
                            rounded-lg bg-[#FAFAFA] focus:outline-none focus:ring-1 focus:ring-[#E26300] focus:border-[#E26300]"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="flex flex-col sm:col-span-2">
          <label
            htmlFor="notes"
            className="text-[#1A1A1A] text-sm font-medium mb-2"
          >
            Notes
          </label>
          <textarea
            id="notes"
            className="bg-[#FAFAFA] p-3 text-[#2E2E2E] text-sm block w-full rounded-lg focus:outline-none border border-gray-200 focus:border-[#E26300] focus:ring-1 focus:ring-[#E26300] resize-none transition-all duration-200"
            rows={3}
            placeholder="Additional notes or comments about this purchase..."
            value={data.notes}
            onChange={(e) => setData({ ...data, notes: e.target.value })}
          />
        </div>
        {/* bill Image */}
        <div className="flex flex-col">
          <label
            htmlFor="billImage"
            className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center"
          >
            Atach Bill Image
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E]">
              <FileText size={16} />
            </span>
            <input
              id="billImage"
              type="file"
              accept="image/*"
              className="bg-[#FAFAFA] pl-9 py-2.5 w-full border border-gray-200 rounded-lg text-[#2E2E2E] focus:border-[#E26300] focus:ring-1 focus:ring-[#E26300] focus:outline-none transition-all duration-200 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[#E26300] file:text-white file:px-4 file:py-2 file:text-sm hover:file:bg-[#D25200]"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  setData({ ...data, image: file });
                }
              }}
            />
          </div>
        </div>
        <div className="">
          <img src={getDisplayImage()} alt="" />
        </div>
      </div>
    </section>
  );
};

export default PurchaseShowAdditonal;
