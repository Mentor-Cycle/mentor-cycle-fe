type MenuClickActions = Record<string, () => void>;

export type NavBarProps = {
  itemsMenu: {
    text: string;
    action: keyof MenuClickActions;
  }[];
  menuClickActions: MenuClickActions;
  className?: string;
};
