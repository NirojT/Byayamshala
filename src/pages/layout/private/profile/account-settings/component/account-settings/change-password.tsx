import { Label } from "@/components/ui/label";
import { useProfileStore } from "../../store";
import { useGlobalStore } from "@/global/store";
import { useState } from "react"; 
import Back from "@/global/components/back/back";

const ChangePassword = () => {
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const { changePassword } = useProfileStore();
  const { setToasterData } = useGlobalStore();

  const handleSave = async () => {
    const res = await changePassword(newPassword, confirmPassword);
    setToasterData({
      message: res?.message,
      severity: res?.severity,
      open: true,
    });
    if (res?.severity === "success") {
      setConfirmPassword("");
      setNewPassword("");
    }
  };
  return (
    <div className="  w-full flex font-poppins items-center justify-center">
      <div className="border relative border-gray-200 mt-40 shadow-lg p-6 rounded-lg">
        <Back />

        <div className="grid gap-6 p-8">
          <div className="grid gap-2">
            <Label htmlFor="pan" className="text-sm font-medium">
              New Password
            </Label>
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              id="new"
              type="password"
              placeholder="Enter a new password.."
              // className="border border-gray-600 p-6     block w-full rounded-md focus:outline-none shadow-sm focus:border-[#E26003] focus:ring-[#E26003]"
              className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pan" className="text-sm font-medium">
              confirm Password
            </Label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="Re Enter your password.."
              // className="border border-gray-600 p-6     block w-full rounded-md focus:outline-none shadow-sm focus:border-[#E26003] focus:ring-[#E26003]"
              className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors"
            />
          </div>
        </div>

        <div className="w-full flex items-center">
          <button
            className="w-[26rem] ml-auto mr-auto  bg-[#E26003]  text-white py-3 rounded-md focus:outline-none focus:ring-1 focus:border-[#E26003] focus:ring-[#E26003] "
            onClick={handleSave}
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
