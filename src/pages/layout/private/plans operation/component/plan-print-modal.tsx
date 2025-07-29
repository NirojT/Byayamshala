import { usePlansOperationFormStore } from "../store";

 
 

const PlanModal = () => {
  const { pdf, setPdf } = usePlansOperationFormStore();
  const handleConfirm = async () => {
    if (!pdf) return;
    // Create a URL for the PDF blob
    const pdfUrl = URL.createObjectURL(pdf);

    // Open the PDF in a new tab for printing
    const printWindow = window.open(pdfUrl, "_blank");
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }

    // Optionally clear the PDF from the store after printing
    clearPdf();
  };

  const clearPdf = () => {
    setPdf(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-xl font-semibold text-white mb-4">
          Print the invoice
        </h3>

        <p className="text-gray-300 mb-6">Do you want to Print the invoice </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => clearPdf()}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-[#E26003] text-white rounded-md hover:bg-[#c05403] transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanModal;
