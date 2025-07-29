 
import {
  Slash as slash,
  
  Users,
  PlaneIcon,
  DollarSign,
} from "lucide-react";
import { MdEmail } from "react-icons/md";

export const superNavigationItems = [
  {
    title: "Dashboard",
    url: "/super/",
    icon: slash,
  },
  {
    title: "app users",
    url: "/super/app-users",
    icon: Users,
  },
  {
    title: "plans",
    url: "/super/plans",
    icon: DollarSign,
  },

  {
    title: "query",
    url: "/super/query",
    icon: MdEmail,
  },
  {
    title: "config",
    url: "/super/config",
    icon: PlaneIcon,
  },
];
