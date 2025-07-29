import React, { useState } from "react";
import { useAddMemberFormStore } from "../store";
import { useGlobalStore } from "@/global/store";
import { exampleData, headers } from "./csv-data/exampleData";
import { FileType } from "@/global/components/enums/enums";

const CsvImportForm = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { fileType, setFileType, bulkAdd } = useAddMemberFormStore();
  const { setToasterData } = useGlobalStore();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    console.log(file);

    if (!file || !fileType) {
      setToasterData({
        message: "Please select file and file type",
        severity: "error",
        open: true,
      });
      return;
    }

    setLoading(true);
    const res = await bulkAdd(file);
    setToasterData({
      message: res?.message,
      severity: res?.severity,
      open: true,
    });
    setLoading(false);
  };

  const handleDragOver = (e:any) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e:any) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    //by default csv
    // let allowedType = ["text/csv"];

    // // if excel than
    // if (fileType === FileType.EXCEL) {
    //   allowedType = ["text/xls"];
    // }

    // if (allowedType.includes(e?.target?.files[0]?.type)) {
    //   setFile(e.target.files[0]);
    // } else {
    //   setToasterData({
    //     message: `Please select .${fileType} file only.`,
    //     severity: "error",
    //     open: true,
    //   });
    //   return;
    // }

    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
    //than empty it
    e.target.value = "";
  };
  const handleFileType = () => {
    if (fileType === FileType.CSV) {
      setFileType(FileType.EXCEL);
    } else if (fileType === FileType.EXCEL) {
      setFileType(FileType.CSV);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-8 font-poppins">
      <div className="max-w-8xl mx-auto">
        {/* Main Content */}
        <div className="mt-16">
          <h1 className="text-2xl font-bold text-center mb-8">
            Prepare Your {fileType} File
          </h1>

          {/* Template Download */}
          <div className="bg-white rounded-md p-4 border border-gray-200 mb-8 flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">Download Template</p>
              <p className="text-sm text-gray-600">
                Start with our pre-formatted template to ensure correct data
                structure
              </p>
            </div>
            <button
              onClick={() => handleFileType()}
              className="bg-orange-500 text-white px-4 py-2 rounded flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Change Format {fileType}
            </button>
          </div>

          {/* Expected format */}
          <div className="mb-8">
            <h2 className="font-medium  mb-4 underline text-[#E26300]">
              Expected Format
            </h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
              <div className="inline-block min-w-full">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 table-fixed">
                    <thead className="bg-gray-50">
                      <tr>
                        {headers.map((header) => (
                          <th
                            key={header.key}
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-600 Capitalize  tracking-wider border-r last:border-r-0"
                          >
                            {header.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Example row for format guidance */}
                      <tr className="bg-gray-50">
                        <td
                          colSpan={headers.length}
                          className="px-3 py-2 text-xs text-gray-600"
                        >
                          <span className="font-medium">Expected Format:</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-xs text-gray-500 border-r">
                          Text (Name)
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-500 border-r">
                          Valid email format
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-500 border-r">
                          With country code
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-500 border-r">
                          Street, City, State
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-500 border-r">
                          MORNING/EVENING/NIGHT
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-500 border-r">
                          YYYY-MM-DD
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-500 border-r">
                          Name and Phone
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-500 border-r">
                          YYYY-MM-DD
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-500">
                          YYYY-MM-DD
                        </td>
                      </tr>

                      {/* Example data rows */}
                      <tr className="bg-gray-50">
                        <td
                          colSpan={headers.length}
                          className="px-3 py-2 text-xs text-gray-600"
                        >
                          <span className="font-medium">Example Data:</span>
                        </td>
                      </tr>
                      {exampleData.map((row, rowIndex) => (
                        <tr
                          key={row.Email}
                          className={
                            rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          {headers.map((header, cellIndex) => (
                            <td
                              key={header.key}
                              className={`px-3 py-2 text-sm text-gray-800 ${
                                cellIndex < headers.length - 1 ? "border-r" : ""
                              }`}
                            >
                              {row[header?.key as keyof typeof row]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* CSV Format Note */}
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-md p-3">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm text-blue-700">
                    Your {fileType} file must include all the column headers
                    exactly as shown above. Each row represents one team member.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* File Upload Zone */}
          <div
            className={`border-2 max-w-2xl ml-auto mr-auto border-dashed rounded-md p-10 flex flex-col items-center justify-center mb-8 ${
              isDragging ? "border-orange-500 bg-orange-50" : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="bg-gray-200 rounded-full p-3 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-gray-700 font-medium mb-2">
              Drop your {fileType} file here
            </p>
            <p className="text-gray-500 text-sm mb-4">or</p>
            <label className="bg-orange-500 text-white px-4 py-2 rounded flex items-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
              Browse Files
              <input
                type="file"
                className="hidden"
                accept={`${fileType === FileType?.CSV ? ".csv" : ".xlsx"}`}
                onChange={(e) => handleFileSelect(e)}
              />
            </label>
            <label className="mt-3">{file?.name}</label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button className="border border-gray-300 px-5 py-2 rounded text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button
              onClick={() => {
                handleSubmit();
              }}
              className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600 flex items-center"
            >
              {loading ? "Importing": "Import"}
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CsvImportForm;
