// import React, { useState } from "react";

// // Define the structure of each form field
// const formFields = [
//   { name: "name", label: "Supplier Name", type: "text", required: true },
//   { name: "contact", label: "Contact", type: "text", required: true },
//   { name: "email", label: "Email", type: "email", required: false },
//   { name: "address", label: "Address", type: "text", required: false },
//   { name: "company", label: "Company Name", type: "text", required: false },
//   { name: "notes", label: "Notes/Remarks", type: "textarea", required: false },
// ];

// const AddSupplierForm = () => {
//   const [formData, setFormData] = useState(
//     formFields.reduce((acc, field) => {
//       acc[field.name] = ""; // Initialize all fields with empty strings
//       return acc;
//     }, {} as Record<string, string>)
//   );

//   // Handle form field changes
//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Calculate the Supplier's cost

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log(formData);
//     // Add logic to submit the form, e.g., an API call
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-xl">
//       <h2 className="text-3xl text-white font-bold mb-8 text-center">
//         Add New Supplier
//       </h2>
//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 md:grid-cols-2 gap-6"
//       >
//         {formFields.map((field) => (
//           <div key={field.name} className="flex flex-col">
//             <label
//               htmlFor={field.name}
//               className="text-white mb-2 flex items-center"
//             >
//               {field.label}
//               {field.required && <span className="text-red-500 ml-1">*</span>}
//             </label>

//             {field.type === "textarea" ? (
//               <textarea
//                 id={field.name}
//                 name={field.name}
//                 value={formData[field.name]}
//                 onChange={handleChange}
//                 className="p-3 w-full rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 rows={4}
//                 required={field.required}
//               />
//             ) : (
//               <input
//                 type={field.type}
//                 id={field.name}
//                 name={field.name}
//                 value={formData[field.name]}
//                 onChange={handleChange}
//                 className="p-3 w-full rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 required={field.required}
//               />
//             )}
//           </div>
//         ))}

//         {/* Submit Button */}
//         <div className="col-span-1 md:col-span-2 mt-6 flex justify-center">
//           <button
//             type="submit"
//             className="w-full sm:w-1/2 p-3 bg-[#FF6A00] text-white font-semibold rounded-md hover:bg-[#FF6A00]focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             Add
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddSupplierForm;
