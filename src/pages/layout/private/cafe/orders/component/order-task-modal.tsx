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
import { useOrderTableStore } from "../store";
import { IOrderDetails } from "../interface";
import {  PrivateRoute } from "@/global/config";

import { ReactNode } from "react";
import { Printer, Trash2, DollarSign } from "lucide-react";
import { PaymentMode } from "@/global/components/enums/enums";

interface Props {
  order: IOrderDetails;
  modalTask: "" | "print" | "delete" | "pay";
  setModalTask: React.Dispatch<
    React.SetStateAction<"" | "print" | "delete" | "pay">
  >;
}

const OrderTaskModal = ({ order, modalTask, setModalTask }: Props) => {
  const navigate = useNavigate();
  const { setToasterData } = useGlobalStore();
  const { makePayment, data, deleteOrders, printOrder } = useOrderTableStore();

  const checkCredit = (order: IOrderDetails) => {
    if (data?.paymentMode === PaymentMode.FULL_CREDIT) {
      navigate(`/${PrivateRoute}/add/finance/credits`, {
        state: { fromOrders: true, orders: order },
      });
    }
  };

  const taskConfig: {
    [key in NonNullable<Props["modalTask"]>]: {
      title: string;
      icon: ReactNode;
      action: () => Promise<void>;
      actionLabel: string;
    };
  } = {
    "": {
      title: "",
      icon: null,
      action: async () => {},
      actionLabel: "",
    },
    print: {
      title: "Are you sure you want to print this order?",
      icon: <Printer className="w-6 h-6 text-gray-700" />,
      action: async () => {
        const res = await printOrder(order?.id);
        setToasterData({
          message: res.message,
          severity: res.severity,
          open: true,
        });
      },
      actionLabel: "Print",
    },
    delete: {
      title: "Are you sure you want to delete this order?",
      icon: <Trash2 className="w-6 h-6 text-red-600" />,
      action: async () => {
        const res = await deleteOrders(order?.id);
        setToasterData({
          message: res.message,
          severity: res.severity,
          open: true,
        });
      },
      actionLabel: "Delete",
    },
    pay: {
      title: "Are you sure you want to make a payment for this order?",
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
      action: async () => {
        const res = await makePayment();
        setToasterData({
          message: res.message,
          severity: res.severity,
          open: true,
        });
        if (res?.severity === "success") checkCredit(order);
      },
      actionLabel: "Pay",
    },
  };
  

  if (!modalTask) return null;

  const { title, icon, action, actionLabel } = taskConfig[modalTask];

  return (
    <AlertDialog open={!!modalTask} onOpenChange={() => setModalTask("")}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2">
            {icon}
            <AlertDialogTitle>{title}</AlertDialogTitle>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setModalTask("")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="text-white bg-gray-800"
            onClick={async () => {
              await action();
              setModalTask("");
            }}
          >
            {actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OrderTaskModal;
