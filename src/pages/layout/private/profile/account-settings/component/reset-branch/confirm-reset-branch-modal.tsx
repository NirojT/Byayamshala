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
import { useProfileStore } from "../../store";
import { FaExclamationCircle } from "react-icons/fa";
import { useGlobalStore } from "@/global/store";

const ConfirmResetBranchModal = () => {
  const { openConfirmReset, setOpenConfirmReset, setOpenReConfirmReset } =
    useProfileStore(); 
  const { appUser } = useGlobalStore();

  function handleConfirmReset() {
    setOpenConfirmReset(false);
    setOpenReConfirmReset(true);
  }

  return (
    <AlertDialog open={openConfirmReset} onOpenChange={setOpenConfirmReset}>
      <AlertDialogContent className="border-red-600 border-2 bg-red-50 shadow-lg animate-fade-in font-poppins">
        <AlertDialogHeader className="flex items-center">
          <FaExclamationCircle className="h-6 w-6 text-red-500 mr-2" />
          <AlertDialogTitle className="text-red-600 font-extrabold uppercase">
            Warning: Critical Action!
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription
          className="text-red-700 font-bold mt-2"
          aria-live="assertive"
        >
          <p className="text-lg text-gray-600">
            ⚠️ <strong>{appUser.currentBranch}</strong>, you are about to
            permanently delete all data from the{" "}
            <span className="text-green-600 font-bold">
              {appUser.currentBranch}
            </span>{" "}
            branch.
          </p>
          <p className="mt-2 text-gray-700">
            This action is irreversible and will take effect immediately. Please
            ensure all necessary data has been backed up before proceeding.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Timestamp: {new Date().toLocaleString()}
          </p>
        </AlertDialogDescription>
        <AlertDialogFooter className="flex justify-between mt-4">
          <AlertDialogCancel
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 font-bold px-4 py-2 rounded-lg transition-all"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 text-white hover:bg-red-700 font-bold px-4 py-2 rounded-lg transition-all"
            onClick={handleConfirmReset}
          >
            Yes, Delete Everything
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmResetBranchModal;
