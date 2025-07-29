import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useGlobalStore } from "@/global/store";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { ImWarning } from "react-icons/im"; 
import { useProfileStore } from "../../store";

const ReconfirmResetBranch = () => {
  const { appUser } = useGlobalStore();
  const { openReConfirmReset, setOpenReConfirmReset,resetBranch } = useProfileStore();
  const [confirmationInput, setConfirmationInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  
const {setToasterData}=useGlobalStore()
  

  async function handleDelete() {
    if (confirmationInput === appUser.currentBranch) {
      setIsDeleting(true);
      setErrorMessage(null);

      // --> TODO api call here
      const res=await resetBranch()
      setToasterData({
        message: res?.message,
        severity: res?.severity,
        open: true
      })
    } else {
      setErrorMessage("Branch name does not match. Please try again.");
    }
  }

  return (
    <AlertDialog open={openReConfirmReset} onOpenChange={setOpenReConfirmReset}>
      <AlertDialogContent className="border-red-600 border-2 bg-red-50 shadow-lg animate-fade-in">
        <AlertDialogHeader className="flex items-center">
          <ImWarning className="h-8 w-8 text-red-600 mr-3" />
          <AlertDialogTitle className="text-red-600 font-extrabold uppercase">
            Final Confirmation: Delete All Data
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription
          className="text-red-700 font-bold mt-2"
          aria-live="assertive"
        >
          <p className="text-lg text-center">
            ⚠️ ALL BRANCH DATA WILL BE PERMANENTLY DELETED AND CANNOT BE
            RECOVERED.
          </p>
          <p className="mt-2 text-md">
            This action is irreversible. To proceed, confirm by typing{" "}
            <span className="font-mono bg-black text-green-500 px-2 py-1 rounded">
              {appUser.currentBranch}
            </span>{" "}
            in the box below.
          </p>
        </AlertDialogDescription>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Type your branch name to confirm"
            value={confirmationInput}
            onChange={(e) => setConfirmationInput(e.target.value)}
            className={`w-full p-2 border-2 rounded-lg focus:outline-none ${
              errorMessage
                ? "border-red-600 focus:border-red-600"
                : "border-gray-300 focus:border-red-600"
            }`}
            aria-label="Branch name confirmation input"
          />
          {errorMessage && (
            <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
          )}
        </div>
        <AlertDialogFooter className="flex justify-between mt-4">
          <AlertDialogCancel
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 font-bold px-4 py-2 rounded-lg transition-all"
            aria-label="Cancel delete action"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className={`${
              confirmationInput === appUser.currentBranch
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } font-bold px-4 py-2 rounded-lg flex items-center justify-center transition-all`}
            onClick={handleDelete}
            disabled={confirmationInput !== appUser.currentBranch || isDeleting}
            aria-label="Delete everything button"
          >
            {isDeleting ? (
              <span className="loader inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            ) : (
              <Trash2 className="inline-block mr-2" />
            )}
            {isDeleting ? "Deleting..." : "DELETE EVERYTHING"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReconfirmResetBranch;
