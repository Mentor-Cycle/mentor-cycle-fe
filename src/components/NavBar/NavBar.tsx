import clsx from "clsx";
import { NavBarProps } from "./NavBar.types";

const NavBar = ({ itemsMenu, menuClickActions, className }: NavBarProps) => {
  return (
    <div
      className={clsx(
        className,
        "absolute top-[110%] w-max border border-gray-03 rounded-lg py-4 px-5 bg-neutral-01 z-[5]"
      )}
    >
      <ul>
        {itemsMenu.map((item) => (
          <li
            key={item.action}
            className="flex items-center px-4 py-2 hover:bg-primary-01 hover:text-neutral-01 rounded-lg cursor-pointer"
          >
            {item.action === "theme" ? (
              <>{item.text}</>
            ) : (
              <button onClick={() => menuClickActions[item.action]()}>
                {item.text}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
