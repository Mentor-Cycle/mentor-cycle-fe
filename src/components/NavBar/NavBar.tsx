import clsx from "clsx";
import { NavBarProps } from "./NavBar.types";
import * as Select from "@radix-ui/react-select";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import Toggle from "@components/Toggle";

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
  const menuStyle =
    "cursor-pointer px-3 hover:bg-primary-01 hover:text-neutral-01 focus:text-neutral-01 rounded-lg p-2 focus:bg-primary-01 focus:outline-none focus:ring-0 focus:ring-primary-03 flex items-center";

  return (
    <Select.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      value={value}
      disabled={disabled}
      onValueChange={handleValueChange}
    >
      <Select.Trigger className="flex items-center justify-center cursor-pointer focus:outline-none ml-10">
        {isOpen ? <BiChevronUp size={24} /> : <BiChevronDown size={24} />}
      </Select.Trigger>
      <Select.Content
        position="popper"
        alignOffset={30}
        side="left"
        className={clsx(
          "flex flex-col justify-between bg-neutral-01 dark:bg-secondary-01 border border-gray-04 p-4 rounded-lg mt-2"
        )}
      >
        {itemsMenu.map((item) => (
          <Select.Item
            key={item.action}
            value={item.action}
            className={menuStyle}
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
  );
};

export default NavBar;
