type MenuClickActions = Record<string, () => void>;

export type NavBarProps = {
  itemsMenu: {
    text: string;
    action: keyof MenuClickActions;
  }[];
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  value: any;
  disabled?: boolean;
  handleValueChange?: any;
  isDark: boolean;
  setDarkMode: () => void;
  isToggle?: boolean;
};
