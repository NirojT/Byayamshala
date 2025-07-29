const Heading = ({ heading }: { heading: string }) => {
  return (
    <>
      <div className="relative before:content-[''] before:absolute before:h-full before:bg-pink-500 before:left-0 before:w-[2px] h-[2em] flex items-center before:rounded-full after:content-[''] after:absolute after:h-[40%] after:bg-pink-500 after:left-[-.065em] after:top-0 after:w-[5px] after:rounded-full sm:pl-1 capitalize">
        <p className="text-[.9rem] sm:text-[1rem] text-[#7b7a7a] font-bold pl-2">
          {heading}
        </p>
      </div>
    </>
  );
};

export default Heading;
