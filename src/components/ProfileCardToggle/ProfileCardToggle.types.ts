export type ProfileProps = {
  Icon: React.ReactNode;
  title: string;
  active: boolean;
  description: string;
  onClick?: () => void;
};

export type ProfileCardToggleProps = {
  handleIsMentor: (isMentor: boolean) => void;
  isMentor: boolean;
};
