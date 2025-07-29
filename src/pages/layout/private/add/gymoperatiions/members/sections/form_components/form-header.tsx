import { IVisitorDetails } from "@/pages/layout/private/list/gymoperatiions/visitors/interface"

interface IFormHeaderProps {
    visitor: IVisitorDetails
}

const FormHeader = ({visitor}:IFormHeaderProps) => {
return (
    <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-10 font-poppins">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-400"></div>
    <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-orange-600/10 blur-3xl"></div>
    <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl"></div>

    <div className="relative px-8 py-10">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-3 text-center">
        {visitor ? "Transform Visitor to Member" : "Register New Member"}
      </h2>
      <p className="text-black text-center max-w-2xl mx-auto">
        {visitor
          ? "Complete the form below to convert this visitor into a full gym member with access to all facilities and services."
          : "Fill out the membership form to register a new member to your gym. All fields marked with * are required."}
      </p>
    </div>
  </div>
)
}

export default FormHeader