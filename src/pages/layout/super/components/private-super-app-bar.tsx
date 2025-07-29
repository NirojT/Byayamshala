import { RxHamburgerMenu } from "react-icons/rx";
import gymer from "../../../../assets/gymhero.jpg";
import { useOpenHamburgerNavigationSuper } from "../store/privatestore";

const PrivateSuperAppBar = () => {
  // state for managing hamburger click on small screens
  // const [openNavigation, setOpenNavigation] = useState<boolean>(true);
  const { isOpen, setIsOpen } = useOpenHamburgerNavigationSuper();

  function handleHamburgerClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="border-b-[1px] border-zinc-600">
      <div className="flex w-full sm:justify-end justify-between items-center mr-4 bg-[#FAFAFA] p-1">
        <RxHamburgerMenu
          className="sm:hidden visible"
          onClick={handleHamburgerClick}
          size={28}
          style={{ color: "black", marginLeft: "22px" }}
        />
        <div className="text-center">
          <img
            src={gymer}
            alt=""
            className="h-20 w-20 rounded-full object-cover"
          />
          <span className="text-sm text-[#E26003] font-bold ">
            {" "}
            Niroj Tamang
          </span>
        </div>
      </div>
    </div>
  );
};

export default PrivateSuperAppBar;
