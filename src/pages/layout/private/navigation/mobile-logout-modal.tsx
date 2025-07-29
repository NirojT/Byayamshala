import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent, 
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "@/global/store";
import { useEffect } from "react";
import { useAuthStore } from "@/pages/auth/store";

const LogoutModal = () => {
  const { isLoggingOut, setIsLoggingOut, logout } = useAuthStore();
  const { activeUrl } = useGlobalStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (activeUrl === "/tenant/create-attendence") {
      navigate("/tenant/create-attendence");
    }
  }, []);

  return (
    <AlertDialog open={isLoggingOut} onOpenChange={setIsLoggingOut}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to Logout?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setIsLoggingOut(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="text-white bg-gray-800"
            onClick={() => {
              logout();
            }}
          >
            Log out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutModal;
