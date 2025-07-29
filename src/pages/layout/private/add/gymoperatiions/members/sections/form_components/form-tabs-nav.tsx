import { useAddMemberFormStore } from "../../store"

const FormTabNavigation = () => {
    const {setActiveSection,activeSection}  = useAddMemberFormStore();
return (
    <div className="flex border-b border-gray-800">
    <button
      onClick={() => setActiveSection("personal")}
      className={`flex items-center px-6 py-4 focus:outline-none transition-colors duration-300 ${
        activeSection === "personal"
          ? "text-orange-500 border-b-2 border-orange-500"
          : "text-gray-400 hover:text-gray-300"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
      Personal Info
    </button>
    <button
      onClick={() => setActiveSection("membership")}
      className={`flex items-center px-6 py-4 focus:outline-none transition-colors duration-300 ${
        activeSection === "membership"
          ? "text-orange-500 border-b-2 border-orange-500"
          : "text-gray-400 hover:text-gray-300"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
        />
      </svg>
      Membership
    </button>
    {/* <button
      onClick={() => setActiveSection("additional")}
      className={`flex items-center px-6 py-4 focus:outline-none transition-colors duration-300 ${
        activeSection === "additional"
          ? "text-orange-500 border-b-2 border-orange-500"
          : "text-gray-400 hover:text-gray-300"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
      Additional
    </button> */}
  </div>
)
}

export default FormTabNavigation