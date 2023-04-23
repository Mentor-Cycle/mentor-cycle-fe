type MenuClickActions = Record<string, () => void>;

export type NavBarProps = {
  itemsMenu: {
    text: React.ReactNode;
    action: keyof MenuClickActions;
  }[];
  menuClickActions: MenuClickActions;
  className?: string;
};
