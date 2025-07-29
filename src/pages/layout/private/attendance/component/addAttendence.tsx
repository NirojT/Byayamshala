// import { useEffect } from "react";
// import { useGlobalStore } from "../../../../../global/store";
// import { useAddAttendanceFormStore } from "../store";
// import AttendanceTable from "./attendance-table";

// const Attendence = () => {
//   const {
//     details,
//     shift,
//     setShift,
//     search,
//     setSearch,
//     date,
//     setDate,
//     getAttendanceOfToday,
//     searchAttendance,

//     saveAttendance,
//   } = useAddAttendanceFormStore();

//   const { setToasterData } = useGlobalStore();

//   const handleSave = async () => {
//     try {
//       const data = details
//         // .filter((entry) => entry?.isPresent)
//         .map((entry) => ({
//           id: entry?.id,
//           memberId: entry?.member?.id,
//           checkInTime: formatToLocalDateTime(date, entry?.checkInTime),
//           checkOutTime: formatToLocalDateTime(date, entry?.checkOutTime),
//           isPresent: entry?.isPresent,
//         }));
     
//       const res = await saveAttendance(data);

//       setToasterData({
//         open: true,
//         message: res?.message,
//         severity: res?.severity,
//       });
//       if (res?.severity === "success") {
//         console.log("success");
//       }
//     } catch (error) {
//       console.error(error);
//     }

//     // createAttendance(data);
//   };

//   const formatToLocalDateTime = (date: string, time: string | undefined) => {
//     if (!time) return null; // Handle empty time

//     if (time.length === 5)
//       return `${date}T${time}:00`; // ISO 8601 format (e.g., "2024-10-28T08:30:00")
//     else {
//       //  from; backend it is full local date so noo need to add date
//       //just add T in between date and time cuz in backend we are aspecting T so
//       return time?.split(" ")[0] + "T" + time?.split(" ")[1];
//     }
//   };

//   useEffect(() => {
//     getAttendanceOfToday();
//   }, [getAttendanceOfToday]);

//   return (
//     <div className=" text-white bg-black min-h-screen p-8 ">
//       <h1 className=" border  text-sm text-center py-3 mb-10  brightness-50 ">
//         Attendance <span className="text-white">-</span> {details?.length}
//       </h1>

//       <div className="flex justify-start items-center mb-6 gap-4">
//         <input
//           type="text"
//           placeholder="Search by name"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           // className=" bg-zinc-300 focus:outline-none focus:border-[#E26003] foucs:text-[#E26003] text-white p-2 rounded-md w-full"
//           className="mt-1 bg-black text-gray-300 h-[4rem] p-5 block w-full rounded-md focus:outline-none border border-gray-600 shadow-sm focus:border-[#E26003] focus:ring-[#E26003]"
//         />
//         <button
//           className="btn border hover:shadow-lg bg-[#E26003] hover:bg-white hover:text-[#E26003] rounded-sm border-gray-600 h-[4rem] px-6"
//           onClick={searchAttendance}
//         >
//           Search
//         </button>

//         <button
//           className="btn border hover:shadow-lg hover:bg-white hover:text-black rounded-sm border-gray-600 h-[4rem] px-6"
//           onClick={handleSave}
//         >
//           Submit
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div>
//           <label className="block mb-2 ml-2 text-md font-medium">Shift</label>
//           <select
//             value={shift}
//             onChange={(e) => setShift(e.target.value)}
//             // className="w-full bg-gray-800 text-white p-3 rounded-lg"
//             className="w-full p-3 bg-black border border-zinc-500   rounded-md focus:outline-none focus:border-[#E263003] focus:ring-[#E26003]"
//           >
//             <option value="All">All</option>
//             <option value="Morning">Morning</option>
//             <option value="Afternoon">Afternoon</option>
//             <option value="Evening">Evening</option>
//           </select>
//         </div>
//         <div>
//           <label className="block mb-2 text-md font-medium ml-3">Date</label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="mt-1 bg-black text-gray-300 h-12 p-2 block w-full rounded-md 
//                focus:outline-none border border-gray-600 shadow-sm focus:border-[#E26003] 
//                focus:ring-[#E26003]"
//           />
//         </div>
//       </div>

//       <AttendanceTable />
//     </div>
//   );
// };

// export default Attendence;
