import { create } from "zustand";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useOpenHeaderLP = create<Props>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useOpenHeaderLP;
