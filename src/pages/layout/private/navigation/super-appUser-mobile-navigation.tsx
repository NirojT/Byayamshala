import { useNavigate } from "react-router-dom"; 
import { useAuthStore } from "@/pages/auth/store";

import { superNavigationItems } from "../../super/components/sidebar/super-appUser-navigation";
import { useOpenHamburgerNavigationSuper } from "../../super/store/privatestore";

const MobileNavigation = () => {
  const { logout } = useAuthStore(); 
    const { isOpen, setIsOpen } = useOpenHamburgerNavigationSuper();
  const navigate = useNavigate();

  // function to handle the open and close of the hamburger menu and navigate to the specified path
  function navigateTo(link: string) {
    setIsOpen(!isOpen);
    navigate(link);
  }

  return (
    <div className="flex items-center justify-center  mt-[14em]">
      <div className="w-full text-gray-800 flex items-center justify-center">
        <nav
          className={`${
            isOpen ? "translate-y-0" : "-translate-y-full"
          } flex flex-col items-center w-full max-w-xs mt-6`}
        >
          {superNavigationItems.map((nav) => (
            <button
              onClick={() => navigateTo(nav.url)}
              key={nav.title}
              className={`py-4 w-full text-center  border-gray-100 transition-colors 
                  "text-orange-600 underline font-medium"
                     text-black
             hover:text-green-500`}
            >
              {nav.title}
            </button>
          ))}

          <button
            onClick={logout}
            className="py-4 w-full text-center  text-gray-600 hover:text-black transition-colors"
          >
            Log out
          </button>
        </nav>
      </div>
    </div>
  );
};

export default MobileNavigation;
