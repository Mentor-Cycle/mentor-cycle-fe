import clsx from "clsx";

const MobileNavBar = ({
  isOpen,
  headerLp = false,
}: {
  isOpen: boolean;
  headerLp?: boolean;
}) => {
  const isHeaderLp = headerLp ? "bg-neutral-01" : "bg-secondary-02";
  const topBarStyles = isOpen
    ? "dark:bg-neutral-02 h-[2px] w-8 transform transition-all duration-300 origin-left rotate-[42deg]"
    : "dark:bg-neutral-02 h-[2px] w-7 transform transition-all duration-300 origin-left";
  const midBarStyles = isOpen
    ? "dark:bg-neutral-02 h-[2px] w-1/2 rounded transform transition-all duration-300 -translate-x-10"
    : "dark:bg-neutral-02 h-[2px] w-7 rounded transform transition-all duration-300";
  const botBarStyles = isOpen
    ? "dark:bg-neutral-02 h-[2px] w-8 transform transition-all duration-300 origin-left -rotate-[42deg]"
    : "dark:bg-neutral-02 h-[2px] w-7 transform transition-all duration-300 origin-left";

  return (
    <div>
      <button className="relative group">
        <div className="relative flex overflow-hidden items-center justify-center w-[50px] h-[50px] transform transition-all bg-transparent  group-focus:ring-1 ring-opacity-30 duration-200 ">
          <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
            <div className={clsx(topBarStyles, isHeaderLp)}></div>
            <div className={clsx(midBarStyles, isHeaderLp)}></div>
            <div className={clsx(botBarStyles, isHeaderLp)}></div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default MobileNavBar;
