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
import { useAddCreditFormStore } from "../store";
import { useGlobalStore } from "@/global/store";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react"; // ✔ Replace Radix icon

const CreditDeleteModal = () => {
  const { setToasterData } = useGlobalStore();
  const { creditId } = useLocation().state;
  const navigate = useNavigate();
  const { deletePartyCredit, openDelete, setOpenDelete } =
    useAddCreditFormStore();

  const handleDelete = async () => {
    const res = await deletePartyCredit(creditId);
    setToasterData({
      open: true,
      message: res.message,
      severity: res.severity,
    });

    if (res.severity === "success") {
      navigate(-1);
    }
  };

  return (
    <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
      <AlertDialogContent className="sm:max-w-[450px]">
        <AlertDialogHeader>
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="mt-2 text-sm text-gray-600">
            This will permanently delete the credit transaction and all related
            entries.
            <strong className="text-red-500">
              {" "}
              This action cannot be undone.
            </strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-muted hover:bg-muted/80">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleDelete}
          >
            Delete Permanently
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreditDeleteModal;
