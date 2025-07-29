import {
  LayoutDashboard,
  Boxes,
  ShoppingCart,
  NotebookPen,
  CreditCard,
} from "lucide-react";

export const items = [
  {
    title: "Dashboard",
    url: "/tenant",
    icon: LayoutDashboard,
  },
  {
    title: "Stock",
    url: "/tenant/stock",
    icon: Boxes,
  },
  {
    title: "Pos",
    url: "/tenant/pos",
    icon: ShoppingCart,
  },
  {
    title: "Reports",
    url: "/tenant/reports",
    icon: NotebookPen,
  },
  {
    title: "Payment Mode",
    url: "/tenant/paymentmode",
    icon: CreditCard,
  },
];
