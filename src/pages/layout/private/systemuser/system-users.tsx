 
 
import { useNavigate } from "react-router-dom";
import { SystemUserList } from "./component/system-user-list";
import { PrivateRoute } from "@/global/config";
 
 

  const SystemUsers = () => {
    const nav=useNavigate();
    
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-4">
      <div
        className=""
        onClick={() => nav(`/${PrivateRoute}/system-users/logs`)}
      >
        Sessions
      </div>

      <SystemUserList />
    </div>
  );
};
export default SystemUsers;

 


