// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";

// const DatePicker = ({convertLocalDateToTime,}) => {
//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <TimePicker
//                 label="hh:mm"
//                 value={convertLocalDateToTime(entry?.checkInTime || '')}
//                 onChange={(newValue) => {
//                     let timeString = convertTimeObjectToString(newValue);
//                     handleTimeChange(entry.member.id, 'checkInTime', timeString);
//                 }}
//                 className="text-sm text-white bg-white border border-gray-700
//         rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//         </LocalizationProvider>
//     )
// }