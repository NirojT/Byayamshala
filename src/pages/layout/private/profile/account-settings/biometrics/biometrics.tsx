






import { useEffect, useState } from "react";
import {
  PlusCircle,
  Trash2,
  Cpu,
  ChevronDown,
  ChevronUp,
  Pencil,
  MapPin,
  BadgeInfo,
  ShieldCheck,
  Wifi,
 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import BiometricsDeleteModal from "./component/biometrics-delete-modal";
import Back from "@/global/components/back/back";
import { useBiometricsStore } from "./store";
import { IBiometricsDetails } from "./interface";

// Custom Toggle Component
const Toggle = ({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}) => {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        checked ? "bg-blue-600" : "bg-gray-300"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
};

const Biometrics = () => {
  const navigate = useNavigate();
  const {
    getBiometrics,
    biometrics,
    openDelete,
    setOpenDelete,
    setDeleteId,
    deleteId,
    doorAccessLogic,
    getUsersCommnads,
  } = useBiometricsStore();

  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [toggleLoading, setToggleLoading] = useState<{
    [key: string]: boolean;
  }>({});
  const [feedback, setFeedback] = useState<{
    [key: string]: { message: string; severity: string } | null;
  }>({});

  // Hold toggle states per device
  const [toggleStates, setToggleStates] = useState<{
    [key: string]: { allowAutoDoorLock: boolean; blockShiftAccess: boolean };
  }>({});

  useEffect(() => {
    getBiometrics();
    // eslint-disable-next-line
  }, []);

  // Sync toggleStates with biometrics when they change
  useEffect(() => {
    if (biometrics && biometrics.length > 0) {
      const newStates: any = {};
      biometrics.forEach((device: IBiometricsDetails) => {
        newStates[device.id] = {
          allowAutoDoorLock: device?.allowAutoDoorLock ?? false,
          blockShiftAccess: device?.blockShiftAccess ?? false,
        };
      });
      setToggleStates(newStates);
    }
  }, [biometrics]);

  const handleAddDevice = () => {
    navigate("/tenant/biometrics/form");
  };

  const handleEdit = (device: IBiometricsDetails) => {
    navigate(`/tenant/biometrics/form`, { state: device });
  };

  const handleDelete = async (deviceId: number) => {
    setOpenDelete(true);
    setDeleteId(deviceId);
  };

 const handleExpand = (device: IBiometricsDetails) => {
   handleNavigateCommands(device);
   const deviceId = device?.id;
   setExpanded((prev) => ({
     ...prev,
     [deviceId]: !prev[deviceId],
   }));
 };

    const handleNavigateCommands = (device: IBiometricsDetails) => {
      navigate(`/tenant/biometrics/commands`, {
        state: { device },
      });
    };

  // Handle toggle changes and call API
  const handleToggle = async (
    deviceId: number,
    field: "allowAutoDoorLock" | "blockShiftAccess",
    value: boolean
  ) => {
    // Get current state
    const prevState = toggleStates[deviceId] || {
      allowAutoDoorLock: false,
      blockShiftAccess: false,
    };
    const newState = { ...prevState, [field]: value };

    // Optimistically update UI
    setToggleStates((prev) => ({
      ...prev,
      [deviceId]: newState,
    }));
    setToggleLoading((prev) => ({ ...prev, [deviceId]: true }));

    try {
      // Call API
      const res = await doorAccessLogic(
        deviceId,
        newState.allowAutoDoorLock,
        newState.blockShiftAccess
      );

      setFeedback((prev) => ({ ...prev, [deviceId]: res }));
      setTimeout(
        () => setFeedback((prev) => ({ ...prev, [deviceId]: null })),
        3500
      );

      // If API call failed, revert the toggle state
      if (res.severity === "error") {
        setToggleStates((prev) => ({
          ...prev,
          [deviceId]: prevState,
        }));
      }
    } catch (error: any) {
      console.log(error);
      // Revert toggle state on error
      setToggleStates((prev) => ({
        ...prev,
        [deviceId]: prevState,
      }));
      setFeedback((prev) => ({
        ...prev,
        [deviceId]: { message: "Failed to update settings", severity: "error" },
      }));
      setTimeout(
        () => setFeedback((prev) => ({ ...prev, [deviceId]: null })),
        3500
      );
    } finally {
      setToggleLoading((prev) => ({ ...prev, [deviceId]: false }));
    }
  };

  return (
    <div className="min-h-screen py-8 px-2 bg-gradient-to-br from-blue-50 via-indigo-50 to-pink-50 text-[#2E2E2E] font-poppins">
      <Back />
      {/* Top Bar */}
      <div className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="flex items-center gap-3 select-none bg-white rounded-xl shadow px-4 py-2 border border-blue-100 text-2xl sm:text-3xl font-bold w-full sm:w-auto justify-center sm:justify-start">
          <Cpu className="text-blue-600" size={28} />
          Biometric Devices
        </h1>
        <button
          onClick={handleAddDevice}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold text-base shadow-lg hover:from-indigo-500 hover:to-blue-600 transition"
        >
          <PlusCircle size={20} /> Add Device
        </button>
      </div>

      {/* Device Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {biometrics?.length === 0 && (
          <div className="col-span-full text-gray-400 text-center py-20 text-lg">
            <span>No biometric devices found.</span>
          </div>
        )}
        {biometrics?.map((device) => {
          const isExpanded = expanded[device?.id];
          const toggles = toggleStates[device.id] || {
            allowAutoDoorLock: false,
            blockShiftAccess: false,
          };
          const isToggleLoading = toggleLoading[device.id] || false;

          return (
            <div
              key={device?.id}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 flex flex-col relative group transition hover:shadow-2xl hover:-translate-y-1"
              style={{ minHeight: 260 }}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-3 gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <Cpu className="text-blue-600 drop-shadow" size={20} />
                  <h2 className="font-bold text-lg text-[#1A1A1A] truncate max-w-[130px] sm:max-w-[170px]"
                  onClick={async() =>await getUsersCommnads(device?.deviceSN)}
                  >
                    {device?.deviceName}
                  </h2>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(device)}
                    title="Edit Device"
                    className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition shadow hover:shadow-md"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(device?.id)}
                    title="Delete Device"
                    className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition shadow hover:shadow-md"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              {/* Device Info */}
              <div className="grid grid-cols-1 gap-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <BadgeInfo size={14} className="text-indigo-500" />
                  SN: <span className="font-mono">{device?.deviceSN}</span>
                </div>
                {device?.brand && (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <ShieldCheck size={14} className="text-green-600" />
                    Brand: <span>{device?.brand}</span>
                  </div>
                )}
                {device?.deviceModel && (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <BadgeInfo size={14} />
                    Model: <span>{device?.deviceModel}</span>
                  </div>
                )}
                {device?.deviceType && (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <BadgeInfo size={14} />
                    Type: <span>{device?.deviceType}</span>
                  </div>
                )}
                {device?.locationDescription && (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <MapPin size={14} className="text-pink-500" />
                    Location: <span>{device?.locationDescription}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Wifi size={14} className="text-blue-400" />
                  Status:{" "}
                  <span
                    className={
                      device?.status === "ACTIVE"
                        ? "text-green-600 font-semibold"
                        : "text-orange-600 font-semibold"
                    }
                  >
                    {device?.status}
                  </span>
                </div>

                {/* Toggle Switches */}
                <div className="flex flex-col gap-3 p-4 rounded-xl bg-white/60 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Auto Door Lock
                    </span>
                    <Toggle
                      checked={toggles.allowAutoDoorLock}
                      onChange={(checked) =>
                        handleToggle(device.id, "allowAutoDoorLock", checked)
                      }
                      disabled={isToggleLoading}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Block Shift Access
                    </span>
                    <Toggle
                      checked={toggles.blockShiftAccess}
                      onChange={(checked) =>
                        handleToggle(device.id, "blockShiftAccess", checked)
                      }
                      disabled={isToggleLoading}
                    />
                  </div>
                  {isToggleLoading && (
                    <div className="text-xs text-blue-600 text-center">
                      Updating settings...
                    </div>
                  )}
                </div>
                {/* Toggle Switch end */}
              </div>

              {/* Feedback message */}
              {feedback[device.id] && (
                <div
                  className={`rounded-lg px-3 py-2 text-xs font-medium mb-2 shadow transition-all ${
                    feedback[device.id]?.severity === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {feedback[device.id]?.message}
                </div>
              )}
              {/* Expand for more info */}
              <div className="mt-auto flex justify-end">
                <button
                  className="flex items-center gap-1 text-blue-600 hover:underline text-sm font-semibold transition"
                  onClick={() => handleExpand(device)}
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp size={14} /> Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown size={14} /> View More
                    </>
                  )}
                </button>
              </div>
              {isExpanded && (
                <div className="rounded-lg bg-blue-50 border border-blue-100 shadow-inner mt-2 mb-1 px-2 py-2 transition-all animate-fadeIn text-xs">
                  <div>Cloud Server URL: {device?.cloudServerUrl || "N/A"}</div>
                  <div>
                    Last Heartbeat:{" "}
                    {device?.lastHeartbeatAt
                      ? new Date(device.lastHeartbeatAt).toLocaleString()
                      : "Never"}
                  </div>
                  <div>
                    Registered:{" "}
                    {device?.createdAt
                      ? new Date(device.createdAt).toLocaleString()
                      : "N/A"}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {openDelete && deleteId && <BiometricsDeleteModal />}
    </div>
  );
};

export default Biometrics;



























// with door unlock ********************************

// import { useEffect, useState } from "react";
// import {
//   PlusCircle,
//   Trash2,
//   Cpu,
//   ChevronDown,
//   ChevronUp,
//   Pencil,
//   MapPin,
//   BadgeInfo,
//   ShieldCheck,
//   Wifi,
//   Unlock,
//   List,
  
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import BiometricsDeleteModal from "./component/biometrics-delete-modal";
// import Back from "@/global/components/back/back";
// import { useBiometricsStore } from "./store";
// import { IBiometricsDetails } from "./interface";

// // Custom Toggle Component
// const Toggle = ({
//   checked,
//   onChange,
//   disabled = false,
// }: {
//   checked: boolean;
//   onChange: (checked: boolean) => void;
//   disabled?: boolean;
// }) => {
//   return (
//     <button
//       type="button"
//       onClick={() => !disabled && onChange(!checked)}
//       disabled={disabled}
//       className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
//         checked ? "bg-blue-600" : "bg-gray-300"
//       } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
//     >
//       <span
//         className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
//           checked ? "translate-x-5" : "translate-x-0.5"
//         }`}
//       />
//     </button>
//   );
// };

// const Biometrics = () => {
//   const navigate = useNavigate();
//   const {
//     getBiometrics,
//     biometrics,
//     openDelete,
//     setOpenDelete,
//     setDeleteId,
//     deleteId,
//     doorUnlock,
//     doorAccessLogic,
//   } = useBiometricsStore();

//   const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
//   const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
//   const [toggleLoading, setToggleLoading] = useState<{
//     [key: string]: boolean;
//   }>({});
//   const [feedback, setFeedback] = useState<{
//     [key: string]: { message: string; severity: string } | null;
//   }>({});

//   // Hold toggle states per device
//   const [toggleStates, setToggleStates] = useState<{
//     [key: string]: { allowAutoDoorLock: boolean; blockShiftAccess: boolean };
//   }>({});

//   useEffect(() => {
//     getBiometrics();
//     // eslint-disable-next-line
//   }, []);

//   // Sync toggleStates with biometrics when they change
//   useEffect(() => {
//     if (biometrics && biometrics.length > 0) {
//       const newStates: any = {};
//       biometrics.forEach((device: IBiometricsDetails) => {
//         newStates[device.id] = {
//           allowAutoDoorLock: device?.allowAutoDoorLock ?? false,
//           blockShiftAccess: device?.blockShiftAccess ?? false,
//         };
//       });
//       setToggleStates(newStates);
//     }
//   }, [biometrics]);

//   const handleAddDevice = () => {
//     navigate("/tenant/biometrics/form");
//   };

//   const handleEdit = (device: IBiometricsDetails) => {
//     navigate(`/tenant/biometrics/form`, { state: device });
//   };

//   const handleDelete = async (deviceId: number) => {
//     setOpenDelete(true);
//     setDeleteId(deviceId);
//   };

//   const handleExpand = (deviceId: string | number) => {
//     setExpanded((prev) => ({
//       ...prev,
//       [deviceId]: !prev[deviceId],
//     }));
//   };

//   // Door control handlers
//   const handleDoorUnlock = async (deviceSN: string, deviceId: number) => {
//     setLoading((prev) => ({ ...prev, [deviceId]: true }));
//     const res = await doorUnlock(deviceSN);
//     setFeedback((prev) => ({ ...prev, [deviceId]: res }));
//     setTimeout(
//       () => setFeedback((prev) => ({ ...prev, [deviceId]: null })),
//       3500
//     );
//     setLoading((prev) => ({ ...prev, [deviceId]: false }));
//   };

//   const handleNavigateCommands = (device: IBiometricsDetails) => {
//     navigate(`/tenant/biometrics/commands`, {
//       state: { device },
//     });
//   };

//   // Handle toggle changes and call API
//   const handleToggle = async (
//     deviceId: number,
//     field: "allowAutoDoorLock" | "blockShiftAccess",
//     value: boolean
//   ) => {
//     // Get current state
//     const prevState = toggleStates[deviceId] || {
//       allowAutoDoorLock: false,
//       blockShiftAccess: false,
//     };
//     const newState = { ...prevState, [field]: value };

//     // Optimistically update UI
//     setToggleStates((prev) => ({
//       ...prev,
//       [deviceId]: newState,
//     }));
//     setToggleLoading((prev) => ({ ...prev, [deviceId]: true }));

//     try {
//       // Call API
//       const res = await doorAccessLogic(
//         deviceId,
//         newState.allowAutoDoorLock,
//         newState.blockShiftAccess
//       );

//       setFeedback((prev) => ({ ...prev, [deviceId]: res }));
//       setTimeout(
//         () => setFeedback((prev) => ({ ...prev, [deviceId]: null })),
//         3500
//       );

//       // If API call failed, revert the toggle state
//       if (res.severity === "error") {
//         setToggleStates((prev) => ({
//           ...prev,
//           [deviceId]: prevState,
//         }));
//       }
//     } catch (error) {
//       // Revert toggle state on error
//       setToggleStates((prev) => ({
//         ...prev,
//         [deviceId]: prevState,
//       }));
//       setFeedback((prev) => ({
//         ...prev,
//         [deviceId]: { message: "Failed to update settings", severity: "error" },
//       }));
//       setTimeout(
//         () => setFeedback((prev) => ({ ...prev, [deviceId]: null })),
//         3500
//       );
//     } finally {
//       setToggleLoading((prev) => ({ ...prev, [deviceId]: false }));
//     }
//   };

//   return (
//     <div className="min-h-screen py-8 px-2 bg-gradient-to-br from-blue-50 via-indigo-50 to-pink-50 text-[#2E2E2E] font-poppins">
//       <Back />
//       {/* Top Bar */}
//       <div className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <h1 className="flex items-center gap-3 select-none bg-white rounded-xl shadow px-4 py-2 border border-blue-100 text-2xl sm:text-3xl font-bold w-full sm:w-auto justify-center sm:justify-start">
//           <Cpu className="text-blue-600" size={28} />
//           Biometric Devices
//         </h1>
//         <button
//           onClick={handleAddDevice}
//           className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold text-base shadow-lg hover:from-indigo-500 hover:to-blue-600 transition"
//         >
//           <PlusCircle size={20} /> Add Device
//         </button>
//       </div>

//       {/* Device Cards */}
//       <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {biometrics?.length === 0 && (
//           <div className="col-span-full text-gray-400 text-center py-20 text-lg">
//             <span>No biometric devices found.</span>
//           </div>
//         )}
//         {biometrics?.map((device) => {
//           const isExpanded = expanded[device?.id];
//           const toggles = toggleStates[device.id] || {
//             allowAutoDoorLock: false,
//             blockShiftAccess: false,
//           };
//           const isToggleLoading = toggleLoading[device.id] || false;

//           return (
//             <div
//               key={device?.id}
//               className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 flex flex-col relative group transition hover:shadow-2xl hover:-translate-y-1"
//               style={{ minHeight: 260 }}
//             >
//               {/* Card Header */}
//               <div className="flex items-center justify-between mb-3 gap-2">
//                 <div className="flex items-center gap-3 min-w-0">
//                   <Cpu className="text-blue-600 drop-shadow" size={20} />
//                   <h2 className="font-bold text-lg text-[#1A1A1A] truncate max-w-[130px] sm:max-w-[170px]">
//                     {device?.deviceName}
//                   </h2>
//                 </div>
//                 <div className="flex items-center gap-2 flex-shrink-0">
//                   <button
//                     onClick={() => handleEdit(device)}
//                     title="Edit Device"
//                     className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition shadow hover:shadow-md"
//                   >
//                     <Pencil size={16} />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(device?.id)}
//                     title="Delete Device"
//                     className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition shadow hover:shadow-md"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </div>
//               </div>
//               {/* Device Info */}
//               <div className="grid grid-cols-1 gap-2 mb-4">
//                 <div className="flex items-center gap-2 text-sm text-gray-700">
//                   <BadgeInfo size={14} className="text-indigo-500" />
//                   SN: <span className="font-mono">{device?.deviceSN}</span>
//                 </div>
//                 {device?.brand && (
//                   <div className="flex items-center gap-2 text-sm text-gray-700">
//                     <ShieldCheck size={14} className="text-green-600" />
//                     Brand: <span>{device?.brand}</span>
//                   </div>
//                 )}
//                 {device?.deviceModel && (
//                   <div className="flex items-center gap-2 text-sm text-gray-700">
//                     <BadgeInfo size={14} />
//                     Model: <span>{device?.deviceModel}</span>
//                   </div>
//                 )}
//                 {device?.deviceType && (
//                   <div className="flex items-center gap-2 text-sm text-gray-700">
//                     <BadgeInfo size={14} />
//                     Type: <span>{device?.deviceType}</span>
//                   </div>
//                 )}
//                 {device?.locationDescription && (
//                   <div className="flex items-center gap-2 text-sm text-gray-700">
//                     <MapPin size={14} className="text-pink-500" />
//                     Location: <span>{device?.locationDescription}</span>
//                   </div>
//                 )}
//                 <div className="flex items-center gap-2 text-sm text-gray-700">
//                   <Wifi size={14} className="text-blue-400" />
//                   Status:{" "}
//                   <span
//                     className={
//                       device?.status === "ACTIVE"
//                         ? "text-green-600 font-semibold"
//                         : "text-orange-600 font-semibold"
//                     }
//                   >
//                     {device?.status}
//                   </span>
//                 </div>

//                 {/* Toggle Switches */}
//                 <div className="flex flex-col gap-3 p-4 rounded-xl bg-white/60 border border-gray-200 shadow-sm">
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm font-medium text-gray-700">
//                       Auto Door Lock
//                     </span>
//                     <Toggle
//                       checked={toggles.allowAutoDoorLock}
//                       onChange={(checked) =>
//                         handleToggle(device.id, "allowAutoDoorLock", checked)
//                       }
//                       disabled={isToggleLoading}
//                     />
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm font-medium text-gray-700">
//                       Block Shift Access
//                     </span>
//                     <Toggle
//                       checked={toggles.blockShiftAccess}
//                       onChange={(checked) =>
//                         handleToggle(device.id, "blockShiftAccess", checked)
//                       }
//                       disabled={isToggleLoading}
//                     />
//                   </div>
//                   {isToggleLoading && (
//                     <div className="text-xs text-blue-600 text-center">
//                       Updating settings...
//                     </div>
//                   )}
//                 </div>
//                 {/* Toggle Switch end */}
//               </div>
//               {/* Door control & command actions */}
//               <div className="flex flex-wrap gap-2 mb-3">
//                 <button
//                   onClick={() => handleDoorUnlock(device.deviceSN, device.id)}
//                   disabled={loading[device.id]}
//                   className="flex-1 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-green-400 to-blue-400 text-white text-xs font-medium shadow hover:from-blue-400 hover:to-green-400 transition disabled:opacity-40"
//                   title="Unlock Door"
//                 >
//                   <Unlock size={14} />
//                   Unlock
//                 </button>
//                 <button
//                   onClick={() => handleNavigateCommands(device)}
//                   className="flex-1 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-400 to-blue-400 text-white text-xs font-medium shadow hover:from-blue-400 hover:to-indigo-400 transition"
//                   title="View Commands"
//                 >
//                   <List size={14} />
//                   Commands
//                 </button>
//               </div>
//               {/* Feedback message */}
//               {feedback[device.id] && (
//                 <div
//                   className={`rounded-lg px-3 py-2 text-xs font-medium mb-2 shadow transition-all ${
//                     feedback[device.id]?.severity === "success"
//                       ? "bg-green-50 text-green-700 border border-green-200"
//                       : "bg-red-50 text-red-700 border border-red-200"
//                   }`}
//                 >
//                   {feedback[device.id]?.message}
//                 </div>
//               )}
//               {/* Expand for more info */}
//               <div className="mt-auto flex justify-end">
//                 <button
//                   className="flex items-center gap-1 text-blue-600 hover:underline text-sm font-semibold transition"
//                   onClick={() => handleExpand(device?.id)}
//                 >
//                   {isExpanded ? (
//                     <>
//                       <ChevronUp size={14} /> Show Less
//                     </>
//                   ) : (
//                     <>
//                       <ChevronDown size={14} /> View More
//                     </>
//                   )}
//                 </button>
//               </div>
//               {isExpanded && (
//                 <div className="rounded-lg bg-blue-50 border border-blue-100 shadow-inner mt-2 mb-1 px-2 py-2 transition-all animate-fadeIn text-xs">
//                   <div>Cloud Server URL: {device?.cloudServerUrl || "N/A"}</div>
//                   <div>
//                     Last Heartbeat:{" "}
//                     {device?.lastHeartbeatAt
//                       ? new Date(device.lastHeartbeatAt).toLocaleString()
//                       : "Never"}
//                   </div>
//                   <div>
//                     Registered:{" "}
//                     {device?.createdAt
//                       ? new Date(device.createdAt).toLocaleString()
//                       : "N/A"}
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//       {openDelete && deleteId && <BiometricsDeleteModal />}
//     </div>
//   );
// };

// export default Biometrics;
