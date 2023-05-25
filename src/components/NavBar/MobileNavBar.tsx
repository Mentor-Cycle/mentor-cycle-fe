const MobileNavBar = ({ isOpen }: { isOpen: boolean }) => {
  const topBarStyles = isOpen
    ? "bg-secondary-02 dark:bg-neutral-02 h-[2px] w-8 transform transition-all duration-300 origin-left rotate-[42deg]"
    : "bg-secondary-02 dark:bg-neutral-02 h-[2px] w-7 transform transition-all duration-300 origin-left";
  const midBarStyles = isOpen
    ? "bg-secondary-02 dark:bg-neutral-02 h-[2px] w-1/2 rounded transform transition-all duration-300 -translate-x-10"
    : "bg-secondary-02 dark:bg-neutral-02 h-[2px] w-7 rounded transform transition-all duration-300";
  const botBarStyles = isOpen
    ? "bg-secondary-02 dark:bg-neutral-02 h-[2px] w-8 transform transition-all duration-300 origin-left -rotate-[42deg]"
    : "bg-secondary-02 dark:bg-neutral-02 h-[2px] w-7 transform transition-all duration-300 origin-left";

  return (
    <div>
      <button className="relative group">
        <div className="relative flex overflow-hidden items-center justify-center w-[50px] h-[50px] transform transition-all bg-transparent  group-focus:ring-1 ring-opacity-30 duration-200 ">
          <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
            <div className={topBarStyles}></div>
            <div className={midBarStyles}></div>
            <div className={botBarStyles}></div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default MobileNavBar;
