import clsx from "clsx";
import { NavBarProps } from "./NavBar.types";
import * as Select from "@radix-ui/react-select";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import Toggle from "@components/Toggle";
import MobileNavBar from "./MobileNavBar";

const NavBar = ({
  itemsMenu,
  isOpen,
  setIsOpen,
  value,
  disabled,
  handleValueChange,
  isDark,
  setDarkMode,
}: NavBarProps) => {
  return (
    <>
      {isOpen && (
        <div
          className="visible sm:invisible fixed top-[79px] left-0 w-screen h-screen bg-secondary-02 opacity-50 z-1"
          onClick={() => setIsOpen(false)}
        />
      )}
      <Select.Root
        open={isOpen}
        onOpenChange={setIsOpen}
        value={value}
        disabled={disabled}
        onValueChange={handleValueChange}
      >
        <Select.Trigger className=" items-center justify-center cursor-pointer focus:outline-none ml-10">
          <div className="hidden sm:flex">
            {isOpen ? <BiChevronUp size={24} /> : <BiChevronDown size={24} />}
          </div>
          <div className="flex sm:hidden">
            <MobileNavBar isOpen={isOpen} />
          </div>
        </Select.Trigger>
        <Select.Content
          position="popper"
          align="end"
          side="bottom"
          className={clsx(
            "w-[95vw] sm:w-auto h-[65vh] sm:h-auto flex flex-col bg-neutral-01 dark:bg-secondary-01 border border-gray-04 p-4 rounded-lg mt-2 transition-all duration-800 ease-in-out transform",
            isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
          )}
        >
          {itemsMenu.map((item) => (
            <Select.Item
              key={item.action}
              value={item.action}
              className={clsx(
                "text-xl sm:text-base cursor-pointer px-3 hover:bg-primary-01 hover:text-neutral-01 focus:text-neutral-01 rounded-lg p-2 focus:bg-primary-01 focus:outline-none focus:ring-0 focus:ring-primary-03 flex items-center",
                {
                  darkmode: item.action === "darkmode",
                }
              )}
            >
              <>
                {item.text}
                {item.action === "darkmode" && (
                  <span className="mr-4 mb-2">
                    <Toggle onClick={setDarkMode} isToggle={isDark} />
                  </span>
                )}
              </>
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default NavBar;
