import { NepaliDate } from "@zener/nepali-datepicker-react";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { AppUserRoles, MemberShipStatus } from "./components/enums/enums";
import { IAppUserDetails } from "./interface";

// Define API host and base URL

/*
environment variables

 
*/





 const isProd = import.meta.env.MODE === "production";
export const host = isProd
  ? import.meta.env.VITE_BACKEND_PROD_HOST
  : import.meta.env.VITE_BACKEND_DEV_HOST;
export const base = host.startsWith("http") ? host : `//${host}`;
export const base_url = `${base}/api/v1/`;


console.log(base_url);// export const host = import.meta.env.VITE_BACKEND_PROD_HOST;
// export const base = `//${host}`;
// export const base_url = `${base}/api/v1/`;

// export const base = import.meta.env.VITE_BACKEND_DEV_HOST;

// export const base_url = `${base}/api/v1/`;

// Axios instance for requests that don't require authentication
export const axios_auth = axios.create({
  baseURL: base_url,
  withCredentials: true, // Ensures cookies are sent with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios instance for authenticated requests
export const axios_no_auth = axios.create({
  baseURL: base_url,
  withCredentials: false, // Ensures cookies are sent with requests
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Axios instance for authenticated file uploads
export const axios_auth_form = axios.create({
  baseURL: base_url,
  withCredentials: true, // Ensures cookies are sent with requests
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});

// Other constants
export const BusinessName = "Byayamshala";
export const PrivateRoute = "tenant";

// Social media links
export const twitterUrl = "https://twitter.com";
export const facebookUrl = "https://facebook.com";
export const instagramUrl = "https://instagram.com";
export const whatsAppUrl = "https://whatsapp.com";

export const NepaliTime = () => {
  const options = { timeZone: "Asia/Kathmandu" };
  return new Date().toLocaleString("en-US", options).split(",")[1];
};

export const defaultNepaliDate = new NepaliDate(); // Gets today's Nepali date

//for changing the base64 string to Uint8Array
export function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/*
for handling navigate
*/
export const handleNavigateToPrivateOrPublic = async (
  appUser: IAppUserDetails,
  clearAppUser: () => void,
  navigate: NavigateFunction
) => {
  if (!appUser) return;
  /*
     first priority super admin
     }*/
  if (
    appUser?.roles?.some(
      (role) => role?.roleName === AppUserRoles.ROLE_SUPER_ADMIN
    )
  ) {
    // if user is super admin then navigate to super admin dashboard
    // super admin login
    navigate(`/super`);
    return;
  }
  /*
     second priority affiliater
     }*/
  if (
    appUser?.roles?.some(
      (role) => role.roleName === AppUserRoles.ROLE_AFFILIATE
    )
  ) {
    // if user is affilate then navigate to affilate dashboard
    // affilate login
    navigate(`/affiliate`);
    return;
  } else if (
    /*
     last priority appUser
     }*/
    appUser?.roles?.some((role) => role.roleName === AppUserRoles.ROLE_ADMIN)
  ) {
    // if user is new admin then navigate to getting started page
    if (appUser.isNew) {
      navigate(`/getting-started`);
      return;
    }
    // again check their subscription status

    if (appUser?.subscriptionStatus !== MemberShipStatus.ACTIVE) {
      // home page
      // if user is not subscribed then navigate to home page
      clearAppUser(); // clear app user data from global store
      navigate(`/`);
    } else {
      navigate(`/${PrivateRoute}/add`);
    }
  }
};

//for getting started
export const handleGettingStarted = async (
  appUser: IAppUserDetails,

  navigate: NavigateFunction
) => {
  if (
    appUser?.email &&
    !appUser?.isNew &&
    appUser.subscriptionStatus === MemberShipStatus.ACTIVE
  ) {
    navigate(`${PrivateRoute}/add`);
  }

  if (!appUser?.email) {
    navigate("/");
  }
};

export const nepMonths = [
  "Baishak",
  "Jestha",
  "Ashad",
  "Shrawan",
  "Bhadra",
  "Ashwin",
  "Kartik",
  "Mangsir",
  "Poush",
  "Magh",
  "Falgun",
  "Chaitra",
];
