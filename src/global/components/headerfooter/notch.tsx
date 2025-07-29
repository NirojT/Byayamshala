import { BusinessName } from "../../config";

const Notch = () => {
  return (
    <div className="flex justify-center bg-black font-poppins">
      <div className="">
        {/* White trapezoid with wider part at the top */}
        <div
          className="  inset-0 w-[7em] h-3 bg-white mx-auto top-8 text-black"
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)",
          }}
        ></div>
        <div className="relative w-full bottom-[20px] left-4 text-black/100 text-sm font-bold">
          {BusinessName}
        </div>
      </div>
    </div>
  );
};

export default Notch;