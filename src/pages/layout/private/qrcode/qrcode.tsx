import { useGlobalStore } from "@/global/store";
import BulkQrSend from "./component/bulk-qr-send";
import QrMemberDetails from "./component/qr-member-details";
import { ScanAnimation } from "./component/scan-animation";
import { useQRStore } from "./store";
import { Html5Qrcode } from "html5-qrcode";
import React, { useEffect, useRef } from "react";

// The Modal Scanner
const QrScannerModal: React.FC<{
  onScan: (result: string) => void;
  onClose: () => void;
  loading: boolean;
}> = ({ onScan, onClose }) => {
  const qrRegionId = "qr-reader-region";
  const html5QrcodeScannerRef = useRef<Html5Qrcode | null>(null);
  const scannerRunningRef = useRef(false);

  useEffect(() => {
    const qrCodeScanner = new Html5Qrcode(qrRegionId);
    html5QrcodeScannerRef.current = qrCodeScanner;
    scannerRunningRef.current = false;

    qrCodeScanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          if (!scannerRunningRef.current) return; // Prevent double scan
          scannerRunningRef.current = false;
          onScan(decodedText);
          qrCodeScanner
            .stop()
            .then(() => {
              try {
                qrCodeScanner.clear();
              } catch {
                console.log("Error clearing QR code scanner");
              }
            })
            .catch(() => {
              try {
                qrCodeScanner.clear();
              } catch {
                console.log("Error clearing QR code scanner");
              }
            });
        },
        () => {}
      )
      .then(() => {
        scannerRunningRef.current = true;
      })
      .catch(() => {
        // Could not start video
      });

    return () => {
      if (html5QrcodeScannerRef.current && scannerRunningRef.current) {
        html5QrcodeScannerRef.current
          .stop()
          .then(() => {
            scannerRunningRef.current = false;
            try {
              html5QrcodeScannerRef.current?.clear();
            } catch {
              console.log("Error clearing QR code scanner");
            }
          })
          .catch(() => {
            scannerRunningRef.current = false;
            try {
              html5QrcodeScannerRef.current?.clear();
            } catch {
              console.log("Error clearing QR code scanner");
            }
          });
      } else if (html5QrcodeScannerRef.current) {
        try {
          html5QrcodeScannerRef.current?.clear();
        } catch {
          console.log("Error clearing QR code scanner");
        }
      }
    };
    // eslint-disable-next-line
  }, [onScan]);

  const handleClose = () => {
    if (html5QrcodeScannerRef.current && scannerRunningRef.current) {
      html5QrcodeScannerRef.current
        .stop()
        .then(() => {
          scannerRunningRef.current = false;
          try {
            html5QrcodeScannerRef.current?.clear();
          } catch {
            console.log("Error clearing QR code scanner");
          }
          onClose();
        })
        .catch(() => {
          scannerRunningRef.current = false;
          try {
            html5QrcodeScannerRef.current?.clear();
          } catch { console.log("Error clearing QR code scanner")}
          const el = document.getElementById(qrRegionId);
          if (el) el.innerHTML = "";
          onClose();
         ;
        });
    } else {
      try {
        html5QrcodeScannerRef.current?.clear();
      } catch {
        console.log("Error clearing QR code scanner");
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-7 w-11/12 max-w-sm relative flex flex-col items-center border-4 border-blue-300">
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-3xl font-bold"
          onClick={handleClose}
          aria-label="Close"
        >
          ×
        </button>
        <h3 className="text-lg font-semibold mb-3 text-center text-blue-700">
          Scan QR Code
        </h3>
        <div className="relative w-64 max-w-full aspect-square rounded-xl overflow-hidden border-4 border-blue-500 shadow-lg mb-2">
          <div id={qrRegionId} style={{ width: "100%", height: "100%" }} />
          <ScanAnimation />
        </div>
        <p className="text-xs text-gray-600 mt-2">
          Hold the QR code steady inside the frame.
        </p>
        <button
          className="mt-5 w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold"
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// Main QR page
const QRCode: React.FC = () => {
  const { setToasterData } = useGlobalStore();
  const {
    qrScan,
    scanning,
    setScanning,
    scanResult,
    clearScanResult,
    bulkSending,
    bulkStatus,
    scanLoading,
    setScanLoading,
    showBulkModal,
    setShowBulkModal,
  } = useQRStore();

  // Handle the QR scan and call backend
  const handleScan = async (resultText: string) => {
    setScanLoading(true);
    setScanning(false);
    clearScanResult();

    const id = Number(resultText);
    if (isNaN(id)) {
      setToasterData({
        severity: "error",
        message: "Invalid QR code format.",
        open: true,
      });
      setScanLoading(false);
      return;
    }

    const response = await qrScan(id);
    if (response?.severity === "success") {
      setToasterData({
        severity: "success",
        message: response?.message || "Attendance marked!",
        open: true,
      });
    } else {
      setToasterData({
        severity: "error",
        message: response?.message || "Failed to mark attendance.",
        open: true,
      });
    }
    setScanLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 space-y-8 border border-blue-100 relative">
        <header className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-200 via-green-100 to-blue-50 flex items-center justify-center mb-2 shadow">
            <svg
              className="w-10 h-10 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <rect
                x="3"
                y="3"
                width="7"
                height="7"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
                fill="white"
              />
              <rect
                x="14"
                y="3"
                width="7"
                height="7"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
                fill="white"
              />
              <rect
                x="3"
                y="14"
                width="7"
                height="7"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
                fill="white"
              />
              <rect
                x="14"
                y="14"
                width="7"
                height="7"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
                fill="white"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-1 tracking-tight">
            QR Code Attendance
          </h2>
          <p className="text-center text-gray-500 mb-2 text-sm">
            Scan a member's QR code with your device <br /> or send codes in
            bulk to all members’ emails.
          </p>
        </header>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-500 transition focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            onClick={() => {
              setScanning(true);
              clearScanResult();
            }}
            disabled={scanLoading}
          >
            {scanning ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Scanning...
              </span>
            ) : (
              <span>
                <svg
                  className="inline-block w-6 h-6 mr-2 -mt-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="3" width="7" height="7" rx="2" />
                  <rect x="14" y="3" width="7" height="7" rx="2" />
                  <rect x="3" y="14" width="7" height="7" rx="2" />
                  <rect x="14" y="14" width="7" height="7" rx="2" />
                </svg>
                Start Scan
              </span>
            )}
          </button>
          <button
            className="flex-1 py-3 px-4 bg-gradient-to-r from-green-600 to-green-400 text-white font-semibold rounded-lg shadow-md hover:from-green-700 hover:to-green-500 transition disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
            onClick={() => setShowBulkModal(true)}
            disabled={bulkSending}
          >
            {bulkSending ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Sending...
              </span>
            ) : (
              <span>
                <svg
                  className="inline-block w-6 h-6 mr-2 -mt-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Bulk Send QR Codes
              </span>
            )}
          </button>
        </div>

        {bulkStatus && (
          <div
            className={`text-center text-base rounded py-2 px-3 mt-2 font-medium ${
              bulkStatus.startsWith("Bulk")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {bulkStatus}
          </div>
        )}

        {scanning && (
          <QrScannerModal
            onScan={handleScan}
            onClose={() => {
              setScanning(false);
              clearScanResult();
            }}
            loading={scanLoading}
          />
        )}

        {/* Bulk Email Confirmation Modal */}
        {showBulkModal && <BulkQrSend />}

        {/* Show scanned member details only if there is a result */}
        {scanResult && !scanLoading && <QrMemberDetails />}

        {scanLoading && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mt-4 text-center shadow flex flex-col items-center">
            <span className="animate-spin h-8 w-8 border-4 border-blue-400 border-t-transparent rounded-full mb-3" />
            <div className="text-blue-700 font-semibold mb-2 text-lg">
              Processing scan...
            </div>
          </div>
        )}
      </div>
      <footer className="mt-10 text-xs text-gray-400 text-center">
        &copy; {new Date().getFullYear()} Gym Management
      </footer>
    </div>
  );
};

export default QRCode;
