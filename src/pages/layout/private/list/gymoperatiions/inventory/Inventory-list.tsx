import React, { useState } from "react";

// Define the structure of each form field for Product
const productFields = [
  { name: "name", label: "Product Name", type: "text", required: true },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    required: false,
  },
  { name: "sku", label: "SKU", type: "text", required: true },
  { name: "brand", label: "Brand", type: "text", required: false },
  { name: "price", label: "Price", type: "number", required: true },
  {
    name: "stockQuantity",
    label: "Stock Quantity",
    type: "number",
    required: true,
  },
  { name: "imageUrl", label: "Image URL", type: "text", required: false },
  {
    name: "variationType",
    label: "Variation Type",
    type: "select",
    options: ["Size", "Flavor", "Color"],
    required: false,
  },
  {
    name: "variationValue",
    label: "Variation Value",
    type: "text",
    required: false,
  },
  {
    name: "type",
    label: "Product Type",
    type: "select",
    options: ["SUPPLEMENT", "EQUIPMENT", "CLOTHING"],
    required: true,
  },
];

const AddInventoryForm = () => {
  const [formData, setFormData] = useState(
    productFields.reduce((acc, field) => {
      acc[field.name] = ""; // Initialize all fields with empty strings
      return acc;
    }, {} as Record<string, string | number>)
  );

  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Add logic to submit the form, e.g., an API call
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl text-white font-bold mb-8 text-center">
        Add New Product
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {productFields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label
              htmlFor={field.name}
              className="text-white mb-2 flex items-center"
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="p-3 w-full rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                required={field.required}
              />
            ) : field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="p-3 w-full rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required={field.required}
              >
                <option value="">Select {field.label}</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="p-3 w-full rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required={field.required}
              />
            )}
          </div>
        ))}

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 mt-6 flex justify-center">
          <button
            type="submit"
            className="w-full sm:w-1/2 p-3 bg-[#FF6A00] text-white font-semibold rounded-md hover:bg-[#FF6A00] focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInventoryForm;
