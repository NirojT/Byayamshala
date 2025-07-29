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
import { AlertTriangle } from "lucide-react"; // ✔ Replace Radix icon
import { useItemFormStore } from "../../../form/store";
import { useLocation, useNavigate } from "react-router-dom";
import { IItemDetails } from "../../../list/interface";

const ItemDeleteModal = () => {
  const navigate = useNavigate();
  const item: IItemDetails = useLocation().state;
  const { delete: deleteItem, openDelete, setOpenDelete } = useItemFormStore();
  const { setToasterData } = useGlobalStore();

  const handleDelete = async () => {
    const res = await deleteItem(item?.id);
    setToasterData({
      open: true,
      message: res.message,
      severity: res.severity,
    });

    if (res.severity === "success") {
      setOpenDelete(false);
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
            This will permanently delete the {item?.name} and all related
            transaction and entries.
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

export default ItemDeleteModal;
