import { FiInfo } from "react-icons/fi"

const AddStaffHelpCard = () => {
    return (
        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-md shadow-sm flex items-start gap-4">
            <div className="bg-white p-3 rounded-md border border-gray-200">
                <FiInfo className="h-5 w-5 text-[#1A1A1A]" />
            </div>
            <div>
                <h4 className="text-lg font-medium text-[#2E2E2E] mb-2">
                    Tips for Adding Staffs
                </h4>
                <ul className="text-gray-600 text-sm space-y-2">
                 
                    <li className="flex items-start">
                        <span className="text-[#1A1A1A] mr-2">•</span>
                        <span>
                            Ensure certification details are accurate and up-to-date as
                            they will be displayed to members.
                        </span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-[#1A1A1A] mr-2">•</span>
                        <span>
                            Add comprehensive experience details to help match staff
                            with appropriate clients.
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default AddStaffHelpCard